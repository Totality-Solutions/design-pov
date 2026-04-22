import MagazineBase from "@/components/common/MagazineBase";
import { blogs } from "@/data/magazineData";
import { notFound } from "next/navigation";

// Next.js 15+ requires params to be awaited
export default async function InnerMagazinePage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  
  const post = blogs.find(b => b.slug === slug);

  if (!post) {
    console.log("Blog not found for slug:", slug); // Debugging ke liye
    return notFound();
  }

  return (
    <main className="w-full bg-white px-6 md:px-14 py-24 lg:py-32">
      <MagazineBase activeBlog={post} isInnerPage={true} />
    </main>
  );
}