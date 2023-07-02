import { routes } from './routes';
import { totpRoutes } from './totp';
import { eventRoutes } from './events';
import { createTRPCRouter } from './trpc-server';

export const appRouter = createTRPCRouter({
	test: routes,
	totp: totpRoutes,
	events: eventRoutes,
});

export type AppRouter = typeof appRouter;
