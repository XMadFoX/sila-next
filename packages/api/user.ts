import {
	InsertUser,
	User,
	roles,
	users,
	usersToRoles,
} from './schema/user.schema';
import { db } from './schema';
import { eq } from 'drizzle-orm';
import { omit } from 'remeda';

export async function createUser(data: InsertUser, trx?: any) {
	return await (trx || db).insert(users).values(data).returning().get();
}

export async function findOne(email: string) {
	const userQ = db.select().from(users).where(eq(users.email, email)).get();
	const userRolesQ = db
		.select({ role: roles.name })
		.from(users)
		.where(eq(users.email, email))
		.leftJoin(usersToRoles, eq(usersToRoles.userId, users.id))
		.leftJoin(roles, eq(roles.id, usersToRoles.roleId))
		.all();
	const [user, userRoles] = await Promise.all([userQ, userRolesQ]);

	if (!user) return null;
	const res = { ...user, roles: userRoles.map((r) => r.role) };
	return res;
}

export interface ShortUser
	extends Pick<
		User,
		'id' | 'name' | 'email' | 'emailVerified' | 'totpEnabled'
	> {
	totp?: string | null;
	roles?: string[];
}

export function shortUser(user: User): ShortUser {
	return omit(user, ['totp', 'password', 'createdAt', 'totpSecret']);
}
