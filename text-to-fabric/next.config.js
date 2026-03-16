/** @type {import('next').NextConfig} */
const nextConfig = {
  // When served under Showcase1.0 (e.g. GitHub Pages at /Showcase1.0/)
  // Use /showcase for custom domain (haisystems.net). For GitHub Pages project site, use /SystemsIntroWebsite/showcase
  basePath: '/showcase',
  assetPrefix: '/showcase',
  output: 'export',
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    
    // Ensure Three.js is properly externalized
    config.resolve.alias = {
      ...config.resolve.alias,
    };
    
    return config;
  },
  // Disable server-side rendering for pages that use Three.js
  experimental: {
    esmExternals: 'loose',
  },
};

module.exports = nextConfig;

