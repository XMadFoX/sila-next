import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import dotenv from 'dotenv';
import { envCore as env } from './env.mjs';
dotenv.config({ path: '.env.local' });

console.log('DB_URL', env.DB_URL.slice(0, 15) + '...');
const connection = createClient({
	url: env.DB_URL,
	authToken: env.DB_AUTH_TOKEN,
});

import * as events from './schema/events.schema';
import * as baseContent from './schema/contentBase.schema';
import * as users from './schema/user.schema';
export const db = drizzle(connection, {
	schema: {
		...events,
		...baseContent,
		...users,
	},
});

// reexport all schemas
export * from './schema/user.schema';
export * from './schema/events.schema';
export * from './schema/contentBase.schema';
