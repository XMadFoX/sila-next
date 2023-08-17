import { appRouter, createTRPCContext } from '@sila/api';
import { createNextApiHandler } from '@trpc/server/adapters/next';
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

	return nextApiHandler(req, res);
}
