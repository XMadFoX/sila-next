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
	UPSTASH_REDIS_URL: z.string().url(),
	UPSTASH_REDIS_TOKEN: z.string().min(1),
};

export const env = createEnv({
	server: serverVariables,
	shared: {
		VERCEL_URL: z.string().optional(),
	},
	client: {
		NEXT_PUBLIC_TRPC_PREFIX: z.string().optional(),
	},
	// For Next.js >= 13.4.4, you only need to destructure client variables:
	experimental__runtimeEnv: {
		NEXT_PUBLIC_TRPC_PREFIX: process.env.NEXT_PUBLIC_TRPC_PREFIX ?? '/api/trpc',
		VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL
			? `https://${process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL}`
			: 'http://localhost:3000',
	},
});

export const envCore = createCoreEnv({
	server: serverVariables,
	runtimeEnv: process.env,
});
