import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  // Enable source maps for debugging
  productionBrowserSourceMaps: true,

  // Enable detailed logging for debugging
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  experimental: {
    turbopackFileSystemCacheForDev: true,

    // Enable instrumentation for debugging
    instrumentationHook: true,

    // Enable better debugging experience
    serverComponentsExternalPackages: [],

    // Enable source maps in development
    webpackBuildWorker: true,
  },

  // Enable CORS for debugging if needed
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
