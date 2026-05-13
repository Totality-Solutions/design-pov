import { notFound } from "next/navigation";
import CmsSidebar from "@/components/cms/CmsSidebar";
import ObjectForm from "@/components/cms/ObjectForm";
import { createServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

async function getObject(id: string) {
  const { data } = await createServerClient()
    .from("objects")
    .select("*")
    .eq("id", id)
    .single();
  return data;
}

export default async function EditObjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const obj = await getObject(id);
  if (!obj) notFound();

  const initialData = {
    label:             obj.label ?? "",
    sublabel:          obj.sublabel ?? "",
    description:       obj.description ?? "",
    src:               obj.src ?? "",
    additional_images: Array.isArray(obj.additional_images) && obj.additional_images.length > 0
                         ? obj.additional_images
                         : [""],
    website:           obj.website ?? "#",
    instagram:         obj.instagram ?? "#",
    logo:              obj.logo ?? "/logo/Totality.svg",
    sort_order:        obj.sort_order ?? 0,
    active:            obj.active ?? true,
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <CmsSidebar />

      <main className="ml-56 p-10 max-w-3xl">
        <div className="mb-8">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-1">Objects</p>
          <h1 className="text-2xl font-semibold text-black">Edit Object</h1>
          <p className="text-sm text-gray-400 mt-1">{obj.label}</p>
        </div>

        <div className="bg-white border border-black/10 p-8">
          <ObjectForm initialData={initialData} objectId={id} />
        </div>
      </main>
    </div>
  );
}
