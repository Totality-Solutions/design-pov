import { notFound } from "next/navigation";
import CmsSidebar from "@/components/cms/CmsSidebar";
import GalleryForm from "@/components/cms/GalleryForm";
import { createServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

async function getGalleryItem(id: string) {
  const { data } = await createServerClient()
    .from("gallery_items")
    .select("*")
    .eq("id", id)
    .single();
  return data;
}

export default async function EditGalleryItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getGalleryItem(id);
  if (!item) notFound();

  const initialData = {
    title: item.title ?? "",
    image_src: item.image_src ?? "",
    category: item.category ?? "",
    year: item.year ?? new Date().getFullYear(),
    sort_order: item.sort_order ?? 0,
    active: item.active ?? true,
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <CmsSidebar />

      <main className="ml-56 p-10 max-w-3xl">
        <div className="mb-8">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-1">Gallery</p>
          <h1 className="text-2xl font-semibold text-black">Edit Image</h1>
          <p className="text-sm text-gray-400 mt-1">{item.title}</p>
        </div>

        <div className="bg-white border border-black/10 p-8">
          <GalleryForm initialData={initialData} itemId={id} />
        </div>
      </main>
    </div>
  );
}
