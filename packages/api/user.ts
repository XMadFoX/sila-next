import { InsertUser, User, users } from './schema/user.schema';
import { db } from './schema';
import { eq } from 'drizzle-orm';
import { omit } from 'remeda';

export async function createUser(data: InsertUser, trx?: any) {
	return await (trx || db).insert(users).values(data).returning().get();
}

export async function findOne(email: string) {
	return await db.select().from(users).where(eq(users.email, email)).get();
}

export interface ShortUser
	extends Pick<
		User,
		'id' | 'name' | 'email' | 'emailVerified' | 'totpEnabled'
	> {
	totp?: string | null;
}

export function shortUser(user: User): ShortUser {
	return omit(user, ['totp', 'password', 'createdAt', 'totpSecret']);
}
