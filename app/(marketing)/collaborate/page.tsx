import React from "react";
import CollaborateSection from "@/components/collaborate/CollaborateSection";
import ParticipationSection from "@/components/collaborate/ParticipationSection";
import ShowDeckCTA from "@/components/common/ShowDeckCTA";
import { getCollaborateImages } from "@/lib/collaborateImages";
import { getPageContent } from "@/lib/pageContentServer";

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
