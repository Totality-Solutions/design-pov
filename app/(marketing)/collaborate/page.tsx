import React from "react";
import CollaborateSection from "@/components/collaborate/CollaborateSection";
import ParticipationSection from "@/components/collaborate/ParticipationSection";
import ShowDeckCTA from "@/components/common/ShowDeckCTA";
import { getCollaborateImages } from "@/lib/collaborateImages";
import { getPageContent } from "@/lib/pageContentServer";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Exhibit, Sponsor or Partner — Book a Stall at Design POV 2027",
  description:
    "Take part in Design POV 2027, Mumbai's luxury design, architecture and art show (2–4 May 2027, Jio World Convention Centre): exhibitor stalls and brand pavilions, sponsorship, The Core, speaking at The Circle, POV Objects and media partnerships.",
  path: "/collaborate",
  keywords: [
    "Design POV stall booking", "book a stall Design POV", "Design POV exhibitor", "exhibit at Design POV", "Design POV booth",
    "Design POV sponsorship", "Design POV participation", "Design POV partner", "exhibitor registration design show Mumbai",
    "stall booking design exhibition Mumbai", "sponsor design event India", "Design POV 2027 apply",
  ],
});

// Images are edited in the CMS — re-fetch at most once a minute.
// (Saving a page section in CMS → Collaborate revalidates immediately.)
export const revalidate = 60;

const Collaborate = async () => {
  const [images, { intro, mediums }] = await Promise.all([getCollaborateImages(), getPageContent("collaborate")]);

  return (
      <main>
        {intro.enabled && <CollaborateSection images={images} heading={intro.heading} text={intro.text} />}
        {mediums.enabled && <ParticipationSection heading={mediums.heading} items={mediums.items} />}
        <ShowDeckCTA />
      </main>
  );
};

export default Collaborate;
