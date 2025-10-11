import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure we're using Pages Router
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
};

export default nextConfig;
