import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import CmsSidebar from "@/components/cms/CmsSidebar";
import BlogsTable from "@/components/cms/BlogsTable";

async function getBlogs() {
  const { data } = await createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
    .from("blogs")
    .select("id, title, slug, category, author, status, is_featured, created_at")
    .order("created_at", { ascending: false });

  return data ?? [];
}

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <CmsSidebar />

      <main className="ml-56 p-10">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-1">CMS</p>
            <h1 className="text-2xl font-semibold text-black">Blogs</h1>
          </div>
          <Link
            href="/cms/blogs/new"
            className="bg-black text-white px-5 py-2.5 text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors"
          >
            + New Post
          </Link>
        </div>

        <BlogsTable initialData={blogs} />
      </main>
    </div>
  );
}
