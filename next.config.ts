import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ Build time ESLint check disable
  },
  typescript: {
    ignoreBuildErrors: true, // ✅ TypeScript errors ko ignore karega
  }, reactStrictMode: false,
};

export default nextConfig;
