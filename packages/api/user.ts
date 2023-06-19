import {
	InsertUser,
	User,
	users,
	verificationTokens,
} from './schema/user.schema';
import { db } from './schema';
import { eq } from 'drizzle-orm';
import crypto from 'node:crypto';
import NodeMailer from 'nodemailer';
import { z } from 'zod';

export async function createUser(data: InsertUser, trx?: any) {
	return await (trx || db).insert(users).values(data).returning().get();
}

export async function findOne(email: string) {
	return await db.select().from(users).where(eq(users.email, email)).get();
}

export interface ShortUser
	extends Pick<User, 'id' | 'name' | 'email' | 'emailVerified'> {
	totp: string | null;
}

function shortUser(user: User): ShortUser {
	return {
		id: user.id,
		name: user.name,
		email: user.email,
		emailVerified: user.emailVerified,
		totp: user.totp,
	};
}

const createUserSchema = z.object({
	name: z.string().min(3).max(32).optional(),
	email: z.string().email().min(3).max(128),
	password: z.string().min(8).max(255),
	register: z.string(),
});

type CreateUserInput = z.infer<typeof createUserSchema>;

function parseAuthorizeInput(user: Record<string, any>) {
	return createUserSchema.parse(user);
}

export async function authorize(
	input: Record<string, any>
): Promise<ShortUser | null> {
	const credentials = parseAuthorizeInput(input);
	if (credentials.register === 'false') {
		const user = await findOne(credentials.email);
		if (user) {
			// try to log in
			if (
				// check is password set
				user.password &&
				// and matches
				(await verifyPassword(credentials.password, user.password))
			)
				return shortUser(user);
			return null;
		}
	} else {
		return await register(credentials);
	}
	return null;
}

async function register(credentials: CreateUserInput) {
	// TODO: resend verification email if expired
	if (!credentials?.name) return null;
	// hash password
	const { salt, hash } = await hashPassword(credentials.password);
	// use nodemailer to send verification email
	const verificationToken = crypto.randomBytes(16).toString('hex');
	// create nodemailer transporter
	const nodemailer = NodeMailer.createTransport({
		host: process.env.SMTP_HOST,
		port: Number(process.env.SMTP_PORT),
		auth: {
			user: process.env.SMTP_USER,
			pass: process.env.SMTP_PASS,
		},
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

async function hashPassword(password: string) {
	const salt = crypto.randomBytes(16).toString('hex');
	const hash = crypto
		.pbkdf2Sync(password, salt, 1000, 64, 'sha512')
		.toString('hex');
	return { salt, hash };
}

async function verifyPassword(password: string, saltHash: string) {
	const [salt, hash] = saltHash.split(':');
	const hashVerify = crypto
		.pbkdf2Sync(password, salt, 1000, 64, 'sha512')
		.toString('hex');
	return hash === hashVerify;
}
