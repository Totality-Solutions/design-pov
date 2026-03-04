import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";

const PILLARS = [
  { number: "01", title: "Architects", body: "The Core Collective — studios and practitioners who define how spaces feel, not just how they look." },
  { number: "02", title: "Brands",     body: "Design partners who understand that great products deserve great contexts to live in." },
  { number: "03", title: "Builders",   body: "The build partners who translate vision into material reality, and know that craft is never an afterthought." },
];

export default function WhatWeStandFor() {
  return (
    <Section variant="default" spacing="lg" border="top">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <p className="text-label text-pov-clay mb-8">What We Stand For</p>
            <p className="font-display text-pov-white" style={{ fontSize: "clamp(1.8rem,4vw,3.2rem)", lineHeight: "1.1", letterSpacing: "-0.01em" }}>
              Design POV shouldn&apos;t feel like an event.
              <br /><span className="italic text-pov-mist">It should feel like a reckoning.</span>
            </p>
            <p className="text-editorial text-pov-mist mt-8 max-w-md">
              We exist at the intersection of architecture, brand, and build culture — where the conversation is rigorous, the curation is intentional, and the outcomes last longer than three days in May.
            </p>
          </div>
          <div className="flex flex-col gap-8">
            {PILLARS.map((p) => (
              <div key={p.number} className="flex gap-6 pb-8 border-b border-white/5 last:border-0 last:pb-0">
                <span className="text-label text-pov-clay mt-1 shrink-0">{p.number}</span>
                <div>
                  <h3 className="text-label text-pov-white mb-3">{p.title}</h3>
                  <p className="text-sm text-pov-mist font-light leading-relaxed">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
