"use client";

import Link from "next/link";
import { EDITION_THEME_SLOTS, type EditionPageContent, type EditionSectionKey } from "@/lib/editionContent";
import { ImageField, LinesField, ListEditor, MediaField, Note, TextArea, TextField } from "../page-editor/fields";
import type { SectionEditorProps, SectionEditors } from "../page-editor/PageEditor";

// One editor per section of the /edition page.

type EditorProps<K extends EditionSectionKey> = SectionEditorProps<EditionPageContent[K]>;

const folder = (section: string) => `temp/edition/cms/${section}`;

function ThemeEditor({ value, update }: EditorProps<"theme">) {
  return (
    <>
      <TextField label="Title" value={value.title} onChange={(title) => update({ title })} />
      <TextArea
        label="Subtitle"
        value={value.subtitle}
        onChange={(subtitle) => update({ subtitle })}
        rows={2}
        hint="Press Enter to start a new line."
      />
      <TextField label="Link" value={value.href} onChange={(href) => update({ href })} hint="Where the whole section links to." />
      <ListEditor
        items={value.images}
        onChange={(images) => update({ images })}
        fixed
        itemLabel={(_, i) => EDITION_THEME_SLOTS[i] ?? `Image ${i + 1}`}
        renderItem={(src, _u, i) => (
          <ImageField
            label="Image"
            value={src}
            onChange={(next) => update((latest) => ({ images: latest.images.map((s, idx) => (idx === i ? next : s)) }))}
            folder={folder("theme")}
          />
        )}
      />
    </>
  );
}

function WhoItIsForEditor({ value, update }: EditorProps<"whoItIsFor">) {
  return (
    <>
      <TextField label="Heading" value={value.heading} onChange={(heading) => update({ heading })} />
      <LinesField
        label="Audiences"
        value={value.lines}
        onChange={(lines) => update({ lines })}
        hint="One per line. They roll through one at a time."
      />
      <div className="grid grid-cols-2 gap-4">
        <TextField label="Button label" value={value.ctaLabel} onChange={(ctaLabel) => update({ ctaLabel })} />
        <TextField label="Button link" value={value.ctaHref} onChange={(ctaHref) => update({ ctaHref })} />
      </div>
    </>
  );
}

function CoreEditor({ value, update }: EditorProps<"core">) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <TextField label="Heading (regular)" value={value.headingMain} onChange={(headingMain) => update({ headingMain })} />
        <TextField label="Heading (bold)" value={value.headingBold} onChange={(headingBold) => update({ headingBold })} />
      </div>
      <MediaField
        label="Video"
        src={value.video}
        type="video"
        onChange={({ src }) => src !== undefined && update({ video: src })}
        folder={folder("core")}
      />
      <TextField label="Link" value={value.href} onChange={(href) => update({ href })} hint="Where clicking the video goes." />
    </>
  );
}

function StripEditor({ value, update }: EditorProps<"ctaStrip">) {
  return (
    <>
      <TextField label="Title" value={value.title} onChange={(title) => update({ title })} />
      <div className="grid grid-cols-2 gap-4">
        <TextField label="Button label" value={value.ctaLabel} onChange={(ctaLabel) => update({ ctaLabel })} />
        <TextField label="Button link" value={value.ctaHref} onChange={(ctaHref) => update({ ctaHref })} />
      </div>
    </>
  );
}

function managedElsewhere(what: string, href: string, where: string) {
  return function ManagedNote() {
    return (
      <Note>
        The {what} come from{" "}
        <Link href={href} className="underline hover:text-black">{where}</Link>. Here you can only show or hide the
        whole section.
      </Note>
    );
  };
}

export const EDITION_EDITORS: SectionEditors<EditionPageContent> = {
  theme: ThemeEditor,
  whoItIsFor: WhoItIsForEditor,
  core: CoreEditor,
  ctaStrip: StripEditor,
  brands: managedElsewhere("brand logos", "/cms/brand-partners", "Brand Partners"),
  schedule: managedElsewhere("events", "/cms/schedule", "Schedule"),
  partners: managedElsewhere("partner logos and tabs", "/cms/brand-partners", "Brand Partners"),
  coreCta: StripEditor,
};
