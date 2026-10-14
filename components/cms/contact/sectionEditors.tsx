"use client";

import Link from "next/link";
import type { ContactPageContent, ContactSectionKey } from "@/lib/contactContent";
import { Note, TextArea, TextField } from "../page-editor/fields";
import type { SectionEditorProps, SectionEditors } from "../page-editor/PageEditor";

// One editor per section of the /contact page.

type EditorProps<K extends ContactSectionKey> = SectionEditorProps<ContactPageContent[K]>;

function HeaderEditor({ value, update }: EditorProps<"header">) {
  return (
    <>
      <TextField label="Title" value={value.title} onChange={(title) => update({ title })} />
      <TextArea label="Intro text" value={value.description} onChange={(description) => update({ description })} rows={4} />
    </>
  );
}

function FormNote() {
  return (
    <Note>
      Messages sent through this form arrive in{" "}
      <Link href="/cms/submissions" className="underline hover:text-black">Submissions</Link>. Here you can only show
      or hide the form.
    </Note>
  );
}

export const CONTACT_EDITORS: SectionEditors<ContactPageContent> = {
  header: HeaderEditor,
  form: FormNote,
};
