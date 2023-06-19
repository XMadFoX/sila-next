import { migrate as dMigrate } from 'drizzle-orm/better-sqlite3/migrator';
import Database from 'better-sqlite3';
import { db } from './schema';

async function migrate() {
	await dMigrate(db, { migrationsFolder: 'drizzle' });
}
migrate()
	.then(() => console.log('migration complete'))
	.catch(console.error);
