import Link from "next/link";
import CmsSidebar from "@/components/cms/CmsSidebar";
import ProjectsTable from "@/components/cms/ProjectsTable";
import { createServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

async function getProjects() {
  const { data, error } = await createServerClient()
    .from("projects")
    .select("id, title, architects, slug, category, city, country, status, cover_image, gallery, published_on")
    .order("published_on", { ascending: false });

  return { projects: data ?? [], error: error?.message ?? null };
}

export default async function ProjectsCmsPage() {
  const { projects, error } = await getProjects();

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <CmsSidebar />

      <main className="ml-56 p-10">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-1">Magazine</p>
            <h1 className="text-2xl font-semibold text-black">Projects</h1>
            <p className="text-sm text-gray-400 mt-0.5">Shown in the Magazine “Project” tab and at /magazine/projects.</p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/magazine/projects"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] uppercase tracking-widest text-gray-400 hover:text-black transition-colors border-b border-dashed border-gray-300"
            >
              View projects ↗
            </a>
            <Link
              href="/cms/projects/new"
              className="bg-black text-white px-5 py-2.5 text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors"
            >
              + New Project
            </Link>
          </div>
        </div>

        {error && (
          <div className="mb-6 border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            <strong>Database error:</strong> {error}
            <p className="mt-1 text-xs text-red-500">
              Make sure the <code>projects</code> table exists in Supabase. Run <code>supabase-projects-table.sql</code> first.
            </p>
          </div>
        )}

        <ProjectsTable initialData={projects} />
      </main>
    </div>
  );
}
