import {
	integer,
	primaryKey,
	sqliteTable,
	text,
} from 'drizzle-orm/sqlite-core';
import { users } from './user.schema';
import { events } from './events.schema';
import { relations } from 'drizzle-orm';

export const baseContent = sqliteTable(
	'base_content',
	{
		id: integer('id'),
		title: text('title', { length: 64 }).notNull(),
		publishedAt: integer('published_at', { mode: 'timestamp_ms' }).notNull(),
		authorId: text('author_id')
			.notNull()
			.references(() => users.id),
		// organizationId: integer('organization_id').references(() => orgs.id),
	},
	(table) => ({
		pk: primaryKey(table.id),
	})
);
