import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import CmsSidebar from "@/components/cms/CmsSidebar";
import BlogForm from "@/components/cms/BlogForm";

async function getBlog(id: string) {
  const { data } = await createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
    .from("blogs")
    .select("*")
    .eq("id", id)
    .single();
  return data;
}

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blog = await getBlog(id);
  if (!blog) notFound();

  const initialData = {
    title: blog.title ?? "",
    slug: blog.slug ?? "",
    subtitle: blog.subtitle ?? "",
    description: blog.description ?? "",
    category: blog.category ?? "Design",
    category_display: blog.category_display ?? "",
    author: blog.author ?? "",
    date: blog.date ?? "",
    is_featured: blog.is_featured ?? false,
    status: blog.status ?? "draft",
    image: blog.image ?? "",
    thumbnail: blog.thumbnail ?? "",
    featured_paragraphs: Array.isArray(blog.featured_paragraphs) && blog.featured_paragraphs.length > 0
      ? blog.featured_paragraphs
      : [""],
    detailed_content: Array.isArray(blog.detailed_content) && blog.detailed_content.length > 0
      ? blog.detailed_content
      : [{ type: "text", title: "", value: "" }],
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <CmsSidebar />

      <main className="ml-56 p-10 max-w-3xl">
        <div className="mb-8">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-1">Blogs</p>
          <h1 className="text-2xl font-semibold text-black">Edit Post</h1>
          <p className="text-sm text-gray-400 mt-1">{blog.title}</p>
        </div>

        <div className="bg-white border border-black/10 p-8">
          <BlogForm initialData={initialData} blogId={id} />
        </div>
      </main>
    </div>
  );
}
