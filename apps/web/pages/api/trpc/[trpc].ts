import { appRouter, createTRPCContext } from '@sila/api';
import { createNextApiHandler } from '@trpc/server/adapters/next';
import { NextApiRequest, NextApiResponse } from 'next';

export default createNextApiHandler({
	router: appRouter,
	createContext: createTRPCContext,
});
