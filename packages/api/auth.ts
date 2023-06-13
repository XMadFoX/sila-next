import { eq } from 'drizzle-orm';
import { authenticator } from 'otplib';
import { db, users } from './schema';

import { createTRPCRouter, protectedProcedure } from './trpc-server';

export const authRoutes = createTRPCRouter({
	generateTotp: protectedProcedure.mutation(async (req) => {
		if (req.ctx.session.user.totpEnabled)
			throw new Error('TOTP already enabled');
		const secret = authenticator.generateSecret();
		const otpAuthUri = authenticator.keyuri(
			req.ctx.session.user.email,
			'Сила Взаимопомощи',
			secret
		);
		await db
			.update(users)
			.set({
				totpSecret: secret,
			})
			.where(eq(users.id, req.ctx.session.user.id))
			.run();
		return otpAuthUri;
	}),
});
