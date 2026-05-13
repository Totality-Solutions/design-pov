import Link from "next/link";
import CmsSidebar from "@/components/cms/CmsSidebar";
import ObjectsTable from "@/components/cms/ObjectsTable";
import SeedObjectsButton from "@/components/cms/SeedObjectsButton";
import { createServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

async function getObjects() {
  const { data, error } = await createServerClient()
    .from("objects")
    .select("id, label, sublabel, src, sort_order, active, created_at")
    .order("sort_order", { ascending: true });

  return { objects: data ?? [], error: error?.message ?? null };
}

export default async function ObjectsCmsPage() {
  const { objects, error } = await getObjects();

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <CmsSidebar />

      <main className="ml-56 p-10">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-1">CMS</p>
            <h1 className="text-2xl font-semibold text-black">Objects</h1>
          </div>
          <div className="flex items-center gap-3">
            <SeedObjectsButton />
            <Link
              href="/cms/objects/new"
              className="bg-black text-white px-5 py-2.5 text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors"
            >
              + New Object
            </Link>
          </div>
        </div>

        {error && (
          <div className="mb-6 border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            <strong>Database error:</strong> {error}
            <p className="mt-1 text-xs text-red-500">
              Make sure the <code>objects</code> table exists in Supabase. Run the SQL migration first.
            </p>
          </div>
        )}

        {!error && objects.length === 0 && (
          <div className="mb-6 border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-700">
            No objects found. Click <strong>&quot;+ New Object&quot;</strong> to add your first one.
          </div>
        )}

        <ObjectsTable initialData={objects} />
      </main>
    </div>
  );
}
