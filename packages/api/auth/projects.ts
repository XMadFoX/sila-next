import { Session, createTRPCRouter, publicProcedure } from '../trpc-server';
import { db, users } from '../db/schema';
import { BaseContent, baseContent } from '../schema/contentBase.schema';
import { z } from 'zod';
import { and, eq, sql } from 'drizzle-orm';
import { TRPCError } from '@trpc/server';
import { projects } from '../schema/cooperation.schema';
import { omit, pick } from 'remeda';

export const projectRoutes = createTRPCRouter({
	// TODO: types: eventTypesRoutes,
	find: publicProcedure
		.input(
			z
				.object({
					isImportant: z.boolean().optional(),
					start: z.date().optional(),
					end: z.date().optional(),
					author: z.string().optional(),
					status: z
						.enum(['draft', 'published', 'changesRequested', 'ready'])
						.nullable()
						.optional(),
				})
				.optional()
		)
		.query(async ({ input: d }) => getProjects(d)),
	getOne: publicProcedure
		.input(z.number().positive())
		.query(async ({ input: id, ctx }) => getProject(id, ctx.session)),
});

export const getProjects = async ({
	isImportant,
	start,
	end,
	author,
	status = 'published',
}: {
	isImportant?: boolean;
	start?: Date;
	end?: Date;
	author?: string;
	status?: BaseContent['status'] | null;
} = {}) => {
	const res = await db
		.select()
		.from(projects)
		.where(
			and(
				isImportant ? eq(projects.isImportant, isImportant) : sql`true`,
				start ? sql`timestamp >= ${start.getTime()}` : sql`true`,
				end ? sql`timestamp <= ${end.getTime()}` : sql`true`,
				author ? eq(baseContent.authorId, author) : sql`true`,
				...(status ? [eq(baseContent.status, status)] : [])
			)
		)
		.innerJoin(baseContent, eq(projects.baseId, baseContent.id))
		.innerJoin(users, eq(baseContent.authorId, users.id))
		// organization
		.all();
	// if published as organization, return only org, not author
	return res.map((i) => ({
		...i,
		users: pick(i.users, ['id', 'name', 'image']),
	}));
};

export const getProject = async (id: number, session: Session) => {
	const res = await db.query.projects.findFirst({
		where: eq(projects.id, id),
		columns: {
			baseId: false,
			// eventTypeId: false,
		},
		with: { text: true, base: true },
	});
	// if published as organization, return only org, not author
	const isAuthor = res?.base.authorId === session?.user?.id;
	if (!res || (!isAuthor && res.base.status !== 'published'))
		throw new TRPCError({ code: 'NOT_FOUND' });
	return { ...res, ableToEdit: isAuthor };
};
