import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Montserrat } from 'next/font/google';
import PageLoader from "@/components/common/PageLoader";
import ErrorBoundary from "@/components/common/ErrorBoundary";

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-family',
});

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
    <html lang="en" suppressHydrationWarning className={montserrat.variable} data-scroll-behavior="smooth">
      <body className="grain" suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.__crashLog = [];
            function __imgLog(data) {
              try {
                var q = "?t=" + Date.now() + "&m=" + encodeURIComponent(data.msg || "") + "&s=" + encodeURIComponent((data.stack || "").slice(0,500));
                new Image().src = "/api/log-error" + q;
              } catch(ex) {}
            }
            window.addEventListener("error", function(e) {
              var entry = { msg: e.message, file: e.filename, line: e.lineno, col: e.colno, stack: e.error && e.error.stack };
              window.__crashLog.push(entry);
              __imgLog(entry);
              try { localStorage.setItem("__crashLog", JSON.stringify(window.__crashLog)); } catch(ex) {}
            });
            window.addEventListener("unhandledrejection", function(e) {
              var msg = e.reason && e.reason.message ? e.reason.message : String(e.reason);
              var entry = { msg: "UnhandledRejection: " + msg, stack: e.reason && e.reason.stack };
              window.__crashLog.push(entry);
              __imgLog(entry);
              try { localStorage.setItem("__crashLog", JSON.stringify(window.__crashLog)); } catch(ex) {}
            });
          `
        }} />
        <ErrorBoundary>
          <PageLoader>
            {children}
          </PageLoader>
          <Analytics/>
        </ErrorBoundary>
      </body>
    </html>
  );
}
