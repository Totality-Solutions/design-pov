"use client";

import Link from "next/link";
import { youTubeThumbnail, type MagazinePageContent, type MagazineSectionKey } from "@/lib/magazineContent";
import { ImageField, ListEditor, Note, TextArea, TextField } from "../page-editor/fields";
import type { SectionEditorProps, SectionEditors } from "../page-editor/PageEditor";

// One editor per section of the /magazine page.

type EditorProps<K extends MagazineSectionKey> = SectionEditorProps<MagazinePageContent[K]>;

const folder = (section: string) => `temp/magazine/cms/${section}`;

function HeroEditor({ value, update }: EditorProps<"hero">) {
  return (
    <>
      <TextArea label="Headline" value={value.headline} onChange={(headline) => update({ headline })} rows={3} />
      <TextArea label="Intro line" value={value.subtext} onChange={(subtext) => update({ subtext })} rows={2} />
    </>
  );
}

function IssueEditor({ value, update }: EditorProps<"issue">) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <TextField label="Heading (regular)" value={value.headingMain} onChange={(headingMain) => update({ headingMain })} />
        <TextField label="Heading (bold)" value={value.headingBold} onChange={(headingBold) => update({ headingBold })} hint="e.g. “May Issue”" />
      </div>
      <p className="text-[11px] uppercase tracking-widest text-gray-500 pt-2">Issue cards</p>
      <ListEditor
        items={value.cards}
        onChange={(cards) => update({ cards })}
        newItem={() => ({ category: "POV Blogs", title: "", image: "", href: "" })}
        addLabel="+ Add Card"
        itemLabel={(card, i) => card.title || `Card ${i + 1}`}
        renderItem={(card, set) => (
          <>
            <ImageField label="Image" value={card.image} onChange={(image) => set({ image })} folder={folder("issue")} />
            <div className="grid grid-cols-2 gap-4">
              <TextField label="Category" value={card.category} onChange={(category) => set({ category })} />
              <TextField label="Link (optional)" value={card.href} onChange={(href) => set({ href })} placeholder="/magazine/..." />
            </div>
            <TextArea label="Title" value={card.title} onChange={(title) => set({ title })} rows={2} />
          </>
        )}
      />
      <p className="text-[11px] uppercase tracking-widest text-gray-500 pt-2">Side advertisement</p>
      <div className="border border-black/10 bg-[#fafafa] p-4 space-y-3">
        <ImageField
          label="Ad image"
          value={value.ad.image}
          onChange={(image) => update((latest) => ({ ad: { ...latest.ad, image } }))}
          folder={folder("ads")}
          hint="Leave empty to hide the ad column."
        />
        <TextField
          label="Ad link"
          value={value.ad.href}
          onChange={(href) => update((latest) => ({ ad: { ...latest.ad, href } }))}
          placeholder="https://..."
        />
      </div>
    </>
  );
}

function InterviewsEditor({ value, update }: EditorProps<"interviews">) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <TextField label="Heading" value={value.heading} onChange={(heading) => update({ heading })} />
        <TextField label="Right label" value={value.rightLabel} onChange={(rightLabel) => update({ rightLabel })} />
      </div>
      <ListEditor
        items={value.items}
        onChange={(items) => update({ items })}
        newItem={() => ({ category: "", title: "", author: "Design POV", date: "", videoUrl: "" })}
        addLabel="+ Add Interview"
        itemLabel={(item, i) => item.title || `Interview ${i + 1}`}
        renderItem={(item, set) => (
          <>
            <TextField
              label="YouTube link"
              value={item.videoUrl}
              onChange={(videoUrl) => set({ videoUrl })}
              placeholder="https://youtu.be/..."
              hint="The thumbnail is taken from the video automatically."
            />
            {item.videoUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={youTubeThumbnail(item.videoUrl)} alt="" className="h-20 border border-black/10" />
            )}
            <TextArea label="Title" value={item.title} onChange={(title) => set({ title })} rows={2} />
            <div className="grid grid-cols-3 gap-4">
              <TextField label="Category" value={item.category} onChange={(category) => set({ category })} />
              <TextField label="Author" value={item.author} onChange={(author) => set({ author })} />
              <TextField label="Date" value={item.date} onChange={(date) => set({ date })} placeholder="12 Mar, 2026" />
            </div>
          </>
        )}
      />
    </>
  );
}

function BottomAdEditor({ value, update }: EditorProps<"bottomAd">) {
  return (
    <>
      <ImageField label="Ad image" value={value.image} onChange={(image) => update({ image })} folder={folder("ads")} hint="Wide banner, shown on desktop only." />
      <TextField label="Ad link" value={value.href} onChange={(href) => update({ href })} placeholder="https://..." />
    </>
  );
}

const fromBlogs = () => (
  <Note>
    Posts here come from <Link href="/cms/blogs" className="underline hover:text-black">Blogs</Link> (published only).
    Here you can only show or hide the section.
  </Note>
);

const toggleOnly = () => <Note>This section has no editable text. Use the switch above to show or hide it.</Note>;

export const MAGAZINE_EDITORS: SectionEditors<MagazinePageContent> = {
  hero: HeroEditor,
  press: fromBlogs,
  issue: IssueEditor,
  featured: fromBlogs,
  interviews: InterviewsEditor,
  submission: toggleOnly,
  bottomAd: BottomAdEditor,
};
