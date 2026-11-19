import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// /robots.txt — every crawler, including AI search and answer engines, may read
// the public site; the CMS and API stay out.
export default function robots(): MetadataRoute.Robots {
  const disallow = ["/cms", "/api/"];
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      // Named explicitly so AI answer engines can cite Design POV (GEO).
      {
        userAgent: ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "PerplexityBot", "Google-Extended", "Applebot-Extended", "Bingbot"],
        allow: "/",
        disallow,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
