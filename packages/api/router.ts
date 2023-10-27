import { totpRoutes } from './auth/totp';
import { eventRoutes } from './ads/events';
import { createTRPCRouter } from './trpc-server';
import { authRoutes } from './auth/authRoutes';
import { adminUserRoutes } from './admin/users';
import { adminRolesRoutes } from './admin/roles';
import { projectRoutes } from './auth/projects';

export const appRouter = createTRPCRouter({
	auth: authRoutes,
	users: adminUserRoutes,
	roles: adminRolesRoutes,
	totp: totpRoutes,
	events: eventRoutes,
	projects: projectRoutes,
});

export type AppRouter = typeof appRouter;
