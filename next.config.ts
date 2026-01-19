import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
  
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wiqxdchkoftclgmielrd.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },

      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/u/**",
      },

      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
        pathname: "/**",
      },

      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      }
    ],
  },
};

export default nextConfig;
