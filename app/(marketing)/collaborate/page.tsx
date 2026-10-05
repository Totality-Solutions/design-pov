import React from "react";
import CollaborateSection from "@/components/collaborate/CollaborateSection";
import ParticipationSection from "@/components/collaborate/ParticipationSection";
import CTAStrip from "@/components/common/CTAStrip";
import ShowDeckCTA from "@/components/common/ShowDeckCTA";
import { getCollaborateImages } from "@/lib/collaborateImages";

// Images are edited in the CMS — re-fetch at most once a minute.
export const revalidate = 60;

const Collaborate = async () => {
  const images = await getCollaborateImages();

  return (
      <main>
        <CollaborateSection images={images} />
        <ParticipationSection />
        <ShowDeckCTA />
      </main>
  );
};

export default Collaborate;