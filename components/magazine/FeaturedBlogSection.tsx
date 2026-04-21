import MagazineBase from "@/components/common/MagazineBase";
import SectionHeading from "../common/SectionHeading";
import { blogs } from "@/data/magazineData";
import BlogsCarousel from "../common/BlogsCarousel";

export default function FeaturedBlogSection() {
  return (
    <section className="w-full bg-white ">
      {/* Tu yahan heading handle kar sakta hai */}
      <SectionHeading titleMain="The " titleBold="Draft" subTitle="Featured Stories" />
      <div className="my-12 px-6 md:px-14">
        <BlogsCarousel />
        <MagazineBase activeBlog={blogs[0]} isInnerPage={false} />
      </div>
    </section>
  );
}