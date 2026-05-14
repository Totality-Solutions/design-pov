import { notFound } from "next/navigation";
import CmsSidebar from "@/components/cms/CmsSidebar";
import BrandPartnerForm from "@/components/cms/BrandPartnerForm";
import { createServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function EditBrandPartnerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data, error } = await createServerClient()
    .from("brand_partners")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) notFound();

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <CmsSidebar />
      <main className="ml-56 p-10">
        <div className="mb-8">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-1">CMS / Brand Partners</p>
          <h1 className="text-2xl font-semibold text-black">Edit Partner</h1>
          <p className="text-sm text-gray-400 mt-1">{data.name}</p>
        </div>
        <BrandPartnerForm
          initialData={{
            name:       data.name,
            logo:       data.logo,
            website:    data.website ?? "",
            type:       data.type,
            tier:       data.tier ?? "",
            sort_order: data.sort_order,
            active:     data.active,
          }}
          partnerId={id}
        />
      </main>
    </div>
  );
}
