"use client";

import type { CollaboratePageContent, CollaborateSectionKey } from "@/lib/collaborateContent";
import { ListEditor, Note, TextArea, TextField } from "../page-editor/fields";
import type { SectionEditorProps, SectionEditors } from "../page-editor/PageEditor";

// One editor per section of the /collaborate page text.

type EditorProps<K extends CollaborateSectionKey> = SectionEditorProps<CollaboratePageContent[K]>;

function IntroEditor({ value, update }: EditorProps<"intro">) {
  return (
    <>
      <TextField label="Heading" value={value.heading} onChange={(heading) => update({ heading })} />
      <TextArea label="Text" value={value.text} onChange={(text) => update({ text })} rows={3} />
      <Note>The gallery images are managed in the list further down this page.</Note>
    </>
  );
}

function MediumsEditor({ value, update }: EditorProps<"mediums">) {
  return (
    <>
      <TextField label="Heading" value={value.heading} onChange={(heading) => update({ heading })} />
      <ListEditor
        items={value.items}
        onChange={(items) => update({ items })}
        newItem={() => ({ name: "", href: "", description: "" })}
        addLabel="+ Add Medium"
        minItems={1}
        itemLabel={(m, i) => m.name || `Medium ${i + 1}`}
        renderItem={(m, set) => (
          <>
            <div className="grid grid-cols-2 gap-4">
              <TextField
                label="Name"
                value={m.name}
                onChange={(name) => set({ name })}
                hint="Also the category on enquiries sent from its Apply form."
              />
              <TextField label="Link" value={m.href} onChange={(href) => set({ href })} placeholder="/edition/core" />
            </div>
            <TextArea label="Description" value={m.description} onChange={(description) => set({ description })} rows={2} />
          </>
        )}
      />
    </>
  );
}

export const COLLABORATE_EDITORS: SectionEditors<CollaboratePageContent> = {
  intro: IntroEditor,
  mediums: MediumsEditor,
};
