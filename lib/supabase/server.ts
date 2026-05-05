import { createClient } from "@supabase/supabase-js";

// New client per call — correct for React Server Components where module-level
// singletons are shared across concurrent requests.
export function createServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
