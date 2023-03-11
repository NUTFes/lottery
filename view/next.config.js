/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SSR_API_URI: process.env.SSR_API_URI,
    CSR_API_URI: process.env.CSR_API_URI,
  }
}

module.exports = nextConfig
