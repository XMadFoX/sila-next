import { login } from './auth';
import { createTRPCRouter, publicProcedure } from './trpc-server';
import { z } from 'zod';

export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

export const registerSchema = loginSchema.extend({
	name: z.string().min(3).max(32),
});

export const authRoutes = createTRPCRouter({
	session: publicProcedure.query(async ({ ctx }) => {
		const session = ctx.session;
		return session;
	}),
	login: publicProcedure
		.input(
			z.object({
				email: z.string().email(),
				password: z.string(),
			})
		)
		.mutation(async ({ input, ctx }) => {
			const user = await login(input);
			ctx.session.user = user;
			await ctx.session.save();
			return true;
		}),
	logout: publicProcedure.mutation(async ({ ctx }) => {
		// ctx.session.user = undefined;
		await ctx.session.destroy();
		// return createResponse(res, 'Logged out');
		return 'ok';
	}),
});