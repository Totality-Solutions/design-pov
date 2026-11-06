import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetail from "@/components/magazine/projects/ProjectDetail";
import { getPublishedProject, getPublishedProjectCards } from "@/lib/projectsServer";
import { projectHeading, projectLocation } from "@/lib/projects";

// Saving in CMS → Projects revalidates the page; this is the fallback.
export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPublishedProject(slug);
  if (!project) return { title: "Project not found" };

  const intro = project.content.find((b) => b.type === "text")?.value.split(/\n\s*\n/)[0] ?? "";
  const description = [projectLocation(project), project.year].filter(Boolean).join(", ") + (intro ? ` — ${intro}` : "");
  return {
    title: `${projectHeading(project)} | Design POV`,
    description: description.slice(0, 200),
    openGraph: {
      title: projectHeading(project),
      description: description.slice(0, 200),
      images: project.coverImage ? [project.coverImage] : undefined,
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const [project, all] = await Promise.all([getPublishedProject(slug), getPublishedProjectCards()]);
  if (!project) notFound();

  // Newest first: "previous" is the newer project, "next" the older one.
  const i = all.findIndex((p) => p.slug === slug);
  const previous = i > 0 ? all[i - 1] : null;
  const next = i >= 0 && i < all.length - 1 ? all[i + 1] : null;
  const others = all.filter((p) => p.slug !== slug);

  return <ProjectDetail project={project} previous={previous} next={next} others={others} />;
}
