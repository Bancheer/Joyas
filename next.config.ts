import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "joyasrodriguez.es",
        pathname: "/cdn/shop/files/**",
      },
    ],
  },
};

export default nextConfig;
