const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = () => {
  return {
    eslint: {
      ignoreDuringBuilds: true,
    },
    reactStrictMode: true,
    trailingSlash: true,
  }
};
