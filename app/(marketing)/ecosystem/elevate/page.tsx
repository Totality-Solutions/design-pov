
import ElevateForm from "@/components/ecosystem/elevate/ElevateForm";
import ElevateGallery from "@/components/ecosystem/elevate/ElevateGallery";
import ElevateHero from "@/components/ecosystem/elevate/ElevateHero";
import { getPageContent } from "@/lib/pageContentServer";
import { pageMetadata } from "@/lib/seo";
import { cdn } from "@/lib/cdn";

export const metadata = pageMetadata({
  title: "POV Elevate",
  description:
    "POV Elevate takes Design POV beyond the show floor for home and lifestyle brands: curated events, launches, conversations, media and F&B partnerships, and online amplification.",
  path: "/ecosystem/elevate",
  image: cdn("/temp/edition/elevate/1.JPG"),
});

// Saving in CMS → Elevate revalidates this page immediately; this is only
// the fallback refresh interval.
export const revalidate = 3600;

export default async function ElevatePage() {
  const { intro, gallery, form } = await getPageContent("elevate");

  return (
    <main className="w-full min-h-screen bg-white">
        {intro.enabled && <ElevateHero paragraphs={intro.paragraphs} />}
        {gallery.enabled && <ElevateGallery heading={gallery.heading} body={gallery.body} images={gallery.images} />}
        {form.enabled && <ElevateForm heading={form.heading} />}
    </main>
  );
}