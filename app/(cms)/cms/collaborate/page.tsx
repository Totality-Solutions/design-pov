import Link from "next/link";
import CmsSidebar from "@/components/cms/CmsSidebar";
import CollaborateImagesTable from "@/components/cms/CollaborateImagesTable";
import { createServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

async function getCollaborateImages() {
  const { data, error } = await createServerClient()
    .from("collaborate_images")
    .select("id, image, alt, sort_order, active, created_at")
    .order("sort_order", { ascending: true });

  return { images: data ?? [], error: error?.message ?? null };
}

export default async function CollaborateCmsPage() {
  const { images, error } = await getCollaborateImages();

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <CmsSidebar />

      <main className="ml-56 p-10">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-1">CMS</p>
            <h1 className="text-2xl font-semibold text-black">Collaborate</h1>
            <p className="text-sm text-gray-400 mt-0.5">Images in the gallery strip on the Collaborate page.</p>
          </div>
          <Link
            href="/cms/collaborate/new"
            className="bg-black text-white px-5 py-2.5 text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors"
          >
            + New Image
          </Link>
        </div>

        {error && (
          <div className="mb-6 border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            <strong>Database error:</strong> {error}
            <p className="mt-1 text-xs text-red-500">
              Make sure the <code>collaborate_images</code> table exists in Supabase. Run{" "}
              <code>supabase-collaborate-images-table.sql</code> first.
            </p>
          </div>
        )}

        <CollaborateImagesTable initialData={images} />
      </main>
    </div>
  );
}
