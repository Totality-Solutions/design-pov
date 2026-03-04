// FeaturedDesigners.tsx
import Link from "next/link";

const FEATURED = [
  { name: "Studio Name", location: "Mumbai", slug: "studio-name" },
  { name: "Studio Name", location: "Delhi", slug: "studio-name-2" },
  { name: "Studio Name", location: "Bangalore", slug: "studio-name-3" },
  { name: "Studio Name", location: "Mumbai", slug: "studio-name-4" },
];

export default function FeaturedDesigners() {
  return (
    <section className="section-pov bg-pov-black border-t border-white/5">
      <div className="container-pov">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-label text-pov-clay mb-4">Core Collective</p>
            <h2
              className="font-display text-pov-white"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1 }}
            >
              The Studios.
            </h2>
          </div>
          <Link href="/2026/core" className="text-label text-pov-mist hover:text-pov-white transition-colors link-pov hidden md:block">
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
          {FEATURED.map((studio, i) => (
            <Link
              key={i}
              href={`/2026/core/${studio.slug}`}
              className="group bg-pov-black aspect-square flex flex-col justify-end p-6 relative overflow-hidden hover:bg-pov-slate transition-colors duration-500"
            >
              {/* Placeholder image area */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-pov-black/80 z-10" />
              <div className="absolute inset-0 bg-pov-slate/30" />

              <div className="relative z-20">
                <p className="text-label text-pov-clay mb-1">{studio.location}</p>
                <p className="font-display text-pov-white text-xl">{studio.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
