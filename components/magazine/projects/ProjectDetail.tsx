"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "@/components/common/SmartImage";
import { FiChevronDown, FiChevronLeft, FiChevronRight, FiGlobe, FiX } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { formatProjectDate, instagramHandle, projectLocation, type Project, type ProjectGalleryImage } from "@/lib/projects";

// Project page, modelled on ArchDaily's project layout: title, a single hero
// photo, fact sheet beside the architects' text, the full project gallery,
// the office, tags, and previous / next projects — with the other projects in
// a right sidebar, like the Magazine article page. Photos in the text and
// gallery open a full-screen viewer.

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
  others,
}: {
  project: Project;
  previous: Neighbour | null;
  next: Neighbour | null;
  /** Every other published project, newest first — the right sidebar. */
  others: Project[];
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
  const [specsOpen, setSpecsOpen] = useState(true);
  const specsListRef = useRef<HTMLDivElement>(null);

  // "+ More specs" on a scrolling list: glide down to the rows it just revealed.
  useEffect(() => {
    const list = specsListRef.current;
    if (moreSpecs && list && list.scrollHeight > list.clientHeight) {
      list.scrollTo({ top: list.scrollHeight, behavior: "smooth" });
    }
  }, [moreSpecs]);
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

      {/* ── Two columns: the project (left) + other projects (right), like the Magazine article page ── */}
      <div className="px-6 md:px-10 pb-16 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_340px] gap-12">
      <div className="min-w-0">

      {/* ── Hero: one static image (not clickable) ── */}
      {heroImage && (
        <section>
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
      {/* Desktop (xl): the specifications are a side panel that slides closed sideways, toggled by a tab on its
          right edge, and the text widens into the space. Smaller screens: it sits above the text and the
          heading opens / closes it vertically. */}
      <div className="py-12 lg:py-16 grid grid-cols-1 xl:grid-cols-[auto_minmax(0,1fr)] gap-10 xl:gap-12">
        <aside className="relative xl:sticky xl:top-24 self-start">
          <div
            className={`xl:overflow-hidden xl:transition-[width,visibility] xl:duration-300 xl:ease-out ${
              specsOpen ? "xl:w-60" : "xl:w-0 xl:invisible"
            }`}
          >
          {/* Fixed width inside, so the rows don't re-wrap while the panel slides. */}
          <div className="xl:w-60">
          <h2>
            <button
              type="button"
              onClick={() => setSpecsOpen((v) => !v)}
              aria-expanded={specsOpen}
              aria-controls="project-specs"
              className="group w-full flex items-center justify-between gap-3 border-b border-black pb-2 text-xs font-bold uppercase tracking-widest text-black/60 hover:text-black transition-colors"
            >
              Specifications
              <span className="xl:hidden w-6 h-6 flex items-center justify-center border border-black/20 group-hover:border-black group-hover:bg-black group-hover:text-white transition-colors">
                <FiChevronDown size={14} className={`transition-transform duration-300 ${specsOpen ? "rotate-180" : ""}`} aria-hidden />
              </span>
              <span className="sr-only">{specsOpen ? "Close" : "Open"}</span>
            </button>
          </h2>
          {/* Below xl: a vertical drawer (the grid row collapses). On xl the side panel does the hiding instead. */}
          <div
            id="project-specs"
            className={`grid transition-[grid-template-rows] duration-300 ease-out ${specsOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr] xl:grid-rows-[1fr]"}`}
          >
            {/* invisible when closed: also keeps the hidden rows out of keyboard focus and screen readers */}
            <div className={`overflow-hidden transition-[visibility] duration-300 ${specsOpen ? "visible" : "invisible"}`}>
              {/* Like the "More projects" sidebar: the heading stays put and the list scrolls on its own when
                  it's taller than the screen (e.g. after "+ More specs"), since the panel is sticky. */}
              <div ref={specsListRef} className="xl:max-h-[calc(100vh-9rem)] xl:overflow-y-auto no-scrollbar pb-1">
              <dl>
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
              </div>
            </div>
          </div>
          </div>
          </div>

          {/* Desktop side tab: on the panel's right edge, vertically centred; stays put when the panel is closed. */}
          <button
            type="button"
            onClick={() => setSpecsOpen((v) => !v)}
            aria-expanded={specsOpen}
            aria-controls="project-specs"
            aria-label={specsOpen ? "Close specifications" : "Open specifications"}
            title={specsOpen ? "Close specifications" : "Open specifications"}
            className="hidden xl:flex absolute top-1/2 left-full ml-2.5 -translate-y-1/2 z-10 w-7 h-14 items-center justify-center bg-black text-white shadow-lg hover:bg-primary-red transition-colors"
          >
            <FiChevronLeft size={18} className={`transition-transform duration-300 ${specsOpen ? "" : "rotate-180"}`} aria-hidden />
          </button>
        </aside>

        {/* Reading width while the specifications are open; full width when they're closed. */}
        <div className={`flex flex-col gap-6 transition-[max-width] duration-300 ease-out ${specsOpen ? "max-w-3xl" : "max-w-full"}`}>
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
                  <figure key={i} className="my-4">
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
        <section className="pb-16">
          <div className="flex items-end justify-between border-t border-black pt-4 mb-6">
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight">Project gallery</h2>
            <span className="text-[12px] text-black/50 tabular-nums">{viewerImages.length} images</span>
          </div>
          <div className="columns-2 xl:columns-3 gap-3 [&>*]:mb-3">
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
      <section className="pb-16 grid grid-cols-1 xl:grid-cols-[240px_1fr] gap-10 xl:gap-12">
        {project.officeName ? (
          <div>
            <p className="text-[11px] uppercase tracking-widest text-black/50 border-t border-black pt-4 mb-4">About this office</p>
            <div className="flex items-center gap-4">
              {project.officeLogo && (
                // Portrait frame anchored to the top, so a photo of the architects keeps their faces in view.
                <div className="relative w-24 aspect-[3/4] shrink-0 bg-neutral-100 overflow-hidden">
                  <Image src={project.officeLogo} alt={project.officeName} fill sizes="96px" className="object-cover object-top" />
                </div>
              )}
              <div className="min-w-0">
                <p className="text-lg font-medium">{project.officeName}</p>
                <p className="text-[12px] text-black/50">Office</p>
              </div>
            </div>
                {/* Both links are optional — each shows only when set in the CMS. Below the photo, so a long
                    handle or address has the column's full width. */}
                {(project.officeInstagram || officeUrl) && (
                  <div className="flex flex-col gap-2 mt-4">
                    {project.officeInstagram && (
                      <a
                        href={project.officeInstagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 text-[13px] text-black/70 hover:text-primary-red transition-colors"
                        aria-label={`${project.officeName} on Instagram`}
                      >
                        <span className="w-7 h-7 shrink-0 flex items-center justify-center border border-black/15 group-hover:border-primary-red transition-colors">
                          <FaInstagram size={14} aria-hidden />
                        </span>
                        <span className="truncate">{instagramHandle(project.officeInstagram)}</span>
                      </a>
                    )}
                    {officeUrl && (
                      <a
                        href={officeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 text-[13px] text-black/70 hover:text-primary-red transition-colors"
                        aria-label={`${project.officeName} website`}
                      >
                        <span className="w-7 h-7 shrink-0 flex items-center justify-center border border-black/15 group-hover:border-primary-red transition-colors">
                          <FiGlobe size={14} aria-hidden />
                        </span>
                        <span className="truncate">{new URL(officeUrl).hostname.replace(/^www\./, "")}</span>
                      </a>
                    )}
                  </div>
                )}
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
        <nav aria-label="Previous and next project" className="border-y border-black/10 grid grid-cols-1 md:grid-cols-2">
          <NeighbourLink project={previous} label="Previous project" align="left" />
          <NeighbourLink project={next} label="Next project" align="right" />
        </nav>
      )}
      </div>

      {/* ── Right sidebar: the other projects ── */}
      {others.length > 0 && (
        <aside aria-label="More projects" className="lg:sticky lg:top-24 self-start">
          <div className="flex items-end justify-between border-b border-black pb-2 mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-black/60">More projects</h2>
            <Link href="/magazine/projects" className="text-[11px] uppercase tracking-widest text-black/50 hover:text-primary-red transition-colors">
              View all →
            </Link>
          </div>
          {/* Desktop: scrolls on its own when the list is taller than the screen. */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 lg:max-h-[calc(100vh-9rem)] lg:overflow-y-auto no-scrollbar">
            {others.map((p) => (
              <Link key={p.id} href={`/magazine/projects/${p.slug}`} className="group block">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                  {p.coverImage && (
                    <Image src={p.coverImage} alt={p.title} fill sizes="(max-width: 1024px) 50vw, 340px" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    {p.category && <span className="text-white/70 text-[10px] uppercase tracking-widest">{p.category}</span>}
                    <h3 className="text-white text-[15px] mt-1 font-semibold leading-snug group-hover:underline underline-offset-4">{p.title}</h3>
                    {p.architects && <p className="text-white/70 text-[12px] mt-0.5">{p.architects}</p>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </aside>
      )}
      </div>

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
      className={`group flex items-center gap-4 md:gap-5 py-6 md:py-8 ${align === "right" ? "md:pl-6" : "md:pr-6"} hover:bg-neutral-50 transition-colors ${
        align === "right" ? "md:flex-row-reverse md:text-right md:border-l border-black/10" : ""
      } border-b md:border-b-0 border-black/10`}
    >
      <div className="relative w-28 aspect-[4/3] xl:w-36 shrink-0 overflow-hidden bg-neutral-100">
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
