import { TRPCError } from '@trpc/server';
import { envCore } from './env.mjs';
import { Algorithm, Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = new Redis({
	url: envCore.UPSTASH_REDIS_URL,
	token: envCore.UPSTASH_REDIS_TOKEN,
});

const ratelimit = (alg: Algorithm<any>) =>
	new Ratelimit({
		redis: redis,
		limiter: alg,
		prefix: 'ratelimit',
	});

const throwTooMantRequests = async (id: string, alg: Algorithm<any>) => {
	const { success } = await ratelimit(alg).limit(id);
	if (!success) {
		throw new TRPCError({
			code: 'TOO_MANY_REQUESTS',
		});
	}
};

export { ratelimit };
export default throwTooMantRequests;
