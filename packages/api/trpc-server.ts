import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { getServerSession } from 'next-auth/next';
import { TRPCError } from 'trpc';
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';

export const createTRPCContext = async (opts: FetchCreateContextFnOptions) => {
	const session = await getServerSession();

	return { session };
};

export const t = initTRPC.context<typeof createTRPCContext>().create({
	transformer: superjson,
});

const isAuthed = t.middleware(({ next, ctx }) => {
	if (!ctx.session?.user?.email) {
		throw new TRPCError(403, {
			message: 'UNAUTHORIZED',
		});
	}
	if (!ctx.session?.user?.emailVerified) {
		throw new TRPCError(403, {
			message: 'UNVERIFIED',
		});
	}
	return next({
		ctx: {
			// Infers the `session` as non-nullable
			session: ctx.session,
		},
	});
});

export const createTRPCRouter = t.router;
export const middleware = t.middleware;
export const router = t.router;

export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
