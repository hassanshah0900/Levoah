import type { NextConfig } from "next";
import { NextURL } from "next/dist/server/web/next-url";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: new NextURL(process.env.NEXT_PUBLIC_SUPABASE_URL!).hostname,
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
