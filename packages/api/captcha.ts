import { envCore } from '@sila/env';
import { TRPCError } from '@trpc/server';

export default async function captcha(captchaToken: string) {
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
	if (!turnstileResponse.success)
		throw new TRPCError({ code: 'BAD_REQUEST', message: 'captcha.invalid' });
}
