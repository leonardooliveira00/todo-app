import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
        destination: `${process.env.REMOTE_API_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
