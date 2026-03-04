import Link from "next/link";

export default function ThemeAnchor() {
  return (
    <section className="section-pov bg-pov-slate overflow-hidden relative">
      {/* Large decorative text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-display text-white/[0.03] whitespace-nowrap"
          style={{ fontSize: "clamp(6rem, 20vw, 18rem)", lineHeight: 1 }}
        >
          2026
        </span>
      </div>

      <div className="container-pov relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-label text-pov-clay mb-6">2026 Theme</p>
          <h2
            className="font-display text-pov-white"
            style={{
              fontSize: "clamp(3rem, 8vw, 7rem)",
              lineHeight: "0.95",
              letterSpacing: "-0.02em",
            }}
          >
            Sense &amp;
            <br />
            <em className="text-pov-clay">Sensibility</em>
          </h2>
          <p className="text-editorial text-pov-mist mt-8 max-w-xl mx-auto">
            A meditation on how design speaks to our bodies before our minds —
            through texture, temperature, light, and material memory.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Link
              href="/2026/theme"
              className="text-label text-pov-white border border-white/20 px-6 py-3 hover:border-pov-clay hover:text-pov-clay transition-all duration-300"
            >
              Explore the Theme
            </Link>
            <Link
              href="/2026"
              className="text-label text-pov-clay px-6 py-3 hover:text-pov-white transition-colors duration-300"
            >
              2026 Edition →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
