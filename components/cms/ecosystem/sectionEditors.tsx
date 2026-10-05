"use client";

import type {
  EcosystemPageContent,
  EcosystemPillar,
  EcosystemSectionKey,
  ParticipationOption,
} from "@/lib/ecosystemContent";
import { ImageField, ListEditor, MediaField, Note, TextArea, TextField } from "../page-editor/fields";
import type { SectionEditorProps, SectionEditors } from "../page-editor/PageEditor";

// One editor per section of the /ecosystem page.

type EditorProps<K extends EcosystemSectionKey> = SectionEditorProps<EcosystemPageContent[K]>;

const folder = (section: string) => `temp/ecosystem/cms/${section}`;

function HeroEditor({ value, update }: EditorProps<"hero">) {
  return (
    <>
      <TextArea label="Headline" value={value.headline} onChange={(headline) => update({ headline })} rows={2} />
      <MediaField
        label="Video / Image"
        src={value.media.src}
        type={value.media.type}
        onChange={(patch) => update((latest) => ({ media: { ...latest.media, ...patch } }))}
        folder={folder("hero")}
        allowVideo
        hint="Leave empty to show only the headline."
      />
      <TextField label="Description" value={value.alt} onChange={(alt) => update({ alt })} hint="Read out by screen readers." />
    </>
  );
}

function StatementEditor({ value, update }: EditorProps<"statement">) {
  return <TextArea label="Text" value={value.text} onChange={(text) => update({ text })} rows={4} />;
}

function PillarsEditor({ value, update }: EditorProps<"pillars">) {
  return (
    <ListEditor<EcosystemPillar>
      items={value.items}
      onChange={(items) => update({ items })}
      itemLabel={(p, i) => `Card ${i + 1}${p.title ? ` — ${p.title}` : ""}`}
      newItem={() => ({ title: "", description: "", image: "", logo: "", href: "" })}
      addLabel="+ Add Card"
      minItems={1}
      renderItem={(p, set) => (
        <>
          <div className="grid grid-cols-2 gap-3">
            <TextField label="Title" value={p.title} onChange={(title) => set({ title })} />
            <TextField label="Link" value={p.href} onChange={(href) => set({ href })} placeholder="/edition/core" />
          </div>
          <TextArea label="Description" value={p.description} onChange={(description) => set({ description })} rows={2} />
          <div className="grid grid-cols-2 gap-3">
            <ImageField label="Image" value={p.image} onChange={(image) => set({ image })} folder={folder("pillars")} />
            <ImageField
              label="Logo (optional)"
              value={p.logo}
              onChange={(logo) => set({ logo })}
              folder={folder("pillars")}
              hint="Shown over the image until hovered. Use a white PNG."
            />
          </div>
        </>
      )}
    />
  );
}

function ParticipationEditor({ value, update }: EditorProps<"participation">) {
  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <TextField label="Heading" value={value.headingMain} onChange={(headingMain) => update({ headingMain })} />
        <TextField label="Heading (bold part)" value={value.headingBold} onChange={(headingBold) => update({ headingBold })} />
      </div>
      <Note>
        Each option&apos;s name is sent to HubSpot as the submission&apos;s category. Renaming an option changes the value
        HubSpot receives, so update any HubSpot filters or workflows that rely on the old name. The popup versions of this
        form (Collaborate, FAQ) keep the original options.
      </Note>
      <ListEditor<ParticipationOption>
        items={value.options}
        onChange={(options) => update({ options })}
        itemLabel={(o, i) => `Option ${i + 1}${o.label ? ` — ${o.label}` : ""}`}
        newItem={() => ({ label: "", image: "" })}
        addLabel="+ Add Option"
        minItems={1}
        renderItem={(o, set) => (
          <>
            <TextField label="Option name *" value={o.label} onChange={(label) => set({ label })} placeholder="e.g. Core" />
            <ImageField
              label="Image (optional)"
              value={o.image}
              onChange={(image) => set({ image })}
              folder={folder("participation")}
              hint="Shown beside the form on desktop when this option is selected."
            />
          </>
        )}
      />
    </>
  );
}

export const ECOSYSTEM_EDITORS: SectionEditors<EcosystemPageContent> = {
  hero: HeroEditor,
  statement: StatementEditor,
  pillars: PillarsEditor,
  participation: ParticipationEditor,
};

/** Returns a message for the first problem that would break the page, or null. */
export function validateEcosystemSection(key: string, value: unknown): string | null {
  if (key === "participation") {
    const options = (value as EcosystemPageContent["participation"]).options;
    const i = options.findIndex((o) => !o.label.trim());
    if (i >= 0) return `Option ${i + 1} needs a name.`;
    const names = options.map((o) => o.label.trim().toLowerCase());
    const dup = names.find((n, idx) => names.indexOf(n) !== idx);
    if (dup) return `Two options are both called “${dup}” — option names must be unique.`;
  }
  if (key === "pillars") {
    const i = (value as EcosystemPageContent["pillars"]).items.findIndex((p) => !p.title.trim());
    if (i >= 0) return `Card ${i + 1} needs a title.`;
  }
  return null;
}
