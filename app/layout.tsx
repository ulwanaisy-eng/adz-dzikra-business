import type { Metadata } from "next";
import "./globals.css";
import "./overrides.css";
import "./three.css";

export const metadata: Metadata = {
  title: "Dzikra — Penerbit & Distributor Kitab",
  description: "Crafted with Amanah, Designed for Comfort.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body>{children}</body></html>;
}
