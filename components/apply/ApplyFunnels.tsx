"use client";

import { useState } from "react";
import { clsx } from "clsx";

const FUNNELS = [
  {
    id: "exhibit",
    label: "Exhibit",
    title: "Exhibit at Design POV",
    description:
      "Join the Core Collective as an architect or studio. Your practice, your installation concept, your vision — in conversation with the city's most intentional design audience.",
    fields: ["Studio / Practice Name", "Primary Contact", "Email", "Website", "Your Installation Concept (brief)"],
    cta: "Submit Expression of Interest",
  },
  {
    id: "sponsor",
    label: "Sponsor",
    title: "Sponsor the Show",
    description:
      "Design POV partners with brands who understand that great products deserve the right context. Sponsorship goes beyond logo placement — it's cultural alignment.",
    fields: ["Brand Name", "Contact Name", "Email", "Budget Range", "Partnership Goals"],
    cta: "Submit Partnership Enquiry",
  },
  {
    id: "speak",
    label: "Speak",
    title: "Speak at The Circle",
    description:
      "The Circle is a rigorous conversation platform — not a panel for the sake of panels. We curate speakers who push the discourse forward.",
    fields: ["Your Name", "Practice / Organisation", "Email", "Proposed Topic", "Speaker Bio"],
    cta: "Submit Speaking Proposal",
  },
  {
    id: "curate",
    label: "Curate",
    title: "Curate an Edit",
    description:
      "POV Edits are curated collections presented through a specific editorial lens. If you have a point of view on material culture, we want to hear it.",
    fields: ["Your Name", "Email", "Edit Concept", "Materials / Products in Mind"],
    cta: "Submit Edit Proposal",
  },
  {
    id: "elevate",
    label: "Host via Elevate",
    title: "Host via POV Elevate",
    description:
      "Elevate is Design POV's commissioned spatial experience offering. For brands who want something more than a booth — a spatial statement.",
    fields: ["Brand Name", "Contact Name", "Email", "Space Size (sqft)", "Experience Brief"],
    cta: "Enquire about Elevate",
  },
  {
    id: "media",
    label: "Media",
    title: "Media Partnership",
    description:
      "We partner with publications, platforms, and creators who are genuinely committed to design culture — not just covering it.",
    fields: ["Publication / Platform", "Contact Name", "Email", "Audience Size", "Partnership Idea"],
    cta: "Submit Media Enquiry",
  },
];

export default function ApplyFunnels() {
  const [active, setActive] = useState("exhibit");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const funnel = FUNNELS.find((f) => f.id === active)!;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      await fetch("/api/hubspot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: active, ...data }),
      });
      setSubmitted(true);
    } catch {
      console.error("Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-pov">
      <div className="container-pov">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-px bg-white/5">
          {/* Funnel Nav */}
          <nav className="bg-pov-black lg:col-span-1 flex lg:flex-col">
            {FUNNELS.map((f) => (
              <button
                key={f.id}
                onClick={() => { setActive(f.id); setSubmitted(false); }}
                className={clsx(
                  "text-label text-left px-6 py-5 transition-all duration-300 border-b border-white/5 last:border-0",
                  active === f.id
                    ? "text-pov-white bg-pov-slate border-l-2 border-pov-clay"
                    : "text-pov-mist hover:text-pov-white hover:bg-pov-slate/50"
                )}
              >
                {f.label}
              </button>
            ))}
          </nav>

          {/* Form area */}
          <div className="bg-pov-black lg:col-span-3 p-8 md:p-12">
            {submitted ? (
              <div className="flex flex-col items-start justify-center min-h-[400px]">
                <p className="text-label text-pov-clay mb-4">Submitted</p>
                <h2
                  className="font-display text-pov-white mb-6"
                  style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1 }}
                >
                  We&apos;ll be in touch.
                </h2>
                <p className="text-editorial text-pov-mist mb-8 max-w-md">
                  Your enquiry has been received. The Design POV team reviews all submissions personally.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-label text-pov-clay hover:text-pov-white transition-colors link-pov"
                >
                  Submit another enquiry
                </button>
              </div>
            ) : (
              <>
                <div className="mb-10">
                  <h2
                    className="font-display text-pov-white mb-4"
                    style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", lineHeight: "1.05" }}
                  >
                    {funnel.title}
                  </h2>
                  <p className="text-sm text-pov-mist font-light leading-relaxed max-w-lg">
                    {funnel.description}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {funnel.fields.map((field) => (
                    <div key={field} className="flex flex-col gap-2">
                      <label className="text-label text-pov-mist">{field}</label>
                      {field.toLowerCase().includes("concept") ||
                      field.toLowerCase().includes("bio") ||
                      field.toLowerCase().includes("brief") ||
                      field.toLowerCase().includes("idea") ? (
                        <textarea
                          name={field.toLowerCase().replace(/ /g, "_")}
                          rows={4}
                          required
                          className="bg-transparent border border-white/10 text-pov-white text-sm font-light p-3 focus:border-pov-clay focus:outline-none transition-colors duration-300 resize-none"
                          placeholder={`Your ${field.toLowerCase()}...`}
                        />
                      ) : (
                        <input
                          type={field.toLowerCase().includes("email") ? "email" : "text"}
                          name={field.toLowerCase().replace(/ /g, "_")}
                          required
                          className="bg-transparent border border-white/10 text-pov-white text-sm font-light p-3 focus:border-pov-clay focus:outline-none transition-colors duration-300"
                          placeholder={field}
                        />
                      )}
                    </div>
                  ))}

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-4 text-label bg-pov-white text-pov-black px-8 py-4 hover:bg-pov-clay transition-colors duration-300 disabled:opacity-50 self-start"
                  >
                    {loading ? "Sending..." : funnel.cta}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
