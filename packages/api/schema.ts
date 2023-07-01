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
export const db = drizzle(connection);

// reexport all schemas
export * from './schema/user.schema';
