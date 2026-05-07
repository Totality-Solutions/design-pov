import ApplySection from "@/components/edition26/brands/ApplySection";
import Brands from "@/components/edition26/brands/Brands";
import BrandsHero from "@/components/edition26/brands/BrandsHero";
import Sponsors from "@/components/edition26/brands/Sponsors";
import React from "react";

const BrandsPage = () => {
  return (
    <main className="w-full min-h-screen bg-white">
      
      <BrandsHero />
      <Sponsors />
      <Brands />
      <ApplySection />

    </main>
  );
};

export default BrandsPage;