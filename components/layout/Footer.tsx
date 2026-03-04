import Link from "next/link";
import Container from "@/components/ui/Container";
import Divider from "@/components/ui/Divider";

const FOOTER_LINKS = {
  "2026 Edition": [
    { label: "Theme: Sense & Sensibility", href: "/2026/theme" },
    { label: "Core Collective",            href: "/2026/core" },
    { label: "Design Partners",            href: "/2026/design-partners" },
    { label: "The Circle",                 href: "/2026/circle" },
    { label: "Art & Installations",        href: "/2026/art-installations" },
    { label: "Visit / Waitlist",           href: "/2026/visit" },
  ],
  Ecosystem: [
    { label: "POV Originals",  href: "/ecosystem/originals" },
    { label: "POV Elevate",    href: "/ecosystem/elevate" },
    { label: "POV Edits",      href: "/ecosystem/edits" },
    { label: "POV Objects",    href: "/ecosystem/objects" },
  ],
  Publication: [
    { label: "Journal",        href: "/journal" },
    { label: "Installations",  href: "/journal?cat=installations" },
    { label: "Conversations",  href: "/journal?cat=conversations" },
    { label: "Materials",      href: "/journal?cat=materials" },
  ],
  "Get Involved": [
    { label: "Apply to Exhibit",  href: "/apply?type=exhibit" },
    { label: "Sponsor",           href: "/apply?type=sponsor" },
    { label: "Speak",             href: "/apply?type=speak" },
    { label: "Media Partnership", href: "/apply?type=media" },
    { label: "Contact",           href: "/contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-pov-black border-t border-white/5">
      {/* Marquee ticker */}
      <div className="overflow-hidden border-b border-white/5 py-3.5">
        <div className="flex animate-marquee whitespace-nowrap select-none" aria-hidden>
          {Array(10).fill("DESIGN POV · SENSE & SENSIBILITY · MUMBAI 2026 · ").map((t, i) => (
            <span key={i} className="text-label text-white/20 px-6">{t}</span>
          ))}
        </div>
      </div>

      <Container className="py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-10 md:gap-8">
          {/* Brand column */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <Link href="/" className="text-label text-pov-white tracking-[0.3em] hover:text-pov-clay transition-colors duration-300 block">
              DESIGN POV
            </Link>
            <p className="text-sm text-pov-mist font-light leading-relaxed max-w-xs">
              A platform for design beyond sight. Where architects, brands, and builders co-create culture.
            </p>
            <p className="text-label text-pov-mist/50">Mumbai, India</p>
            <div className="flex gap-5 mt-2">
              {[{ label: "Instagram", href: "https://instagram.com" }, { label: "LinkedIn", href: "https://linkedin.com" }].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="text-label text-pov-mist hover:text-pov-clay transition-colors duration-300 link-pov">
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <p className="text-label text-pov-clay mb-5">{group}</p>
              <ul className="flex flex-col gap-3.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-label text-pov-mist hover:text-pov-white transition-colors duration-300 link-pov">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Divider variant="subtle" spacing="lg" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-label text-pov-mist/40">© {new Date().getFullYear()} Design POV. All rights reserved.</p>
          <div className="flex gap-6">
            {[{ label: "Privacy Policy", href: "/privacy" }, { label: "Terms of Use", href: "/terms" }, { label: "Media Kit", href: "/media-kit" }].map((l) => (
              <Link key={l.href} href={l.href} className="text-label text-pov-mist/40 hover:text-pov-white transition-colors duration-300">{l.label}</Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
