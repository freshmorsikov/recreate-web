const title = "ReCreate - Recreate photos you love";
const appName = "ReCreate";
const description =
  "ReCreate is a photo inspiration and camera app that helps you match the pose, angle, framing, and composition of photos you love.";
const googlePlayUrl =
  "https://play.google.com/store/apps/details?id=com.recreate.photo&utm_source=website";
const logoPath = "/assets/recreate-logo.webp";
const faviconPath = "/favicon.ico";
const faviconPngPath = "/favicon-96x96.png";
const appleTouchIconPath = "/apple-touch-icon.png";
const googleSiteVerification =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() || undefined;

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

const screenshotPaths = [
  "/assets/recreate-step-1.jpg",
  "/assets/recreate-step-2.jpg",
  "/assets/recreate-step-3.jpg",
  "/assets/recreate-step-4.jpg",
];

const mobileApplicationStructuredData = {
  "@context": "https://schema.org",
  "@type": ["SoftwareApplication", "MobileApplication"],
  name: appName,
  description,
  url: siteUrl,
  operatingSystem: "Android",
  applicationCategory: "MultimediaApplication",
  applicationSubCategory: "Photo app",
  image: withSiteUrl(logoPath),
  screenshot: screenshotPaths.map(withSiteUrl),
  installUrl: googlePlayUrl,
  downloadUrl: googlePlayUrl,
  sameAs: [googlePlayUrl],
  publisher: {
    "@type": "Organization",
    name: appName,
    url: siteUrl,
    logo: withSiteUrl(logoPath),
  },
  offers: {
    "@type": "Offer",
    price: 0,
    priceCurrency: "USD",
    url: googlePlayUrl,
    availability: "https://schema.org/InStock",
  },
};

export const site = {
  appName,
  title,
  description,
  googlePlayUrl,
  basePath,
  siteUrl,
  googleSiteVerification,
  logoPath,
  faviconPath,
  faviconPngPath,
  appleTouchIconPath,
  screenshotPaths,
  mobileApplicationStructuredData,
  withBasePath,
  withSiteUrl,
};
