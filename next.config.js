/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    IFRAMEGAMESERVER: process.env.NODE_ENV === 'production' ? 'https://iframegame.geef.cc' : 'http://192.168.0.135:3000'
  },
  reactStrictMode: false,
  transpilePackages: ['three'],
  webpack: function (config, options) {
    config.experiments = { asyncWebAssembly: true, syncWebAssembly: true, layers: true };
    return config;
  }
};

module.exports = nextConfig;
