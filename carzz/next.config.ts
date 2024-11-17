// next.config.js

module.exports = {
  eslint: {
    // Ignore ESLint during production builds
    ignoreDuringBuilds: process.env.NODE_ENV === 'production',
  },
  images: {
    // Allow images from Cloudinary and imgd.aeplcdn.com
    domains: ['res.cloudinary.com', 'imgd.aeplcdn.com'],
  },
};
