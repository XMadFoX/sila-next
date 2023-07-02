import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from './trpc-server';
import { db, users } from './schema';
import { baseContent } from './schema/contentBase.schema';
import { z } from 'zod';
import { eventText, events } from './schema/events.schema';
import { eq } from 'drizzle-orm';

export const eventRoutes = createTRPCRouter({
	create: protectedProcedure
		.input(
			z.object({
				title: z.string().min(3).max(64),
				description: z.string().min(3).max(255),
				// later image id on CF images
				coverImage: z.string().min(3).max(255).url(),
				duration: z.number().int().min(0).optional(),
				isOnline: z.boolean().optional(),
				isFree: z.boolean().optional(),
				registrationUrl: z.string().min(3).max(512).url().optional(),
				eventTypeId: z.number().int().optional(),
				timestamp: z.date(),
				// oraganizationId: z.number().int().optional(),
			})
		)
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
					date: input.timestamp,
				})
				.returning()
				.get({ id: events.id });
			await db
				.insert(eventText)
				.values({
					text: {
						blocks: [
							{
								key: '2j3o7',
								text: 'This is a test event',
								type: 'unstyled',
								depth: 0,
								inlineStyleRanges: [],
								entityRanges: [],
								data: {},
							},
						],
					},
					articleId: eventId,
				})
				.run();
		}),
});
