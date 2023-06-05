import { drizzle } from 'drizzle-orm/libsql';
import { migrate as dMigrate } from 'drizzle-orm/mysql2/migrator';
import { createClient } from '@libsql/client';

const connection = createClient({
	url: process.env.DB_URL as string,
	authToken: process.env.DB_AUTH_TOKEN as string,
});
export const db = drizzle(connection);

// reexport all schemas
export * from './schema/user.schema';

async function migrate() {
	await dMigrate(db, { migrationsFolder: 'drizzle' });
}
migrate()
	.then(() => console.log('migration complete'))
	.catch(console.error);
