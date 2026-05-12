import { notFound } from "next/navigation";
import CmsSidebar from "@/components/cms/CmsSidebar";
import ScheduleForm from "@/components/cms/ScheduleForm";
import { createServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function EditScheduleEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const { data, error } = await createServerClient()
    .from("schedule_events")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return notFound();

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <CmsSidebar />

      <main className="ml-56 p-10 max-w-3xl">
        <div className="mb-8">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-1">Schedule</p>
          <h1 className="text-2xl font-semibold text-black">Edit Event</h1>
          <p className="text-sm text-gray-400 mt-1 truncate">{data.title}</p>
        </div>

        <div className="bg-white border border-black/10 p-8">
          <ScheduleForm initialData={data} />
        </div>
      </main>
    </div>
  );
}
