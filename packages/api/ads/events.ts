import {
	Session,
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from '../trpc-server';
import { db, roles, users, usersToRoles } from '../db/schema';
import { BaseContent, baseContent } from '../schema/contentBase.schema';
import { z } from 'zod';
import { articleText, events } from '../schema/events.schema';
import { and, eq, sql } from 'drizzle-orm';
import { newEventSchemaApi, newProjectSchemaApi } from './eventsSchema';
import { TRPCError } from '@trpc/server';
import { eventTypesRoutes } from './eventTypes';
import { omit, pick } from 'remeda';
import { projects } from '../schema/cooperation.schema';

import NodeMailer from 'nodemailer';
import { env, envCore } from '@sila/env';
import { render } from '@jsx-email/render';
import { ChangesRequested, ModRequest, PublishedTemplate } from '@sila/emails';

const nodemailer = NodeMailer.createTransport({
	from: envCore.SMTP_FROM,
});

export const kindToColumn = {
	event: events,
	project: projects,
};

export const eventRoutes = createTRPCRouter({
	types: eventTypesRoutes,
	create: protectedProcedure
		.input((value) => {
			if (!value || typeof value !== 'object' || !('kind' in value))
				throw new TRPCError({ code: 'BAD_REQUEST' });
			if (value?.kind === 'event') {
				return newEventSchemaApi.parse(value);
			} else return newProjectSchemaApi.parse(value);
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
			let adId: null | number = null;
			if (input.kind === 'event') {
				const { id } = await db
					.insert(events)
					.values({
						baseId: res.id,
						// duration: input.duration,
						eventTypeId: input.eventTypeId,
						date: input.timestamp,
						...omit(input, ['title', 'contacts', 'timestamp', 'date']),
					})
					.returning({ id: events.id })
					.get({ id: events.id });
				adId = id;
			} else if (input.kind == 'project') {
				const { id } = await db
					.insert(projects)
					.values({
						baseId: res.id,
						date: input.timestamp,
						...omit(input, ['title', 'contacts', 'timestamp', 'date']),
					})
					.returning({ id: projects.id })
					.get({ id: projects.id });
				adId = id;
			}
			await db
				.insert(articleText)
				.values({
					text: input.articleData,
					articleId: adId,
				})
				.run();
			return adId;
		}),
	edit: protectedProcedure
		.input(
			z.object({
				id: z.number().positive(),
				data: z.union([newEventSchemaApi, newProjectSchemaApi]),
			})
		)
		.mutation(async ({ input, ctx }) => {
			const { id, data } = input;
			const adColumn = kindToColumn[data.kind];

			// TODO: allow editing by mods
			// TODO: allow editing by org members
			const base = await db
				.select({ id: baseContent.id, authorId: baseContent.authorId })
				.from(adColumn)
				.where(eq(adColumn.id, id))
				.innerJoin(baseContent, eq(adColumn.baseId, baseContent.id))
				.get({ id: baseContent.id, authorId: baseContent.authorId });
			console.log(base);
			if (!base || base.authorId !== ctx.session.user.id) {
				throw new TRPCError({ code: 'UNAUTHORIZED' });
			}

			const res = await db
				.update(adColumn)
				.set({
					date: data.timestamp,
					...omit(data, [
						'title',
						'contacts',
						'timestamp',
						'date',
						'time',
						'articleData',
						'text',
						'kind',
					]),
				})
				.where(eq(adColumn.id, id))
				.returning({ id: adColumn.id, bId: adColumn.baseId })
				.get();
			await db
				.update(articleText)
				.set({
					text: data.articleData,
				})
				.where(eq(articleText.articleId, id))
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
						.nullable()
						.optional(),
					author: z.string().optional(),
				})
				.optional()
		)
		.query(async ({ input: d }) => getEvents(d)),
	getOne: publicProcedure
		.input(
			z.object({
				id: z.number().positive(),
				kind: z.enum(['event', 'project']),
			})
		)
		.query(async ({ input: { id, kind }, ctx }) =>
			getAd(id, kind, ctx.session)
		),
	updateStatus: protectedProcedure
		.input(
			z.object({
				id: z.number().positive(),
				status: z.enum(['draft', 'published', 'changesRequested', 'ready']),
				kind: z.enum(['event', 'project']),
				message: z.string().optional(),
			})
		)
		.mutation(async ({ input: { id, status, kind, message }, ctx }) => {
			const column = kindToColumn[kind];
			const base = await db
				.select({
					id: baseContent.id,
					authorId: baseContent.authorId,
					status: baseContent.status,
					title: baseContent.title,
					author: users,
				})
				.from(column)
				.where(eq(column.id, id))
				.innerJoin(baseContent, eq(column.baseId, baseContent.id))
				.innerJoin(users, eq(baseContent.authorId, users.id))
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
			if (status === 'ready') {
				// find all mods
				const mods = await db
					.select()
					.from(users)
					.leftJoin(usersToRoles, eq(usersToRoles.userId, users.id))
					.leftJoin(roles, eq(roles.id, usersToRoles.roleId))
					.where(eq(roles.name, 'mod'))
					.all();
				mods.forEach((mod) => {
					nodemailer.sendMail({
						to: mod.users.email,
						subject: 'Новое событие',
						html: render(
							ModRequest({
								title: base.title,
								url: `${env.VERCEL_URL}/${kind}s/${id}`,
								timestamp: new Date(),
								username: ctx.user.name,
							})
						),
					});
				});
			}

			// notify author via email
			if (status === 'changesRequested' && base.status !== 'changesRequested') {
				if (ctx.user.id !== base.authorId) {
					nodemailer.sendMail({
						to: base.author.email,
						subject: 'Изменения запрошены',
						html: render(
							ChangesRequested({
								title: base.title,
								url: `${env.VERCEL_URL}/${kind}s/${id}`,
								timestamp: new Date().toLocaleString(),
								message,
							})
						),
					});
				}
			}
			if (status === 'published' && base.status !== 'published') {
				nodemailer.sendMail({
					to: base.author.email,
					subject: 'Опубликовано',
					html: render(
						PublishedTemplate({
							title: base.title,
							url: `${env.VERCEL_URL}/${kind}s/${id}`,
							timestamp: new Date(),
						})
					),
				});
			}
			console.log('preupdate');
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
				await db.delete(articleText).where(eq(articleText.articleId, id)).run();
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
		.from(events)
		.where(
			and(
				isImportant ? eq(events.isImportant, isImportant) : sql`true`,
				start ? sql`timestamp >= ${start.getTime()}` : sql`true`,
				end ? sql`timestamp <= ${end.getTime()}` : sql`true`,
				author ? eq(baseContent.authorId, author) : sql`true`,
				...(status ? [eq(baseContent.status, status)] : [])
			)
		)
		.innerJoin(baseContent, eq(events.baseId, baseContent.id))
		.innerJoin(users, eq(baseContent.authorId, users.id))
		// organization
		.all();
	// if published as organization, return only org, not author
	return res.map((i) => ({
		...i,
		users: pick(i.users, ['id', 'name', 'image']),
	}));
};

export const getAd = async (
	id: number,
	kind: 'event' | 'project',
	session: Session
) => {
	const res = await getAdBase(id, kind);
	// if published as organization, return only org, not author
	const isAuthor = res?.base.authorId === session?.user?.id;
	if (!res || (!isAuthor && res.base.status !== 'published'))
		throw new TRPCError({ code: 'NOT_FOUND' });
	return { ...res, ableToEdit: isAuthor };
};

async function getAdBase(id: number, kind: 'event' | 'project') {
	if (kind === 'event')
		return await db.query.events.findFirst({
			where: eq(events.id, id),
			columns: {
				baseId: false,
				eventTypeId: false,
			},
			with: { text: true, base: true },
		});
	else
		return await db.query.projects.findFirst({
			where: eq(projects.id, id),
			columns: {
				baseId: false,
			},
			with: { text: true, base: true },
		});
}
