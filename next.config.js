const nextConfig = {
	reactStrictMode: false,
	async redirects() {
		return [
			{
				source: '/',
				destination: '/home',
				permanent: true
			}
		];
	}
}

module.exports = nextConfig
