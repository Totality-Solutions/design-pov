import { GlobalSettings } from "@/hooks/useGlobalSettings";

const defaults: GlobalSettings = { hideTickets: false, isHiring: false };

export async function getGlobalSettings(): Promise<GlobalSettings> {
  try {
    // Replace with your actual CMS/DB call — no fetch() needed if you
    // can call your data layer directly (e.g. Supabase server client).
    const res = await fetch(`/api/cms/global-settings`, {
      // Re-fetch at most once per 60 seconds — cached at the CDN edge,
      // not re-fetched on every page request.
      next: { revalidate: 60 },
    });
    if (!res.ok) return defaults;
    const data = await res.json();
    console.log("datadata",data);
    
    return {
      hideTickets: !!data?.hideTickets,
      isHiring:    !!data?.isHiring,
    };
  } catch {
    // Server fetch failed (CMS down, cold start, etc.) — fall back silently.
    return defaults;
  }
}