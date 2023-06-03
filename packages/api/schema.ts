import { drizzle } from 'drizzle-orm/planetscale-serverless';
import { connect } from '@planetscale/database';
import { migrate } from 'drizzle-orm/mysql2/migrator';

const connection = connect({
	url: process.env.DB_URL,
});

export const db = drizzle(connection);

await migrate(db, { migrationsFolder: 'drizzle' });
