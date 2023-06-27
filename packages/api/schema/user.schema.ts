import { InferModel } from 'drizzle-orm';
import { AdapterAccount } from '@auth/core/adapters';
import {
	sqliteTable,
	text,
	integer,
	uniqueIndex,
	primaryKey,
} from 'drizzle-orm/sqlite-core';

export const users = sqliteTable(
	'users',
	{
		id: text('id').primaryKey().notNull(),
		email: text('email', { length: 128 }).notNull(),
		emailVerified: integer('email_verified', { mode: 'timestamp_ms' }),
		name: text('name', { length: 32 }).notNull(),
		password: text('password', { length: 255 }),
		createdAt: integer('created_at', { mode: 'timestamp_ms' }),
		image: text('avatar', { length: 255 }),
		totpSecret: text('totp_secret', { length: 255 }),
		totpEnabled: integer('totp_enabled', { mode: 'timestamp_ms' }),
		totp: text('totp', { length: 255 }),
		organization: integer('organization'),
	},
	(table) => ({
		emailIdx: uniqueIndex('email_idx').on(table.email),
	})
);

export type User = InferModel<typeof users, 'select'>;
export type InsertUser = InferModel<typeof users, 'insert'>;

export const accounts = sqliteTable(
	'accounts',
	{
		userId: text('userId', { length: 255 }).notNull(),
		type: text('type', { length: 255 })
			.$type<AdapterAccount['type']>()
			.notNull(),
		provider: text('provider', { length: 255 }).notNull(),
		providerAccountId: text('providerAccountId', { length: 255 }).notNull(),
		refresh_token: text('refresh_token', { length: 255 }),
		access_token: text('access_token', { length: 255 }),
		expires_at: integer('expires_at', { mode: 'timestamp_ms' }),
		token_type: text('token_type', { length: 255 }),
		scope: text('scope', { length: 255 }),
		id_token: text('id_token', { length: 255 }),
		session_state: text('session_state', { length: 255 }),
	},
	(account) => ({
		compoundKey: primaryKey(account.provider, account.providerAccountId),
	})
);

export const sessions = sqliteTable('sessions', {
	sessionToken: text('sessionToken', { length: 255 }).notNull().primaryKey(),
	userId: text('userId', { length: 255 }).notNull(),
	expires: integer('expires', { mode: 'timestamp_ms' }).notNull(),
});

export const verificationTokens = sqliteTable(
	'verificationToken',
	{
		identifier: text('identifier', { length: 255 }).notNull(),
		userId: text('userId', { length: 255 }),
		token: text('token', { length: 255 }).notNull(),
		expires: integer('expires', { mode: 'timestamp_ms' }).notNull(),
	},
	(vt) => ({
		compoundKey: primaryKey(vt.identifier, vt.token),
	})
);
