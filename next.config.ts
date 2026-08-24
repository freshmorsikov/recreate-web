import type { NextConfig } from "next";

function normalizeBasePath(value: string | undefined) {
  const normalized = value?.trim().replace(/\/+$/, "") ?? "";
  if (!normalized || normalized === "/") return "";
  return normalized.startsWith("/") ? normalized : `/${normalized}`;
}

function getGitHubPagesBasePath() {
  if (process.env.GITHUB_PAGES !== "true") return "";

  const [owner, repo] = process.env.GITHUB_REPOSITORY?.split("/") ?? [];
  if (!owner || !repo) return "";

  return repo.toLowerCase() === `${owner.toLowerCase()}.github.io`
    ? ""
    : `/${repo}`;
}

const basePath = normalizeBasePath(
  process.env.NEXT_PUBLIC_BASE_PATH ?? getGitHubPagesBasePath(),
);

const nextConfig: NextConfig = {
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true,
  },
  output: "export",
  trailingSlash: true,
};

export default nextConfig;
