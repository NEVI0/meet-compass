const nextConfig = {
	reactStrictMode: true,
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
