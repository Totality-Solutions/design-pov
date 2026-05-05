import Hero from "@/components/home/Hero";
import WhatPOV from "@/components/home/WhatPOV";
import Theme from "@/components/home/Theme";
import Ecosystem from "@/components/home/Ecosystem";
import FeaturedDesigners from "@/components/home/Featured";
import ClientLogo from "@/components/home/ClientLogo";
import FeaturedStory from "@/components/home/FeaturedStory";
import CTAStrip from "@/components/common/CTAStrip";
import ScrollMaskText from "@/components/home/ScrollRevealText";
import HomeSponsors from "@/components/home/HomeSponsors";
import ShowDeckCTA from "@/components/common/ShowDeckCTA";
import { createServerClient } from "@/lib/supabase/server";

async function fetchHomePageData() {
  const supabase = createServerClient();

const { data, error } = await supabase
  .from('pages')
  .select(`
    *,
    blocks (*)
  `)
  .eq('slug', '/')
  .order('order_index', { foreignTable: 'blocks' })
  .maybeSingle();

  return { data, error };
}
export default async function HomePage() {
  const { data, error } = await fetchHomePageData();

  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("[HomePage] Supabase fetch:");
  if (data)  console.log(JSON.stringify(data, null, 2));
  if (!data) console.log("  data  → null (no published page with slug \"/\")");
  if (error) console.log("  error →", error.message);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  return (
    <>
      <Hero />
      <ScrollMaskText/>
      <WhatPOV />
      <Theme />
      <Ecosystem />
      <div className="w-full z-10 bg-white border-t border-b border-[#DFDFDF]">
        <CTAStrip
          title="Become a part of a design led platform like no other."
          ctaLabel="Apply Now"
          ctaHref="/collaborate"
          hoverBgColor="#000000"
          textColor="var(--primary-red)"
          hoverTextColor="var(--color-white)"
        />
      </div>
      <FeaturedDesigners />
      <HomeSponsors />
      <FeaturedStory />
      <ShowDeckCTA />
      <ClientLogo />
    </>
  );
}