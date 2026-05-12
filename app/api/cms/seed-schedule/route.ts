import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import scheduleData from "@/components/edition26/schedule/Scheduledata";

export async function POST() {
  const supabase = createServerClient();

  const { error: tableErr } = await supabase.from("schedule_events").select("id").limit(1);
  if (tableErr) {
    return NextResponse.json(
      { error: `schedule_events table not found: ${tableErr.message}. Run scripts/create-schedule-table.sql in Supabase first.` },
      { status: 500 }
    );
  }

  const { data: existing } = await supabase.from("schedule_events").select("title, day");
  const existingKeys = new Set((existing ?? []).map((r) => `${r.day}-${r.title}`));

  const results = { inserted: 0, skipped: 0, errors: [] as string[] };

  for (const daySchedule of scheduleData) {
    for (let i = 0; i < daySchedule.events.length; i++) {
      const event = daySchedule.events[i];
      const key = `${daySchedule.day}-${event.title}`;

      if (existingKeys.has(key)) { results.skipped++; continue; }

      const { error } = await supabase.from("schedule_events").insert({
        title:            event.title,
        subtitle:         event.subtitle ?? null,
        speakers:         event.speakers ?? [],
        venue:            event.venue,
        start_time:       event.startTime,
        end_time:         event.endTime,
        day:              daySchedule.day,
        is_invite_only:   event.isInviteOnly ?? false,
        invite_only_link: event.inviteOnlyLink ?? null,
        description:      event.description ?? null,
        image:            event.image ?? null,
        partners:         event.partners ?? [],
        category_tag:     event.categoryTag ?? null,
        sort_order:       i,
      });

      if (error) results.errors.push(`${event.title}: ${error.message}`);
      else results.inserted++;
    }
  }

  return NextResponse.json(results);
}
