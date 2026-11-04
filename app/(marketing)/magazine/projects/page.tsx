import type { Metadata } from "next";
import Link from "next/link";
import ProjectCard from "@/components/magazine/projects/ProjectCard";
import { getPublishedProjectCards } from "@/lib/projectsServer";

export const metadata: Metadata = {
  title: "Projects | Design POV Magazine",
  description: "Architecture and interior projects featured by Design POV — photographs, drawings and the architects’ own words.",
};

// Saving in CMS → Projects revalidates this page; this is the fallback.
export const revalidate = 300;

export default async function ProjectsPage() {
  const projects = await getPublishedProjectCards();

  return (
    <main className="bg-white font-['Montserrat'] px-6 md:px-10 pt-24 lg:pt-16 pb-20">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] uppercase tracking-widest text-black/50 mb-5">
        <Link href="/magazine" className="hover:text-black transition-colors">Magazine</Link>
        <span aria-hidden>/</span>
        <span>Projects</span>
      </nav>
      <div className="flex items-end justify-between border-b border-black pb-5 mb-10">
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">Projects</h1>
        <span className="text-[12px] text-black/50 tabular-nums">{projects.length} projects</span>
      </div>

      {projects.length === 0 ? (
        <p className="py-24 text-center text-lg">No projects yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
          {projects.map((p) => <ProjectCard key={p.id} project={p} />)}
        </div>
      )}
    </main>
  );
}
