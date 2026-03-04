import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-pov-black flex flex-col items-center justify-center text-center">
      <p className="text-label text-pov-clay mb-6">404</p>
      <h1
        className="font-display text-pov-white mb-6"
        style={{ fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: "0.9" }}
      >
        Page not found.
      </h1>
      <p className="text-editorial text-pov-mist mb-10 max-w-sm">
        This page doesn&apos;t exist — or hasn&apos;t been built yet.
      </p>
      <Link
        href="/"
        className="text-label border border-pov-clay text-pov-clay px-6 py-3 hover:bg-pov-clay hover:text-pov-black transition-all duration-300"
      >
        Back to Home
      </Link>
    </div>
  );
}
