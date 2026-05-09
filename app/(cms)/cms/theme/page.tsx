import { createClient } from "@supabase/supabase-js";
import CmsSidebar from "@/components/cms/CmsSidebar";
import ThemeEditor from "@/components/cms/ThemeEditor";

async function getThemeData() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Try to find existing theme page
  const { data: existing, error: fetchErr } = await supabase
    .from("pages")
    .select("*")
    .eq("slug", "theme")
    .maybeSingle();

  let page = existing;

  // Create only if truly missing (not an error)
  if (!page && !fetchErr) {
    const { data: created, error: insertErr } = await supabase
      .from("pages")
      .insert([{ title: "Theme", slug: "theme", type: "theme", is_published: true }])
      .select()
      .single();

    if (insertErr) {
      console.error("Failed to create theme page:", insertErr.message);
    } else {
      page = created;
    }
  }

  if (!page) {
    return { page: null, blocks: [] };
  }

  const { data: blocks } = await supabase
    .from("blocks")
    .select("*")
    .eq("page_id", page.id)
    .order("order_index", { ascending: true });

  return { page, blocks: blocks ?? [] };
}

export default async function ThemeCmsPage() {
  const { page, blocks } = await getThemeData();

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <CmsSidebar />

      <main className="ml-56 p-10 max-w-4xl">
        <div className="mb-8">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-1">CMS</p>
          <h1 className="text-2xl font-semibold text-black">Theme Page</h1>
          <p className="text-sm text-gray-400 mt-1">Manage the Theme page title, content, and collaborators.</p>
        </div>

        {!page ? (
          <div className="bg-white border border-red-200 p-6 text-sm text-red-600">
            <p className="font-medium mb-1">Could not initialise the Theme page in Supabase.</p>
            <p className="text-xs text-red-400">
              The <code>pages</code> table may have RLS policies blocking inserts with the anon key.
              Add <code>SUPABASE_SERVICE_ROLE_KEY</code> to your <code>.env.local</code>, or run this in the Supabase SQL Editor:
            </p>
            <pre className="mt-3 bg-red-50 p-3 text-[11px] overflow-x-auto">
              {`INSERT INTO pages (title, slug, type, is_published)
VALUES ('Theme', 'theme', 'theme', true)
ON CONFLICT (slug) DO NOTHING;`}
            </pre>
          </div>
        ) : (
          <ThemeEditor page={page} blocks={blocks} />
        )}
      </main>
    </div>
  );
}
