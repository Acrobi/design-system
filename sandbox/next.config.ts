/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@acrobi/design-system'],
  experimental: {
    turbo: {
      loaders: {
        '.svg': ['@svgr/webpack'],
      },
    },
  },
}

module.exports = nextConfig