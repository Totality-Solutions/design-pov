"use client";

import { useState } from "react";
import type { Metadata } from "next";

const FAQS = [
  { q: "When and where is Design POV 2026?", a: "Design POV 2026 takes place in May 2026 in Mumbai. Exact dates and venue to be announced." },
  { q: "Who should attend?", a: "Architects, interior designers, product designers, brand strategists, developers, and anyone who believes design culture matters." },
  { q: "What is The Circle?", a: "The Circle is our curated panel programme — a series of design conversations that go beyond surface-level discourse." },
  { q: "How do I apply as an exhibitor?", a: "Visit our Apply page and submit an expression of interest under 'Exhibit'." },
];

export default function VisitPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name }),
    });
    setSubmitted(true);
  };

  return (
    <div className="bg-pov-black min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-16 border-b border-white/5">
        <div className="container-pov">
          <p className="text-label text-pov-clay mb-6">May 2026 · Mumbai</p>
          <h1
            className="font-display text-pov-white"
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)", lineHeight: "0.9" }}
          >
            Visit Design POV
          </h1>
        </div>
      </section>

      {/* Info + Waitlist */}
      <section className="section-pov border-b border-white/5">
        <div className="container-pov grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info */}
          <div>
            <div className="flex flex-col gap-8">
              {[
                { label: "Edition", value: "Design POV 2026" },
                { label: "Theme", value: "Sense & Sensibility" },
                { label: "Dates", value: "May 2026 — TBC" },
                { label: "City", value: "Mumbai, India" },
                { label: "Venue", value: "To be announced" },
              ].map((item) => (
                <div key={item.label} className="flex gap-8 pb-6 border-b border-white/5 last:border-0">
                  <span className="text-label text-pov-mist w-24 shrink-0">{item.label}</span>
                  <span className="text-label text-pov-white">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Waitlist form */}
          <div className="bg-pov-slate p-8 md:p-10">
            {submitted ? (
              <div>
                <p className="text-label text-pov-clay mb-4">You&apos;re on the list.</p>
                <h2
                  className="font-display text-pov-white mb-4"
                  style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", lineHeight: 1 }}
                >
                  We&apos;ll see you in May.
                </h2>
                <p className="text-sm text-pov-mist font-light">
                  You&apos;ll receive early access to tickets and programme announcements before the general public.
                </p>
              </div>
            ) : (
              <>
                <p className="text-label text-pov-clay mb-6">Phase 1 — Waitlist</p>
                <h2
                  className="font-display text-pov-white mb-4"
                  style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", lineHeight: 1 }}
                >
                  Join the waitlist for early access.
                </h2>
                <p className="text-sm text-pov-mist font-light mb-8 leading-relaxed">
                  Tickets go live in late 2025. Waitlist members get priority access and early bird pricing.
                </p>
                <form onSubmit={handleJoin} className="flex flex-col gap-4">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="bg-transparent border border-white/10 text-pov-white text-sm p-3 focus:border-pov-clay focus:outline-none transition-colors"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Your email"
                    className="bg-transparent border border-white/10 text-pov-white text-sm p-3 focus:border-pov-clay focus:outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    className="text-label bg-pov-white text-pov-black px-6 py-4 hover:bg-pov-clay transition-colors duration-300"
                  >
                    Join Waitlist
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-pov">
        <div className="container-pov max-w-2xl">
          <p className="text-label text-pov-clay mb-10">FAQs</p>
          <div className="flex flex-col">
            {FAQS.map((faq, i) => (
              <div key={i} className="py-7 border-b border-white/5 first:border-t">
                <p className="text-label text-pov-white mb-3">{faq.q}</p>
                <p className="text-sm text-pov-mist font-light leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
