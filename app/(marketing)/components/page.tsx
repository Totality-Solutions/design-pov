import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Tag from "@/components/ui/Tag";
import Divider from "@/components/ui/Divider";
import SectionHeader from "@/components/ui/SectionHeader";
import PageHero from "@/components/ui/PageHero";
import Card from "@/components/ui/Card";
import { Input, Textarea, Select } from "@/components/ui/FormFields";

export const metadata: Metadata = {
  title: "UI Components — Design System",
};

export default function ComponentsPage() {
  return (
    <div className="bg-pov-black min-h-screen">

      {/* ── PAGE HERO ──────────────────────────────────── */}
      <PageHero
        eyebrow="Internal · Design System"
        label="Components"
        title={<>UI Library<br /><em className="text-pov-clay">Reference.</em></>}
        subtitle="All reusable primitives for the Design POV website. Use these building blocks consistently across every page."
        size="md"
      />

      {/* ── BUTTONS ────────────────────────────────────── */}
      <Section variant="default" spacing="lg" border="bottom">
        <Container>
          <SectionHeader
            label="01 — Buttons"
            title="Button Variants"
            subtitle="All button states. Always use the Button component — never raw anchor or button tags."
          />

          <div className="flex flex-col gap-10">
            {/* Variant row */}
            <div>
              <p className="text-label text-pov-mist mb-5">Variants</p>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="clay">Clay</Button>
                <Button variant="danger">Danger</Button>
              </div>
            </div>

            {/* Size row */}
            <div>
              <p className="text-label text-pov-mist mb-5">Sizes</p>
              <div className="flex flex-wrap items-end gap-3">
                <Button variant="primary" size="sm">Small</Button>
                <Button variant="primary" size="md">Medium</Button>
                <Button variant="primary" size="lg">Large</Button>
              </div>
            </div>

            {/* States row */}
            <div>
              <p className="text-label text-pov-mist mb-5">States</p>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" loading>Loading</Button>
                <Button variant="primary" disabled>Disabled</Button>
                <Button variant="outline" href="/apply">As Link</Button>
                <Button variant="outline" href="https://example.com" external>External ↗</Button>
              </div>
            </div>

            {/* With icons */}
            <div>
              <p className="text-label text-pov-mist mb-5">With Icons</p>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" icon={<span>→</span>} iconPosition="right">Apply Now</Button>
                <Button variant="outline" icon={<span>↓</span>} iconPosition="left">Download Deck</Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── TAGS ───────────────────────────────────────── */}
      <Section variant="slate" spacing="lg" border="bottom">
        <Container>
          <SectionHeader label="02 — Tags" title="Tag Variants" />
          <div className="flex flex-wrap gap-3">
            <Tag variant="default">Installations</Tag>
            <Tag variant="clay">2026 Edition</Tag>
            <Tag variant="rust">Featured</Tag>
            <Tag variant="outline">Materials</Tag>
            <Tag variant="mist">Field Notes</Tag>
          </div>
        </Container>
      </Section>

      {/* ── SECTION + CONTAINER ────────────────────────── */}
      <Section variant="default" spacing="lg" border="bottom">
        <Container>
          <SectionHeader
            label="03 — Section + Container"
            title="Layout Primitives"
            subtitle="Section wraps background + spacing. Container constrains width and adds horizontal padding."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
            {[
              { label: "default", desc: "bg-pov-black", variant: "default" as const },
              { label: "slate",   desc: "bg-pov-slate", variant: "slate"   as const },
              { label: "cream",   desc: "bg-pov-cream", variant: "cream"   as const },
            ].map((v) => (
              <Section key={v.label} variant={v.variant} spacing="md">
                <Container>
                  <p className="text-label text-pov-clay mb-2">variant="{v.label}"</p>
                  <p className="text-sm text-pov-mist font-light">{v.desc}</p>
                </Container>
              </Section>
            ))}
          </div>

          {/* Container sizes */}
          <div className="mt-10 flex flex-col gap-2">
            <p className="text-label text-pov-mist mb-4">Container sizes</p>
            {(["sm", "md", "lg", "xl"] as const).map((s) => (
              <div key={s} className="bg-pov-slate/30 border border-white/5">
                <Container size={s}>
                  <div className="py-3 border-l-2 border-pov-clay pl-4">
                    <p className="text-label text-pov-white">size="{s}"</p>
                  </div>
                </Container>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── SECTION HEADER ─────────────────────────────── */}
      <Section variant="slate" spacing="lg" border="bottom">
        <Container>
          <SectionHeader label="04 — Section Header" title="SectionHeader Sizes" />

          <div className="flex flex-col gap-16">
            {(["sm", "md", "lg", "xl"] as const).map((s) => (
              <div key={s} className="border-l-2 border-pov-clay/30 pl-6">
                <SectionHeader
                  label={`size="${s}"`}
                  title="The Studios."
                  subtitle="Supporting text sits here, describing the section with restraint."
                  size={s}
                  action={
                    <Button variant="ghost" href="/2026/core" size="sm">
                      View all →
                    </Button>
                  }
                />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── CARDS ──────────────────────────────────────── */}
      <Section variant="default" spacing="lg" border="bottom">
        <Container>
          <SectionHeader label="05 — Cards" title="Card Variants" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
            {/* Default card */}
            <Card href="/2026/core/studio-a" variant="default">
              <Card.Image aspectRatio="landscape" />
              <Card.Body>
                <Card.Label>Mumbai · 2026</Card.Label>
                <Card.Title>Studio Collective A</Card.Title>
                <Card.Footer>
                  <span className="text-label text-pov-mist">Core</span>
                  <span className="text-label text-pov-clay opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </Card.Footer>
              </Card.Body>
            </Card>

            {/* Elevated card */}
            <Card href="/journal/article-1" variant="elevated">
              <Card.Image aspectRatio="landscape" />
              <Card.Body>
                <Card.Label>Conversations</Card.Label>
                <Card.Title size="md">On designing spaces that remember you</Card.Title>
                <Card.Footer>
                  <span className="text-label text-pov-mist">March 2026</span>
                  <span className="text-label text-pov-clay opacity-0 group-hover:opacity-100 transition-opacity">Read →</span>
                </Card.Footer>
              </Card.Body>
            </Card>

            {/* Bordered card */}
            <Card variant="bordered">
              <Card.Body padding="lg">
                <Card.Label>POV Elevate</Card.Label>
                <Card.Title size="lg">Spatial experiences for brands with vision.</Card.Title>
                <div className="mt-8">
                  <Button variant="outline" size="sm" href="/ecosystem/elevate">
                    Learn More
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        </Container>
      </Section>

      {/* ── FORM FIELDS ────────────────────────────────── */}
      <Section variant="slate" spacing="lg" border="bottom">
        <Container size="md">
          <SectionHeader label="06 — Form Fields" title="Inputs & Controls" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Studio Name" placeholder="e.g. Studio Prakruti" required />
            <Input label="Email" type="email" placeholder="hello@studio.com" required />
            <Input
              label="Website"
              type="url"
              placeholder="https://studio.com"
              hint="Include https://"
            />
            <Input
              label="Error state"
              placeholder="Something went wrong"
              error="This field is required"
              defaultValue="Bad value"
            />
            <Select
              label="Enquiry Type"
              placeholder="Select a type"
              options={[
                { value: "exhibit", label: "Exhibit" },
                { value: "sponsor", label: "Sponsor" },
                { value: "speak",   label: "Speak" },
              ]}
              required
            />
            <div className="md:col-span-2">
              <Textarea
                label="Installation Concept"
                placeholder="Describe your concept..."
                rows={4}
                hint="Keep it under 300 words"
                required
              />
            </div>
            <div className="md:col-span-2 flex gap-3">
              <Button variant="primary" type="submit" size="md">Submit Enquiry</Button>
              <Button variant="ghost" type="button" size="md">Cancel</Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── DIVIDER ────────────────────────────────────── */}
      <Section variant="default" spacing="lg" border="bottom">
        <Container size="md">
          <SectionHeader label="07 — Divider" title="Divider Variants" />

          <div className="flex flex-col gap-0">
            <p className="text-label text-pov-mist mb-4">variant="subtle" (default)</p>
            <Divider variant="subtle" spacing="md" />
            <p className="text-label text-pov-mist mb-4">variant="medium"</p>
            <Divider variant="medium" spacing="md" />
            <p className="text-label text-pov-mist mb-4">variant="clay"</p>
            <Divider variant="clay" spacing="md" />
            <p className="text-label text-pov-mist mb-4">With label</p>
            <Divider variant="subtle" spacing="md" label="OR" />
          </div>
        </Container>
      </Section>

      {/* ── TYPOGRAPHY ─────────────────────────────────── */}
      <Section variant="slate" spacing="lg">
        <Container>
          <SectionHeader label="08 — Typography" title="Type Scale" />

          <div className="flex flex-col gap-8 border-t border-white/5 pt-8">
            {[
              { cls: "text-display",    label: "text-display",    text: "Design Beyond Sight." },
              { cls: "text-display-md", label: "text-display-md", text: "Sense & Sensibility" },
              { cls: "text-editorial",  label: "text-editorial",  text: "Where architects, brands, and builders co-create culture." },
              { cls: "text-label",      label: "text-label",      text: "2026 EDITION · MUMBAI" },
            ].map((t) => (
              <div key={t.cls} className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-8 pb-8 border-b border-white/5 last:border-0">
                <code className="text-label text-pov-mist/50 shrink-0 w-36">{t.label}</code>
                <p className={`text-pov-white ${t.cls}`}>{t.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

    </div>
  );
}
