import { notFound } from "next/navigation";
import CmsSidebar from "@/components/cms/CmsSidebar";
import StudioForm from "@/components/cms/StudioForm";
import { createServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function EditStudioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data, error } = await createServerClient()
    .from("studios")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) notFound();

  const initialData = {
    label:                    data.label,
    architects:               (data.architects ?? []).join("\n"),
    logo:                     data.logo,
    website:                  data.website,
    instagram:                data.instagram,
    core_image:               data.core_image,
    bio:                      data.bio,
    core_additional_images:   data.core_additional_images?.length ? data.core_additional_images : [""],
    booth_image:              data.booth_image,
    concept:                  data.concept,
    booth_additional_images:  data.booth_additional_images?.length ? data.booth_additional_images : [""],
    sort_order:               data.sort_order,
    active:                   data.active,
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <CmsSidebar />
      <main className="ml-56 p-10">
        <div className="mb-8">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-1">CMS / Studios</p>
          <h1 className="text-2xl font-semibold text-black">{data.label}</h1>
        </div>
        <StudioForm initialData={initialData} studioId={id} />
      </main>
    </div>
  );
}
