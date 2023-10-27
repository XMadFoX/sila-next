import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { TRPCError } from 'trpc';
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { ShortUser, findOne } from './user';
import { IronSession, getIronSession } from 'iron-session';
import { envCore } from './env.mjs';
import { User } from './db/schema';
import { NextApiRequest } from 'next';

type UserSession = { user: ShortUser };
export type Session = IronSession<UserSession>;

export const createTRPCContext = async (opts: CreateNextContextOptions) => {
	const session = await getIronSession<UserSession>(opts.req, opts.res, {
		cookieName: 'auth',
		password: envCore.ESECRET,
	});

	return { session, user: undefined, req: opts.req } as {
		session: typeof session;
		user: User | undefined;
		req: NextApiRequest;
	};
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
		ctx: {
			session: ctx.session,
			user,
			req: ctx.req,
		},
	});
});

export const createTRPCRouter = t.router;
export const middleware = t.middleware;
export const router = t.router;

export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
// export const protectedNoTOTPProcedure = t.procedure.use(a => isAuthed(...a));
