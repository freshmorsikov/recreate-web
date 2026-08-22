import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

const title = "ReCreate - Recreate photos you love";
const description =
  "ReCreate is a photo inspiration and camera app that helps you match the pose, angle, framing, and composition of photos you love.";

function getMetadataBase(headersList: Headers) {
  const host = headersList.get("x-forwarded-host") ?? headersList.get("host");
  const protocol =
    headersList.get("x-forwarded-proto") ??
    (host?.startsWith("localhost") ? "http" : "https");

  return new URL(`${protocol}://${host ?? "localhost:3000"}`);
}

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const metadataBase = getMetadataBase(headersList);
  const imageUrl = new URL("/og.png", metadataBase).toString();

  return {
    title,
    description,
    metadataBase,
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    openGraph: {
      title,
      description:
        "Browse curated photo ideas, choose a reference, and use it as a transparent camera overlay.",
      type: "website",
      images: [
        {
          url: imageUrl,
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
      images: [imageUrl],
    },
  };
}

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
