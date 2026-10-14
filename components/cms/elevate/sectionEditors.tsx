"use client";

import type { ElevatePageContent, ElevateSectionKey } from "@/lib/elevateContent";
import { BulkUploadButton, ImageField, ListEditor, Note, ParagraphsField, TextArea, TextField } from "../page-editor/fields";
import type { SectionEditorProps, SectionEditors } from "../page-editor/PageEditor";

// One editor per section of the /ecosystem/elevate page.

type EditorProps<K extends ElevateSectionKey> = SectionEditorProps<ElevatePageContent[K]>;

const folder = (section: string) => `temp/edition/elevate/cms/${section}`;

function IntroEditor({ value, update }: EditorProps<"intro">) {
  return (
    <ParagraphsField
      label="Paragraphs"
      value={value.paragraphs}
      onChange={(paragraphs) => update({ paragraphs })}
      hint="Leave a blank line between paragraphs. On desktop each word fades in as the visitor scrolls."
    />
  );
}

function GalleryEditor({ value, update }: EditorProps<"gallery">) {
  return (
    <>
      <TextField label="Heading" value={value.heading} onChange={(heading) => update({ heading })} />
      <TextArea
        label="Story text"
        value={value.body}
        onChange={(body) => update({ body })}
        rows={7}
        hint="Press Enter to start a new line."
      />
      <p className="text-[11px] uppercase tracking-widest text-gray-500 pt-2">Images ({value.images.length})</p>
      <ListEditor
        items={value.images}
        onChange={(images) => update({ images })}
        newItem={() => ""}
        addLabel="+ Add Image"
        minItems={1}
        itemLabel={(_, i) => `Image ${i + 1}`}
        extraActions={
          <BulkUploadButton
            folder={folder("gallery")}
            accept="image/jpeg,image/png,image/webp"
            label="Bulk Upload Images"
            onUploaded={(files) => update((latest) => ({ images: [...latest.images, ...files.map((f) => f.url)] }))}
          />
        }
        renderItem={(src, _u, i) => (
          <ImageField
            label="Image"
            value={src}
            onChange={(next) => update((latest) => ({ images: latest.images.map((s, idx) => (idx === i ? next : s)) }))}
            folder={folder("gallery")}
          />
        )}
      />
    </>
  );
}

function FormEditor({ value, update }: EditorProps<"form">) {
  return (
    <>
      <TextField label="Heading" value={value.heading} onChange={(heading) => update({ heading })} />
      <Note>Enquiries from this form arrive in Submissions under the “Elevate” category.</Note>
    </>
  );
}

export const ELEVATE_EDITORS: SectionEditors<ElevatePageContent> = {
  intro: IntroEditor,
  gallery: GalleryEditor,
  form: FormEditor,
};
