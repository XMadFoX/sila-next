import { drizzle } from 'drizzle-orm/planetscale-serverless';
import { connect } from '@planetscale/database';
import { migrate as dMigrate } from 'drizzle-orm/mysql2/migrator';

const connection = connect({
	url: process.env.DB_URL,
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
