import type { Metadata } from "next";
import ApplyFunnels from "@/components/apply/ApplyFunnels";
import MagazineHero from "@/components/magazine/MagazineHero";
import MagazineNav from "@/components/magazine/MagazineNav";
import PressSection from "@/components/magazine/PressSection";
import AprilIssueSection from "@/components/magazine/AprilIssueSection";
import InterviewsSection from "@/components/magazine/InterviewSection";
import FeaturedBlogSection from "@/components/magazine/FeaturedBlogSection";
import CTAStrip from "@/components/common/CTAStrip";
import MagazineMediaForm from "@/components/magazine/MagazineMediaForm";

export const metadata: Metadata = {
  title: "Magazine",
  description: "Exhibit, sponsor, speak, curate, or collaborate with Design POV 2026.",
};


export default function MagazinePage() {
  return (
    <main>
      <MagazineHero />
      <PressSection />
      <AprilIssueSection />
      <FeaturedBlogSection />
      <InterviewsSection />
      <MagazineMediaForm />
      <div className="w-full z-10 bg-white">
        <CTAStrip
          title="Post Show Report"
          ctaLabel="Download"
          ctaHref="#"
          hoverBgColor="#000000"
          textColor='var(--primary-red)'
          hoverTextColor='var(--color-white)'
        />
        </div>
    </main>
  );
}