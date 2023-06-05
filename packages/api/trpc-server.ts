import { initTRPC } from '@trpc/server';
import { routes } from './routes';
import superjson from 'superjson';

export const t = initTRPC.create({
	transformer: superjson,
});

// this is our RPC API
export const appRouter = t.router({
	...routes,
});

export type AppRouter = typeof appRouter;
