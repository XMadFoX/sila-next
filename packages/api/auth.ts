import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { db, verificationTokens, users } from './schema';
import { ShortUser, findOne, shortUser, createUser } from './user';
import crypto from 'crypto';
import NodeMailer from 'nodemailer';
import { hash as hashPassword, verify } from './hash';

const createUserSchema = z.object({
	name: z.string().min(3).max(32).optional(),
	email: z.string().email().min(3).max(128),
	password: z.string().min(8).max(255),
	register: z.string(),
});

type CreateUserInput = z.infer<typeof createUserSchema>;

function parseAuthorizeInput(user: Record<string, any> | undefined) {
	return createUserSchema.parse(user);
}

export async function authorize(
	input: Record<string, any> | undefined
): Promise<ShortUser> {
	const credentials = parseAuthorizeInput(input);
	if (credentials.register === 'false') {
		const user = await findOne(credentials.email);
		if (user) {
			// try to log in
			if (
				// check is password set
				user.password &&
				// and matches
				(await verify(credentials.password, user.password))
			)
				return shortUser(user);
			throw new Error('Invalid credentials');
		}
	} else {
		return await register(credentials);
	}
	throw new Error('Invalid credentials');
}

async function register(credentials: CreateUserInput): Promise<ShortUser> {
	// TODO: resend verification email if expired
	if (!credentials?.name) throw new Error('Name is required');
	// hash password
	const { salt, hash } = await hashPassword(credentials.password);
	// use nodemailer to send verification email
	const verificationToken = crypto.randomBytes(16).toString('hex');
	// create nodemailer transporter
	const nodemailer = NodeMailer.createTransport({
		url: process.env.SMTP_URL,
		from: process.env.SMTP_FROM,
	});

	const userId = crypto.randomUUID();
	const tokenValues = {
		token: verificationToken,
		userId,
		// expires in 10 minutes
		expires: new Date(Date.now() + 1000 * 60 * 10),
		identifier: crypto.randomUUID(),
	};
	await db.transaction(async (trx) => {
		await createUser(
			{
				id: userId,
				email: credentials.email,
				name: credentials.name!,
				password: `${salt}:${hash}`,
			},
			trx
		);
		await trx.insert(verificationTokens).values(tokenValues).run();
	});

	nodemailer.sendMail({
		from: process.env.SMTP_FROM,
		to: credentials.email,
		subject: 'Verify your email',
		html: `Click <a href="${process.env.NEXTAUTH_URL}/api/auth/verify/${verificationToken}">this link</a> to verify your email. Link is active for 10 minutes.`,
	});

	return {
		id: userId,
		name: credentials.name,
		email: credentials.email,
		emailVerified: null,
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
