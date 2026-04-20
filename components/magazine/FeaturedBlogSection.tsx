import MagazineBase from "@/components/common/MagazineBase";
import SectionHeading from "../common/SectionHeading";
import { blogs } from "@/data/magazineData";

export default function FeaturedBlogSection() {
  return (
    <section className="w-full bg-white px-6 md:px-14">
      {/* Tu yahan heading handle kar sakta hai */}
      <SectionHeading titleMain="The " titleBold="Draft" subTitle="Featured Stories" />
      <div className="mt-12">
        <MagazineBase activeBlog={blogs[0]} isInnerPage={false} />
      </div>
    </section>
  );
}