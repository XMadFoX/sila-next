import { eq } from 'drizzle-orm';
import { authenticator } from 'otplib';
import { z } from 'zod';
import { db, users } from './schema';
import crypto from 'crypto';

import { createTRPCRouter, protectedProcedure } from './trpc-server';

export const authRoutes = createTRPCRouter({
	generateTotp: protectedProcedure.mutation(async (req) => {
		if (req.ctx.session.user.totpEnabled && req.ctx.session.user.totp)
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
			const random = crypto.randomBytes(10).toString('hex');
			await db
				.update(users)
				.set({
					totpEnabled: new Date(),
					totp: random,
				})
				.where(eq(users.id, req.ctx.session.user.id))
				.run();
		}),
	verifyTotp: protectedProcedure
		.input(z.string().length(6).regex(/^\d+$/))
		.mutation(async (req) => {
			if (!req.ctx.session.user.totpSecret)
				throw new Error('No secret generated yet');
			const isValid = authenticator.check(
				req.input,
				req.ctx.session.user.totpSecret
			);
			if (!isValid) throw new Error('Invalid code');
		}),
	unlinkTotp: protectedProcedure
		.input(z.string().length(6))
		.mutation(async (req) => {
			if (!req.ctx.session.user.totpEnabled)
				throw new Error('TOTP not enabled');
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
					totpEnabled: null,
					totp: null,
					totpSecret: null,
				})
				.where(eq(users.id, req.ctx.session.user.id))
				.run();
		}),
});
