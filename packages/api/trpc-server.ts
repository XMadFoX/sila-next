import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { TRPCError } from 'trpc';
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { ShortUser, findOne } from './user';
import { getIronSession } from 'iron-session';
import { envCore } from './env.mjs';

export const createTRPCContext = async (opts: CreateNextContextOptions) => {
	const session = await getIronSession<{
		user: ShortUser;
	}>(opts.req, opts.res, {
		cookieName: 'auth',
		password: envCore.ESECRET,
	});

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
	if (user.totpEnabled) {
		if (!ctx.session?.user?.totp) {
			throw new TRPCError(403, {
				message: 'TOTP_REQUIRED',
			});
		}
		if (user.totp !== ctx.session.user.totp) {
			throw new TRPCError(403, {
				message: 'TOTP_INVALID',
			});
		}
	}
	return next({
		ctx,
	});
});

export const createTRPCRouter = t.router;
export const middleware = t.middleware;
export const router = t.router;

export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
