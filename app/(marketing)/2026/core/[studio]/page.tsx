import type { Metadata } from "next";
import Link from "next/link";

// In production: fetch from Sanity using generateStaticParams
export async function generateStaticParams() {
  // const studios = await sanityClient.fetch(studiosQuery);
  // return studios.map((s: Studio) => ({ studio: s.slug }));
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: { studio: string };
}): Promise<Metadata> {
  // In production: fetch from Sanity
  return {
    title: `${params.studio} — Core Collective 2026`,
  };
}

export default function StudioPage({ params }: { params: { studio: string } }) {
  // In production: const studio = await sanityClient.fetch(studioQuery, { slug: params.studio });

  return (
    <div className="bg-pov-black min-h-screen">
      {/* Breadcrumb */}
      <div className="pt-24 pb-0 border-b border-white/5">
        <div className="container-pov py-4">
          <div className="flex items-center gap-3">
            <Link href="/2026/core" className="text-label text-pov-mist hover:text-pov-white transition-colors">
              Core Collective
            </Link>
            <span className="text-label text-pov-mist">/</span>
            <span className="text-label text-pov-white capitalize">
              {params.studio.replace(/-/g, " ")}
            </span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="section-pov border-b border-white/5">
        <div className="container-pov grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Studio info */}
          <div>
            <p className="text-label text-pov-clay mb-6">Studio · Mumbai</p>
            <h1
              className="font-display text-pov-white mb-8"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", lineHeight: "0.95" }}
            >
              Studio Name
            </h1>
            <p className="text-editorial text-pov-mist max-w-md">
              Studio philosophy will appear here — pulled from Sanity CMS. This
              describes the studio&apos;s approach, ethos, and design language.
            </p>

            {/* Meta */}
            <div className="mt-10 flex flex-col gap-4 border-t border-white/5 pt-8">
              {[
                { label: "Installation", value: "Concept title coming soon" },
                { label: "Brand Partner", value: "Partner name" },
                { label: "Build Partner", value: "Build partner name" },
              ].map((item) => (
                <div key={item.label} className="flex gap-8">
                  <span className="text-label text-pov-mist w-28 shrink-0">{item.label}</span>
                  <span className="text-label text-pov-white">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Image placeholder */}
          <div className="aspect-[4/3] bg-pov-slate" />
        </div>
      </section>

      {/* Installation concept */}
      <section className="section-pov border-b border-white/5">
        <div className="container-pov">
          <p className="text-label text-pov-clay mb-8">Installation Concept</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <p className="text-editorial text-pov-mist">
              The installation concept description will appear here from Sanity CMS.
              Full rich text rendering with pull quotes and imagery.
            </p>
            <div className="grid grid-cols-2 gap-px bg-white/5">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="aspect-square bg-pov-slate" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-12">
        <div className="container-pov flex items-center justify-between">
          <Link href="/2026/core" className="text-label text-pov-mist hover:text-pov-white transition-colors link-pov">
            ← All Studios
          </Link>
          <Link href="/2026/core" className="text-label text-pov-mist hover:text-pov-white transition-colors link-pov">
            Next Studio →
          </Link>
        </div>
      </section>
    </div>
  );
}
