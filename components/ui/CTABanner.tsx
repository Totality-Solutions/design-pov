import Link from "next/link";
import { clsx } from "clsx";

interface CTABannerProps {
  label: string;
  heading: string;
  cta: { label: string; href: string };
  variant?: "dark" | "light";
}

export default function CTABanner({
  label,
  heading,
  cta,
  variant = "dark",
}: CTABannerProps) {
  const isDark = variant === "dark";

  return (
    <section
      className={clsx(
        "py-16 md:py-20 border-t border-b",
        isDark
          ? "bg-pov-slate border-white/5"
          : "bg-pov-cream border-pov-cream"
      )}
    >
      <div className="container-pov flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <p
            className={clsx(
              "text-label mb-4",
              isDark ? "text-pov-clay" : "text-pov-rust"
            )}
          >
            {label}
          </p>
          <h2
            className={clsx(
              "font-display max-w-lg",
              isDark ? "text-pov-white" : "text-pov-black"
            )}
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", lineHeight: "1.1" }}
          >
            {heading}
          </h2>
        </div>
        <Link
          href={cta.href}
          className={clsx(
            "text-label px-8 py-4 shrink-0 transition-all duration-300",
            isDark
              ? "bg-pov-white text-pov-black hover:bg-pov-clay"
              : "bg-pov-black text-pov-white hover:bg-pov-rust"
          )}
        >
          {cta.label}
        </Link>
      </div>
    </section>
  );
}
