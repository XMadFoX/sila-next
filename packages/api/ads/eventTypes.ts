import { eq } from 'drizzle-orm';
import {
	db,
	eventTypes,
	insertEventTypesSchema,
	projectTypes,
} from '../db/schema';
import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from '../trpc-server';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

const kindToColumn = {
	project: projectTypes,
};

const kinds = z.enum(['project']).optional();
export type kind = z.infer<typeof kinds>;

const col = (kind: 'project' | undefined) =>
	kind ? kindToColumn[kind] : eventTypes;
export const eventTypesRoutes = createTRPCRouter({
	create: protectedProcedure
		.input(insertEventTypesSchema.extend({ kind: kinds }))
		.mutation(async ({ input, ctx }) => {
			if (!ctx.user.roles.includes('admin'))
				throw new TRPCError({ code: 'UNAUTHORIZED' });
			const res = await db
				.insert(col(input.kind))
				.values({
					name: input.name,
				})
				.returning({ id: eventTypes.id })
				.get({ id: eventTypes.id });
			return res?.id;
		}),
	list: publicProcedure.input(kinds).query(async ({ input: kind }) => {
		const res = await db.select().from(col(kind)).all();
		return res;
	}),
	update: protectedProcedure
		.input(z.object({ id: z.number(), name: z.string(), kind: kinds }))
		.mutation(async ({ input, ctx }) => {
			if (!ctx.user.roles.includes('admin'))
				throw new TRPCError({ code: 'UNAUTHORIZED' });
			const res = await db
				.update(col(input.kind))
				.set({
					name: input.name,
				})
				.where(eq(col(input.kind).id, input.id))
				.run();
			return res;
		}),
	delete: protectedProcedure
		.input(z.object({ id: z.number(), kind: kinds }))
		.mutation(async ({ input, ctx }) => {
			if (!ctx.user.roles.includes('admin'))
				throw new TRPCError({ code: 'UNAUTHORIZED' });
			const res = await db
				.delete(col(input.kind))
				.where(eq(col(input.kind).id, input.id))
				.run();
			return res;
		}),
});
