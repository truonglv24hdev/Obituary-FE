import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["images.unsplash.com","img.clerk.com", "localhost", "api.mapbox.com", "obituary-be-production.up.railway.app"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cvpwwkhb01.ufs.sh',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;