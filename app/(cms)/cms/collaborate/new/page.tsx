import CmsSidebar from "@/components/cms/CmsSidebar";
import CollaborateImageForm from "@/components/cms/CollaborateImageForm";
import { createServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function NewCollaborateImagePage() {
  // Default new images to the end of the list.
  const { data } = await createServerClient()
    .from("collaborate_images")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1);
  const nextSortOrder = (data?.[0]?.sort_order ?? 0) + 1;

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <CmsSidebar />

      <main className="ml-56 p-10 max-w-3xl">
        <div className="mb-8">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-1">Collaborate</p>
          <h1 className="text-2xl font-semibold text-black">New Image</h1>
        </div>

        <div className="bg-white border border-black/10 p-8">
          <CollaborateImageForm initialData={{ sort_order: nextSortOrder }} />
        </div>
      </main>
    </div>
  );
}
