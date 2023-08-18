import { InferModel, relations } from 'drizzle-orm';
import {
	sqliteTable,
	text,
	integer,
	uniqueIndex,
} from 'drizzle-orm/sqlite-core';
import { baseContent } from './contentBase.schema';
import { customJson } from './jsonType';
import { createInsertSchema } from 'drizzle-zod';

export const events = sqliteTable('events', {
	id: integer('id').primaryKey(),
	baseId: integer('base_id').notNull(),
	date: integer('timestamp', { mode: 'timestamp_ms' }).notNull(),
	// TODO: schedule?
	duration: integer('duration'),
	isOnline: integer('is_online', { mode: 'boolean' }),
	isFree: integer('is_free', { mode: 'boolean' }),
	country: text('country', { length: 2 }),
	city: text('city', { length: 64 }),
	address: text('address', { length: 128 }),
	mapData: text('map_data', { length: 64 }),
	// TODO: contacts
	coverImage: text('cover_image', { length: 255 }).notNull(),
	description: text('description', { length: 255 }).notNull(),
	registrationUrl: text('registration_url', { length: 255 }),
	eventTypeId: integer('event_type_id'), //.references(() => eventTypes.id),
	isImportant: integer('is_important', { mode: 'boolean' }),
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
	types: one(eventTypes, {
		fields: [events.eventTypeId],
		references: [eventTypes.id],
	}),
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
export const insertEventTypesSchema = createInsertSchema(eventTypes);
