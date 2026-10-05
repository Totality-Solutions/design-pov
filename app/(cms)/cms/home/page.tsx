import CmsSidebar from "@/components/cms/CmsSidebar";
import HomeEditor from "@/components/cms/home/HomeEditor";
import { getHomeContent, getSavedHomeSections } from "@/lib/homeContentServer";

export const dynamic = "force-dynamic";

export default async function HomeCmsPage() {
  const [content, { saved, error }] = await Promise.all([getHomeContent(), getSavedHomeSections()]);

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <CmsSidebar />

      <main className="ml-56 p-10 max-w-5xl">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-1">CMS</p>
            <h1 className="text-2xl font-semibold text-black">Home</h1>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] uppercase tracking-widest text-gray-400 hover:text-black transition-colors border-b border-dashed border-gray-300"
          >
            View home page ↗
          </a>
        </div>

        {error && (
          <div className="mb-6 border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            <strong>Database error:</strong> {error}
            <p className="mt-1 text-xs text-red-500">
              Make sure the <code>home_sections</code> table exists in Supabase. Run{" "}
              <code>supabase-home-sections-table.sql</code> first. Until then the editor shows the default content
              and saving won&apos;t work.
            </p>
          </div>
        )}

        <HomeEditor initial={content} saved={saved} />
      </main>
    </div>
  );
}
