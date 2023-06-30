import { InferModel } from 'drizzle-orm';
import {
	sqliteTable,
	text,
	integer,
	uniqueIndex,
	blob,
} from 'drizzle-orm/sqlite-core';

export const events = sqliteTable(
	'users',
	{
		id: text('id').primaryKey().notNull(),
		baseId: text('base_id').primaryKey().notNull(),
		timestamp: integer('timestamp', { mode: 'timestamp_ms' }).notNull(),
		// TODO: schedule?
		duration: integer('duration'),
		isOnline: integer('is_online', { mode: 'boolean' }),
		isFree: integer('is_free', { mode: 'boolean' }),
		// TODO: address, map data
		// TODO: contacts
		coverImage: text('cover_image', { length: 255 }),
		description: text('description', { length: 255 }),
		registrationUrl: text('registration_url', { length: 255 }),
		eventTypeId: integer('event_type_id').references(() => eventTypes.id),
		organization: integer('organization'),
	},
	(table) => ({
		id: uniqueIndex('id').on(table.id),
		eventTypeId: uniqueIndex('event_type_id').on(table.eventTypeId),
	})
);

export const EventText = sqliteTable('article_texts', {
	id: integer('id').primaryKey().notNull(),
	articleId: integer('article_id').references(() => events.id),
	text: blob('text', { mode: 'json' }).notNull(),
});

export type Event = InferModel<typeof events>;

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
