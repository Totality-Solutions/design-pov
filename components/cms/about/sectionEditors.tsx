"use client";

import { ABOUT_FOUNDER_SLOTS, type AboutPageContent, type AboutSectionKey } from "@/lib/aboutContent";
import { ImageField, ListEditor, Note, ParagraphsField, TextArea, TextField } from "../page-editor/fields";
import type { SectionEditorProps, SectionEditors } from "../page-editor/PageEditor";

// One editor per section of the /about page text.

type EditorProps<K extends AboutSectionKey> = SectionEditorProps<AboutPageContent[K]>;

const folder = (section: string) => `temp/about/cms/${section}`;

function HeroEditor({ value, update }: EditorProps<"hero">) {
  return (
    <>
      <ListEditor
        items={value.slides}
        onChange={(slides) => update({ slides })}
        newItem={() => ({ bgText: "", label: "", statement: "" })}
        addLabel="+ Add Statement"
        minItems={1}
        itemLabel={(s, i) => s.label || `Statement ${i + 1}`}
        renderItem={(s, set) => (
          <>
            <div className="grid grid-cols-2 gap-4">
              <TextField label="List label" value={s.label} onChange={(label) => set({ label })} />
              <TextField label="Large faded text" value={s.bgText} onChange={(bgText) => set({ bgText })} hint="Shown in capitals behind the list." />
            </div>
            <TextArea label="Statement" value={s.statement} onChange={(statement) => set({ statement })} rows={2} />
          </>
        )}
      />
      <ImageField label="Banner image" value={value.image} onChange={(image) => update({ image })} folder={folder("hero")} hint="Wide image (16:6)." />
    </>
  );
}

function PillarsEditor({ value, update }: EditorProps<"pillars">) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <TextField label="Heading (regular)" value={value.headingMain} onChange={(headingMain) => update({ headingMain })} />
        <TextField label="Heading (bold)" value={value.headingBold} onChange={(headingBold) => update({ headingBold })} />
      </div>
      <ListEditor
        items={value.items}
        onChange={(items) => update({ items })}
        newItem={() => ({ title: "", description: "", image: "", buttonLabel: "Explore", buttonHref: "" })}
        addLabel="+ Add Pillar"
        minItems={1}
        itemLabel={(p, i) => p.title || `Pillar ${i + 1}`}
        renderItem={(p, set) => (
          <>
            <TextField label="Title" value={p.title} onChange={(title) => set({ title })} />
            <TextArea label="Description" value={p.description} onChange={(description) => set({ description })} rows={2} />
            <ImageField label="Image" value={p.image} onChange={(image) => set({ image })} folder={folder("pillars")} />
            <div className="grid grid-cols-2 gap-4">
              <TextField label="Button label" value={p.buttonLabel} onChange={(buttonLabel) => set({ buttonLabel })} />
              <TextField label="Button link" value={p.buttonHref} onChange={(buttonHref) => set({ buttonHref })} />
            </div>
          </>
        )}
      />
      <p className="text-[11px] uppercase tracking-widest text-gray-500 pt-2">Apply strip below the pillars</p>
      <div className="border border-black/10 bg-[#fafafa] p-4 space-y-3">
        <TextField label="Title" value={value.ctaTitle} onChange={(ctaTitle) => update({ ctaTitle })} />
        <div className="grid grid-cols-2 gap-4">
          <TextField label="Button label" value={value.ctaLabel} onChange={(ctaLabel) => update({ ctaLabel })} />
          <TextField label="Button link" value={value.ctaHref} onChange={(ctaHref) => update({ ctaHref })} />
        </div>
      </div>
    </>
  );
}

function ThisIsUsEditor({ value, update }: EditorProps<"thisIsUs">) {
  return (
    <>
      <TextField label="Heading" value={value.heading} onChange={(heading) => update({ heading })} />
      <ParagraphsField label="Intro" value={value.intro} onChange={(intro) => update({ intro })} />
      <TextField label="Question" value={value.question} onChange={(question) => update({ question })} />
      <ImageField label="Founders image" value={value.image} onChange={(image) => update({ image })} folder={folder("this-is-us")} hint="Shown between the two quotes." />
      <ListEditor
        items={value.founders}
        onChange={(founders) => update({ founders })}
        fixed
        itemLabel={(f, i) => `${ABOUT_FOUNDER_SLOTS[i] ?? `Quote ${i + 1}`}${f.name ? ` · ${f.name}` : ""}`}
        renderItem={(f, set) => (
          <>
            <TextField label="Name" value={f.name} onChange={(name) => set({ name })} />
            <TextArea label="Quote" value={f.quote} onChange={(quote) => set({ quote })} rows={4} hint="Quote marks are added automatically." />
          </>
        )}
      />
    </>
  );
}

function PressEditor({ value, update }: EditorProps<"press">) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <TextField label="Heading (regular)" value={value.headingMain} onChange={(headingMain) => update({ headingMain })} />
        <TextField label="Heading (bold)" value={value.headingBold} onChange={(headingBold) => update({ headingBold })} />
      </div>
      <Note>The logos are managed in the Press Mentions list further down this page.</Note>
    </>
  );
}

export const ABOUT_EDITORS: SectionEditors<AboutPageContent> = {
  hero: HeroEditor,
  pillars: PillarsEditor,
  thisIsUs: ThisIsUsEditor,
  press: PressEditor,
};
