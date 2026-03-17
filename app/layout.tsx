import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import CookieBanner from "./components/CookieBanner";
import Script from "next/script";



const dm = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm",
});



export const metadata: Metadata = {
  title: "Dekarbonizace motoru bez demontáže | ČištěníVodíkem.cz",
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
      <head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`} // TODO: Add GA ID
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            // Výchozí nastavení: vše zamítnuto, dokud uživatel neklikne
            gtag('consent', 'default', {
              'analytics_storage': 'denied'
            });

            gtag('config', 'G-XXXXXXXXXX'); // SEM DEJ ZNOVU SVÉ ID
          `}
        </Script>
      </head>
      <body className="antialiased">
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}