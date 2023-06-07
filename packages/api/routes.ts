import { z } from 'zod';
import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from './trpc-server';

export const routes = createTRPCRouter({
	hello: publicProcedure.input(z.string().optional()).query(async (req) => {
		return req.input || 'world!';
	}),
	helloMe: protectedProcedure.query(async (req) => {
		return req.ctx.session.user.name;
	}),
});
