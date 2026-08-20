/**
 * Static export so the site can be served from GitHub Pages.
 *
 * On Pages the site lives at /<repo>, so NEXT_PUBLIC_BASE_PATH is set by the
 * deploy workflow. Locally it is empty and everything is served from root.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
