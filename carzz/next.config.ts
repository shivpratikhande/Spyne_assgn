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

// next.config.js

module.exports = {
  images: {
    domains: ['res.cloudinary.com'], // Add Cloudinary domain here
  },
}
module.exports = {
  images: {
    domains: ['imgd.aeplcdn.com'], // Add Cloudinary domain here
  },
}
