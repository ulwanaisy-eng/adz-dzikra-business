"use client";

import type { ReactNode } from "react";
import { trackWhatsAppClick } from "@/lib/analytics";

export function WhatsAppLink({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <a className={className} href="https://wa.me/62882000020979" target="_blank" rel="noreferrer" onClick={() => trackWhatsAppClick(undefined, "homepage_order_section")}>
      {children}
    </a>
  );
}
