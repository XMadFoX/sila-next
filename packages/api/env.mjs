// @ts-check

import { createEnv } from '@t3-oss/env-nextjs';
import { createEnv as createCoreEnv } from '@t3-oss/env-core';
import { z } from 'zod';

import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const serverVariables = {
	DB_URL: z.string().url(),
	DB_AUTH_TOKEN: z.string().min(1),
	NODE_ENV: z.string().min(1).optional(),
	SMTP_URL: z.string().url(),
	SMTP_FROM: z.string().email().optional(),
	ESECRET: z.string().min(1),
};

export const env = createEnv({
	server: serverVariables,
	shared: {
		VERCEL_URL: z.string().url().optional(),
	},
	client: {
		NEXT_PUBLIC_TRPC_ENDPOINT: z.string().url(),
	},
	// For Next.js >= 13.4.4, you only need to destructure client variables:
	experimental__runtimeEnv: {
		NEXT_PUBLIC_TRPC_ENDPOINT: process.env.NEXT_PUBLIC_TRPC_ENDPOINT,
		VERCEL_URL: process.env.VERCEL_URL,
	},
});

export const envCore = createCoreEnv({
	server: serverVariables,
	runtimeEnv: process.env,
});
