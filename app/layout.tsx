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

const SITE_URL = "https://www.cistenivodikem.cz";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Vodíková dekarbonizace motoru | Liberec & České Budějovice | CisteniVodikem.cz",
    template: "%s | CisteniVodikem.cz",
  },
  description:
    "Profesionální vodíková dekarbonizace benzínových a dieselových motorů bez demontáže. Obnovte výkon, snižte spotřebu a prodlužte životnost motoru za 50–80 minut. Liberec a České Budějovice.",
  keywords: [
    "vodíková dekarbonizace",
    "dekarbonizace motoru",
    "čištění motoru vodíkem",
    "HHO dekarbonizace",
    "snížení emisí motor",
    "dekarbonizace Liberec",
    "dekarbonizace České Budějovice",
    "čištění DPF filtru",
    "obnovení výkonu motoru",
    "vodíkové čištění motoru",
    "čistší emise STK",
  ],
  openGraph: {
    title: "Vodíková dekarbonizace motoru | Liberec & České Budějovice",
    description:
      "Obnovte výkon, snižte spotřebu a prodlužte životnost motoru za 50–80 minut. Bez demontáže, bez chemikálií — měřitelný výsledek garantován.",
    url: SITE_URL,
    siteName: "CisteniVodikem.cz",
    locale: "cs_CZ",
    type: "website",
    images: [
      {
        url: "/motor-detail.jpg",
        width: 1400,
        height: 933,
        alt: "Vodíková dekarbonizace motoru — HHO přístroj připojený k sání",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vodíková dekarbonizace motoru | CisteniVodikem.cz",
    description:
      "Obnovte výkon, snižte spotřebu a prodlužte životnost motoru za 50–80 minut. Liberec & České Budějovice.",
    images: ["/motor-detail.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#business`,
      name: "Čištění Vodíkem — Vodíková dekarbonizace",
      description:
        "Profesionální vodíková dekarbonizace benzínových a dieselových motorů bez demontáže. Obnovte výkon, snižte spotřebu a prodlužte životnost motoru.",
      url: SITE_URL,
      telephone: "+420",
      email: "info@cistenivodikem.cz",
      legalName: "RespiPlus Care s.r.o.",
      taxID: "09701982",
      priceRange: "od 1 490 Kč",
      currenciesAccepted: "CZK",
      paymentAccepted: "Hotovost, Karta",
      image: `${SITE_URL}/motor-detail.jpg`,
      logo: `${SITE_URL}/icon-logo.svg`,
      address: [
        {
          "@type": "PostalAddress",
          addressLocality: "Liberec",
          addressCountry: "CZ",
        },
        {
          "@type": "PostalAddress",
          addressLocality: "České Budějovice",
          addressCountry: "CZ",
        },
      ],
      areaServed: [
        { "@type": "City", name: "Liberec" },
        { "@type": "City", name: "České Budějovice" },
      ],
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        description: "Výhradně na objednání",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Ceník dekarbonizace",
        itemListElement: [
          {
            "@type": "Offer",
            name: "Dekarbonizace — do 1,2 l",
            price: "1490",
            priceCurrency: "CZK",
            description: "Motor do 1,2 l benzín nebo diesel",
          },
          {
            "@type": "Offer",
            name: "Dekarbonizace — 1,2–1,6 l",
            price: "1690",
            priceCurrency: "CZK",
          },
          {
            "@type": "Offer",
            name: "Dekarbonizace — 1,6–2,0 l",
            price: "1990",
            priceCurrency: "CZK",
          },
          {
            "@type": "Offer",
            name: "Dekarbonizace — nad 2,0 l",
            price: "2890",
            priceCurrency: "CZK",
          },
        ],
      },
    },
    {
      "@type": "Service",
      "@id": `${SITE_URL}/#service`,
      name: "Vodíková dekarbonizace motoru",
      provider: { "@id": `${SITE_URL}/#business` },
      description:
        "Čištění spalovacích motorů vodíko-kyslíkovou směsí (HHO). Odstraní uhlíkové nánosy ze vstřikovačů, ventilů, DPF filtru a turba bez demontáže.",
      serviceType: "Automotive Service",
      areaServed: [
        { "@type": "City", name: "Liberec" },
        { "@type": "City", name: "České Budějovice" },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "Jak poznám, že můj motor potřebuje dekarbonizaci?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Nejčastější signály jsou: zvýšená spotřeba paliva, slabší akcelerace, tmavý výfuk nebo obtížné studené startování. Doporučujeme ji preventivně každých 15 000–25 000 km.",
          },
        },
        {
          "@type": "Question",
          name: "Je vodíková dekarbonizace bezpečná?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ano, vodíková dekarbonizace je nejšetrnější dostupná metoda. Pracuje pouze s vodíko-kyslíkovou směsí — bez chemikálií. Na konci zbyde jen voda a CO₂.",
          },
        },
        {
          "@type": "Question",
          name: "Jak dlouho dekarbonizace trvá?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Záleží na objemu motoru. Počítejte s 50 minutami u malých motorů, u větších až 2 hodiny.",
          },
        },
        {
          "@type": "Question",
          name: "Pro jaká auta vodíková dekarbonizace funguje?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Pro všechna vozidla s benzínovým, dieselovým nebo hybridním motorem. Nevhodné pouze pro čistě elektrická vozidla.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs" className={dm.variable}>
      <head>
        {/* Consent default + gtag stub musí být před načtením gtag.js */}
        <script dangerouslySetInnerHTML={{ __html:
          `window.dataLayer=window.dataLayer||[];function gtag(){window.dataLayer.push(arguments);}` +
          `gtag('consent','default',{'analytics_storage':'granted','ad_storage':'granted','ad_user_data':'granted','ad_personalization':'granted'});`
        }} />
        {/* Google Tag Manager */}
        <script dangerouslySetInnerHTML={{ __html:
          `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-PRF9CFZJ');`
        }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript dangerouslySetInnerHTML={{ __html:
          `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PRF9CFZJ" height="0" width="0" style="display:none;visibility:hidden"></iframe>`
        }} />
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-RNLHTENSDQ"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            gtag('js', new Date());
            gtag('config', 'G-RNLHTENSDQ');
            gtag('config', 'AW-18028160012');
          `}
        </Script>
<Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1619607452652558');
fbq('track', 'PageView');`}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img height="1" width="1" style={{display:"none"}}
            src="https://www.facebook.com/tr?id=1619607452652558&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
