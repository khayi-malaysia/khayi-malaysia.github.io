import type { NextConfig } from "next";

// Empty for a root site (e.g. khayi.github.io); "/repo" for username.github.io/repo.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  // /islands/redang/ -> islands/redang/index.html, which GitHub Pages serves directly.
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
