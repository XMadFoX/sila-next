import type { Config } from 'drizzle-kit';

export default {
	schema: './schema.ts',
	// connectionString: process.env.DB_URL,
	out: './drizzle',
	breakpoints: true,
} as Config;
