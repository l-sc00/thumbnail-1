import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      // 필요하면 이것도 추가 (가끔 다른 호스트로 나옴)
      {
        protocol: "https",
        hostname: "lh4.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lh5.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lh6.googleusercontent.com",
      },
      // 혹시 ggpht가 뜨면
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "googleusercontent.com",
      },
      // Supabase Storage
      {
        protocol: "https",
        hostname: "oddtslrskqezvmbnpwrl.supabase.co",
      },
    ],
  },
};

export default nextConfig;