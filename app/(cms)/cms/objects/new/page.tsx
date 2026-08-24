import CmsSidebar from "@/components/cms/CmsSidebar";
import ObjectForm from "@/components/cms/ObjectForm";
import { createServerClient } from "@/lib/supabase/server";
import { getNextFolderNumber } from "@/lib/mediaFolder";

export const dynamic = "force-dynamic";

const BASE_PATH = "/temp/objects";

export default async function NewObjectPage() {
  const { data } = await createServerClient().from("objects").select("src, additional_images");

  const values: Array<string | null | undefined> = [];
  (data ?? []).forEach((row) => {
    values.push(row.src);
    (row.additional_images ?? []).forEach((img: string) => values.push(img));
  });

  const nextFolder = getNextFolderNumber(BASE_PATH, values);
  const defaultImageFolder = `${BASE_PATH}/${nextFolder}/`;

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <CmsSidebar />

      <main className="ml-56 p-10 max-w-3xl">
        <div className="mb-8">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-1">Objects</p>
          <h1 className="text-2xl font-semibold text-black">New Object</h1>
        </div>

        <div className="bg-white border border-black/10 p-8">
          <ObjectForm defaultImageFolder={defaultImageFolder} />
        </div>
      </main>
    </div>
  );
}
