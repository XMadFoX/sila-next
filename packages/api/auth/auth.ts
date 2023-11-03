import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { db, verificationTokens, users } from '../db/schema';
import { ShortUser, findOne, shortUser, createUser } from '../user';
import crypto from 'crypto';
import { hash as hashPassword, verify } from './hash';
import { env } from '@sila/env';
import { loginSchema, registerSchema } from './authRoutes';
import { TRPCError } from '@trpc/server';

import { render } from '@jsx-email/render';
import {
	NewLoginTemplate,
	RegisterVerification,
	Template,
	sendMail,
} from '@sila/emails';
import { NextApiRequest } from 'next';
import getLoginDetails from './getLoginDetails';
import captcha from '../captcha';

export async function login(
	credentials: z.infer<typeof loginSchema>,
	req: NextApiRequest
): Promise<ShortUser> {
	await captcha(credentials.captcha);
	const user = await findOne(credentials.email);
	if (user) {
		// try to log in
		if (
			// check is password set
			user.password &&
			// and matches
			(await verify(credentials.password, user.password))
		) {
			const { ip, time, os, browser } = getLoginDetails(req);

			sendMail({
				to: user.email,
				subject: 'Вход в аккаунт',
				html: render(
					NewLoginTemplate({
						os: `${os.name} ${os.version}`,
						browser: `${browser.name} ${browser.version}`,
						ip,
						timestamp: time,
						url: env.VERCEL_URL + '/me',
					})
				),
			});
			return shortUser(user);
		}
		throw new TRPCError({
			code: 'BAD_REQUEST',
			message: 'Invalid credentials',
		});
	}
	throw new TRPCError({ code: 'BAD_REQUEST', message: 'Invalid credentials' });
}

export async function register(
	credentials: z.infer<typeof registerSchema>
): Promise<ShortUser> {
	await captcha(credentials.captcha);
	// TODO: resend verification email if expired
	if (!credentials?.name) throw new Error('Name is required');
	// hash password
	const { salt, hash } = await hashPassword(credentials.password);
	// use nodemailer to send verification email
	const verificationToken = crypto.randomBytes(16).toString('hex');

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
		.then(() => {
			sendMail({
				to: credentials.email,
				subject: 'Подтвердите вашу регистрацию',
				html: render(
					RegisterVerification({
						url: `${env.VERCEL_URL}/api/auth/verify/${verificationToken}`,
					})
				),
			}).catch((err) => {
				console.error("Can't send verification email", err);
			});
		})
		.catch(async (err: Error) => {
			if (err.message.includes('UNIQUE constraint failed')) {
				const user = await db
					.select()
					.from(users)
					.where(eq(users.email, credentials.email))
					.get();
				if (!user) throw new Error('User not found');
				if (user?.emailVerified)
					sendMail({
						to: credentials.email,
						subject: 'У вас уже есть аккаунт',
						html: render(
							Template({
								title: 'У вас уже есть аккаунт',
								text: 'Только что вы пытались создать аккаунт, но он у вас есть. Войдите в него.',
								actionText: 'Войти',
								actionUrl: `${env.VERCEL_URL}/auth/login`,
							})
						),
					});
				else {
					tokenValues.userId = user.id;
					db.insert(verificationTokens).values(tokenValues).run();
					sendMail({
						to: credentials.email,
						subject: 'Подтвердите email',
						html: render(
							RegisterVerification({
								url: `${env.VERCEL_URL}/api/auth/verify/${verificationToken}`,
							})
						),
					});
				}
			} else throw err;
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
	return user;
}
