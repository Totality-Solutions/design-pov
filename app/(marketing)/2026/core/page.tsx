import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Core Collective — 2026",
  description: "The architects and studios of Design POV 2026.",
};

// This data will come from Sanity CMS in production
const STUDIOS_2026 = Array(8).fill(null).map((_, i) => ({
  name: `Studio ${String.fromCharCode(65 + i)}`,
  location: ["Mumbai", "Delhi", "Bangalore", "Pune"][i % 4],
  slug: `studio-${String.fromCharCode(97 + i)}`,
  concept: "Installation concept coming soon",
}));

export default function CoreCollective() {
  return (
    <div className="bg-pov-black min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-16 border-b border-white/5">
        <div className="container-pov">
          <div className="flex items-start justify-between gap-8">
            <div>
              <p className="text-label text-pov-clay mb-6">2026 · Core Collective</p>
              <h1
                className="font-display text-pov-white"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: "0.95" }}
              >
                The Studios.
              </h1>
            </div>
            <div className="hidden md:block max-w-xs">
              <p className="text-sm text-pov-mist font-light leading-relaxed mt-16">
                Each Core studio designs an original installation that responds to the 2026 theme,
                integrating collaborating brand partners into the spatial experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Year selector */}
      <div className="border-b border-white/5">
        <div className="container-pov">
          <div className="flex gap-8 py-5">
            <Link href="/2026/core" className="text-label text-pov-white border-b border-pov-clay pb-1">
              2026
            </Link>
            <button className="text-label text-pov-mist hover:text-pov-white transition-colors">
              2025 (Archive)
            </button>
          </div>
        </div>
      </div>

      {/* Studio grid */}
      <section className="section-pov">
        <div className="container-pov">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
            {STUDIOS_2026.map((studio) => (
              <Link
                key={studio.slug}
                href={`/2026/core/${studio.slug}`}
                className="group bg-pov-black hover:bg-pov-slate transition-colors duration-500 overflow-hidden"
              >
                {/* Image placeholder */}
                <div className="aspect-square bg-pov-slate relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-pov-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-label text-pov-clay">{studio.location}</p>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-pov-white text-xl mb-2 group-hover:text-pov-clay transition-colors duration-300">
                    {studio.name}
                  </h3>
                  <p className="text-label text-pov-mist">{studio.concept}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
