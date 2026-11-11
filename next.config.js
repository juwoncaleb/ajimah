/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    domains: ['ik.imagekit.io', 'images.ctfassets.net'],
  },
};

module.exports = nextConfig;