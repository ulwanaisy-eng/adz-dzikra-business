"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackHomepageView, trackPageView, trackSectionView } from "@/lib/analytics";

export function AnalyticsProvider() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    const page = pathname.startsWith("/product/") ? "product_detail" : pathname === "/" ? "homepage" : pathname.slice(1) || "homepage";
    trackPageView(page);
    if (pathname === "/") trackHomepageView();
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") return;
    const seen = new Set<string>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting || seen.has(entry.target.id)) continue;
        seen.add(entry.target.id);
        if (entry.target.id === "tentang") trackSectionView("about");
        if (entry.target.id === "koleksi") trackSectionView("catalog");
        if (entry.target.id === "pesan") trackSectionView("contact");
      }
    }, { threshold: 0.35 });
    ["tentang", "koleksi", "pesan"].forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
