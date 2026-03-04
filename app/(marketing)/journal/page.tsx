import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Journal",
  description: "Design POV's editorial arm — project features, designer conversations, and material deep dives.",
};

const CATEGORIES = ["All", "Installations", "Conversations", "Materials", "Opinion", "Field Notes"];

// In production: fetch from Sanity
const ARTICLES = Array(6).fill(null).map((_, i) => ({
  category: CATEGORIES[(i % (CATEGORIES.length - 1)) + 1],
  title: `Article title ${i + 1} — a considered headline in display type`,
  excerpt: "A short descriptor that gives editorial context before clicking through.",
  slug: `article-${i + 1}`,
  date: "March 2026",
  readTime: "6 min read",
  isFeature: i === 0,
}));

export default function JournalPage() {
  const [feature, ...rest] = ARTICLES;

  return (
    <div className="bg-pov-black min-h-screen">
      {/* Header */}
      <section className="pt-32 pb-12 border-b border-white/5">
        <div className="container-pov">
          <p className="text-label text-pov-clay mb-6">Publication</p>
          <h1
            className="font-display text-pov-white"
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)", lineHeight: "0.9" }}
          >
            Journal
          </h1>
        </div>
      </section>

      {/* Category filter */}
      <div className="border-b border-white/5 overflow-x-auto">
        <div className="container-pov flex gap-6 py-4 min-w-max">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`text-label transition-colors ${
                cat === "All" ? "text-pov-white border-b border-pov-clay pb-1" : "text-pov-mist hover:text-pov-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <section className="section-pov">
        <div className="container-pov">
          {/* Feature article */}
          <Link
            href={`/journal/${feature.slug}`}
            className="group grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 mb-px"
          >
            <div className="bg-pov-black aspect-[4/3] md:aspect-auto" /> {/* image */}
            <div className="bg-pov-black p-8 md:p-12 flex flex-col justify-between min-h-[320px]">
              <div>
                <p className="text-label text-pov-clay mb-6">{feature.category} — Feature</p>
                <h2
                  className="font-display text-pov-white group-hover:text-pov-clay transition-colors duration-300"
                  style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", lineHeight: "1" }}
                >
                  {feature.title}
                </h2>
              </div>
              <div>
                <p className="text-sm text-pov-mist font-light mb-6">{feature.excerpt}</p>
                <div className="flex items-center justify-between">
                  <p className="text-label text-pov-mist">{feature.date} · {feature.readTime}</p>
                  <span className="text-label text-pov-clay opacity-0 group-hover:opacity-100 transition-opacity duration-300">Read →</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Article grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
            {rest.map((article) => (
              <Link
                key={article.slug}
                href={`/journal/${article.slug}`}
                className="group bg-pov-black hover:bg-pov-slate transition-colors duration-500 p-8 flex flex-col justify-between min-h-[280px]"
              >
                <div>
                  <p className="text-label text-pov-clay mb-5">{article.category}</p>
                  <h3
                    className="font-display text-pov-white group-hover:text-pov-clay transition-colors duration-300"
                    style={{ fontSize: "clamp(1.2rem, 2vw, 1.6rem)", lineHeight: "1.05" }}
                  >
                    {article.title}
                  </h3>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <p className="text-label text-pov-mist">{article.date}</p>
                  <span className="text-label text-pov-clay opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
