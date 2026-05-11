import CmsSidebar from "@/components/cms/CmsSidebar";
import SubmissionsTable from "@/components/cms/SubmissionsTable";
import { createServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

async function getSubmissions() {
  const { data } = await createServerClient()
    .from("submissions")
    .select("*")
    .order("created_at", { ascending: false });

  return data ?? [];
}

export default async function SubmissionsPage() {
  const submissions = await getSubmissions();

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <CmsSidebar />

      <main className="ml-56 p-10">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-1">CMS</p>
            <h1 className="text-2xl font-semibold text-black">Submissions</h1>
          </div>
          <p className="text-sm text-gray-400">{submissions.length} total</p>
        </div>

        <SubmissionsTable initialData={submissions} />
      </main>
    </div>
  );
}
