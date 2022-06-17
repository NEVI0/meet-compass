const nextConfig = {
	reactStrictMode: false,
	pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
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
