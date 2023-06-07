import { migrate as dMigrate } from 'drizzle-orm/libsql/migrator';
import { db } from './schema';

async function migrate() {
	await dMigrate(db, { migrationsFolder: 'drizzle' });
}
migrate()
	.then(() => console.log('migration complete'))
	.catch(console.error);
