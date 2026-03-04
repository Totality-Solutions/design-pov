export default function SponsorsStrip() {
  const sponsors = Array(6).fill({ name: "Brand Partner" });

  return (
    <section className="py-16 bg-pov-black border-t border-white/5">
      <div className="container-pov">
        <p className="text-label text-pov-mist text-center mb-10">
          2026 Design Partners
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-white/5">
          {sponsors.map((s, i) => (
            <div
              key={i}
              className="bg-pov-black flex items-center justify-center py-8 px-6 group hover:bg-pov-slate transition-colors duration-300"
            >
              {/* Replace with actual logo images */}
              <div className="w-24 h-8 bg-white/10 rounded group-hover:bg-white/20 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
