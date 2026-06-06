import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sweat & Success — Science-Backed Fat Loss. Free. Forever.",
  description:
    "Stop guessing at the gym. Download the free 21-page science-backed guide and join a community of Indian women losing fat the right way — no supplements, no fads, no upsell.",
  keywords: ["fat loss", "fitness guide", "Indian women", "science-backed", "free fitness plan", "WhatsApp community"],
  openGraph: {
    title: "Sweat & Success — Stop Guessing. Start Losing.",
    description: "Free 21-page science-backed fat loss guide for Indian women. No supplements. No email required.",
    type: "website",
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
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Work+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
