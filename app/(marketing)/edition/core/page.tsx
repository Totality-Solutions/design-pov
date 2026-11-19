export const dynamic = "force-dynamic";

import { Suspense } from "react";
import CTAStrip from "@/components/common/CTAStrip";
import { CoreShowcase } from "@/components/edition26/core/CoreShowcase";
import CoreForm from "@/components/edition26/core/CoreForm";
import { createServerClient } from "@/lib/supabase/server";
import { normalizeStudio } from "@/lib/studios";
import { getPageContent } from "@/lib/pageContentServer";

async function getStudios() {
  try {
    const { data } = await createServerClient()
      .from("studios")
      .select("*")
      .eq("active", true)
      .eq("edition", 2026)
      .order("sort_order", { ascending: true });
    return (data ?? []).map(normalizeStudio);
  } catch (err) {
    console.error("[CorePage] Failed to fetch studios:", err);
    return [];
  }
}

export default async function CorePage() {
  const [studios] = await Promise.all([getStudios(), getPageContent("edition")]);

  return (
    <main>
      <Suspense>
        <CoreShowcase studios={studios} />
      </Suspense>
      <CoreForm/>
      {/* {coreCta.enabled && (
        <div className="w-full z-10 bg-white">
          <CTAStrip
            title={coreCta.title}
            ctaLabel={coreCta.ctaLabel}
            // "#" / empty (the old default, possibly saved in the CMS) goes nowhere — fall back to the form.
            ctaHref={coreCta.ctaHref && coreCta.ctaHref !== "#" ? coreCta.ctaHref : "#core-form"}
            hoverBgColor="#000000"
            textColor='var(--primary-red)'
            hoverTextColor='var(--color-white)'
          />
        </div>
      )} */}
    </main>
  );
}