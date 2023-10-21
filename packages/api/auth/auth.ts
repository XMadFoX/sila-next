import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { db, verificationTokens, users } from '../db/schema';
import { ShortUser, findOne, shortUser, createUser } from '../user';
import crypto from 'crypto';
import NodeMailer from 'nodemailer';
import { hash as hashPassword, verify } from './hash';
import { env, envCore } from '../env.mjs';
import { loginSchema, registerSchema } from './authRoutes';
import { TRPCError } from 'trpc';

import { render } from '@jsx-email/render';
import { NewLoginTemplate, Template } from '@sila/emails';
import { NextApiRequest } from 'next';
import UAParser from 'ua-parser-js';

const nodemailer = NodeMailer.createTransport({
	url: env.SMTP_URL,
	from: env.SMTP_FROM,
});

export async function login(
	credentials: z.infer<typeof loginSchema>,
	req: NextApiRequest
): Promise<ShortUser> {
	const user = await findOne(credentials.email);
	if (user) {
		// try to log in
		if (
			// check is password set
			user.password &&
			// and matches
			(await verify(credentials.password, user.password))
		) {
			const { ip, ua, time } = {
				ip: req.headers['x-real-ip'] || req.socket.remoteAddress,
				ua: req.headers['user-agent'],
				time: new Date(),
			};

			const { browser, os } = new UAParser(ua).getResult();

			await nodemailer.sendMail({
				from: envCore.SMTP_FROM,
				to: user.email,
				subject: 'Вход в аккаунт',
				html: render(
					NewLoginTemplate({
						os: `${os.name} ${os.version}`,
						browser: `${browser.name} ${browser.version}`,
						ip,
						timestamp: time.toLocaleString('ru-RU'),
						url: env.VERCEL_URL + '/me',
					})
				),
			});
			return shortUser(user);
		}
		throw new TRPCError(400, { message: 'Invalid credentials' });
	}
	throw new TRPCError(400, { message: 'Invalid credentials' });
}

export async function register(
	credentials: z.infer<typeof registerSchema>
): Promise<ShortUser> {
	// TODO: resend verification email if expired
	if (!credentials?.name) throw new Error('Name is required');
	// hash password
	const { salt, hash } = await hashPassword(credentials.password);
	// use nodemailer to send verification email
	const verificationToken = crypto.randomBytes(16).toString('hex');
	// create nodemailer transporter
	const nodemailer = NodeMailer.createTransport({
		url: env.SMTP_URL,
		from: env.SMTP_FROM,
	});

	const userId = crypto.randomUUID();
	const tokenValues = {
		token: verificationToken,
		userId,
		// expires in 10 minutes
		expires: new Date(Date.now() + 1000 * 60 * 10),
		identifier: crypto.randomUUID(),
	};
	await db
		.transaction(async (trx) => {
			await createUser(
				{
					id: userId,
					email: credentials.email,
					name: credentials.name!,
					password: `${salt}:${hash}`,
					emailVerified: env.NODE_ENV !== 'produciton' ? new Date() : null,
				},
				trx
			);
			await trx.insert(verificationTokens).values(tokenValues).run();
		})
		.catch((err: Error) => {
			if (err.message.includes('UNIQUE constraint failed')) {
				// TODO: handle it, send fake success, send email that already registred, suggest to login/reset password
			} else throw err;
		});

	nodemailer
		.sendMail({
			from: env.SMTP_FROM,
			to: credentials.email,
			subject: 'Verify your email',
			html: `Click <a href="${env.VERCEL_URL}/api/auth/verify/${verificationToken}">this link</a> to verify your email. Link is active for 10 minutes.`,
		})
		.catch((err) => {
			console.error("Can't send verification email", err);
		});

	return {
		id: userId,
		name: credentials.name,
		email: credentials.email,
		emailVerified: null,
		image: null,
		totp: null,
		totpEnabled: null,
	};
}

export async function verifyEmail(token: string) {
	const verificationToken = await db
		.select()
		.from(verificationTokens)
		.where(eq(verificationTokens.token, token))
		.get();
	if (!verificationToken || !verificationToken.userId)
		throw new Error('Invalid token');
	if (verificationToken.expires < new Date()) throw new Error('Token expired');
	const user = await db
		.select()
		.from(users)
		.where(eq(users.id, verificationToken.userId))
		.get();
	if (!user) throw new Error('User not found');
	await db
		.delete(verificationTokens)
		.where(eq(verificationTokens.token, token))
		.run();
	await db
		.update(users)
		.set({ emailVerified: new Date() })
		.where(eq(users.id, verificationToken.userId))
		.run();
	return true;
}
