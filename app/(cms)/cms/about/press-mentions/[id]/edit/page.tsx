import { notFound } from "next/navigation";
import CmsSidebar from "@/components/cms/CmsSidebar";
import PressMentionForm from "@/components/cms/PressMentionForm";
import { createServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

async function getPressMention(id: string) {
  const { data } = await createServerClient()
    .from("press_mentions")
    .select("*")
    .eq("id", id)
    .single();
  return data;
}

export default async function EditPressMentionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const mention = await getPressMention(id);
  if (!mention) notFound();

  const initialData = {
    title:      mention.title ?? "",
    image:      mention.image ?? "",
    link:       mention.link ?? "",
    sort_order: mention.sort_order ?? 0,
    active:     mention.active ?? true,
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <CmsSidebar />

      <main className="ml-56 p-10 max-w-3xl">
        <div className="mb-8">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-1">About · Press Mentions</p>
          <h1 className="text-2xl font-semibold text-black">Edit Press Mention</h1>
          <p className="text-sm text-gray-400 mt-1">{mention.title}</p>
        </div>

        <div className="bg-white border border-black/10 p-8">
          <PressMentionForm initialData={initialData} mentionId={id} />
        </div>
      </main>
    </div>
  );
}
