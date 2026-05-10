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
import Image from "next/image";
import Link from "next/link";

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
      
     <div id="ad-section" className="hidden lg:flex flex-col bg-neutral-50">
        <div className="flex justify-center px-10 py-8">
          <Link href="https://www.kajariaceramics.com/" target="_blank">
          <div className="w-fit bg-white p-5">
            <div className="text-[10px] text-black/40 uppercase font-bold tracking-widest">
              Advertisement
            </div>
            <div className="w-full h-[280px] flex items-center justify-center text-gray-300">
              <Image src="/temp/ads/1.png" alt="Ad" width={1900} height={100} className="w-full h-full object-contain" />
            </div>
          </div>
          </Link>
        </div>
      </div>
   </>
  );
}