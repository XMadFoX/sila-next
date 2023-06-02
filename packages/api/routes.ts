import { z } from 'zod';
import { initTRPC } from '@trpc/server';
import { t } from './trpc-server';

export const routes = {
	hello: t.procedure.input(z.string().optional()).query(async (req) => {
		return req.input || 'world!';
	}),
};
