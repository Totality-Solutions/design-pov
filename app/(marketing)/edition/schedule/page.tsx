"use client";

import React, { useState } from "react";
import ScheduleParagraph from "@/components/schedule/ScheculeParagraph";
import DynamicScheduleGrid from "@/components/schedule/DynamicScheduleGrid";
import CTAStrip from "@/components/common/CTAStrip";
import PopupForm from "@/components/common/PopupForm";

const SchedulePage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  return (
    <main className="min-h-screen bg-white">
      {/* Hero or Page Header could go here */}
      
      {/* The Schedule Intro Section */}
      <ScheduleParagraph
        title="Event Schedule"
        ctaLabel="Download Schedule"
        ctaHref="/assets/event-schedule.pdf"
        description1="Join us for an immersive journey through the latest in aviation technology and design. Our schedule is meticulously crafted to provide deep insights into the future of flight, featuring keynote speakers from across the globe."
        description2="The event is spread across multiple halls. Please ensure you check the venue details for each session. We recommend arriving 15 minutes early for popular workshops."
      />
      <DynamicScheduleGrid />
      <div className="w-full z-10 bg-white border-b">
        <CTAStrip
          title="Where Design Meets Dialogue"
          ctaLabel="Apply"
          // 3. Pass the open function to onClick
          onClick={() => setIsFormOpen(true)} 
          hoverBgColor="#000000"
          textColor='var(--primary-red)'
          hoverTextColor='var(--color-white)'
        />
      </div>
      <PopupForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
      />
    </main>
  );
};

export default SchedulePage;