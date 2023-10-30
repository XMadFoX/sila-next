import { Config } from 'drizzle-kit';
import { envCore as env } from '@sila/env';

export default {
	schema: './db/schema.ts',
	driver: 'turso',
	dbCredentials: {
		url: env.DB_URL,
		authToken: env.DB_AUTH_TOKEN,
	},
	out: './drizzle',
	breakpoints: true,
} satisfies Config;
