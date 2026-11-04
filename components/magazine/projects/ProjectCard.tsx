import Link from "next/link";
import Image from "@/components/common/SmartImage";
import { projectLocation, type Project } from "@/lib/projects";

type CardProject = Pick<Project, "slug" | "title" | "architects" | "category" | "city" | "country" | "year" | "coverImage">;

/** Project teaser: photo, category, "Title / Architects", location · year. */
export default function ProjectCard({ project, className = "" }: { project: CardProject; className?: string }) {
  const meta = [projectLocation(project), project.year].filter(Boolean).join(" · ");
  return (
    <Link href={`/magazine/projects/${project.slug}`} className={`group flex flex-col ${className}`}>
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100 mb-4">
        {project.coverImage && (
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}
      </div>
      <div className="flex flex-col gap-2">
        {project.category && <span className="text-[16px] text-black/60">{project.category}</span>}
        <h3 className="text-base md:text-[18px] font-medium leading-tight text-black line-clamp-2 group-hover:text-red-600 transition-colors">
          {project.title}
          {project.architects && <span className="text-black/50 font-normal"> / {project.architects}</span>}
        </h3>
        {meta && <p className="mt-1 text-[11px] font-medium text-black/60 uppercase">{meta}</p>}
      </div>
    </Link>
  );
}
