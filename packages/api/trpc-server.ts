import { initTRPC } from '@trpc/server';
import { routes } from './routes';

const t = initTRPC.create();
export { t };

// this is our RPC API
export const appRouter = t.router({
	...routes,
});

export type AppRouter = typeof appRouter;
