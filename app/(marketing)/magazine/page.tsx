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
import HomeSponsors from "@/components/home/HomeSponsors";

export const metadata: Metadata = {
  title: "Magazine",
  description: "Exhibit, sponsor, speak, curate, or collaborate with Design POV 2026.",
};


export default function MagazinePage() {
  return (
    <>
      <MagazineHero />
      <PressSection />
      <AprilIssueSection />
      <FeaturedBlogSection />
      <InterviewsSection />
      <MagazineMediaForm />
      <div id="ad-section" className="hidden lg:flex flex-col bg-white">
        <div className="flex justify-center px-10 py-8">
          <div className="w-full max-w-[1100px]">
            <div className="text-[11px] text-gray-400 mb-2 uppercase tracking-wider">
              Advertisement
            </div>
            <div className="w-full h-[280px] border border-gray-200 bg-gray-50 flex items-center justify-center text-gray-300">
              Banner Space
            </div>
          </div>
        </div>
      </div>
      <HomeSponsors />
   </>
  );
}