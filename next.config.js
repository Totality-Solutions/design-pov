/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['192.168.1.34'],
  compress: true,
  experimental: {
    // proxy.ts (Routing Middleware) matches /api/cms/:path*, which includes the
    // image upload routes — raise the default 10MB cap to fit the 25MB limit
    // already enforced in app/api/cms/upload/route.ts.
    proxyClientMaxBodySize: "25mb",
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 828, 1080, 1200, 1920],
    imageSizes: [64, 128, 256, 384],
    qualities: [30, 75, 90],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "d1qlyda1dsr5ui.cloudfront.net" },
    ],
  },
};

module.exports = nextConfig;
