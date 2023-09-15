import { envCore } from '@sila/api/env.mjs';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = new Redis({
	url: envCore.UPSTASH_REDIS_URL,
	token: envCore.UPSTASH_REDIS_TOKEN,
});

const ratelimit = new Ratelimit({
	redis: redis,
	limiter: Ratelimit.fixedWindow(5, '5 s'),
});

export default ratelimit;
