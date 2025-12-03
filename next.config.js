module.exports = {
  // Next.js 16 Turbopack configuration
  turbopack: {
    // Empty config to use default Turbopack behavior
  },
  // Next.js 16 performance optimizations
  experimental: {
    // Enable optimizing server components (stable in Next.js 16)
    optimizeServerReact: true,
  },
  // Image optimization configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
        pathname: '/**',
      },
    ],
  },
};
