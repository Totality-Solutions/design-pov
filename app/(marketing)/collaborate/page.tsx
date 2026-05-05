import React from "react";
import CollaborateSection from "@/components/collaborate/CollaborateSection";
import ParticipationSection from "@/components/collaborate/ParticipationSection";
import CTAStrip from "@/components/common/CTAStrip";
import ShowDeckCTA from "@/components/common/ShowDeckCTA";


const Collaborate = () => {
  return (
      <main>
        <CollaborateSection />
        <ParticipationSection />
        <ShowDeckCTA />
      </main>
  );
};

export default Collaborate;