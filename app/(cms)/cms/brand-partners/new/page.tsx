import CmsSidebar from "@/components/cms/CmsSidebar";
import BrandPartnerForm from "@/components/cms/BrandPartnerForm";

export default function NewBrandPartnerPage() {
  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <CmsSidebar />
      <main className="ml-56 p-10">
        <div className="mb-8">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-1">CMS / Brand Partners</p>
          <h1 className="text-2xl font-semibold text-black">New Partner</h1>
        </div>
        <BrandPartnerForm />
      </main>
    </div>
  );
}
