import { InsertUser, users } from './schema/user.schema';
import { db } from './schema';
import { eq } from 'drizzle-orm';

export async function createUser(data: InsertUser) {
	await db.insert(users).values(data).returning().get();
}

export async function findOne(email: string) {
	return await db.select().from(users).where(eq(users.email, email)).get();
}
