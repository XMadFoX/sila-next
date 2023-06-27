import { verifyEmail } from '@sila/api/auth';

export async function GET(request: Request, { params }) {
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
