import ApplySection from "@/components/edition26/brands/ApplySection";
import Brands from "@/components/edition26/brands/Brands";
import BrandsHero from "@/components/edition26/brands/BrandsHero";
import Sponsors from "@/components/edition26/brands/Sponsors";
import BuildPartner from "@/components/edition26/brands/BuildPartner";
import PageLoader from "@/components/common/PageLoader";
import { getPageContent } from "@/lib/pageContentServer";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Brands, Exhibitors & Sponsors — Design POV",
  description:
    "Luxury home and lifestyle brands, sponsors and build partners at Design POV, Mumbai — and how to become an exhibitor, take a brand pavilion or stall, or partner with Design POV 2027.",
  path: "/edition/brands",
  keywords: [
    "Design POV exhibitors", "Design POV brands", "Design POV sponsors", "brand pavilion Design POV", "Design POV stall",
    "luxury brand exhibition Mumbai", "home and lifestyle brands exhibition India", "become a partner Design POV",
  ],
});

export const dynamic = "force-dynamic";

const BrandsPage = async () => {
  // Hero / Apply text and section visibility come from CMS → Brands Page;
  // the logo grids read Brand Partners themselves.
  const page = await getPageContent("brands");

  return (
    <PageLoader>
      <main className="w-full min-h-screen bg-white">

        {page.hero.enabled && <BrandsHero image={page.hero.image} alt={page.hero.alt} headline={page.hero.headline} />}
        {page.sponsors.enabled && <Sponsors />}
        {page.brands.enabled && <Brands />}
        {page.buildPartners.enabled && <BuildPartner />}
        {page.apply.enabled && <ApplySection partner={page.apply.partner} participant={page.apply.participant} />}

      </main>
    </PageLoader>
  );
};

export default BrandsPage;
