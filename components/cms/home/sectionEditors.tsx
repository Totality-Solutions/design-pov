"use client";

import {
  CORE_TILE_COUNT,
  THEME_SLOTS,
  type CoreMedia,
  type EcosystemItem,
  type HeroSlide,
  type HomeContent,
  type HomeSectionKey,
  type MarqueeItem,
} from "@/lib/homeContent";
import { BulkUploadButton, ImageField, ListEditor, MediaField, ParagraphsField, TextArea, TextField } from "./fields";

// One editor per home section. Each receives the section's draft and an
// `update` that merges a partial patch into it.

export type SectionPatch<K extends HomeSectionKey> =
  | Partial<HomeContent[K]>
  | ((latest: HomeContent[K]) => Partial<HomeContent[K]>);

type EditorProps<K extends HomeSectionKey> = {
  value: HomeContent[K];
  update: (patch: SectionPatch<K>) => void;
};

const folder = (section: string) => `temp/home/cms/${section}`;

/** "my-photo_01.jpg" → "my photo 01" — a starting description for uploads. */
const nameToText = (fileName: string) => fileName.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").trim();

function Note({ children }: { children: React.ReactNode }) {
  return <p className="text-[12px] text-gray-500 bg-[#fafafa] border border-black/10 px-4 py-3">{children}</p>;
}

function HeroEditor({ value, update }: EditorProps<"hero">) {
  return (
    <ListEditor<HeroSlide>
      items={value.slides}
      onChange={(slides) => update({ slides })}
      itemLabel={(s, i) => `Slide ${i + 1}${s.alt ? ` — ${s.alt}` : ""}`}
      newItem={() => ({ src: "", type: "image", alt: "" })}
      addLabel="+ Add Slide"
      minItems={1}
      extraActions={
        <BulkUploadButton
          folder={folder("hero")}
          label="Bulk Upload Slides"
          onUploaded={(files) =>
            update((latest) => ({
              slides: [...latest.slides, ...files.map((f) => ({ src: f.url, type: f.type, alt: nameToText(f.name) }))],
            }))
          }
        />
      }
      renderItem={(slide, set) => (
        <>
          <MediaField
            label="Image / Video *"
            src={slide.src}
            type={slide.type}
            onChange={set}
            folder={folder("hero")}
            allowVideo
          />
          {slide.type === "video" && (
            <ImageField
              label="Poster image"
              value={slide.poster ?? ""}
              onChange={(poster) => set({ poster })}
              folder={folder("hero")}
              hint="Shown while the video loads."
            />
          )}
          <div className="grid grid-cols-2 gap-3">
            <TextField label="Description" value={slide.alt} onChange={(alt) => set({ alt })} placeholder="e.g. Design POV showcase" hint="Read out by screen readers." />
            <TextField label="Link (optional)" value={slide.href ?? ""} onChange={(href) => set({ href })} placeholder="https://... or /edition" hint="Makes the whole slide clickable." />
          </div>
        </>
      )}
    />
  );
}

function IntroEditor({ value, update }: EditorProps<"intro">) {
  return (
    <>
      <TextArea label="Text" value={value.text} onChange={(text) => update({ text })} />
      <TextField label="Highlighted ending" value={value.highlight} onChange={(highlight) => update({ highlight })} hint="Shown in red right after the text, e.g. “visual.”" />
      <div className="grid grid-cols-2 gap-3">
        <TextField label="Button label" value={value.ctaLabel} onChange={(ctaLabel) => update({ ctaLabel })} />
        <TextField label="Button link" value={value.ctaHref} onChange={(ctaHref) => update({ ctaHref })} placeholder="/edition" />
      </div>
    </>
  );
}

function WhatPovEditor({ value, update }: EditorProps<"whatPov">) {
  return (
    <>
      <ParagraphsField
        label="Text"
        value={value.paragraphs}
        onChange={(paragraphs) => update({ paragraphs })}
        hint="Revealed word by word on scroll. Leave a blank line between paragraphs."
      />
      <p className="text-[11px] uppercase tracking-widest text-gray-500 pt-2">Marquee media</p>
      <ListEditor<MarqueeItem>
        items={value.items}
        onChange={(items) => update({ items })}
        itemLabel={(item, i) => `${i + 1}. ${item.type === "video" ? "Video" : "Image"}`}
        newItem={() => ({ src: "", type: "image", title: "" })}
        addLabel="+ Add Media"
        minItems={1}
        extraActions={
          <BulkUploadButton
            folder={folder("what-pov")}
            onUploaded={(files) =>
              update((latest) => ({
                items: [...latest.items, ...files.map((f) => ({ src: f.url, type: f.type, title: nameToText(f.name) }))],
              }))
            }
          />
        }
        renderItem={(item, set) => (
          <>
            <MediaField label="Image / Video *" src={item.src} type={item.type} onChange={set} folder={folder("what-pov")} allowVideo />
            {item.type === "video" && (
              <ImageField
                label="Mobile still image"
                value={item.poster ?? ""}
                onChange={(poster) => set({ poster })}
                folder={folder("what-pov")}
                hint="Phones and tablets show this image instead of playing the video."
              />
            )}
            <div className="grid grid-cols-2 gap-3">
              <TextField label="Description" value={item.title} onChange={(title) => set({ title })} hint="Read out by screen readers." />
              <TextField label="Link (optional)" value={item.href ?? ""} onChange={(href) => set({ href })} placeholder="/edition" />
            </div>
          </>
        )}
      />
    </>
  );
}

function ThemeEditor({ value, update }: EditorProps<"theme">) {
  const media = THEME_SLOTS.map((_, i) => value.media[i] ?? { src: "", type: "image" as const, alt: "" });
  return (
    <>
      <TextField label="Heading" value={value.heading} onChange={(heading) => update({ heading })} />
      <TextArea label="Description" value={value.description} onChange={(description) => update({ description })} />
      <div className="grid grid-cols-2 gap-3">
        <TextField label="Button label" value={value.ctaLabel} onChange={(ctaLabel) => update({ ctaLabel })} />
        <TextField label="Button link" value={value.ctaHref} onChange={(ctaHref) => update({ ctaHref })} placeholder="/edition/theme" hint="The grid links here too." />
      </div>
      <p className="text-[11px] uppercase tracking-widest text-gray-500 pt-2">Grid media</p>
      <ListEditor
        items={media}
        onChange={(next) => update({ media: next })}
        itemLabel={(_, i) => THEME_SLOTS[i]}
        fixed
        renderItem={(item, set) => (
          <>
            <MediaField label="Image / Video" src={item.src} type={item.type} onChange={set} folder={folder("theme")} allowVideo hint="Leave empty for a plain colour block." />
            <TextField label="Description" value={item.alt} onChange={(alt) => set({ alt })} hint="Read out by screen readers." />
          </>
        )}
      />
    </>
  );
}

function EcosystemEditor({ value, update }: EditorProps<"ecosystem">) {
  return (
    <>
      <TextField label="Section heading" value={value.heading} onChange={(heading) => update({ heading })} />
      <ListEditor<EcosystemItem>
        items={value.items}
        onChange={(items) => update({ items })}
        itemLabel={(item, i) => `Panel ${i + 1}${item.label ? ` — ${item.label}` : ""}`}
        newItem={() => ({ label: "", title: "", description: [""], image: "", ctaLabel: "Explore", href: "" })}
        addLabel="+ Add Panel"
        minItems={1}
        renderItem={(item, set) => (
          <>
            <div className="grid grid-cols-2 gap-3">
              <TextField label="Label (collapsed)" value={item.label} onChange={(label) => set({ label })} hint="Vertical text when the panel is closed." />
              <TextField label="Title (open)" value={item.title} onChange={(title) => set({ title })} />
            </div>
            <ParagraphsField label="Description" value={item.description} onChange={(description) => set({ description })} />
            <ImageField label="Background image" value={item.image} onChange={(image) => set({ image })} folder={folder("ecosystem")} />
            <div className="grid grid-cols-2 gap-3">
              <TextField label="Button label" value={item.ctaLabel} onChange={(ctaLabel) => set({ ctaLabel })} />
              <TextField label="Button link" value={item.href} onChange={(href) => set({ href })} placeholder="/edition/core" />
            </div>
          </>
        )}
      />
    </>
  );
}

function CtaStripEditor({ value, update }: EditorProps<"ctaStrip">) {
  return (
    <>
      <TextField label="Title" value={value.title} onChange={(title) => update({ title })} />
      <div className="grid grid-cols-2 gap-3">
        <TextField label="Button label" value={value.ctaLabel} onChange={(ctaLabel) => update({ ctaLabel })} />
        <TextField label="Button link" value={value.ctaHref} onChange={(ctaHref) => update({ ctaHref })} placeholder="/collaborate" />
      </div>
    </>
  );
}

function CoreCollectiveEditor({ value, update }: EditorProps<"coreCollective">) {
  const tiles = Array.from({ length: CORE_TILE_COUNT }, (_, i) => value.tiles[i] ?? { media: [] });
  return (
    <>
      <TextField label="Heading" value={value.heading} onChange={(heading) => update({ heading })} />
      <Note>
        The grid has 9 fixed tiles; tile 3 is the large centre one. A tile with more than one item flips between them
        every 0.7s. Tiles left empty are skipped.
      </Note>
      <ListEditor
        items={tiles}
        onChange={(next) => update({ tiles: next })}
        itemLabel={(tile, i) => `Tile ${i + 1}${i === 2 ? " (centre)" : ""} — ${tile.media.map((m) => m.name).filter(Boolean).join(" / ") || "empty"}`}
        fixed
        renderItem={(tile, setTile, tileIndex) => (
          <ListEditor<CoreMedia>
            items={tile.media}
            onChange={(media) => setTile({ media })}
            itemLabel={(m, i) => `Item ${i + 1}${m.name ? ` — ${m.name}` : ""}`}
            newItem={() => ({ src: "", type: "image", name: "", link: "/edition/core" })}
            addLabel="+ Add Item"
            extraActions={
              <BulkUploadButton
                folder={folder("core-collective")}
                onUploaded={(files) =>
                  update((latest) => {
                    const padded = Array.from({ length: CORE_TILE_COUNT }, (_, i) => latest.tiles[i] ?? { media: [] });
                    return {
                      tiles: padded.map((t, i) =>
                        i === tileIndex
                          ? {
                              media: [
                                ...t.media,
                                ...files.map((f) => ({ src: f.url, type: f.type, name: nameToText(f.name), link: "/edition/core" })),
                              ],
                            }
                          : t
                      ),
                    };
                  })
                }
              />
            }
            renderItem={(m, set) => (
              <>
                <MediaField label="Image / Video *" src={m.src} type={m.type} onChange={set} folder={folder("core-collective")} allowVideo />
                {m.type === "video" && (
                  <ImageField label="Mobile still image" value={m.poster ?? ""} onChange={(poster) => set({ poster })} folder={folder("core-collective")} hint="Phones show this instead of the video." />
                )}
                <div className="grid grid-cols-2 gap-3">
                  <TextField label="Studio name" value={m.name} onChange={(name) => set({ name })} />
                  <TextField label="Link" value={m.link} onChange={(link) => set({ link })} placeholder="/edition/core?designer=01" />
                </div>
              </>
            )}
          />
        )}
      />
    </>
  );
}

function PartnersEditor({ value, update }: EditorProps<"partners">) {
  return (
    <>
      <TextField label="Heading" value={value.heading} onChange={(heading) => update({ heading })} />
      <Note>The logos come from CMS → Brand Partners (type “sponsor”).</Note>
    </>
  );
}

function MagazineEditor({ value, update }: EditorProps<"magazine">) {
  return (
    <>
      <TextField label="Heading" value={value.heading} onChange={(heading) => update({ heading })} />
      <Note>The posts come from CMS → Blogs (published posts).</Note>
    </>
  );
}

function BrandsEditor({ value, update }: EditorProps<"brands">) {
  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <TextField label="Heading" value={value.headingMain} onChange={(headingMain) => update({ headingMain })} />
        <TextField label="Heading (bold part)" value={value.headingBold} onChange={(headingBold) => update({ headingBold })} placeholder="2026" />
      </div>
      <Note>The logos come from CMS → Brand Partners (type “brand”).</Note>
    </>
  );
}

export const SECTION_EDITORS: { [K in HomeSectionKey]: (props: EditorProps<K>) => React.ReactNode } = {
  hero: HeroEditor,
  intro: IntroEditor,
  whatPov: WhatPovEditor,
  theme: ThemeEditor,
  ecosystem: EcosystemEditor,
  ctaStrip: CtaStripEditor,
  coreCollective: CoreCollectiveEditor,
  partners: PartnersEditor,
  magazine: MagazineEditor,
  brands: BrandsEditor,
};

/** Returns a message for the first problem that would break the page, or null. */
export function validateSection(key: HomeSectionKey, value: HomeContent[HomeSectionKey]): string | null {
  const v = value as any;
  switch (key) {
    case "hero": {
      const i = (v as HomeContent["hero"]).slides.findIndex((s) => !s.src.trim());
      return i >= 0 ? `Slide ${i + 1} needs an image or video.` : null;
    }
    case "whatPov": {
      const i = (v as HomeContent["whatPov"]).items.findIndex((s) => !s.src.trim());
      return i >= 0 ? `Marquee item ${i + 1} needs an image or video.` : null;
    }
    case "coreCollective": {
      const tiles = (v as HomeContent["coreCollective"]).tiles;
      for (let t = 0; t < tiles.length; t++) {
        const m = tiles[t].media.findIndex((x) => !x.src.trim());
        if (m >= 0) return `Tile ${t + 1}, item ${m + 1} needs an image or video.`;
      }
      return null;
    }
    default:
      return null;
  }
}

/** Trims text and drops empty paragraphs before saving. */
export function cleanSection<T>(value: T): T {
  if (typeof value === "string") return value.trim() as T;
  if (Array.isArray(value)) {
    const cleaned = value.map(cleanSection);
    return (cleaned.every((x) => typeof x === "string") ? cleaned.filter(Boolean) : cleaned) as T;
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, cleanSection(v)])) as T;
  }
  return value;
}
