import { eq } from 'drizzle-orm';
import { authenticator } from 'otplib';
import { z } from 'zod';
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
	linkTotp: protectedProcedure
		.input(z.string().length(6).regex(/^\d+$/))
		.mutation(async (req) => {
			if (req.ctx.session.user.totpEnabled)
				throw new Error('TOTP already enabled');
			if (!req.ctx.session.user.totpSecret)
				throw new Error('No secret generated yet');
			const isValid = authenticator.check(
				req.input,
				req.ctx.session.user.totpSecret
			);
			if (!isValid) throw new Error('Invalid code');
			await db
				.update(users)
				.set({
					totpEnabled: new Date(),
				})
				.where(eq(users.id, req.ctx.session.user.id))
				.run();
		}),
});
