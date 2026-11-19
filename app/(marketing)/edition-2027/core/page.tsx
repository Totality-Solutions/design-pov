export const dynamic = "force-dynamic";

import { Suspense } from "react";
import CTAStrip from "@/components/common/CTAStrip";
import { CoreShowcase } from "@/components/edition26/core/CoreShowcase";
import CoreForm from "@/components/edition26/core/CoreForm";
import { createServerClient } from "@/lib/supabase/server";
import { normalizeStudio } from "@/lib/studios";
import { getPageContent } from "@/lib/pageContentServer";
import JsonLd from "@/components/seo/JsonLd";
import { absoluteUrl, DEFAULT_SHARE_IMAGE, NEXT_EDITION, pageMetadata, SITE_URL } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "The Core 2027 — Design POV 2027, Mumbai",
  description:
    "Design POV 2027 runs 2–4 May 2027 at Jio World Convention Centre, Mumbai. Meet The Core 2027 architecture and design studios, or apply to be part of The Core.",
  path: "/edition-2027/core",
  keywords: [
    "Design POV 2027", "Design POV dates", "Design POV May 2027", "The Core Design POV", "apply Design POV",
    "architecture studios exhibition Mumbai", "design show Mumbai 2027", "Jio World Convention Centre May 2027",
  ],
});

// The next edition as a schema.org Event — dates, venue and organiser for search results and AI answers.
const EVENT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: NEXT_EDITION.name,
  description:
    "Design POV 2027: a curated design show bringing together architects, interior designers, brands and artists through The Core spatial showcase, brand pavilions, installations and The Circle conversations.",
  startDate: NEXT_EDITION.startDate,
  endDate: NEXT_EDITION.endDate,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: NEXT_EDITION.venueName,
    address: {
      "@type": "PostalAddress",
      addressLocality: NEXT_EDITION.city,
      addressRegion: NEXT_EDITION.region,
      addressCountry: NEXT_EDITION.country,
    },
  },
  image: [DEFAULT_SHARE_IMAGE],
  url: absoluteUrl(NEXT_EDITION.url),
  organizer: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "Design POV", url: SITE_URL },
};

async function getStudios() {
  try {
    const { data } = await createServerClient()
      .from("studios")
      .select("*")
      .eq("active", true)
      .eq("edition", 2027)
      .order("sort_order", { ascending: true });
    return (data ?? []).map(normalizeStudio);
  } catch (err) {
    console.error("[CorePage2027] Failed to fetch studios:", err);
    return [];
  }
}

export default async function CorePage2027() {
  const [studios] = await Promise.all([getStudios(), getPageContent("edition")]);

  return (
    <main>
      <JsonLd data={EVENT_SCHEMA} />
      <Suspense>
        <CoreShowcase studios={studios} />
      </Suspense>
      <CoreForm/>
      {/* {coreCta.enabled && (
        <div className="w-full z-10 bg-white">
          <CTAStrip
            title={coreCta.title}
            ctaLabel={coreCta.ctaLabel}
            ctaHref={coreCta.ctaHref}
            hoverBgColor="#000000"
            textColor='var(--primary-red)'
            hoverTextColor='var(--color-white)'
          />
        </div>
      )} */}
    </main>
  );
}