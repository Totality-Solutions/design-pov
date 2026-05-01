import ApplySection from "@/components/brands/ApplySection";
import Brands from "@/components/brands/Brands";
import BrandsHero from "@/components/brands/BrandsHero";
import Sponsors from "@/components/brands/Sponsors";
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