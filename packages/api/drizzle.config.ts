import { Config } from 'drizzle-kit';
import dotenv from 'dotenv';
import { env } from './env.mjs';
dotenv.config(
	env.NODE_ENV === 'production' ? undefined : { path: '.env.local' }
);

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
