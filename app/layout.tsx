import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0F0E0C",
};

export const metadata: Metadata = {
  title: "Adz Dzikra — Premium Islamic Publishing",
  description: "Adz Dzikra publishes premium editions of classical Islamic scholarship — crafted with precision, authenticity, and care since 1992.",
  keywords: "Islamic books, premium Islamic publishing, Arabic typesetting, classical Islamic scholarship, Adz Dzikra",
  openGraph: {
    title: "Adz Dzikra — Premium Islamic Publishing",
    description: "Experience the beauty of classical Islamic scholarship through thoughtfully crafted editions designed for today's readers.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Adz Dzikra — Premium Islamic Publishing",
    description: "Experience the beauty of classical Islamic scholarship through thoughtfully crafted editions designed for today's readers.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}
