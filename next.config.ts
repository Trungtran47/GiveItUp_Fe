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
    ],
    unoptimized: false,
  },
};

export default nextConfig;
