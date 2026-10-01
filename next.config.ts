import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  agentRules: false,
  images: { formats: ["image/avif", "image/webp"] },
};

export default nextConfig;
