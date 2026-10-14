"use client";

import { FAQ_FORMS, type FAQItem, type FaqPageContent, type FaqSectionKey, type Trigger } from "@/lib/faqContent";
import { ListEditor, SelectField, TextArea, TextField } from "../page-editor/fields";
import type { SectionEditorProps, SectionEditors } from "../page-editor/PageEditor";

// Editors for the /faq page. Questions are nested: category → question →
// links inside the answer ("triggers").

type EditorProps<K extends FaqSectionKey> = SectionEditorProps<FaqPageContent[K]>;

function IntroEditor({ value, update }: EditorProps<"intro">) {
  return <TextField label="Page title" value={value.title} onChange={(title) => update({ title })} />;
}

const FORM_OPTIONS = FAQ_FORMS.map((f) => ({ value: f.id, label: f.label }));

function TriggersEditor({ answer, triggers, onChange }: { answer: string; triggers: Trigger[]; onChange: (t: Trigger[]) => void }) {
  return (
    <details className="border border-black/10 bg-white">
      <summary className="cursor-pointer select-none px-4 py-2.5 text-[10px] uppercase tracking-widest text-gray-500 hover:text-black">
        Links inside the answer ({triggers.length})
      </summary>
      <div className="px-4 pb-4 pt-1 space-y-3">
        <p className="text-[11px] text-gray-400">
          Turns a phrase from the answer into a link or a button that opens a form. The phrase must match the answer
          text exactly (same capitals).
        </p>
        <ListEditor
          items={triggers}
          onChange={onChange}
          newItem={(): Trigger => ({ phrase: "", type: "redirect", url: "" })}
          addLabel="+ Add Link"
          itemLabel={(t, i) => t.phrase || `Link ${i + 1}`}
          renderItem={(t, set) => (
            <>
              <div className="grid grid-cols-2 gap-4">
                <TextField label="Phrase" value={t.phrase} onChange={(phrase) => set({ phrase })} />
                <SelectField
                  label="Action"
                  value={t.type}
                  onChange={(type) =>
                    set(type === "form" ? { type, formId: t.formId || FAQ_FORMS[0].id, url: undefined } : { type, url: t.url ?? "", formId: undefined })
                  }
                  options={[
                    { value: "redirect", label: "Go to a page" },
                    { value: "form", label: "Open a form" },
                  ]}
                />
              </div>
              {t.type === "form" ? (
                <SelectField label="Form" value={t.formId ?? FAQ_FORMS[0].id} onChange={(formId) => set({ formId })} options={FORM_OPTIONS} />
              ) : (
                <TextField label="Link" value={t.url ?? ""} onChange={(url) => set({ url })} placeholder="/collaborate or https://..." />
              )}
              {t.phrase && !answer.includes(t.phrase) && (
                <p className="text-[11px] text-amber-600">This phrase isn’t in the answer, so no link will show.</p>
              )}
            </>
          )}
        />
      </div>
    </details>
  );
}

function QuestionsEditor({ value, update }: EditorProps<"questions">) {
  const setCategory = (ci: number, patch: Partial<FaqPageContent["questions"]["categories"][number]>) =>
    update((latest) => ({ categories: latest.categories.map((c, i) => (i === ci ? { ...c, ...patch } : c)) }));

  return (
    <ListEditor
      items={value.categories}
      onChange={(categories) => update({ categories })}
      newItem={() => ({ category: "", items: [{ question: "", answer: "" }] })}
      addLabel="+ Add Category"
      itemLabel={(c, i) => `${c.category || `Category ${i + 1}`} · ${c.items.length} question${c.items.length === 1 ? "" : "s"}`}
      renderItem={(cat, _set, ci) => (
        <details className="group">
          <summary className="cursor-pointer select-none text-[11px] uppercase tracking-widest text-gray-500 hover:text-black list-none">
            <span className="group-open:hidden">▸ Edit category</span>
            <span className="hidden group-open:inline">▾ Close</span>
          </summary>
          <div className="space-y-3 pt-3">
            <TextField label="Category name" value={cat.category} onChange={(category) => setCategory(ci, { category })} />
            <ListEditor<FAQItem>
              items={cat.items}
              onChange={(items) => setCategory(ci, { items })}
              newItem={() => ({ question: "", answer: "" })}
              addLabel="+ Add Question"
              minItems={1}
              itemLabel={(q, i) => q.question || `Question ${i + 1}`}
              renderItem={(q, set) => (
                <>
                  <TextField label="Question" value={q.question} onChange={(question) => set({ question })} />
                  <TextArea label="Answer" value={q.answer} onChange={(answer) => set({ answer })} rows={3} />
                  <TriggersEditor answer={q.answer} triggers={q.triggers ?? []} onChange={(triggers) => set({ triggers })} />
                </>
              )}
            />
          </div>
        </details>
      )}
    />
  );
}

export const FAQ_EDITORS: SectionEditors<FaqPageContent> = {
  intro: IntroEditor,
  questions: QuestionsEditor,
};

/** Blocks saves that would show a broken FAQ. */
export function validateFaq(section: string, value: unknown): string | null {
  if (section !== "questions") return null;
  const { categories } = value as FaqPageContent["questions"];
  for (const c of categories) {
    if (!c.category) return "Every category needs a name.";
    for (const q of c.items) {
      if (!q.question || !q.answer) return `“${c.category}” has a question without its question or answer text.`;
      for (const t of q.triggers ?? []) {
        if (!t.phrase) return `A link in “${q.question}” has no phrase.`;
        if (t.type === "redirect" && !t.url) return `The link “${t.phrase}” in “${q.question}” has no address.`;
      }
    }
  }
  return null;
}
