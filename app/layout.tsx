import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://designpov.com"),
  title: {
    default: "Design POV — A Platform for Design Beyond Sight",
    template: "%s | Design POV",
  },
  description:
    "Where architects, brands, and builders co-create culture. Design POV is a design publication, a cultural movement, and a living archive.",
  keywords: ["design", "architecture", "interiors", "Mumbai", "design show", "2026"],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://designpov.com",
    siteName: "Design POV",
    images: [{ url: "/og/default.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@designpov",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="grain">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
