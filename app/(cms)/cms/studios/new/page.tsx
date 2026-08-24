import CmsSidebar from "@/components/cms/CmsSidebar";
import StudioForm from "@/components/cms/StudioForm";
import { createServerClient } from "@/lib/supabase/server";
import { getNextFolderNumber } from "@/lib/mediaFolder";

export const dynamic = "force-dynamic";

const BASE_PATH = "/temp/studios";

export default async function NewStudioPage() {
  const { data } = await createServerClient()
    .from("studios")
    .select("core_image, booth_image, core_additional_images, booth_additional_images");

  const values: Array<string | null | undefined> = [];
  (data ?? []).forEach((row) => {
    values.push(row.core_image, row.booth_image);
    (row.core_additional_images ?? []).forEach((img: string) => values.push(img));
    (row.booth_additional_images ?? []).forEach((img: string) => values.push(img));
  });

  const nextFolder = getNextFolderNumber(BASE_PATH, values);
  const defaultImageFolder = `${BASE_PATH}/${nextFolder}/`;

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <CmsSidebar />
      <main className="ml-56 p-10">
        <div className="mb-8">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-1">CMS / Studios</p>
          <h1 className="text-2xl font-semibold text-black">New Studio</h1>
        </div>
        <StudioForm defaultImageFolder={defaultImageFolder} />
      </main>
    </div>
  );
}
