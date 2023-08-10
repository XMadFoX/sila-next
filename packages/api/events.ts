import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from './trpc-server';
import { db, users } from './schema';
import { baseContent } from './schema/contentBase.schema';
import { z } from 'zod';
import { eventText, events } from './schema/events.schema';
import { eq, sql } from 'drizzle-orm';
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
	find: publicProcedure.query(async () => getEvents()),
	getOne: publicProcedure
		.input(z.number().positive())
		.query(async ({ input: id }) => getEvent(id)),
});

export const getEvents = async () => {
	const res = await db
		.select()
		.from(events)
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
	if (!res) return new TRPCError({ code: 'NOT_FOUND' });
	return res;
};
