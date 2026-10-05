"use client";

import Link from "next/link";
import type { ApplyCardContent, BrandsPageContent, BrandsSectionKey } from "@/lib/brandsContent";
import { ImageField, Note, TextArea, TextField } from "../page-editor/fields";
import type { SectionEditorProps, SectionEditors } from "../page-editor/PageEditor";

// One editor per section of the /edition/brands page.

type EditorProps<K extends BrandsSectionKey> = SectionEditorProps<BrandsPageContent[K]>;

const folder = (section: string) => `temp/edition/brands/cms/${section}`;

function HeroEditor({ value, update }: EditorProps<"hero">) {
  return (
    <>
      <ImageField
        label="Banner image"
        value={value.image}
        onChange={(image) => update({ image })}
        folder={folder("hero")}
        hint="Wide image, shown 408px tall. Leave empty to show only the headline."
      />
      <TextField label="Image description" value={value.alt} onChange={(alt) => update({ alt })} hint="Read out by screen readers." />
      <TextArea label="Headline" value={value.headline} onChange={(headline) => update({ headline })} rows={3} />
    </>
  );
}

/** For the logo grids: their content lives in Brand Partners. */
function managedElsewhere(what: string) {
  return function LogoGridEditor() {
    return (
      <Note>
        The {what} logos and the section title are managed in{" "}
        <Link href="/cms/brand-partners" className="underline hover:text-black">Brand Partners</Link> and{" "}
        <Link href="/cms/brand-partner-types" className="underline hover:text-black">Partner Types</Link>. Here you can
        only show or hide the whole section. It also hides itself when there are no active logos.
      </Note>
    );
  };
}

function ApplyCardFields({
  card, onChange, actionNote,
}: {
  card: ApplyCardContent;
  onChange: (patch: Partial<ApplyCardContent>) => void;
  actionNote: string;
}) {
  return (
    <div className="border border-black/10 bg-[#fafafa] p-4 space-y-3">
      <TextField label="Title" value={card.title} onChange={(title) => onChange({ title })} />
      <TextArea label="Description" value={card.description} onChange={(description) => onChange({ description })} rows={2} />
      <TextField label="Button label" value={card.buttonLabel} onChange={(buttonLabel) => onChange({ buttonLabel })} hint={actionNote} />
    </div>
  );
}

function ApplyEditor({ value, update }: EditorProps<"apply">) {
  return (
    <>
      <p className="text-[11px] uppercase tracking-widest text-gray-500">Left card (dark)</p>
      <ApplyCardFields
        card={value.partner}
        onChange={(patch) => update((latest) => ({ partner: { ...latest.partner, ...patch } }))}
        actionNote="Opens the partner enquiry popup."
      />
      <p className="text-[11px] uppercase tracking-widest text-gray-500 pt-2">Right card (light)</p>
      <ApplyCardFields
        card={value.participant}
        onChange={(patch) => update((latest) => ({ participant: { ...latest.participant, ...patch } }))}
        actionNote="Opens the participation form popup."
      />
    </>
  );
}

export const BRANDS_PAGE_EDITORS: SectionEditors<BrandsPageContent> = {
  hero: HeroEditor,
  sponsors: managedElsewhere("partner (sponsor)"),
  brands: managedElsewhere("brand"),
  buildPartners: managedElsewhere("build partner"),
  apply: ApplyEditor,
};
