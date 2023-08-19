import { eq } from 'drizzle-orm';
import {
	db,
	eventTypes,
	insertEventTypesSchema,
	roles,
	users,
	usersToRoles,
} from '../schema';
import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from '../trpc-server';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

export const adminUserRoutes = createTRPCRouter({
	list: protectedProcedure.query(async ({ ctx }) => {
		if (!ctx.user.roles.includes('admin'))
			throw new TRPCError({ code: 'UNAUTHORIZED' });
		const userQ = db.select().from(users).all();
		const userRolesQ = db
			.select({ userId: users.id, role: roles.name })
			.from(users)
			.leftJoin(usersToRoles, eq(usersToRoles.userId, users.id))
			.leftJoin(roles, eq(roles.id, usersToRoles.roleId))
			.all();
		const [usersList, userRoles] = await Promise.all([userQ, userRolesQ]);

		if (!usersList) return null;
		const res = usersList.map((user) => {
			const userRolesList = userRoles.filter((r) => r.userId === user.id);
			return { ...user, roles: userRolesList.map((r) => r.role) };
		});

		return res;
	}),
});

import type { inferProcedureOutput } from '@trpc/server';
export type userList = inferProcedureOutput<typeof adminUserRoutes.list>;
