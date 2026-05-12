export default function Loading() {
  return (
    <div className="w-full min-h-screen bg-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-black/10 border-t-black animate-spin" />
        <p className="text-[9px] tracking-[0.4em] uppercase text-black/30" style={{ fontFamily: "var(--font-family)" }}>
          Loading
        </p>
      </div>
    </div>
  );
}
