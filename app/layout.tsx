import type { Metadata } from "next";
import { site } from "./site";
import "./globals.css";

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  metadataBase: new URL(`${site.siteUrl}/`),
  icons: {
    icon: [{ url: site.withBasePath(site.logoPath), type: "image/webp" }],
    shortcut: [{ url: site.withBasePath(site.logoPath), type: "image/webp" }],
  },
  openGraph: {
    title: site.title,
    description:
      "Browse curated photo ideas, choose a reference, and use it as a transparent camera overlay.",
    type: "website",
    images: [
      {
        url: site.withSiteUrl("/og.png"),
        width: 1200,
        height: 630,
        alt: "ReCreate app camera overlay preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description:
      "Photo inspiration and a transparent camera overlay for easier recreations.",
    images: [site.withSiteUrl("/og.png")],
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
