import { appRouter, createTRPCContext } from '@sila/api';
import { TRPCError } from '@trpc/server';
import { createNextApiHandler } from '@trpc/server/adapters/next';
import { Ratelimit } from '@upstash/ratelimit';
import ratelimit from '@sila/api/ratelimit';
import { NextApiRequest, NextApiResponse } from 'next';

const nextApiHandler = createNextApiHandler({
	router: appRouter,
	createContext: createTRPCContext,
});

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const regex =
		/^https:\/\/sila-next-([A-z0-9]{9}|web-git-[A-z]{1,})-xmadfox\.vercel\.app$/;
	const origin = req.headers.origin;
	if (origin && regex.test(origin)) {
		const match = origin.match(regex);
		if (match) res.setHeader('Access-Control-Allow-Origin', match[0]);
	}
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
	res.setHeader('Access-Control-Allow-Headers', 'content-type, user-agent');
	res.setHeader('Referrer-Policy', 'no-referrer');
	res.setHeader('Access-Control-Allow-Credentials', 'true');

	if (req.method === 'OPTIONS') {
		res.writeHead(200);
		return res.end();
	}

	const id = (req.headers['x-real-ip'] as string) || 'api';
	const rate = await ratelimit(Ratelimit.fixedWindow(20, '15s')).limit(id);
	console.log(id, rate);
	if (!rate.success)
		throw new TRPCError({
			code: 'TOO_MANY_REQUESTS',
		});

	return nextApiHandler(req, res);
}
