"use client";

import type { LegalDoc, LegalPagesContent } from "@/lib/legalContent";
import { Note, TextArea, TextField } from "../page-editor/fields";
import type { SectionEditorProps, SectionEditors } from "../page-editor/PageEditor";

// Editors for the two legal pages — same shape, so one editor serves both.

function LegalDocEditor({ value, update }: SectionEditorProps<LegalDoc>) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <TextField label="Title" value={value.title} onChange={(title) => update({ title })} />
        <TextField
          label="Label beside the title"
          value={value.sideLabel}
          onChange={(sideLabel) => update({ sideLabel })}
          hint="e.g. the effective date. Desktop only."
        />
      </div>
      <Note>
        Formatting: start a line with <code>## </code> for a heading, <code>### </code> for a sub-heading, or{" "}
        <code>- </code> for a bullet point. Wrap words in <code>**double stars**</code> for bold, and write links as{" "}
        <code>[text](https://...)</code> or <code>[email](mailto:...)</code>. Leave a blank line between paragraphs.
      </Note>
      <TextArea label="Content" value={value.body} onChange={(body) => update({ body })} rows={24} />
      <p className="text-[11px] text-gray-400">Turning off “Show this section” takes the whole page offline (it shows “page not found”).</p>
    </>
  );
}

export const LEGAL_EDITORS: SectionEditors<LegalPagesContent> = {
  privacy: LegalDocEditor,
  terms: LegalDocEditor,
};
