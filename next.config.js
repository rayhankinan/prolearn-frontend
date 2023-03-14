/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  publicRuntimeConfig: {
    apiURL: process.env.API_HOSTNAME || "http://localhost/api",
  },
};

module.exports = nextConfig;
