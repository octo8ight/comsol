/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '5000',
        pathname: '/public/data/uploads/**',
      },
    ],
    // domains: [
    //   'http://127.0.0.1:5000'
    // ],
    formats: [
      'image/avif', 'image/webp'
    ]
  },
}

module.exports = nextConfig
