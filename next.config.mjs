/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ghostwhite-goldfinch-864066.hostingersite.com',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
