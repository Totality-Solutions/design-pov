import ObjectsForm from "@/components/ecosystem/objects/ObjectsForm";
import ObjectsHero from "@/components/ecosystem/objects/ObjectsHero";
import ObjectsCarousel from "@/components/ecosystem/objects/ObjectsCarousel";
import { getPageContent } from "@/lib/pageContentServer";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "POV Objects",
  description:
    "POV Objects: original, one-of-one collectible pieces created by architects, designers, artists and makers in response to each Design POV edition's theme.",
  path: "/ecosystem/objects",
});

// Saving in CMS → Objects revalidates this page immediately; this is only
// the fallback refresh interval.
export const revalidate = 3600;

export default async function ObjectsPage() {
  const { hero, carousel, form } = await getPageContent("objects");

  return (
    <main className="w-full min-h-screen bg-white">
      {hero.enabled && <ObjectsHero headline={hero.headline} />}
      {carousel.enabled && <ObjectsCarousel />}
      {form.enabled && <ObjectsForm />}
    </main>
  );
}