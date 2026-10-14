import type { SectionMeta } from "@/lib/pageContent";

// Content model for the /contact page, edited in CMS → Contact. Client-safe.

export type ContactPageContent = {
  header: { enabled: boolean; title: string; description: string };
  form:   { enabled: boolean };
};

export type ContactSectionKey = keyof ContactPageContent;

export const CONTACT_SECTIONS: SectionMeta<ContactSectionKey>[] = [
  { key: "header", label: "Header",       hint: "Page title and intro text" },
  { key: "form",   label: "Contact Form", hint: "Enquiries arrive in CMS → Submissions" },
];

export const DEFAULT_CONTACT: ContactPageContent = {
  header: {
    enabled: true,
    title: "Contact Now",
    description:
      "Whether you’re looking to participate, collaborate, partner, or simply learn more, we’d like to hear from you. Reach out to the team and we’ll direct your enquiry to the relevant department.",
  },
  form: { enabled: true },
};
