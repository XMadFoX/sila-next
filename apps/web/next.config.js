module.exports = {
	reactStrictMode: true,
	// allow images from picsum
	images: {
		remotePatterns: [{ protocol: 'https', hostname: 'picsum.photos' }],
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
