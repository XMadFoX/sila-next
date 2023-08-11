import { env as _ } from '@sila/api/env.mjs';

/** @type {import("next").NextConfig} */
const config = {
	reactStrictMode: true,
	// allow images from picsum
	images: {
		remotePatterns: [{ protocol: 'https', hostname: 'picsum.photos' }],
		formats: ['image/avif', 'image/webp'],
	},
	webpack(config) {
		config.experiments = {
			...config.experiments,
			topLevelAwait: true,
		};
		return config;
	},
	transpilePackages: ['ui'],
};

export default config;
