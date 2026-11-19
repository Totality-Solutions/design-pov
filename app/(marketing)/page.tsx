import Hero from "@/components/home/Hero";
import WhatPOV from "@/components/home/WhatPOV";
import Theme from "@/components/home/Theme";
import Ecosystem from "@/components/home/Ecosystem";
import FeaturedDesigners from "@/components/home/Featured";
import ClientLogo from "@/components/home/ClientLogo";
import FeaturedStory from "@/components/home/FeaturedStory";
import CTAStrip from "@/components/common/CTAStrip";
import ScrollMaskText from "@/components/home/ScrollRevealText";
import HomeSponsors from "@/components/home/HomeSponsors";
import ShowDeckCTA from "@/components/common/ShowDeckCTA";
import DeferredRender from "@/components/common/DeferredRender";
import { getPageContent } from "@/lib/pageContentServer";
import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { ALTERNATE_NAMES, DEFAULT_SHARE_IMAGE, EDITIONS, HOME_TITLE, NEXT_EDITION, pageMetadata, SEARCH_KEYWORDS, SITE_URL } from "@/lib/seo";

// Search-engine / AI text only — nothing here is shown on the page.
const HOME_DESCRIPTION =
  "Design POV is India's luxury design, architecture and art show at Jio World Convention Centre, Mumbai. Next edition 2–4 May 2027: The Core architecture showcase, luxury brand pavilions, art installations and The Circle talks.";

export const metadata: Metadata = {
  ...pageMetadata({ title: HOME_TITLE, description: HOME_DESCRIPTION, path: "/" }),
  title: { absolute: HOME_TITLE },
  keywords: ["Design POV", ...ALTERNATE_NAMES, "Design POV 2027", ...SEARCH_KEYWORDS, "Jio World Convention Centre design event"],
};

// Design POV as a recurring event: every edition with dates and venue — the
// clearest signal that "Design POV" is an event company, not a design-thinking term.
const venue = {
  "@type": "Place",
  name: NEXT_EDITION.venueName,
  address: { "@type": "PostalAddress", addressLocality: "Mumbai", addressRegion: "Maharashtra", addressCountry: "IN" },
};
const organizer = { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "Design POV", url: SITE_URL };
const EVENT_SERIES_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "EventSeries",
  "@id": `${SITE_URL}/#event-series`,
  name: "Design POV",
  alternateName: ALTERNATE_NAMES,
  description: HOME_DESCRIPTION,
  url: SITE_URL,
  image: [DEFAULT_SHARE_IMAGE],
  location: venue,
  organizer,
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  subEvent: EDITIONS.map((e) => ({
    "@type": "Event",
    name: e.name,
    startDate: e.startDate,
    endDate: e.endDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: venue,
    organizer,
    image: [DEFAULT_SHARE_IMAGE],
    ...(e.status === "upcoming" ? { url: `${SITE_URL}${NEXT_EDITION.url}` } : {}),
  })),
};

// Saving a section in CMS → Home revalidates "/" immediately; this is only
// the fallback refresh interval.
export const revalidate = 3600;

export default async function HomePage() {
  const home = await getPageContent("home");

  return (
    <>
      <JsonLd data={EVENT_SERIES_SCHEMA} />
      {home.hero.enabled && <Hero slides={home.hero.slides} />}
      {home.ctaStrip.enabled && (
        <DeferredRender minHeight="120px">
          <div className="w-full z-10 bg-white border-t border-b border-[#DFDFDF]">
            <CTAStrip
              title={home.ctaStrip.title}
              ctaLabel={home.ctaStrip.ctaLabel}
              ctaHref={home.ctaStrip.ctaHref}
              hoverBgColor="#000000"
              textColor="var(--primary-red)"
              hoverTextColor="var(--color-white)"
            />
          </div>
        </DeferredRender>
      )}
      {home.whatPov.enabled && <WhatPOV paragraphs={home.whatPov.paragraphs} items={home.whatPov.items} />}
      {home.theme.enabled && (
        <DeferredRender minHeight="720px">
          <Theme {...home.theme} />
        </DeferredRender>
      )}
      {home.ecosystem.enabled && (
        <DeferredRender minHeight="620px">
          <Ecosystem heading={home.ecosystem.heading} items={home.ecosystem.items} />
        </DeferredRender>
      )}
      {home.intro.enabled && <ScrollMaskText {...home.intro} />}
      
      {home.coreCollective.enabled && (
        <DeferredRender minHeight="680px">
          <FeaturedDesigners heading={home.coreCollective.heading} tiles={home.coreCollective.tiles} />
        </DeferredRender>
      )}
      {home.partners.enabled && (
        <DeferredRender minHeight="320px">
          <HomeSponsors heading={home.partners.heading} />
        </DeferredRender>
      )}
      {home.magazine.enabled && (
        <DeferredRender minHeight="620px">
          <FeaturedStory heading={home.magazine.heading} />
        </DeferredRender>
      )}
      {/* <DeferredRender minHeight="220px"> */}
        <ShowDeckCTA />
      {/* </DeferredRender> */}
      {home.brands.enabled && (
        <DeferredRender minHeight="180px">
          <ClientLogo headingMain={home.brands.headingMain} headingBold={home.brands.headingBold} />
        </DeferredRender>
      )}
    </>
  );
}
