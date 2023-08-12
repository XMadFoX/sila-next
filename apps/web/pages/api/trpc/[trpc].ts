import { appRouter, createTRPCContext } from '@sila/api';
import { createNextApiHandler } from '@trpc/server/adapters/next';

export default createNextApiHandler({
	router: appRouter,
	createContext: createTRPCContext,
});
