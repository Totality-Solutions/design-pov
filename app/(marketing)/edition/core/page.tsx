import { Suspense } from "react";
import CTAStrip from "@/components/common/CTAStrip";
import { CoreShowcase } from "@/components/edition26/core/CoreShowcase";
import CoreForm from "@/components/edition26/core/CoreForm";

export default function CorePage() {
  return (
    <main>
      <Suspense>
        <CoreShowcase />
      </Suspense>
      <CoreForm/>
      <div className="w-full z-10 bg-white">
        <CTAStrip
          title="Become a part of The Core Collective 2027"
          ctaLabel="Apply Now"
          ctaHref="#"
          hoverBgColor="#000000"
          textColor='var(--primary-red)'
          hoverTextColor='var(--color-white)'
        />
      </div>
    </main>
  );
}