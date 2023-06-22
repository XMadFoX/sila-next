import { Config } from 'drizzle-kit';
import dotenv from 'dotenv';
dotenv.config(
	process.env.NODE_ENV === 'production' ? undefined : { path: '.env.local' }
);

export default {
	schema: './schema.ts',
	driver: 'turso',
	dbCredentials: {
		url: process.env.DB_URL as string,
		authToken: process.env.DB_AUTH_TOKEN as string,
	},
	out: './drizzle',
	breakpoints: true,
} satisfies Config;
