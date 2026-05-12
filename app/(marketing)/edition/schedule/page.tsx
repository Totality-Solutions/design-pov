import ScheduleParagraph from "@/components/edition26/schedule/ScheculeParagraph";
import DynamicScheduleGrid from "@/components/edition26/schedule/DynamicScheduleGrid";
import DesignPovTicket from "@/components/edition26/schedule/DesignPovTicket";
import ShowDeckCTA from "@/components/common/ShowDeckCTA";
import { createServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

async function getScheduleEvents() {
  try {
    const { data } = await createServerClient()
      .from("schedule_events")
      .select("id, title, subtitle, speakers, venue, start_time, end_time, day, is_invite_only, invite_only_link, image, partners, category_tag")
      .order("day", { ascending: true })
      .order("sort_order", { ascending: true });
    return data ?? null;
  } catch {
    return null;
  }
}

const SchedulePage = async () => {
  const serverEvents = await getScheduleEvents();

  return (
    <main className="min-h-screen bg-white">
      <ScheduleParagraph
        title="Event Schedule"
        ctaLabel="Download Schedule"
        ctaHref="/assets/event-schedule.pdf"
        description1="A curated programme of conversations and gatherings, from panel discussions and fireside chats to invite-only moments, designed to extend the experience beyond the spaces."
        description2="Each session brings together distinct perspectives shaping how we think about design, culture, and collaboration."
      />
      <DynamicScheduleGrid serverEvents={serverEvents} />
      <DesignPovTicket />
      <ShowDeckCTA />
    </main>
  );
};

export default SchedulePage;
