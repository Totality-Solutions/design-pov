// JournalPreview.tsx
import Link from "next/link";

const ARTICLES = [
  {
    category: "Conversations",
    title: "On designing spaces that remember you",
    excerpt: "A conversation with a Mumbai studio about embodied memory in architecture.",
    slug: "designing-spaces-that-remember",
    date: "March 2026",
  },
  {
    category: "Materials",
    title: "The return of terrazzo: craft, memory, and context",
    excerpt: "Why a mid-century material is finding renewed purpose in contemporary Indian interiors.",
    slug: "return-of-terrazzo",
    date: "February 2026",
  },
];

export default function JournalPreview() {
  return (
    <section className="section-pov bg-pov-slate border-t border-white/5">
      <div className="container-pov">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-label text-pov-clay mb-4">Journal</p>
            <h2
              className="font-display text-pov-white"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1 }}
            >
              From the archive.
            </h2>
          </div>
          <Link href="/journal" className="text-label text-pov-mist hover:text-pov-white transition-colors link-pov hidden md:block">
            All stories →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
          {ARTICLES.map((article) => (
            <Link
              key={article.slug}
              href={`/journal/${article.slug}`}
              className="group bg-pov-slate hover:bg-pov-black transition-colors duration-500 p-8 flex flex-col justify-between min-h-[320px]"
            >
              <div>
                <p className="text-label text-pov-clay mb-6">{article.category}</p>
                <h3
                  className="font-display text-pov-white group-hover:text-pov-clay transition-colors duration-300"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", lineHeight: "1.05" }}
                >
                  {article.title}
                </h3>
              </div>
              <div>
                <p className="text-sm text-pov-mist font-light leading-relaxed mb-6">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-label text-pov-mist">{article.date}</p>
                  <span className="text-label text-pov-clay opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Read →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
