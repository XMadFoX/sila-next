import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { getServerSession } from 'next-auth/next';
import { TRPCError } from 'trpc';
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { findOne } from './user';
import type { Session } from 'next-auth';
import { User } from './schema';

// overwrite session type for user to be User
export interface SessionFullUser extends Session {
	user: User;
}

export const createTRPCContext = async (opts: FetchCreateContextFnOptions) => {
	const session = await getServerSession();

	return { session };
};

export const t = initTRPC.context<typeof createTRPCContext>().create({
	transformer: superjson,
});

const isAuthed = t.middleware(async ({ next, ctx }) => {
	if (!ctx.session?.user?.email) {
		throw new TRPCError(403, {
			message: 'UNAUTHORIZED',
		});
	}
	const user = await findOne(ctx.session.user.email);
	ctx.session.user = user;
	if (!user?.emailVerified) {
		throw new TRPCError(403, {
			message: 'UNVERIFIED',
		});
	}
	return next({
		ctx: {
			// Infers the `session` as non-nullable
			session: ctx.session as SessionFullUser,
		},
	});
});

export const createTRPCRouter = t.router;
export const middleware = t.middleware;
export const router = t.router;

export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
