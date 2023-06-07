import { routes } from './routes';
import { createTRPCRouter } from './trpc-server';

export const appRouter = createTRPCRouter({
	test: routes,
});

export type AppRouter = typeof appRouter;
