import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // domain ảnh Cloudinary
        pathname: "/**",
      },
    ],
    unoptimized: false,
  },
};

export default nextConfig;
