import { eq } from 'drizzle-orm';
import { authenticator } from 'otplib';
import { z } from 'zod';
import { db, users } from '../db/schema';
import crypto from 'crypto';

import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from '../trpc-server';
import { decrypt, encrypt } from './encryption';
import { findOne } from '../user';
import ErrorMessages from '../ErrorMessages';

export const totpRoutes = createTRPCRouter({
	generateTotp: protectedProcedure.query(async ({ ctx }) => {
		if (ctx.user.totpEnabled && ctx.user.totpSecret)
			throw new Error(ErrorMessages.auth.totp.alreadyEnabled);
		const secret = authenticator.generateSecret();
		const otpAuthUri = authenticator.keyuri(
			ctx.session.user.email,
			'Сила Взаимопомощи',
			secret
		);
		await db
			.update(users)
			.set({
				totpSecret: encrypt(secret),
			})
			.where(eq(users.id, ctx.session.user.id))
			.run();
		return otpAuthUri;
	}),
	linkTotp: protectedProcedure
		.input(z.string().length(6).regex(/^\d+$/))
		.mutation(async ({ ctx, input }) => {
			if (ctx.user.totpEnabled)
				throw new Error(ErrorMessages.auth.totp.alreadyEnabled);
			if (!ctx.user.totpSecret)
				throw new Error(ErrorMessages.auth.totp.notGeneratedYet);
			const decodedSecret = decrypt(ctx.user.totpSecret);
			const isValid = authenticator.check(input, decodedSecret);
			if (!isValid) throw new Error(ErrorMessages.auth.totp.invalidCode);
			const random = crypto.randomBytes(10).toString('hex');
			await db
				.update(users)
				.set({
					totpEnabled: new Date(),
					totp: random,
				})
				.where(eq(users.id, ctx.session.user.id))
				.run();
			ctx.session.user.totpEnabled = new Date();
			ctx.session.user.totp = random;
			await ctx.session.save();
			return;
		}),
	verifyTotp: publicProcedure
		.input(z.string().length(6).regex(/^\d+$/))
		.mutation(async ({ ctx, input }) => {
			const user = await findOne(ctx.session.user.email);
			if (!user) throw new Error();
			if (!user.totpSecret)
				throw new Error(ErrorMessages.auth.totp.notGeneratedYet);
			const decodedSecret = decrypt(user.totpSecret);
			const isValid = authenticator.check(input, decodedSecret);
			if (!isValid) throw new Error(ErrorMessages.auth.totp.invalidCode);
			ctx.session.user.totp = user.totp;
			await ctx.session.save();
			return true;
		}),
	unlinkTotp: protectedProcedure
		.input(z.string().length(6))
		.mutation(async ({ ctx, input }) => {
			if (!ctx.user.totpEnabled)
				throw new Error(ErrorMessages.auth.totp.notEnabled);
			if (!ctx.user.totpSecret)
				throw new Error(ErrorMessages.auth.totp.notGeneratedYet);
			const decodedSecret = decrypt(ctx.user.totpSecret);
			const isValid = authenticator.check(input, decodedSecret);
			if (!isValid) throw new Error(ErrorMessages.auth.totp.invalidCode);
			await db
				.update(users)
				.set({
					totpEnabled: null,
					totp: null,
					totpSecret: null,
				})
				.where(eq(users.id, ctx.session.user.id))
				.run();
			ctx.session.user.totpEnabled = null;
			ctx.session.user.totp = null;
			await ctx.session.save();
			return;
		}),
});
