import { eq } from 'drizzle-orm';
import { db, eventTypes, insertEventTypesSchema } from './schema';
import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from './trpc-server';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

export const eventTypesRoutes = createTRPCRouter({
	create: protectedProcedure
		.input(insertEventTypesSchema)
		.mutation(async ({ input, ctx }) => {
			if (!ctx.user.roles.includes('admin'))
				throw new TRPCError({ code: 'UNAUTHORIZED' });
			const res = await db
				.insert(eventTypes)
				.values({
					name: input.name,
				})
				.returning({ id: eventTypes.id })
				.get({ id: eventTypes.id });
			return res?.id;
		}),
	list: publicProcedure.query(async () => {
		const res = await db.select().from(eventTypes).all();
		return res;
	}),
	update: protectedProcedure
		.input(z.object({ id: z.number(), name: z.string() }))
		.mutation(async ({ input, ctx }) => {
			if (!ctx.user.roles.includes('admin'))
				throw new TRPCError({ code: 'UNAUTHORIZED' });
			const res = await db
				.update(eventTypes)
				.set({
					name: input.name,
				})
				.where(eq(eventTypes.id, input.id))
				.run();
			return res;
		}),
	delete: protectedProcedure
		.input(z.number())
		.mutation(async ({ input, ctx }) => {
			if (!ctx.user.roles.includes('admin'))
				throw new TRPCError({ code: 'UNAUTHORIZED' });
			const res = await db
				.delete(eventTypes)
				.where(eq(eventTypes.id, input))
				.run();
			return res;
		}),
});
