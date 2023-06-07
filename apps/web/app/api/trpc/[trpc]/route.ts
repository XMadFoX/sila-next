import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter, createTRPCContext } from '@sila/api';

// this is the server RPC API handler

const handler = (request: Request) => {
	return fetchRequestHandler({
		endpoint: '/api/trpc',
		req: request,
		router: appRouter,
		createContext: createTRPCContext,
	});
};

export const GET = handler;
export const POST = handler;
