import { z } from 'zod';
import { initTRPC } from '@trpc/server';
import superjson from 'superjson';

const t = initTRPC.create({
	transformer: superjson,
});

export const routes = {
	hello: t.procedure.input(z.string().optional()).query(async (req) => {
		return req.input || 'world!';
	}),
};
