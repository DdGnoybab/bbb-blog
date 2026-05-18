import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  serverExternalPackages: ['better-sqlite3'],
  transpilePackages: ['nanoid'],
  devIndicators: false,
}

export default nextConfig
