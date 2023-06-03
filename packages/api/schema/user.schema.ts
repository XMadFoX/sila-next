import {
	mysqlTable,
	serial,
	timestamp,
	uniqueIndex,
	varchar,
	int,
} from 'drizzle-orm/mysql-core';
import { InferModel } from 'drizzle-orm';

export const users = mysqlTable(
	'users',
	{
		id: serial('id').primaryKey().notNull(),
		email: varchar('email', { length: 128 }).notNull(),
		name: varchar('name', { length: 32 }).notNull(),
		password: varchar('password', { length: 255 }),
		createdAt: timestamp('created_at').defaultNow(),
		avatar: varchar('avatar', { length: 255 }),
		organization: int('organization'),
	},
	(table) => ({
		emailIdx: uniqueIndex('email_idx').on(table.email),
	})
);

export type User = InferModel<typeof users, 'select'>;
export type InsertUser = InferModel<typeof users, 'insert'>;
