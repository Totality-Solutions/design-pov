import Link from "next/link";
import CmsSidebar from "@/components/cms/CmsSidebar";
import StudiosTable from "@/components/cms/StudiosTable";
import SeedStudiosButton from "@/components/cms/SeedStudiosButton";
import { createServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

async function getData() {
  const { data, error } = await createServerClient()
    .from("studios")
    .select("*")
    .order("sort_order", { ascending: true });

  return { studios: data ?? [], error: error?.message ?? null };
}

export default async function StudiosCmsPage() {
  const { studios, error } = await getData();

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <CmsSidebar />

      <main className="ml-56 p-10">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-1">CMS</p>
            <h1 className="text-2xl font-semibold text-black">Studios</h1>
          </div>
          <div className="flex items-center gap-3">
            <SeedStudiosButton />
            <Link
              href="/cms/studios/new"
              className="bg-black text-white px-5 py-2.5 text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors"
            >
              + New Studio
            </Link>
          </div>
        </div>

        {error && (
          <div className="mb-6 border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            <strong>Database error:</strong> {error}
            <p className="mt-1 text-xs text-red-500">
              Make sure the <code>studios</code> table exists in Supabase. Run the SQL migration from the seed route comment first.
            </p>
          </div>
        )}

        {!error && studios.length === 0 && (
          <div className="mb-6 border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-700">
            No studios found. Click <strong>&quot;Seed Default Data&quot;</strong> to import existing studios, or <strong>&quot;+ New Studio&quot;</strong> to add manually.
          </div>
        )}

        <StudiosTable initialData={studios as any} />
      </main>
    </div>
  );
}
