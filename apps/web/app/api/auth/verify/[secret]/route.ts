import { verifyEmail } from '@sila/api/auth/auth';
import { Ratelimit } from '@upstash/ratelimit';
import ratelimit from '@sila/api/ratelimit';

export async function GET(request: Request, { params }) {
	ratelimit(
		request.headers.get('x-real-ip') || 'api',
		Ratelimit.fixedWindow(3, '10m')
	);
	if (!params?.secret) {
		return new Response('No secret provided', { status: 400 });
	}

	return await verifyEmail(params.secret)
		.then(() => {
			return new Response('Email verified');
		})
		.catch((err) => {
			return new Response(err.message, { status: 400 });
		});
}
