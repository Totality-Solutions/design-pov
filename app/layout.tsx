import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { Montserrat } from 'next/font/google';
import PageLoader from "@/components/common/PageLoader";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import JsonLd from "@/components/seo/JsonLd";
import { ALTERNATE_NAMES, DEFAULT_SHARE_IMAGE, FOUNDERS, HOME_TITLE, PARENT_ORGANIZATION, SEARCH_KEYWORDS, WHATSAPP, LOGO_URL, SITE_DESCRIPTION, SITE_NAME, SITE_URL, SOCIAL_PROFILES } from "@/lib/seo";

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-family',
});

// Site-wide defaults; each page adds its own title, description and canonical
// URL via pageMetadata() in lib/seo.ts.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: HOME_TITLE,
    template: "%s | Design POV",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: ["Design POV", ...ALTERNATE_NAMES, ...SEARCH_KEYWORDS, "The Core", "Jio World Convention Centre", "design magazine India"],
  // No canonical here: it would be inherited by every page. Each page sets its own (pageMetadata).
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: HOME_TITLE,
    description: SITE_DESCRIPTION,
    images: [{ url: DEFAULT_SHARE_IMAGE, alt: "Design POV" }],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_SHARE_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

// Who Design POV is, on every page — the facts search engines and AI answers cite.
const SITE_SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: ALTERNATE_NAMES,
    url: SITE_URL,
    logo: LOGO_URL,
    description: SITE_DESCRIPTION,
    founder: FOUNDERS.map((name) => ({ "@type": "Person", name })),
    // Design POV is a brand of this company (no separate Business Profile).
    parentOrganization: {
      "@type": "Organization",
      name: PARENT_ORGANIZATION.name,
      alternateName: PARENT_ORGANIZATION.alternateName,
      address: { "@type": "PostalAddress", addressLocality: PARENT_ORGANIZATION.addressLocality, addressCountry: "IN" },
    },
    foundingLocation: { "@type": "Place", name: "Mumbai, India" },
    areaServed: { "@type": "Country", name: "India" },
    knowsAbout: [
      "Design exhibitions", "Trade exhibitions", "Interior and building products", "Luxury design events", "Architecture shows", "Art shows and installations",
      "Interior design", "Luxury home and lifestyle brands", "Collectible design", "Product design", "Design events in India",
    ],
    email: "marketing@designpovindia.com",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: WHATSAPP.e164,
        email: "marketing@designpovindia.com",
        url: WHATSAPP.url,
        description: "WhatsApp and email enquiries: participation, partnerships, media and tickets.",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "501, Janki Centre, Off Veera Desai Rd, Andheri West",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      postalCode: "400053",
      addressCountry: "IN",
    },
    sameAs: SOCIAL_PROFILES,
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    alternateName: ALTERNATE_NAMES,
    url: SITE_URL,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-IN",
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={montserrat.variable} data-scroll-behavior="smooth">
      <body className="grain" suppressHydrationWarning>
        <JsonLd data={SITE_SCHEMA} />
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
        </ErrorBoundary>
        <Analytics />
      </body>
    </html>
  );
}
