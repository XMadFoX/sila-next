import { z } from 'zod';
import { initTRPC } from '@trpc/server';

const t = initTRPC.create();
export const routes = {
	hello: t.procedure.input(z.string().optional()).query(async (req) => {
		return req.input || 'world!';
	}),
};
