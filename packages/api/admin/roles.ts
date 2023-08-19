import { db, roles } from '../schema';
import { createTRPCRouter, protectedProcedure } from '../trpc-server';
import { TRPCError } from '@trpc/server';

export const adminRolesRoutes = createTRPCRouter({
	list: protectedProcedure.query(async ({ ctx }) => {
		if (!ctx.user.roles.includes('admin'))
			throw new TRPCError({ code: 'UNAUTHORIZED' });
		return await db.select().from(roles).all();
	}),
});
