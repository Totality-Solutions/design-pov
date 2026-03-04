"use client";

import { useState, useEffect } from "react";
import { clsx } from "clsx";

export default function LeadMagnetPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Show popup after 8 seconds, only once per session
    const seen = sessionStorage.getItem("pov_popup_seen");
    if (!seen) {
      const timer = setTimeout(() => setVisible(true), 8000);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem("pov_popup_seen", "1");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, type: "newsletter" }),
    });
    setSubmitted(true);
    sessionStorage.setItem("pov_popup_seen", "1");
    setTimeout(dismiss, 2500);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div
        className={clsx(
          "bg-pov-slate border border-white/10 p-8 md:p-12 max-w-md w-full relative",
          "animate-fade-up"
        )}
      >
        {/* Close */}
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 text-pov-mist hover:text-pov-white transition-colors text-label"
          aria-label="Close"
        >
          ✕
        </button>

        {submitted ? (
          <div>
            <p className="text-label text-pov-clay mb-3">You&apos;re in.</p>
            <h3 className="font-display text-pov-white text-2xl">
              Welcome to Design POV.
            </h3>
          </div>
        ) : (
          <>
            <p className="text-label text-pov-clay mb-4">Early Access</p>
            <h3
              className="font-display text-pov-white mb-4"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", lineHeight: "1.05" }}
            >
              Get the 2026 Show Deck
            </h3>
            <p className="text-sm text-pov-mist font-light mb-8 leading-relaxed">
              Download our editorial overview of Design POV 2026 — theme framework, programme structure, and partnership opportunities.
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Your email"
                className="flex-1 bg-transparent border border-white/10 text-pov-white text-sm p-3 focus:border-pov-clay focus:outline-none transition-colors duration-300"
              />
              <button
                type="submit"
                className="text-label bg-pov-white text-pov-black px-5 py-3 hover:bg-pov-clay transition-colors duration-300 shrink-0"
              >
                Get it
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
