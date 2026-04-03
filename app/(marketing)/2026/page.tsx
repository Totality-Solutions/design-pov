import PartnersSection from "@/components/edition26/PartnersSection";
import ScheduleSection from "@/components/edition26/ScheduleSection";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "2026 Edition — Sense & Sensibility",
  description: "The Design POV 2026 edition. A meditation on how design speaks to our bodies before our minds.",
};

const SECTIONS = [
  { label: "Theme", href: "/2026/theme", desc: "Sense & Sensibility — the conceptual framework" },
  { label: "Core Collective", href: "/2026/core", desc: "The studios defining this edition" },
  { label: "Design Partners", href: "/2026/design-partners", desc: "Brands building the culture" },
  { label: "The Circle", href: "/2026/circle", desc: "Panels, speakers, conversation" },
  { label: "Art & Installations", href: "/2026/art-installations", desc: "Commissioned works" },
  { label: "Visit", href: "/2026/visit", desc: "Join the waitlist for May 2026" },
];

export default function Edition2026() {
  return (
    <div className="bg-pov-black min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-16 section-pov border-b border-white/5">
        <div className="container-pov">
          <p className="text-label text-pov-clay mb-6">Design POV · 2026 Edition</p>
          <h1
            className="font-display text-pov-white"
            style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)", lineHeight: "0.9", letterSpacing: "-0.02em" }}
          >
            Sense &amp;
            <br />
            <em className="text-pov-clay">Sensibility</em>
          </h1>
          <p className="text-editorial text-pov-mist mt-8 max-w-lg">
            The 2026 edition of Design POV asks how the built environment communicates
            with bodies before minds — through texture, light, temperature, and material memory.
          </p>
        </div>
      </section>

      {/* Section Navigation */}
      <section className="section-pov">
        <div className="container-pov">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
            {SECTIONS.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group bg-pov-black hover:bg-pov-slate transition-colors duration-500 p-8 flex flex-col justify-between min-h-[180px]"
              >
                <p className="text-label text-pov-mist group-hover:text-pov-clay transition-colors duration-300">
                  {s.label}
                </p>
                <div>
                  <p className="text-sm text-pov-mist font-light mb-4">{s.desc}</p>
                  <span className="text-label text-pov-clay opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ScheduleSection />
      <PartnersSection />
    </div>
  );
}
