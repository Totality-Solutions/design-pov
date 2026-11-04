"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "@/components/common/SmartImage";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import ProjectCard from "./ProjectCard";
import { formatProjectDate, projectLocation, type Project, type ProjectGalleryImage } from "@/lib/projects";

// Project page, modelled on ArchDaily's project layout: title, a single hero
// photo, fact sheet beside the architects' text, the full
// project gallery, the office, tags, and previous / next projects. Every
// photo opens a full-screen viewer.

type Neighbour = Pick<Project, "slug" | "title" | "architects" | "coverImage">;

const SPECS_VISIBLE = 8;
const GALLERY_PREVIEW = 9;

/** Only http(s) links from the CMS become hrefs. */
function safeUrl(raw: string): string | null {
  const v = raw.trim();
  if (!v) return null;
  try {
    const url = new URL(/^[a-z][a-z0-9+.-]*:/i.test(v) ? v : `https://${v}`);
    return url.protocol === "http:" || url.protocol === "https:" ? url.href : null;
  } catch {
    return null;
  }
}

export default function ProjectDetail({
  project,
  previous,
  next,
  more,
}: {
  project: Project;
  previous: Neighbour | null;
  next: Neighbour | null;
  more: Project[];
}) {
  // The viewer walks the gallery; images placed in the text that aren't in
  // the gallery are appended so they open in the same viewer.
  const viewerImages: ProjectGalleryImage[] = [...project.gallery];
  project.content.forEach((b) => {
    if (b.type === "image" && !viewerImages.some((g) => g.src === b.value)) viewerImages.push({ src: b.value, caption: b.caption });
  });
  if (project.coverImage && !viewerImages.some((g) => g.src === project.coverImage)) viewerImages.unshift({ src: project.coverImage });

  const indexOf = (src: string) => Math.max(0, viewerImages.findIndex((g) => g.src === src));
  // The hero is one static image: the chosen hero / cover photo.
  const heroImage = viewerImages[indexOf(project.coverImage)];
  const [viewer, setViewer] = useState<number | null>(null);
  const [moreSpecs, setMoreSpecs] = useState(false);
  const [allPhotos, setAllPhotos] = useState(false);

  const credit = project.photographer ? `© ${project.photographer}` : "";
  const location = projectLocation(project);
  const officeUrl = safeUrl(project.officeUrl);
  const tags = Array.from(new Set([project.category, ...project.tags, project.city, project.country].filter(Boolean)));

  const step = useCallback(
    (dir: -1 | 1) => setViewer((i) => (i === null ? i : (i + dir + viewerImages.length) % viewerImages.length)),
    [viewerImages.length]
  );

  // Keyboard + scroll lock while the viewer is open.
  useEffect(() => {
    if (viewer === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setViewer(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [viewer, step]);

  // Fixed fields first, then the free-form specifications in the CMS's order.
  // Long fact sheets fold after SPECS_VISIBLE rows behind "+ More specs".
  const specs = ([
    ["Architects", project.architects],
    ["Area", project.area],
    ["Year", project.year],
    ["Photographs", project.photographer],
    ["Category", project.category],
    ...project.extraSpecs.map((s) => [s.label, s.value]),
    ["City", project.city],
    ["Country", project.country],
    ["Design Team", project.designTeam.join(", ")],
  ] as [string, string][]).filter(([, v]) => v);
  const galleryShown = allPhotos ? viewerImages : viewerImages.slice(0, GALLERY_PREVIEW);

  return (
    <article className="bg-white font-['Montserrat'] text-black">
      {/* ── Breadcrumb + title ── */}
      <header className="px-6 md:px-10 pt-24 lg:pt-16 pb-6">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] uppercase tracking-widest text-black/50 mb-5">
          <Link href="/magazine" className="hover:text-black transition-colors">Magazine</Link>
          <span aria-hidden>/</span>
          <Link href="/magazine/projects" className="hover:text-black transition-colors">Projects</Link>
          {project.category && (
            <>
              <span aria-hidden>/</span>
              <span>{project.category}</span>
            </>
          )}
          {project.country && (
            <>
              <span aria-hidden>/</span>
              <span>{project.country}</span>
            </>
          )}
        </nav>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-tight max-w-5xl">
          {project.title}
          {project.architects && <span className="font-normal text-black/50"> / {project.architects}</span>}
        </h1>
      </header>

      {/* ── Hero: one static image (not clickable) ── */}
      {heroImage && (
        <section className="px-6 md:px-10">
          <div className="relative w-full aspect-[4/3] md:aspect-[16/9] max-h-[82vh] bg-neutral-100 overflow-hidden">
            <Image src={heroImage.src} alt={heroImage.caption || project.title} fill priority sizes="100vw" className="object-cover" />
            {credit && <span className="absolute left-3 bottom-3 text-[11px] text-white/90 drop-shadow pointer-events-none">{credit}</span>}
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 text-[13px] text-black/60">
            {project.category && <span className="uppercase tracking-widest text-[11px] text-black">{project.category}</span>}
            {location && <span>{location}</span>}
            {project.publishedOn && <span>{formatProjectDate(project.publishedOn)}</span>}
          </div>
        </section>
      )}

      {/* ── Fact sheet + text ── */}
      <div className="px-6 md:px-10 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10 lg:gap-16">
        <aside className="lg:sticky lg:top-24 self-start">
          <dl className="border-t border-black">
            {(moreSpecs ? specs : specs.slice(0, SPECS_VISIBLE)).map(([label, value], i) => (
              <div key={`${label}-${i}`} className="py-3 border-b border-black/10">
                <dt className="text-[11px] uppercase tracking-widest text-black/50 mb-1">{label}</dt>
                <dd className="text-[15px] leading-snug whitespace-pre-line">{value}</dd>
              </div>
            ))}
          </dl>
          {specs.length > SPECS_VISIBLE && (
            <button
              type="button"
              onClick={() => setMoreSpecs((v) => !v)}
              className="mt-3 text-[11px] uppercase tracking-widest text-black/60 hover:text-primary-red transition-colors"
            >
              {moreSpecs ? "− Less specs" : "+ More specs"}
            </button>
          )}
        </aside>

        <div className="max-w-3xl flex flex-col gap-6">
          {project.textCredit && <p className="italic text-black/50 text-[15px]">{project.textCredit}</p>}
          {project.content.map((block, i) => {
            switch (block.type) {
              case "text":
                return (
                  <div key={i} className="flex flex-col gap-4">
                    {block.title && <h2 className="text-2xl font-medium tracking-tight mt-4">{block.title}</h2>}
                    {block.value.split(/\n\s*\n/).map((para, j) => {
                      const lines = para.split("\n").map((l) => l.trim()).filter(Boolean);
                      // A paragraph made only of "- " lines is a bullet list.
                      return lines.length > 0 && lines.every((l) => /^[-•*] /.test(l)) ? (
                        <ul key={j} className="flex flex-col gap-3 text-[17px] md:text-lg leading-relaxed text-black/80">
                          {lines.map((l, k) => (
                            <li key={k} className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-[0.7em] before:w-2.5 before:h-px before:bg-primary-red">
                              {l.slice(2)}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p key={j} className="text-[17px] md:text-lg leading-relaxed text-black/80 whitespace-pre-line">{para}</p>
                      );
                    })}
                  </div>
                );
              case "heading":
                return <h2 key={i} className="text-2xl md:text-3xl font-medium tracking-tight mt-6">{block.value}</h2>;
              case "quote":
                return (
                  <blockquote key={i} className="border-y border-black/10 py-8 my-2 text-2xl font-medium italic leading-snug">
                    “{block.value}”
                  </blockquote>
                );
              case "image":
                return (
                  <figure key={i} className="my-4 lg:-mr-16">
                    <button type="button" onClick={() => setViewer(indexOf(block.value))} className="block w-full cursor-zoom-in" aria-label="Open full-screen gallery">
                      <Image src={block.value} alt={block.caption || project.title} width={1600} height={1067} sizes="(max-width: 1024px) 100vw, 60vw" className="w-full h-auto" />
                    </button>
                    {(block.caption || credit) && (
                      <figcaption className="mt-2 text-[12px] text-black/50 flex flex-wrap gap-x-3">
                        {block.caption && <span>{block.caption}</span>}
                        {credit && <span>{credit}</span>}
                      </figcaption>
                    )}
                  </figure>
                );
            }
          })}
        </div>
      </div>

      {/* ── Project gallery ── */}
      {viewerImages.length > 1 && (
        <section className="px-6 md:px-10 pb-16">
          <div className="flex items-end justify-between border-t border-black pt-4 mb-6">
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight">Project gallery</h2>
            <span className="text-[12px] text-black/50 tabular-nums">{viewerImages.length} images</span>
          </div>
          <div className="columns-2 md:columns-3 gap-3 [&>*]:mb-3">
            {galleryShown.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setViewer(i)}
                className="relative block w-full break-inside-avoid overflow-hidden bg-neutral-100 cursor-zoom-in group"
                aria-label={`Open image ${i + 1} of ${viewerImages.length}`}
              >
                <Image src={img.src} alt={img.caption || `${project.title} — image ${i + 1}`} width={800} height={600} sizes="(max-width: 768px) 50vw, 33vw" className="w-full h-auto transition-transform duration-700 group-hover:scale-105" />
              </button>
            ))}
          </div>
          {viewerImages.length > GALLERY_PREVIEW && (
            <button
              type="button"
              onClick={() => setAllPhotos((v) => !v)}
              className="mt-4 border border-black px-6 py-3 text-[11px] uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
            >
              {allPhotos ? "Show less" : `See all ${viewerImages.length} images`}
            </button>
          )}
        </section>
      )}

      {/* ── Office + tags ── */}
      <section className="px-6 md:px-10 pb-16 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10 lg:gap-16">
        {project.officeName ? (
          <div>
            <p className="text-[11px] uppercase tracking-widest text-black/50 border-t border-black pt-4 mb-4">About this office</p>
            <div className="flex items-center gap-4">
              {project.officeLogo && (
                <div className="relative w-16 h-16 shrink-0 bg-neutral-100 overflow-hidden">
                  <Image src={project.officeLogo} alt={project.officeName} fill sizes="64px" className="object-cover" />
                </div>
              )}
              <div>
                {officeUrl ? (
                  <a href={officeUrl} target="_blank" rel="noopener noreferrer" className="text-lg font-medium hover:text-primary-red transition-colors">
                    {project.officeName} ↗
                  </a>
                ) : (
                  <p className="text-lg font-medium">{project.officeName}</p>
                )}
                <p className="text-[12px] text-black/50">Office</p>
              </div>
            </div>
          </div>
        ) : (
          <div />
        )}
        {tags.length > 0 && (
          <div>
            <p className="text-[11px] uppercase tracking-widest text-black/50 border-t border-black pt-4 mb-4">Tags</p>
            <div className="flex flex-wrap gap-2">
              {tags.map((t) => (
                <span key={t} className="border border-black/15 px-3 py-1.5 text-[12px]">{t}</span>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ── Previous / next ── */}
      {(previous || next) && (
        <nav aria-label="More projects" className="border-y border-black/10 grid grid-cols-1 md:grid-cols-2">
          <NeighbourLink project={previous} label="Previous project" align="left" />
          <NeighbourLink project={next} label="Next project" align="right" />
        </nav>
      )}

      {/* ── More projects ── */}
      {more.length > 0 && (
        <section className="px-6 md:px-10 py-14">
          <div className="flex items-end justify-between border-t border-black pt-4 mb-8">
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight">More projects</h2>
            <Link href="/magazine/projects" className="text-[11px] uppercase tracking-widest text-black/60 hover:text-primary-red transition-colors">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {more.map((p) => <ProjectCard key={p.id} project={p} />)}
          </div>
        </section>
      )}

      {/* ── Full-screen viewer ── */}
      {viewer !== null && viewerImages[viewer] && (
        <div className="fixed inset-0 z-[9991] bg-black flex flex-col" role="dialog" aria-modal="true" aria-label="Project gallery">
          <div className="flex items-center justify-between px-4 md:px-6 h-14 text-white/80 text-[13px] shrink-0">
            <span className="tabular-nums">{viewer + 1} / {viewerImages.length}</span>
            <span className="hidden md:block truncate px-6">{project.title}</span>
            <button type="button" onClick={() => setViewer(null)} className="p-2 hover:text-white" aria-label="Close">
              <FiX size={26} />
            </button>
          </div>
          <div className="relative flex-1 min-h-0" onClick={() => setViewer(null)}>
            <div className="absolute inset-0 mx-4 md:mx-20" onClick={(e) => e.stopPropagation()}>
              <Image key={viewerImages[viewer].src} src={viewerImages[viewer].src} alt={viewerImages[viewer].caption || project.title} fill sizes="100vw" className="object-contain" />
            </div>
            {viewerImages.length > 1 && (
              <>
                <button type="button" onClick={(e) => { e.stopPropagation(); step(-1); }} className="absolute left-1 md:left-4 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white" aria-label="Previous image">
                  <FiChevronLeft size={34} />
                </button>
                <button type="button" onClick={(e) => { e.stopPropagation(); step(1); }} className="absolute right-1 md:right-4 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white" aria-label="Next image">
                  <FiChevronRight size={34} />
                </button>
              </>
            )}
          </div>
          <div className="px-4 md:px-6 py-4 text-[12px] text-white/70 flex flex-wrap gap-x-4 min-h-[52px] shrink-0">
            {viewerImages[viewer].caption && <span className="text-white">{viewerImages[viewer].caption}</span>}
            {credit && <span>{credit}</span>}
          </div>
        </div>
      )}
    </article>
  );
}

function NeighbourLink({ project, label, align }: { project: Neighbour | null; label: string; align: "left" | "right" }) {
  if (!project) return <div className="hidden md:block" />;
  return (
    <Link
      href={`/magazine/projects/${project.slug}`}
      className={`group flex items-center gap-4 md:gap-6 px-6 md:px-10 py-6 md:py-8 hover:bg-neutral-50 transition-colors ${
        align === "right" ? "md:flex-row-reverse md:text-right md:border-l border-black/10" : ""
      } border-b md:border-b-0 border-black/10`}
    >
      <div className="relative w-28 aspect-[4/3] md:w-40 shrink-0 overflow-hidden bg-neutral-100">
        {project.coverImage && <Image src={project.coverImage} alt="" fill sizes="160px" className="object-cover transition-transform duration-500 group-hover:scale-110" />}
      </div>
      {/* flex-1 + min-w-0: the text takes the remaining width and wraps instead of being cut off */}
      <div className="flex-1 min-w-0">
        <p className="text-[12px] font-semibold uppercase tracking-widest text-black/70 mb-2 group-hover:text-primary-red transition-colors">
          {align === "left" ? "← " : ""}{label}{align === "right" ? " →" : ""}
        </p>
        <p className="text-lg md:text-xl font-semibold leading-snug text-black break-words">{project.title}</p>
        {project.architects && <p className="text-sm md:text-[15px] text-black/60 mt-1 break-words">{project.architects}</p>}
      </div>
    </Link>
  );
}
