export default function Loading() {
  return (
    <div className="w-full min-h-screen bg-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-[#0000B3] animate-spin"
        />
        <p
          className="text-sm tracking-widest uppercase text-gray-400"
          style={{ fontFamily: "var(--font-family)" }}
        >
          Loading
        </p>
      </div>
    </div>
  );
}
