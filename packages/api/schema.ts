// import { drizzle } from 'drizzle-orm/libsql';
// import { createClient } from '@libsql/client';
import { drizzle, BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';

const sqlite = new Database('sqlite.db');
export const db: BetterSQLite3Database = drizzle(sqlite);
/* const connection = createClient({
	url: process.env.DB_URL as string,
	authToken: process.env.DB_AUTH_TOKEN as string,
}); */
// export const db = drizzle(connection);

// reexport all schemas
export * from './schema/user.schema';
