import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dm = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm",
});

export const metadata: Metadata = {
  title: "[BRAND] — Dekarbonizace motoru vodíkem",
  description:
    "Profesionální vodíková dekarbonizace motorů. Liberec a České Budějovice. Obnovte výkon motoru za 30–60 minut.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs" className={dm.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
