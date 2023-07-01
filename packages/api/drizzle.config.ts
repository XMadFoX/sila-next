import { Config } from 'drizzle-kit';
import { envCore as env } from './env.mjs';

export default {
	schema: './schema.ts',
	driver: 'turso',
	dbCredentials: {
		url: env.DB_URL,
		authToken: env.DB_AUTH_TOKEN,
	},
	out: './drizzle',
	breakpoints: true,
} satisfies Config;
