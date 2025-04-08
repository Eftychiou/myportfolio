/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ['three'],
  webpack: function (config, options) {
    config.experiments = { asyncWebAssembly: true, syncWebAssembly: true, layers: true };
    return config;
  }
};

module.exports = nextConfig;
