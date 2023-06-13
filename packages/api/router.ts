import { routes } from './routes';
import { authRoutes } from './auth';
import { createTRPCRouter } from './trpc-server';

export const appRouter = createTRPCRouter({
	test: routes,
	auth: authRoutes,
});

export type AppRouter = typeof appRouter;
