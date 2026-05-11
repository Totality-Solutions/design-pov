import { createClient } from "@supabase/supabase-js";
import CmsSidebar from "@/components/cms/CmsSidebar";
import PovMailInbox from "@/components/cms/PovMailInbox";

export const dynamic = "force-dynamic";

async function getMails() {
  const { data } = await createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
    .from("pov_mails")
    .select("*")
    .order("created_at", { ascending: false });

  return data ?? [];
}

export default async function PovMailPage() {
  const mails = await getMails();
  const unreadCount = mails.filter((m) => !m.is_read).length;

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <CmsSidebar />

      <main className="ml-56 p-8">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-1">CMS</p>
            <h1 className="text-2xl font-semibold text-black flex items-center gap-3">
              POV Mail
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 font-normal">
                  {unreadCount} unread
                </span>
              )}
            </h1>
          </div>
          <p className="text-sm text-gray-400">{mails.length} total</p>
        </div>

        <PovMailInbox initialMails={mails} />
      </main>
    </div>
  );
}
