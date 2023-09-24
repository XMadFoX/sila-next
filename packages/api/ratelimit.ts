import { envCore } from '@sila/api/env.mjs';
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

export default ratelimit;
