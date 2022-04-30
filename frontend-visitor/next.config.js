/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
module.exports = {
  async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://findmyhobby.herokuapp.com/:path*',
        },
      ]
    },
}
