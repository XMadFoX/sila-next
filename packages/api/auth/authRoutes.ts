import { db, users } from '../db/schema';
import { login, register } from './auth';
import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from '../trpc-server';
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import ratelimit from '../ratelimit';
import { Ratelimit } from '@upstash/ratelimit';
import { randomInt } from 'crypto';

export const captchaZod = z.string().min(10);
export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string(),
	captcha: z.string(),
});

export const registerSchema = loginSchema.extend({
	name: z.string().min(3).max(32),
	captcha: z.string(),
});

export const authRoutes = createTRPCRouter({
	session: publicProcedure.query(async ({ ctx }) => {
		await ratelimit(ctx.limitId, Ratelimit.fixedWindow(10, '60 s'));
		const session = ctx.session;
		return session;
	}),
	register: publicProcedure
		.input(registerSchema)
		.mutation(async ({ input, ctx }) => {
			await ratelimit(ctx.limitId, Ratelimit.fixedWindow(10, '60 s'));
			await new Promise((r) => setTimeout(r, randomInt(0, 500)));
			const user = await register(input);
			ctx.session.user = user;
			await ctx.session.save();
			return { totpRequired: user.totpEnabled };
		}),
	login: publicProcedure.input(loginSchema).mutation(async ({ input, ctx }) => {
		await ratelimit(ctx.limitId, Ratelimit.fixedWindow(10, '60 s'));
		// TODO: it locks out the user if someone tries to bruteforce
		// probably should send an email to the user with a message about bruteforce and a login link
		await new Promise((r) => setTimeout(r, randomInt(0, 500)));
		const user = await login(input, ctx.req);
		ctx.session.user = user;
		await ctx.session.save();
		return { totpRequired: user.totpEnabled };
	}),
	logout: publicProcedure.mutation(async ({ ctx }) => {
		await ctx.session.destroy();
		return 'ok';
	}),
	update: protectedProcedure
		.input(z.object({ name: z.string(), email: z.string().email() }))
		.mutation(async ({ input, ctx }) => {
			await ratelimit(ctx.limitId, Ratelimit.fixedWindow(3, '60 m'));
			const user = ctx.user;
			const res = await db
				.update(users)
				.set(input)
				.where(eq(users.id, user.id))
				.run();
			return;
		}),
});
