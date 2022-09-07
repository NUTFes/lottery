/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    WS_API_URI: process.env.WS_API_URI,
    SSR_API_URI: process.env.SSR_API_URI,
    CSR_API_URI: process.env.CSR_API_URI,
    ENABLE_BASIC_AUTH: process.env.ENABLE_BASIC_AUTH,
    BASIC_AUTH_USER: process.env.BASIC_AUTH_USER,
    BASIC_AUTH_PASSWORD: process.env.BASIC_AUTH_PASSWORD,
    ST_PASS: process.env.ST_PASS,
    ST_USER: process.env.ST_USER,
  }
}

module.exports = nextConfig
