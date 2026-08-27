const title = "ReCreate - Recreate photos you love";
const description =
  "ReCreate is a photo inspiration and camera app that helps you match the pose, angle, framing, and composition of photos you love.";

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

function normalizeSiteUrl(value: string) {
  return value.trim().replace(/\/+$/, "");
}

const basePath = normalizeBasePath(
  process.env.NEXT_PUBLIC_BASE_PATH ?? getGitHubPagesBasePath(),
);
const configuredSiteUrl = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL ??
    "https://recreate.freshmorsikov.com",
);
const siteUrl =
  basePath && !configuredSiteUrl.endsWith(basePath)
    ? `${configuredSiteUrl}${basePath}`
    : configuredSiteUrl;

function withBasePath(path: string) {
  return `${basePath}${path}`;
}

function withSiteUrl(path: string) {
  return `${siteUrl}${path}`;
}

export const site = {
  title,
  description,
  basePath,
  siteUrl,
  logoPath: "/assets/recreate-logo.webp",
  withBasePath,
  withSiteUrl,
};
