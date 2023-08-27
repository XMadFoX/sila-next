import { env as _ } from '@sila/api/env.mjs';

/** @type {import("next").NextConfig} */
const config = {
	reactStrictMode: true,
	// allow images from picsum
	images: {
		dangerouslyAllowSVG: true,
		remotePatterns: [
			{ protocol: 'https', hostname: 'picsum.photos' },
			{ protocol: 'https', hostname: 'api.dicebear.com' },
		],
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
