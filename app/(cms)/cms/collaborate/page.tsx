import Link from "next/link";
import CmsPageShell from "@/components/cms/page-editor/CmsPageShell";
import PageEditorClient from "@/components/cms/page-editor/PageEditorClient";
import CollaborateImagesTable from "@/components/cms/CollaborateImagesTable";
import { createServerClient } from "@/lib/supabase/server";
import { getPageContent, getSavedSections } from "@/lib/pageContentServer";

export const dynamic = "force-dynamic";

async function getCollaborateImages() {
  const { data, error } = await createServerClient()
    .from("collaborate_images")
    .select("id, image, alt, sort_order, active, created_at")
    .order("sort_order", { ascending: true });

  return { images: data ?? [], error: error?.message ?? null };
}

export default async function CollaborateCmsPage() {
  const [{ images, error }, content, sections] = await Promise.all([
    getCollaborateImages(),
    getPageContent("collaborate"),
    getSavedSections("collaborate"),
  ]);

  return (
    <CmsPageShell wide title="Collaborate" viewLinks={[{ href: "/collaborate", label: "View collaborate page" }]} error={sections.error}>
      {/* ── Page text ── */}
      <section className="mb-14">
        <h2 className="text-lg font-semibold text-black mb-4">Page Sections</h2>
        <PageEditorClient page="collaborate" initial={content} saved={sections.saved} />
      </section>

      {/* ── Gallery images ── */}
      <section>
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="text-lg font-semibold text-black">Gallery Images</h2>
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
      </section>
    </CmsPageShell>
  );
}
