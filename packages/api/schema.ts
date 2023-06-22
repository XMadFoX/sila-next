import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

console.log('DB_URL', process.env.DB_URL);
const connection = createClient({
	url: process.env.DB_URL as string,
	authToken: process.env.DB_AUTH_TOKEN as string,
});
export const db = drizzle(connection);

// reexport all schemas
export * from './schema/user.schema';
