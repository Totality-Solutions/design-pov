import type { Metadata } from "next";
import MagazineHero from "@/components/magazine/MagazineHero";
import PressSection from "@/components/magazine/PressSection";
import AprilIssueSection from "@/components/magazine/AprilIssueSection";
import InterviewsSection from "@/components/magazine/InterviewSection";
import FeaturedBlogSection from "@/components/magazine/FeaturedBlogSection";
import MagazineMediaForm from "@/components/magazine/MagazineMediaForm";
import HomeSponsors from "@/components/home/HomeSponsors";
import Image from "@/components/common/SmartImage";
import Link from "next/link";
import { createServerClient } from "@/lib/supabase/server";
import { NormalizedBlog, normalizeDbBlog } from "@/lib/blog";
import { getPageContent } from "@/lib/pageContentServer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Magazine",
  description: "Exhibit, sponsor, speak, curate, or collaborate with Design POV 2026.",
};

async function getBlogs(): Promise<NormalizedBlog[]> {
  try {
    const { data, error } = await createServerClient()
      .from("blogs")
      .select("id, title, slug, category, category_display, author, date, is_featured, image, thumbnail, subtitle, description, featured_paragraphs, detailed_content")
      .eq("status", "published")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) return [];
    return data.map(normalizeDbBlog);
  } catch {
    return [];
  }
}

export default async function MagazinePage() {
  const [allBlogs, page] = await Promise.all([getBlogs(), getPageContent("magazine")]);
  const blogs = allBlogs.length > 0 ? allBlogs : undefined;
  const { hero, issue, interviews, bottomAd } = page;

  return (
    <>
      {hero.enabled && <MagazineHero headline={hero.headline} subtext={hero.subtext} />}
      {page.press.enabled && <PressSection allBlogs={blogs} />}
      {issue.enabled && (
        <AprilIssueSection headingMain={issue.headingMain} headingBold={issue.headingBold} cards={issue.cards} ad={issue.ad} />
      )}
      {page.featured.enabled && <FeaturedBlogSection allBlogs={blogs} />}
      {interviews.enabled && (
        <InterviewsSection heading={interviews.heading} rightLabel={interviews.rightLabel} items={interviews.items} />
      )}
      {page.submission.enabled && <MagazineMediaForm />}

      {bottomAd.enabled && bottomAd.image && (
        <div id="ad-section" className="hidden lg:flex flex-col bg-neutral-50">
          <div className="flex justify-center px-10 py-8">
            <Link href={bottomAd.href || "#"} target="_blank">
              <div className="w-fit bg-white p-5">
                <div className="text-[10px] text-black/40 uppercase font-bold tracking-widest">
                  Advertisement
                </div>
                <div className="w-full h-[280px] flex items-center justify-center text-gray-300">
                  <Image src={bottomAd.image} alt="Ad" width={1900} height={100} className="w-full h-full object-contain" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
