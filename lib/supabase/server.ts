import { createClient } from "@supabase/supabase-js";

// Service-role client for server-side use (API routes, Server Components).
// Bypasses RLS — never expose this key to the browser.
export function createServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}
