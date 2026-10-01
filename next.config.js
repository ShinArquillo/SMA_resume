/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Lets QA builds use their own folder (NEXT_DIST_DIR=.next-qa) so they never
  // collide with a running `npm run dev`, which owns .next.
  distDir: process.env.NEXT_DIST_DIR || '.next',
}

module.exports = nextConfig

