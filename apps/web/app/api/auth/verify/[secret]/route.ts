import { verifyEmail } from '@sila/api/auth/auth';
import { Ratelimit } from '@upstash/ratelimit';
import ratelimit from '@sila/api/ratelimit';
import { env, envCore } from '@sila/env';
import { getIronSession } from 'iron-session';
import { UserSession } from '@sila/api';

export async function GET(request: Request, { params }) {
	ratelimit(
		request.headers.get('x-real-ip') || 'api',
		Ratelimit.fixedWindow(3, '10m')
	);
	if (!params?.secret) {
		return new Response('No secret provided', { status: 400 });
	}

	const user = await verifyEmail(params.secret).catch(
		(err) => new Response(err.message, { status: 400 })
	);
	if (user instanceof Response) return user;
	const response = new Response(null, {
		status: 302,
		headers: {
			Location: `${env.VERCEL_URL}/auth/success?type=email_verified`,
		},
	});
	const session = await getIronSession<UserSession>(request, response, {
		cookieName: 'auth',
		password: envCore.ESECRET,
	});
	// might have given fake id on register, but if we verified email, we can confirm it's real user
	session.user.id = user.id;
	await session.save();
	return response;
}
