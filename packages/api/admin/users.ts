import { and, eq } from 'drizzle-orm';
import { db, roles, users, usersToRoles } from '../schema';
import { createTRPCRouter, protectedProcedure } from '../trpc-server';
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
			return {
				...user,
				...(userRolesList[0].role && {
					roles: userRolesList.map((r) => r.role),
				}),
			};
		});

		return res;
	}),
	addRole: protectedProcedure
		.input(z.object({ userId: z.string(), roleId: z.number() }))
		.mutation(async ({ input, ctx }) => {
			if (!ctx.user.roles.includes('admin'))
				throw new TRPCError({ code: 'UNAUTHORIZED' });
			if (input.roleId === 1 || input.roleId === 2)
				throw new TRPCError({ code: 'UNAUTHORIZED' });
			const res = await db.insert(usersToRoles).values(input).run();
			return res;
		}),
	removeRole: protectedProcedure
		.input(z.object({ userId: z.string(), roleId: z.number() }))
		.mutation(async ({ input, ctx }) => {
			if (!ctx.user.roles.includes('admin'))
				throw new TRPCError({ code: 'UNAUTHORIZED' });
			if (input.roleId === 1 || input.roleId === 2)
				throw new TRPCError({ code: 'UNAUTHORIZED' });
			const res = await db
				.delete(usersToRoles)
				.where(
					and(
						eq(usersToRoles.userId, input.userId),
						eq(usersToRoles.roleId, input.roleId)
					)
				)
				.run();
			return res;
		}),
});

import type { inferProcedureOutput } from '@trpc/server';
export type userList = inferProcedureOutput<typeof adminUserRoutes.list>;
