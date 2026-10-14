"use client";

import type { ObjectsPageContent, ObjectsSectionKey } from "@/lib/objectsPageContent";
import { Note, TextArea } from "../page-editor/fields";
import type { SectionEditorProps, SectionEditors } from "../page-editor/PageEditor";

// One editor per section of the /ecosystem/objects page text.

type EditorProps<K extends ObjectsSectionKey> = SectionEditorProps<ObjectsPageContent[K]>;

function HeroEditor({ value, update }: EditorProps<"hero">) {
  return <TextArea label="Headline" value={value.headline} onChange={(headline) => update({ headline })} rows={3} />;
}

export const OBJECTS_PAGE_EDITORS: SectionEditors<ObjectsPageContent> = {
  hero: HeroEditor,
  carousel: () => <Note>The objects are managed in the list further down this page.</Note>,
  form: () => <Note>Enquiries from this form arrive in Submissions. Here you can only show or hide it.</Note>,
};
