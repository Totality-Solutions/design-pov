import CTAStrip from "@/components/common/CTAStrip";
import BrandsSection from "@/components/edition26/BrandsSection";
import CoreSection from "@/components/edition26/CoreSection";
import PartnersSection from "@/components/edition26/PartnersSection";
import ScheduleSection from "@/components/edition26/ScheduleSection";
import ThemeSection from "@/components/edition26/ThemeSection";
import ShowDeckCTA from "@/components/common/ShowDeckCTA";
import WhoItIsFor from "@/components/edition26/WhoItIsFor";
import { getPageContent } from "@/lib/pageContentServer";

// Saving a section in CMS → Edition Page revalidates this page immediately;
// this is only the fallback refresh interval.
export const revalidate = 3600;

export default async function Edition2026() {
  const edition = await getPageContent("edition");
  const { theme, whoItIsFor, core, ctaStrip } = edition;

  return (
    <div className="bg-pov-black min-h-screen">
      {theme.enabled && <ThemeSection title={theme.title} subtitle={theme.subtitle} href={theme.href} images={theme.images} />}
      {whoItIsFor.enabled && (
        <WhoItIsFor heading={whoItIsFor.heading} lines={whoItIsFor.lines} ctaLabel={whoItIsFor.ctaLabel} ctaHref={whoItIsFor.ctaHref} />
      )}
      {core.enabled && <CoreSection headingMain={core.headingMain} headingBold={core.headingBold} video={core.video} href={core.href} />}
      {ctaStrip.enabled && (
        <div className="w-full z-10 bg-white py-6">
          <CTAStrip
            title={ctaStrip.title}
            ctaLabel={ctaStrip.ctaLabel}
            ctaHref={ctaStrip.ctaHref}
            hoverBgColor="#000000"
            textColor="var(--primary-red)"
            hoverTextColor="var(--color-white)"
          />
        </div>
      )}
      {edition.brands.enabled && <BrandsSection />}
      {edition.schedule.enabled && <ScheduleSection />}
      {edition.partners.enabled && <PartnersSection />}
      <ShowDeckCTA />
    </div>
  );
}
