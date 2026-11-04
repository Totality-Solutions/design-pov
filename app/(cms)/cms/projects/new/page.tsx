import CmsSidebar from "@/components/cms/CmsSidebar";
import ProjectForm from "@/components/cms/ProjectForm";

export default function NewProjectPage() {
  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <CmsSidebar />

      <main className="ml-56 p-10 max-w-4xl">
        <div className="mb-8">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-1">Projects</p>
          <h1 className="text-2xl font-semibold text-black">New Project</h1>
        </div>

        <div className="bg-white border border-black/10 p-8">
          <ProjectForm />
        </div>
      </main>
    </div>
  );
}
