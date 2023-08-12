import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from './trpc-server';
import { db, users } from './schema';
import { baseContent } from './schema/contentBase.schema';
import { z } from 'zod';
import { eventText, events } from './schema/events.schema';
import { and, eq, sql } from 'drizzle-orm';
import { newEventSchemaApi } from './eventsSchema';
import { TRPCError } from '@trpc/server';

export const eventRoutes = createTRPCRouter({
	create: protectedProcedure
		.input(newEventSchemaApi)
		.mutation(async ({ input, ctx }) => {
			console.log('before base content');
			const res = await db
				.insert(baseContent)
				.values({
					title: input.title,
					publishedAt: new Date(),
					authorId: ctx.session.user.id,
				})
				.returning({ id: baseContent.id })
				.get({ id: baseContent.id });
			console.log(res);

			console.log('after base content insert');
			if (!res?.id) return;
			const { id: eventId } = await db
				.insert(events)
				.values({
					baseId: res.id,
					description: input.description,
					duration: input.duration,
					isFree: input.isFree,
					isOnline: input.isOnline,
					registrationUrl: input.registrationUrl,
					coverImage: input.coverImage,
					eventTypeId: input.eventTypeId,
					date: input.date,
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
		.mutation(async ({ input }) => {
			const { id, data } = input;
			// TODO: check permissions
			const res = await db
				.update(events)
				.set({
					description: data.description,
					// duration: data.duration,
					isFree: data.isFree,
					isOnline: data.isOnline,
					registrationUrl: data.registrationUrl,
					coverImage: data.coverImage,
					eventTypeId: data.eventTypeId,
					date: data.date,
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
				})
				.optional()
		)
		.query(async ({ input: d }) => getEvents(d)),
	getOne: publicProcedure
		.input(z.number().positive())
		.query(async ({ input: id }) => getEvent(id)),
});

export const getEvents = async ({
	isImportant,
	start,
	end,
}: { isImportant?: boolean; start?: Date; end?: Date } = {}) => {
	const res = await db
		.select()
		.from(events)
		.where(
			and(
				isImportant ? eq(events.isImportant, isImportant) : sql`true`,
				start ? sql`timestamp >= ${start.getTime()}` : sql`true`,
				end ? sql`timestamp <= ${end.getTime()}` : sql`true`
			)
		)
		.innerJoin(baseContent, eq(events.baseId, baseContent.id))
		.innerJoin(users, eq(baseContent.authorId, users.id))
		// organization
		.all();
	// if published as organization, return only org, not author
	return res;
};

export const getEvent = async (id: number) => {
	const res = await db.query.events.findFirst({
		where: eq(events.id, id),
		with: { text: true, base: true },
	});
	// if published as organization, return only org, not author
	if (!res) throw new TRPCError({ code: 'NOT_FOUND' });
	return res;
};
