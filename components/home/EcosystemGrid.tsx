import Link from "next/link";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";

const ECOSYSTEM = [
  { id: "core",      label: "Core Collective", href: "/2026/core",          description: "The architects and studios shaping the 2026 edition.",          accent: "border-pov-clay" },
  { id: "elevate",   label: "POV Elevate",      href: "/ecosystem/elevate",  description: "Spatial experiences commissioned for brands with vision.",       accent: "border-pov-rust" },
  { id: "edits",     label: "POV Edits",        href: "/ecosystem/edits",    description: "Curated material and product stories.",                          accent: "border-white/20" },
  { id: "circle",    label: "The Circle",       href: "/2026/circle",        description: "Panels, conversations, and thought leadership.",                  accent: "border-pov-clay" },
  { id: "originals", label: "POV Originals",    href: "/ecosystem/originals",description: "Limited collaborations between designers and makers.",            accent: "border-pov-rust" },
  { id: "journal",   label: "Journal",          href: "/journal",            description: "The editorial voice of a design institution.",                   accent: "border-white/20" },
];

export default function EcosystemGrid() {
  return (
    <Section variant="default" spacing="lg" border="top">
      <Container>
        <SectionHeader
          label="The Ecosystem"
          title={<>Design POV<br />in six dimensions.</>}
          subtitle="Each arm of the ecosystem builds towards something larger than the sum of its parts."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {ECOSYSTEM.map((item) => (
            <Link key={item.id} href={item.href}
              className={`group bg-pov-black p-8 flex flex-col justify-between min-h-[200px] border-l-2 ${item.accent} hover:bg-pov-slate transition-colors duration-500`}>
              <p className="text-label text-pov-mist group-hover:text-pov-clay transition-colors duration-300">{item.label}</p>
              <div>
                <p className="text-sm text-pov-mist font-light leading-relaxed mb-4">{item.description}</p>
                <span className="text-label text-pov-clay opacity-0 group-hover:opacity-100 transition-opacity duration-300">Explore →</span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
