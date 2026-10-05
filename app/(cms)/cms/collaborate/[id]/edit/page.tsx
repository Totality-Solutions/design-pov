import { notFound } from "next/navigation";
import CmsSidebar from "@/components/cms/CmsSidebar";
import CollaborateImageForm from "@/components/cms/CollaborateImageForm";
import { createServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

async function getCollaborateImage(id: string) {
  const { data } = await createServerClient()
    .from("collaborate_images")
    .select("*")
    .eq("id", id)
    .single();
  return data;
}

export default async function EditCollaborateImagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const row = await getCollaborateImage(id);
  if (!row) notFound();

  const initialData = {
    image:      row.image ?? "",
    alt:        row.alt ?? "",
    sort_order: row.sort_order ?? 0,
    active:     row.active ?? true,
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <CmsSidebar />

      <main className="ml-56 p-10 max-w-3xl">
        <div className="mb-8">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-1">Collaborate</p>
          <h1 className="text-2xl font-semibold text-black">Edit Image</h1>
        </div>

        <div className="bg-white border border-black/10 p-8">
          <CollaborateImageForm initialData={initialData} imageId={id} />
        </div>
      </main>
    </div>
  );
}
