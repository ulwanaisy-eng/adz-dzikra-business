import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let browserClient: SupabaseClient | null = null;

// Reuse one auth client. Recreating it for every request/photo competes for
// the same session lock and can leave saves waiting for other tabs.

export function getSupabaseBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  if (!browserClient) {
    browserClient = createClient(url.replace(/\/rest\/v1\/?$/, "").replace(/\/$/, ""), key, {
      global: {
        fetch: (input, init) => fetch(input, {
          ...init,
          signal: init?.signal
            ? AbortSignal.any([init.signal, AbortSignal.timeout(60000)])
            : AbortSignal.timeout(60000),
        }),
      },
    });
  }
  return browserClient;
}
