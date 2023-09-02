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

export const adBase = {
	id: integer('id').primaryKey(),
	baseId: integer('base_id').notNull(),
	date: integer('timestamp', { mode: 'timestamp_ms' }).notNull(),
	isOnline: integer('is_online', { mode: 'boolean' }).notNull(),
	country: text('country', { length: 2 }),
	city: text('city', { length: 64 }),
	address: text('address', { length: 128 }),
	coverImage: text('cover_image', { length: 255 }).notNull(),
	description: text('description', { length: 255 }).notNull(),
	mapData: text('map_data', { length: 64 }),
	isImportant: integer('is_important', { mode: 'boolean' }),
	entryType: text('entry_type', {
		enum: ['free', 'paid', 'donation'],
	}).notNull(),
};

export const events = sqliteTable('events', {
	...adBase,
	// TODO: schedule?
	// duration: integer('duration'),
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
	types: one(eventTypes, {
		fields: [events.eventTypeId],
		references: [eventTypes.id],
	}),
	text: one(articleText, {
		fields: [events.id],
		references: [articleText.articleId],
	}),
	base: one(baseContent, {
		fields: [events.baseId],
		references: [baseContent.id],
	}),
}));

export const articleText = sqliteTable('article_texts', {
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
