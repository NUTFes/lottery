/** @type {import('next').NextConfig} */
const isProd = process.env.NEXT_PUBLIC_APP_ENV === 'production';
 
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env:{
    SSR_API_URI: isProd ? 'https://lottery-api.nutfes.net' : 'http://api:8000',
    CSR_API_URI: isProd ? 'https://lottery-api.nutfes.net/' : 'http://localhost:8000',
  }
}

module.exports = nextConfig
