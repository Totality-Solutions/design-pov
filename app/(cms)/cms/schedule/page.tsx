import Link from "next/link";
import CmsSidebar from "@/components/cms/CmsSidebar";
import ScheduleTable from "@/components/cms/ScheduleTable";
import SeedScheduleButton from "@/components/cms/SeedScheduleButton";
import { createServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

async function getEvents() {
  const { data, error } = await createServerClient()
    .from("schedule_events")
    .select("id, title, day, venue, start_time, end_time, category_tag, is_invite_only, speakers, partners, created_at")
    .order("day", { ascending: true })
    .order("sort_order", { ascending: true });

  return { events: data ?? [], error: error?.message ?? null };
}

export default async function SchedulePage() {
  const { events, error } = await getEvents();

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <CmsSidebar />

      <main className="ml-56 p-10">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-1">CMS</p>
            <h1 className="text-2xl font-semibold text-black">Schedule</h1>
          </div>
          <div className="flex items-center gap-3">
            <SeedScheduleButton />
            <Link
              href="/cms/schedule/new"
              className="bg-black text-white px-5 py-2.5 text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors"
            >
              + New Event
            </Link>
          </div>
        </div>

        {error && (
          <div className="mb-6 border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            <strong>Database error:</strong> {error}
            <p className="mt-1 text-xs text-red-500">
              Make sure the <code>schedule_events</code> table exists in Supabase. Run the SQL in{" "}
              <code>scripts/create-schedule-table.sql</code>, then click &quot;Seed from Schedule Data&quot;.
            </p>
          </div>
        )}

        {!error && events.length === 0 && (
          <div className="mb-6 border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-700">
            No events found. Click <strong>&quot;Seed from Schedule Data&quot;</strong> to import all events from Scheduledata.ts.
          </div>
        )}

        <ScheduleTable initialData={events} />
      </main>
    </div>
  );
}
