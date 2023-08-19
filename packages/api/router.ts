import { routes } from './routes';
import { totpRoutes } from './totp';
import { eventRoutes } from './events';
import { createTRPCRouter } from './trpc-server';
import { authRoutes } from './authRoutes';
import { adminUserRoutes } from './admin/users';

export const appRouter = createTRPCRouter({
	auth: authRoutes,
	users: adminUserRoutes,
	test: routes,
	totp: totpRoutes,
	events: eventRoutes,
});

export type AppRouter = typeof appRouter;
