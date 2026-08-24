import Link from "next/link";
import CmsSidebar from "@/components/cms/CmsSidebar";
import IsHiringToggle from "@/components/cms/IsHiringToggle";
import HideTicketsToggle from "@/components/cms/HideTicketsToggle"; // 👈 Imported the new separate toggle
import NavButtonEditor from "@/components/cms/NavButtonEditor";
import { createServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

async function getStats() {
  const supabase = createServerClient();

  const [{ data: subs }, { data: blgs }] = await Promise.all([
    supabase.from("submissions").select("type, category"),
    supabase.from("blogs").select("status"),
  ]);

  const byType: Record<string, number> = {};
  (subs ?? []).forEach((row) => {
    const key = row.category || row.type || "unknown";
    byType[key] = (byType[key] || 0) + 1;
  });

  const blogStats = {
    total: blgs?.length ?? 0,
    published: blgs?.filter((b) => b.status === "published").length ?? 0,
    draft: blgs?.filter((b) => b.status === "draft").length ?? 0,
  };

  return { total: subs?.length ?? 0, byType, blogStats };
}

export default async function Dashboard() {
  const { total, byType, blogStats } = await getStats();

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <CmsSidebar />

      <main className="ml-56 p-10">
        
        {/* HEADER & GLOBAL CONFIGURATION ROW */}
        <div className="mb-8 flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-1">Overview</p>
            <h1 className="text-2xl font-semibold text-black">Dashboard</h1>
          </div>
          
          {/* Both toggles are clean, modular, and sit side-by-side in their own structural layout block */}
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto shrink-0">
            <IsHiringToggle />
            <HideTicketsToggle />
            <NavButtonEditor />
          </div>
        </div>

        {/* SUBMISSIONS STATS */}
        <div className="mb-2">
          <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-3">Submissions</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <StatCard label="Total Submissions" value={total} />
            {Object.entries(byType).slice(0, 4).map(([key, count]) => (
              <StatCard key={key} label={key} value={count} />
            ))}
          </div>
        </div>

        {/* BLOGS STATS */}
        <div className="mb-8">
          <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-3">Blogs</p>
          <div className="grid grid-cols-3 gap-4">
            <StatCard label="Total Blogs" value={blogStats.total} />
            <StatCard label="Published" value={blogStats.published} />
            <StatCard label="Drafts" value={blogStats.draft} />
          </div>
        </div>

        {/* ACTIONS PANEL */}
        <div className="bg-white border border-black/10 p-6">
          <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-4">Quick Actions</p>
          <div className="flex gap-4 flex-wrap">
            <Link href="/cms/submissions" className="border border-black px-5 py-2.5 text-[11px] uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
              View Submissions
            </Link>
            <Link href="/cms/blogs/new" className="bg-black text-white px-5 py-2.5 text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors">
              New Blog Post
            </Link>
            <Link href="/cms/blogs" className="border border-black px-5 py-2.5 text-[11px] uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
              Manage Blogs
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white border border-black/10 p-6">
      <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">{label}</p>
      <p className="text-3xl font-semibold text-black">{value}</p>
    </div>
  );
}