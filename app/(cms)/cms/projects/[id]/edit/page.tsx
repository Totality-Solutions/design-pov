import { notFound } from "next/navigation";
import CmsSidebar from "@/components/cms/CmsSidebar";
import ProjectForm, { EMPTY_PROJECT, type ProjectFormData } from "@/components/cms/ProjectForm";
import { createServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: row } = await createServerClient().from("projects").select("*").eq("id", id).single();
  if (!row) notFound();

  // Nulls from the table → the form's empty values.
  const initialData = Object.fromEntries(
    (Object.keys(EMPTY_PROJECT) as (keyof ProjectFormData)[]).map((key) => [key, row[key] ?? EMPTY_PROJECT[key]])
  ) as ProjectFormData;
  if (initialData.content.length === 0) initialData.content = EMPTY_PROJECT.content;

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <CmsSidebar />

      <main className="ml-56 p-10 max-w-4xl">
        <div className="mb-8">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-1">Projects</p>
          <h1 className="text-2xl font-semibold text-black">Edit Project</h1>
          <p className="text-sm text-gray-400 mt-1">{row.title}</p>
        </div>

        <div className="bg-white border border-black/10 p-8">
          <ProjectForm initialData={initialData} projectId={id} />
        </div>
      </main>
    </div>
  );
}
