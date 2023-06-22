import { migrate as dMigrate } from 'drizzle-orm/libsql/migrator';
import { db } from './schema';

async function migrate() {
	console.log('Running migrations..');
	await dMigrate(db, { migrationsFolder: 'drizzle' });
	console.log('Done.');
	process.exit(0);
}
migrate().catch(console.error);
