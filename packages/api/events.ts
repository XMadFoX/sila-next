import {
	Session,
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from './trpc-server';
import { db, users } from './schema';
import { BaseContent, baseContent } from './schema/contentBase.schema';
import { z } from 'zod';
import { eventText, events } from './schema/events.schema';
import { and, eq, sql } from 'drizzle-orm';
import { newEventSchemaApi, newProjectSchema } from './eventsSchema';
import { TRPCError } from '@trpc/server';
import { eventTypesRoutes } from './eventTypes';

export const eventRoutes = createTRPCRouter({
	types: eventTypesRoutes,
	create: protectedProcedure
		.input((value) => {
			if (!value || typeof value !== 'object' || !('kind' in value))
				throw new TRPCError({ code: 'BAD_REQUEST' });
			if (value?.kind === 'event') {
				return newEventSchemaApi.parse(value);
			} else return newProjectSchema.parse(value);
		})
		.mutation(async ({ input, ctx }) => {
			console.log('before base content');
			const res = await db
				.insert(baseContent)
				.values({
					title: input.title,
					publishedAt: new Date(),
					authorId: ctx.session.user.id,
					contacts: input.contacts,
					// ? kind
				})
				.returning({ id: baseContent.id })
				.get({ id: baseContent.id });
			console.log(res);

			console.log('after base content insert');
			if (!res?.id) return;
			if (input.kind !== 'event')
				throw new TRPCError({
					code: 'NOT_IMPLEMENTED',
				});
			const { id: eventId } = await db
				.insert(events)
				.values({
					baseId: res.id,
					description: input.description,
					// duration: input.duration,
					entryType: input.entryType,
					isOnline: input.isOnline,
					registrationUrl: input.registrationUrl,
					coverImage: input.coverImage,
					eventTypeId: input.eventTypeId,
					date: input.timestamp,
					...(!input.isOnline && {
						country: input.country,
						city: input.city,
						address: input.address,
						mapData: input.maps_link,
					}),
				})
				.returning({ id: events.id })
				.get({ id: events.id });
			await db
				.insert(eventText)
				.values({
					text: input.articleData,
					articleId: eventId,
				})
				.run();
			return eventId;
		}),
	edit: protectedProcedure
		.input(
			z.object({
				id: z.number().positive(),
				data: newEventSchemaApi,
			})
		)
		.mutation(async ({ input, ctx }) => {
			const { id, data } = input;

			// TODO: allow editing by mods
			// TODO: allow editing by org members
			const base = await db
				.select({ id: baseContent.id, authorId: baseContent.authorId })
				.from(events)
				.where(eq(events.id, id))
				.innerJoin(baseContent, eq(events.baseId, baseContent.id))
				.get({ id: baseContent.id, authorId: baseContent.authorId });
			console.log(base);
			if (!base || base.authorId !== ctx.session.user.id) {
				throw new TRPCError({ code: 'UNAUTHORIZED' });
			}

			const res = await db
				.update(events)
				.set({
					description: data.description,
					// duration: data.duration,
					entryType: data.entryType,
					isOnline: data.isOnline,
					registrationUrl: data.registrationUrl,
					coverImage: data.coverImage,
					eventTypeId: data.eventTypeId,
					date: data.timestamp,
					...(!data.isOnline && {
						country: data.country,
						city: data.city,
						address: data.address,
						mapData: data.maps_link,
					}),
				})
				.where(eq(events.id, id))
				.returning({ id: events.id, bId: events.baseId })
				.get();
			await db
				.update(eventText)
				.set({
					text: data.articleData,
				})
				.where(eq(eventText.articleId, id))
				.run();
			await db
				.update(baseContent)
				.set({
					title: data.title,
					contacts: data.contacts,
				})
				.where(eq(baseContent.id, res.bId))
				.run();
			return res;
		}),
	find: publicProcedure
		.input(
			z
				.object({
					isImportant: z.boolean().optional(),
					start: z.date().optional(),
					end: z.date().optional(),
					status: z
						.enum(['draft', 'published', 'changesRequested', 'ready'])
						.optional(),
				})
				.optional()
		)
		.query(async ({ input: d }) => getEvents(d)),
	getOne: publicProcedure
		.input(z.number().positive())
		.query(async ({ input: id, ctx }) => getEvent(id, ctx.session)),
	updateStatus: protectedProcedure
		.input(
			z.object({
				id: z.number().positive(),
				status: z.enum(['draft', 'published', 'changesRequested', 'ready']),
			})
		)
		.mutation(async ({ input: { id, status }, ctx }) => {
			const base = await db
				.select({
					id: baseContent.id,
					authorId: baseContent.authorId,
					status: baseContent.status,
				})
				.from(events)
				.where(eq(events.id, id))
				.innerJoin(baseContent, eq(events.baseId, baseContent.id))
				.get({ id: baseContent.id, authorId: baseContent.authorId });
			if (!base || base.authorId !== ctx.user.id) {
				throw new TRPCError({ code: 'UNAUTHORIZED' });
			}
			if (
				!['draft', 'published', 'ready'].includes(status) &&
				!ctx.user.roles.includes('mod')
			) {
				throw new TRPCError({ code: 'UNAUTHORIZED' });
			}
			if (
				status === 'ready' &&
				!['changesRequested', 'draft'].includes(base.status)
			) {
				throw new TRPCError({ code: 'UNAUTHORIZED' });
			}
			await db
				.update(baseContent)
				.set({ status })
				.where(eq(baseContent.id, base.id))
				.run();
			return;
		}),
	delete: protectedProcedure
		.input(z.number().positive())
		.mutation(async ({ input: id, ctx }) => {
			const base = await db
				.select({ id: baseContent.id, authorId: baseContent.authorId })
				.from(events)
				.where(eq(events.id, id))
				.innerJoin(baseContent, eq(events.baseId, baseContent.id))
				.get({ id: baseContent.id, authorId: baseContent.authorId });
			console.log(base);
			if (!base || base.authorId !== ctx.user.id) {
				throw new TRPCError({ code: 'UNAUTHORIZED' });
			}

			await db.transaction(async (db) => {
				await db.delete(eventText).where(eq(eventText.articleId, id)).run();
				await db.delete(events).where(eq(events.id, id)).run();
				await db.delete(baseContent).where(eq(baseContent.id, base.id)).run();
			});
			return;
		}),
});

export const getEvents = async ({
	isImportant,
	start,
	end,
	status = 'published',
}: {
	isImportant?: boolean;
	start?: Date;
	end?: Date;
	status?: BaseContent['status'];
} = {}) => {
	const res = await db
		.select()
		.from(events)
		.where(
			and(
				isImportant ? eq(events.isImportant, isImportant) : sql`true`,
				start ? sql`timestamp >= ${start.getTime()}` : sql`true`,
				end ? sql`timestamp <= ${end.getTime()}` : sql`true`,
				eq(baseContent.status, status)
			)
		)
		.innerJoin(baseContent, eq(events.baseId, baseContent.id))
		.innerJoin(users, eq(baseContent.authorId, users.id))
		// organization
		.all();
	// if published as organization, return only org, not author
	return res;
};

export const getEvent = async (id: number, session: Session) => {
	const res = await db.query.events.findFirst({
		where: eq(events.id, id),
		columns: {
			baseId: false,
			eventTypeId: false,
		},
		with: { text: true, base: true },
	});
	// if published as organization, return only org, not author
	const isAuthor = res?.base.authorId === session?.user?.id;
	if (!res || (!isAuthor && res.base.status !== 'published'))
		throw new TRPCError({ code: 'NOT_FOUND' });
	return { ...res, ableToEdit: isAuthor };
};
