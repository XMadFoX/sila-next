import { InferModel, relations } from 'drizzle-orm';
import {
	sqliteTable,
	text,
	integer,
	uniqueIndex,
	blob,
	primaryKey,
} from 'drizzle-orm/sqlite-core';
import { baseContent } from './contentBase.schema';
import { customJson } from './jsonType';

export const events = sqliteTable('events', {
	id: integer('id').primaryKey(),
	baseId: integer('base_id').notNull(),
	date: integer('timestamp', { mode: 'timestamp_ms' }).notNull(),
	// TODO: schedule?
	duration: integer('duration'),
	isOnline: integer('is_online', { mode: 'boolean' }),
	isFree: integer('is_free', { mode: 'boolean' }),
	// TODO: address, map data
	// TODO: contacts
	coverImage: text('cover_image', { length: 255 }).notNull(),
	description: text('description', { length: 255 }).notNull(),
	registrationUrl: text('registration_url', { length: 255 }),
	eventTypeId: integer('event_type_id'), //.references(() => eventTypes.id),
});

export type Event = InferModel<typeof events>;

export const eventRealtions = relations(events, ({ one }) => ({
	// base: one(events, {
	// 	fields: [events.baseId],
	// 	references: [baseContent.id],
	// }),
	// base: one(events, {
	// 	fields: [events.baseId],
	// 	references: [baseContent.id],
	// }),
	text: one(eventText, {
		fields: [events.id],
		references: [eventText.articleId],
	}),
	base: one(baseContent, {
		fields: [events.baseId],
		references: [baseContent.id],
	}),
}));

export const eventText = sqliteTable('article_texts', {
	id: integer('id').primaryKey().notNull(),
	articleId: integer('article_id'),
	// text: blob('text', { mode: 'json' }).notNull(),
	text: customJson('text').notNull(),
});

export const eventTypes = sqliteTable(
	'event_types',
	{
		id: integer('id').primaryKey().notNull(),
		name: text('name', { length: 64 }).notNull(),
	},
	(table) => ({
		id: uniqueIndex('id').on(table.id),
	})
);

export type EventType = InferModel<typeof eventTypes>;
