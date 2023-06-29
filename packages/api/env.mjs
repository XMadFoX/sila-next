// @ts-check

import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

import * as dotenv from 'dotenv';
dotenv.config();

export const env = createEnv({
	server: {
		DB_URL: z.string().url(),
		DB_AUTH_TOKEN: z.string().min(1),
		NODE_ENV: z.string().min(1).optional(),
		NEXTAUTH_SECRET: z.string().min(1),
		NEXTAUTH_URL: z.string().url(),
		SMTP_URL: z.string().url(),
		SMTP_FROM: z.string().email().optional(),
		ESECRET: z.string().min(1),
	},
	client: {
		NEXT_PUBLIC_TRPC_ENDPOINT: z.string().url(),
	},
	// For Next.js >= 13.4.4, you only need to destructure client variables:
	experimental__runtimeEnv: {
		NEXT_PUBLIC_TRPC_ENDPOINT: process.env.NEXT_PUBLIC_TRPC_ENDPOINT,
	},
});
