import CmsSidebar from "@/components/cms/CmsSidebar";
import BlogForm from "@/components/cms/BlogForm";
import { createServerClient } from "@/lib/supabase/server";
import { getNextMagazineFolderNumber } from "@/lib/blog";

export const dynamic = "force-dynamic";

export default async function NewBlogPage() {
  const { data } = await createServerClient()
    .from("blogs")
    .select("image, thumbnail, detailed_content");

  const nextFolder = getNextMagazineFolderNumber(data ?? []);
  const defaultImageFolder = `/temp/magazine/${nextFolder}/`;

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <CmsSidebar />

      <main className="ml-56 p-10 max-w-3xl">
        <div className="mb-8">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-1">Blogs</p>
          <h1 className="text-2xl font-semibold text-black">New Blog Post</h1>
        </div>

        <div className="bg-white border border-black/10 p-8">
          <BlogForm defaultImageFolder={defaultImageFolder} />
        </div>
      </main>
    </div>
  );
}
