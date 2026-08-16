import type { Metadata, Viewport } from "next";
import "./globals.css";
export const viewport: Viewport = { themeColor: "#0D1B2A" };
export const metadata: Metadata = {
  title: "DZIKRA — Crafted with Amanah. Designed for Comfort.",
  description: "DZIKRA publishes classical Islamic kitab with meticulous Arabic typesetting, quality materials, and beautiful batik-inspired design — built on 30 years of expertise from Rembang, Indonesia.",
  keywords: "Islamic books, kitab turats, Arabic typesetting, Islamic publishing Indonesia, Dzikra, Rembang",
  openGraph: { title: "DZIKRA — Crafted with Amanah. Designed for Comfort.", description: "Classical Islamic scholarship, beautifully published from Indonesia.", type: "website" },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </head>
      <body>{children}</body>
    </html>
  );
}
