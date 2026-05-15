import CmsSidebar from "@/components/cms/CmsSidebar";
import StudioForm from "@/components/cms/StudioForm";

export default function NewStudioPage() {
  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <CmsSidebar />
      <main className="ml-56 p-10">
        <div className="mb-8">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-1">CMS / Studios</p>
          <h1 className="text-2xl font-semibold text-black">New Studio</h1>
        </div>
        <StudioForm />
      </main>
    </div>
  );
}
