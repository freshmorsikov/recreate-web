import type { Metadata } from "next";
import "./globals.css";

const title = "ReCreate - Recreate photos you love";
const description =
  "ReCreate is a photo inspiration and camera app that helps you match the pose, angle, framing, and composition of photos you love.";
const basePath = normalizeBasePath(
  process.env.NEXT_PUBLIC_BASE_PATH ?? getGitHubPagesBasePath(),
);
const siteUrl = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
);

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

function withBasePath(path: string) {
  return `${basePath}${path}`;
}

function withSiteUrl(path: string) {
  return `${siteUrl}${path}`;
}

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(`${siteUrl}/`),
  icons: {
    icon: withBasePath("/favicon.svg"),
    shortcut: withBasePath("/favicon.svg"),
  },
  openGraph: {
    title,
    description:
      "Browse curated photo ideas, choose a reference, and use it as a transparent camera overlay.",
    type: "website",
    images: [
      {
        url: withSiteUrl("/og.png"),
        width: 1200,
        height: 630,
        alt: "ReCreate app camera overlay preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description:
      "Photo inspiration and a transparent camera overlay for easier recreations.",
    images: [withSiteUrl("/og.png")],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
