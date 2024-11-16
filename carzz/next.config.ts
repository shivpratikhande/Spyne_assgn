import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

// next.config.js
module.exports = {
  eslint: {
    ignoreDuringBuilds: process.env.NODE_ENV === 'production'
  }
};
