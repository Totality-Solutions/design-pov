import ApplySection from "@/components/edition26/brands/ApplySection";
import Brands from "@/components/edition26/brands/Brands";
import BrandsHero from "@/components/edition26/brands/BrandsHero";
import Sponsors from "@/components/edition26/brands/Sponsors";
import BuildPartner from "@/components/edition26/brands/BuildPartner";
import PageLoader from "@/components/common/PageLoader";
import BuildPartner from "@/components/edition26/brands/BuildPartner";
import React from "react";

const BrandsPage = () => {
  return (
    <PageLoader>
      <main className="w-full min-h-screen bg-white">

        <BrandsHero />
        <Sponsors />
        <Brands />
        <BuildPartner />
        <ApplySection />

      </main>
    </PageLoader>
  );
};

export default BrandsPage;