import Link from "next/link";
import CmsSidebar from "@/components/cms/CmsSidebar";
import BlogsTable from "@/components/cms/BlogsTable";
import SeedBlogsButton from "@/components/cms/SeedBlogsButton";
import { createServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

async function getBlogs() {
  const { data, error } = await createServerClient()
    .from("blogs")
    .select("id, title, slug, category, author, status, is_featured, created_at")
    .order("created_at", { ascending: false });

  return { blogs: data ?? [], error: error?.message ?? null };
}

export default async function BlogsPage() {
  const { blogs, error } = await getBlogs();

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <CmsSidebar />

      <main className="ml-56 p-10">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-1">CMS</p>
            <h1 className="text-2xl font-semibold text-black">Blogs</h1>
          </div>
          <div className="flex items-center gap-3">
            <SeedBlogsButton />
            <Link
              href="/cms/blogs/new"
              className="bg-black text-white px-5 py-2.5 text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors"
            >
              + New Post
            </Link>
          </div>
        </div>

        {error && (
          <div className="mb-6 border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            <strong>Database error:</strong> {error}
            <p className="mt-1 text-xs text-red-500">
              Make sure the <code>blogs</code> table exists in Supabase. Run the SQL in{" "}
              <code>scripts/create-blogs-table.sql</code>, then click "Seed from Magazine Data".
            </p>
          </div>
        )}

        {!error && blogs.length === 0 && (
          <div className="mb-6 border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-700">
            No blogs found. Click <strong>"Seed from Magazine Data"</strong> to import all 29 blogs from magazineData.ts.
          </div>
        )}

        <BlogsTable initialData={blogs} />
      </main>
    </div>
  );
}
