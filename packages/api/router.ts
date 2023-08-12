import { routes } from './routes';
import { totpRoutes } from './totp';
import { eventRoutes } from './events';
import { createTRPCRouter } from './trpc-server';
import { authRoutes } from './authRoutes';

export const appRouter = createTRPCRouter({
	auth: authRoutes,
	test: routes,
	totp: totpRoutes,
	events: eventRoutes,
});

export type AppRouter = typeof appRouter;
