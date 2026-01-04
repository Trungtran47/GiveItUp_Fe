import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // domain ảnh Cloudinary
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", // Cho phép ảnh từ Unsplash
        pathname: "/**",
      },
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com', // Thêm cái này để cover hết các subdomain (lh4, lh5...)
        port: '',
        pathname: '/**',
      },
    ],
    unoptimized: false,
  },
};

export default nextConfig;
