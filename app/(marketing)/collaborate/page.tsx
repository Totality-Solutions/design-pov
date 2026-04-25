import React from "react";
import CollaborateSection from "@/components/collaborate/CollaborateSection";
import ParticipationSection from "@/components/collaborate/ParticipationSection";
import CTAStrip from "@/components/common/CTAStrip";


const Collaborate = () => {
  return (
      <main>
        <CollaborateSection />
        <ParticipationSection />
        <div className="w-full z-10 bg-white border border-[#DFDFDF]">
        <CTAStrip
          title="Post Show Report"
          ctaLabel="Download"
          ctaHref="#"
          hoverBgColor="#000000"
          textColor='var(--primary-red)'
          hoverTextColor='var(--color-white)'
        />
        </div>
      </main>
  );
};

export default Collaborate;