import Link from "next/link";
import CmsSidebar from "@/components/cms/CmsSidebar";
import PressMentionsTable from "@/components/cms/PressMentionsTable";
import { createServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

async function getPressMentions() {
  const { data, error } = await createServerClient()
    .from("press_mentions")
    .select("id, title, image, link, sort_order, active, created_at")
    .order("sort_order", { ascending: true });

  return { mentions: data ?? [], error: error?.message ?? null };
}

export default async function AboutCmsPage() {
  const { mentions, error } = await getPressMentions();

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <CmsSidebar />

      <main className="ml-56 p-10">
        <div className="mb-8">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-1">CMS</p>
          <h1 className="text-2xl font-semibold text-black">About</h1>
        </div>

        {/* ── Press Mentions ── */}
        <section>
          <div className="mb-5 flex items-end justify-between">
            <div>
              <h2 className="text-lg font-semibold text-black">Press Mentions</h2>
              <p className="text-sm text-gray-400 mt-0.5">The publication logos scrolling on the About page.</p>
            </div>
            <Link
              href="/cms/about/press-mentions/new"
              className="bg-black text-white px-5 py-2.5 text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors"
            >
              + New Press Mention
            </Link>
          </div>

          {error && (
            <div className="mb-6 border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
              <strong>Database error:</strong> {error}
              <p className="mt-1 text-xs text-red-500">
                Make sure the <code>press_mentions</code> table exists in Supabase. Run{" "}
                <code>supabase-press-mentions-table.sql</code> first.
              </p>
            </div>
          )}

          <PressMentionsTable initialData={mentions} />
        </section>
      </main>
    </div>
  );
}
