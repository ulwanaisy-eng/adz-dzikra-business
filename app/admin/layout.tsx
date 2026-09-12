"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase || pathname === "/admin/login") return setReady(true);
    supabase.auth.getSession().then(({ data }) => { if (!data.session) router.replace("/admin/login"); else setReady(true); });
  }, [pathname, router]);
  if (!ready && pathname !== "/admin/login") return <main className="admin"><p className="eyebrow">DZIKRA / ADMIN</p><p>Memeriksa akses…</p></main>;
  return children;
}
