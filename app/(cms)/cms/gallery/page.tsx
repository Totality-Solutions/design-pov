import Link from "next/link";
import CmsSidebar from "@/components/cms/CmsSidebar";
import GalleryTable from "@/components/cms/GalleryTable";
import SeedGalleryButton from "@/components/cms/SeedGalleryButton";
import { createServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

async function getGalleryItems() {
  const { data, error } = await createServerClient()
    .from("gallery_items")
    .select("id, title, image_src, category, year, sort_order, active, created_at")
    .order("year", { ascending: false })
    .order("sort_order", { ascending: true });

  return { items: data ?? [], error: error?.message ?? null };
}

export default async function GalleryCmsPage() {
  const { items, error } = await getGalleryItems();

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <CmsSidebar />

      <main className="ml-56 p-10">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-1">CMS</p>
            <h1 className="text-2xl font-semibold text-black">Gallery</h1>
          </div>
          <div className="flex items-center gap-3">
            <SeedGalleryButton />
            <Link
              href="/cms/gallery/new"
              className="bg-black text-white px-5 py-2.5 text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors"
            >
              + Add Images
            </Link>
          </div>
        </div>

        {error && (
          <div className="mb-6 border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            <strong>Database error:</strong> {error}
            <p className="mt-1 text-xs text-red-500">
              Make sure the <code>gallery_items</code> table exists in Supabase. Run the SQL migration first.
            </p>
          </div>
        )}

        {!error && items.length === 0 && (
          <div className="mb-6 border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-700">
            No gallery items found. Click <strong>&quot;Seed Existing Gallery&quot;</strong> to import your current images, or{" "}
            <strong>&quot;+ Add Images&quot;</strong> to add new ones.
          </div>
        )}

        <GalleryTable initialData={items} />
      </main>
    </div>
  );
}
