import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetail from "@/components/magazine/projects/ProjectDetail";
import { getPublishedProject, getPublishedProjectCards } from "@/lib/projectsServer";
import { isSampleProject, projectHeading, projectLocation, type Project } from "@/lib/projects";
import { cache } from "react";
import JsonLd from "@/components/seo/JsonLd";
import { absoluteUrl, LOGO_URL, pageMetadata, SITE_NAME, SITE_URL, toDescription } from "@/lib/seo";

// Saving in CMS → Projects revalidates the page; this is the fallback.
export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

// generateMetadata and the page both need the project — one database read per request.
const getProject = cache(getPublishedProject);

/** "Agarwada, Goa, India, 2025 — <first real paragraph>" (skips bullet lists like Highlights). */
function projectSummary(project: Project): string {
  const paragraphs = project.content
    .filter((b) => b.type === "text")
    .flatMap((b) => b.value.split(/\n\s*\n/))
    .map((p) => p.trim())
    .filter((p) => p && !/^[-•*] /.test(p));
  const lead = [projectLocation(project), project.year].filter(Boolean).join(", ");
  return toDescription([lead, paragraphs[0]].filter(Boolean).join(" — "));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Project not found", robots: { index: false } };

  return pageMetadata({
    title: projectHeading(project),
    description: projectSummary(project),
    path: `/magazine/projects/${project.slug}`,
    image: project.coverImage || undefined,
    type: "article",
    publishedTime: project.publishedOn || undefined,
    // Sample/test projects (fictional content) stay out of search results.
    noIndex: isSampleProject(project),
  });
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const [project, all] = await Promise.all([getProject(slug), getPublishedProjectCards()]);
  if (!project) notFound();

  // The project as schema.org Article about a building: architects, location, year, photos.
  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: projectHeading(project),
    description: projectSummary(project),
    image: [project.coverImage, ...project.gallery.slice(0, 5).map((g) => g.src)].filter(Boolean).map(absoluteUrl),
    datePublished: project.publishedOn || undefined,
    author: { "@type": "Organization", name: project.architects || SITE_NAME },
    publisher: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: SITE_NAME, logo: { "@type": "ImageObject", url: LOGO_URL } },
    mainEntityOfPage: absoluteUrl(`/magazine/projects/${project.slug}`),
    about: {
      "@type": "Place",
      name: project.title,
      ...(projectLocation(project) ? { address: projectLocation(project) } : {}),
    },
    keywords: [project.category, ...project.tags].filter(Boolean).join(", "),
  };

  // Newest first: "previous" is the newer project, "next" the older one.
  const i = all.findIndex((p) => p.slug === slug);
  const previous = i > 0 ? all[i - 1] : null;
  const next = i >= 0 && i < all.length - 1 ? all[i + 1] : null;
  const others = all.filter((p) => p.slug !== slug);

  return (
    <>
      <JsonLd data={projectSchema} />
      <ProjectDetail project={project} previous={previous} next={next} others={others} />
    </>
  );
}
