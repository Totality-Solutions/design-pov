import CTAStrip from "@/components/common/CTAStrip";
import  {CoreShowcase}  from "@/components/core/CoreShowcase";

export default function Home() {
  return (
    <main>
      <CoreShowcase />
      <div className="w-full z-10 bg-white">
        <CTAStrip
          title="Where Design Meets Dialogue"
          ctaLabel="Apply"
          ctaHref="#"
          hoverBgColor="#000000"
          textColor='var(--primary-red)'
          hoverTextColor='var(--color-white)'
        />
      </div>
    </main>
  );
}