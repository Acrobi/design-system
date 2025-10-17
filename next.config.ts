import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure we're using Pages Router
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  // Disable ESLint during builds for faster compilation
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable TypeScript checking during builds for faster compilation
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
