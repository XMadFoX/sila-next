import { env, envCore } from '@sila/env';
import { TRPCError } from '@trpc/server';

const error = new TRPCError({
	code: 'BAD_REQUEST',
	message: 'captcha.invalid',
});

export default async function captcha(captchaToken: string) {
	if (env.NODE_ENV === 'development' && env.NEXT_PUBLIC_OFFLINE) {
		await mock(captchaToken);
		return;
	}
	const turnstileResponse = await (
		await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Response-Type': 'json',
			},
			body: JSON.stringify({
				secret: envCore.TURNSTILE_SECRET_KEY,
				response: captchaToken,
			}),
		})
	).json();
	if (!turnstileResponse.success) throw error;
}

async function mock(token: string) {
	await new Promise((resolve) => setTimeout(resolve, 100));
	if (token === 'invalid') throw error;
	return;
}
