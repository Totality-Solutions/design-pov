import type { Metadata } from "next";
import ApplyFunnels from "@/components/apply/ApplyFunnels";

export const metadata: Metadata = {
  title: "Apply & Partner",
  description: "Exhibit, sponsor, speak, curate, or collaborate with Design POV 2026.",
};

export default function ApplyPage() {
  return (
    <div className="bg-pov-black min-h-screen">
      <section className="pt-32 pb-12 border-b border-white/5">
        <div className="container-pov">
          <p className="text-label text-pov-clay mb-6">Get Involved</p>
          <h1
            className="font-display text-pov-white"
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)", lineHeight: "0.9" }}
          >
            Apply &amp; Partner
          </h1>
          <p className="text-editorial text-pov-mist mt-6 max-w-lg">
            Every collaboration at Design POV is intentional. Select the category that fits your intent.
          </p>
        </div>
      </section>
      <ApplyFunnels />
    </div>
  );
}
