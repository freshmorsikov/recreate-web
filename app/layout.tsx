import type { Metadata } from "next";
import { site } from "./site";
import "./globals.css";

const applicationJsonLd = JSON.stringify(site.mobileApplicationStructuredData);

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  keywords: [
    "camera overlay app",
    "photo pose overlay app",
    "recreate photo app",
    "photo composition reference app",
    "couple photo pose ideas",
    "travel photo pose ideas",
    "vacation photo ideas",
    "at home photo ideas",
    "traveling photo ideas",
    "mood photo ideas",
  ],
  metadataBase: new URL(`${site.siteUrl}/`),
  alternates: {
    canonical: site.siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: site.googleSiteVerification
    ? {
        google: site.googleSiteVerification,
      }
    : undefined,
  icons: {
    icon: [{ url: site.withBasePath(site.logoPath), type: "image/webp" }],
    shortcut: site.withBasePath(site.logoPath),
  },
  openGraph: {
    title: site.title,
    description:
      "Browse curated photo ideas, choose a reference, and use it as a transparent camera overlay.",
    url: site.siteUrl,
    siteName: "ReCreate",
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
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: applicationJsonLd }}
        />
        {children}
      </body>
    </html>
  );
}
