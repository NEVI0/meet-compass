const nextConfig = {
	reactStrictMode: false,
	pageExtensions: ['page.tsx', 'page.ts'],
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
