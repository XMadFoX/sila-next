import { routes } from './routes';
import { totpRoutes } from './totp';
import { createTRPCRouter } from './trpc-server';

export const appRouter = createTRPCRouter({
	test: routes,
	totp: totpRoutes,
});

export type AppRouter = typeof appRouter;
