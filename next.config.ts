import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ["twitter-api-v2"],
  webpack: (config) => {
    config.resolve.alias["@"] = path.join(__dirname);
    return config;
  },
  output: 'standalone',
};

export default nextConfig;
