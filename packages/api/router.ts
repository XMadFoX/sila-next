import { routes } from './routes';
import { totpRoutes } from './totp';
import { eventRoutes } from './events';
import { createTRPCRouter } from './trpc-server';
import { authRoutes } from './authRoutes';
import { adminUserRoutes } from './admin/users';
import { adminRolesRoutes } from './admin/roles';

export const appRouter = createTRPCRouter({
	auth: authRoutes,
	users: adminUserRoutes,
	roles: adminRolesRoutes,
	test: routes,
	totp: totpRoutes,
	events: eventRoutes,
});

export type AppRouter = typeof appRouter;
