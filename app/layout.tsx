import type { Metadata } from "next";
import "./globals.css";
import "./overrides.css";
import "./three.css";
import { AnalyticsProvider } from "./components/analytics-provider";

export const metadata: Metadata = {
  title: "Dzikra — Penerbit & Distributor Kitab",
  description: "Crafted with Amanah, Designed for Comfort.",
  icons: {
    icon: "/images/dzikra-logo.jpg",
    shortcut: "/images/dzikra-logo.jpg",
    apple: "/images/dzikra-logo.jpg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body>{children}<AnalyticsProvider /></body></html>;
}
