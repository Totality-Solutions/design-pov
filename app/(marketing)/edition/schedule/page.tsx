
import ScheduleParagraph from "@/components/schedule/ScheculeParagraph";
import DynamicScheduleGrid from "@/components/schedule/DynamicScheduleGrid";
import CTAStrip from "@/components/common/CTAStrip";
import PopupForm from "@/components/common/PopupForm";
import DesignPovTicket from "@/components/schedule/DesignPovTicket";
import ShowDeckCTA from "@/components/common/ShowDeckCTA";

const SchedulePage = () => {

  return (
    <main className="min-h-screen bg-white">
      {/* Hero or Page Header could go here */}
      
      {/* The Schedule Intro Section */}
      <ScheduleParagraph
        title="Event Schedule"
        ctaLabel="Download Schedule"
        ctaHref="/assets/event-schedule.pdf"
        description1="A curated programme of conversations and gatherings, from panel discussions and fireside chats to invite-only moments, designed to extend the experience beyond the spaces."
        description2="Each session brings together distinct perspectives shaping how we think about design, culture, and collaboration."
      />
      <DynamicScheduleGrid />
      <DesignPovTicket />
      <ShowDeckCTA />
    </main>
  );
};

export default SchedulePage;