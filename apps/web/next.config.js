module.exports = {
	reactStrictMode: true,
	// allow images from picsum
	images: {
		remotePatterns: [{ protocol: 'https', hostname: 'picsum.photos' }],
	},
	transpilePackages: ['ui'],
};
