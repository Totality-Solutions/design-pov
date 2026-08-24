import CmsSidebar from "@/components/cms/CmsSidebar";
import BrandPartnerForm from "@/components/cms/BrandPartnerForm";
import { createServerClient } from "@/lib/supabase/server";
import { getNextFolderNumber } from "@/lib/mediaFolder";

export const dynamic = "force-dynamic";

const BASE_PATH = "/temp/brand-partners";

export default async function NewBrandPartnerPage() {
  const { data } = await createServerClient().from("brand_partners").select("logo");
  const nextFolder = getNextFolderNumber(BASE_PATH, (data ?? []).map((row) => row.logo));
  const defaultImageFolder = `${BASE_PATH}/${nextFolder}/`;

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <CmsSidebar />
      <main className="ml-56 p-10">
        <div className="mb-8">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-1">CMS / Brand Partners</p>
          <h1 className="text-2xl font-semibold text-black">New Partner</h1>
        </div>
        <BrandPartnerForm defaultImageFolder={defaultImageFolder} />
      </main>
    </div>
  );
}
