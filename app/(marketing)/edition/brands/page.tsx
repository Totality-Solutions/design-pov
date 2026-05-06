import ApplySection from "@/components/brands/ApplySection";
import Brands from "@/components/brands/Brands";
import BrandsHero from "@/components/brands/BrandsHero";
import Sponsors from "@/components/brands/Sponsors";
import BuildPartner from "@/components/brands/BuildPartner";

const BrandsPage = () => {
  return (
    <main className="w-full min-h-screen bg-white">
      
      <BrandsHero />
      <Sponsors />
      <Brands />
      <BuildPartner />
      <ApplySection />

    </main>
  );
};

export default BrandsPage;