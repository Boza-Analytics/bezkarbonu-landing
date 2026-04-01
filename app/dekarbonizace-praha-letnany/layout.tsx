import type { Metadata } from "next";

const SITE_URL = "https://www.cistenivodikem.cz";

export const metadata: Metadata = {
  title: "Dekarbonizace motoru Praha Letňany | Vodíkové čištění | CisteniVodikem.cz",
  description:
    "Profesionální vodíková dekarbonizace motoru v Praze Letňanech — Toužimská 720. Obnovte výkon, snižte spotřebu a projděte STK. Benzín i diesel. Objednání do 24 hodin.",
  keywords: [
    "dekarbonizace Praha",
    "vodíková dekarbonizace Praha",
    "čištění motoru vodíkem Praha",
    "dekarbonizace motoru Praha Letňany",
    "HHO dekarbonizace Praha",
    "čištění DPF Praha",
    "snížení emisí Praha",
    "servis motoru Praha",
    "vodíkové čištění motoru Praha",
    "emise STK Praha",
  ],
  openGraph: {
    title: "Dekarbonizace motoru Praha Letňany | CisteniVodikem.cz",
    description:
      "Vodíková dekarbonizace přímo v Praze Letňanech. Obnovte výkon, snižte spotřebu a projděte STK. Bez demontáže, za 50–80 minut.",
    url: `${SITE_URL}/dekarbonizace-praha-letnany`,
    siteName: "CisteniVodikem.cz",
    locale: "cs_CZ",
    type: "website",
    images: [
      {
        url: "https://i.ytimg.com/vi/uKUlLIWC7Ow/maxresdefault.jpg",
        width: 1280,
        height: 720,
        alt: "Dekarbonizace motoru Praha Letňany — vodíkové čištění",
      },
    ],
  },
  alternates: {
    canonical: `${SITE_URL}/dekarbonizace-praha-letnany`,
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
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/dekarbonizace-praha-letnany#business`,
      name: "Čištění Vodíkem — Dekarbonizace Praha Letňany",
      description:
        "Profesionální vodíková dekarbonizace benzínových a dieselových motorů bez demontáže v Praze Letňanech. Obnovte výkon, snižte spotřebu a prodlužte životnost motoru.",
      url: `${SITE_URL}/dekarbonizace-praha-letnany`,
      telephone: "+420601269600",
      email: "info@cistenivodikem.cz",
      legalName: "Jakub Franc",
      priceRange: "od 2 390 Kč",
      currenciesAccepted: "CZK",
      paymentAccepted: "Hotovost, Karta",
      image: "https://i.ytimg.com/vi/uKUlLIWC7Ow/maxresdefault.jpg",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Toužimská 720",
        addressLocality: "Praha Letňany",
        postalCode: "197 00",
        addressCountry: "CZ",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 50.1242,
        longitude: 14.5108,
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
        description: "Nutné objednat se předem",
      },
      areaServed: { "@type": "City", name: "Praha" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Hlavní stránka", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Dekarbonizace Praha Letňany", item: `${SITE_URL}/dekarbonizace-praha-letnany` },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Jak se objednám na dekarbonizaci v Praze Letňanech?",
          acceptedAnswer: { "@type": "Answer", text: "Zavolejte na +420 601 269 600 nebo vyplňte formulář na webu. Termín domluvíme do 24 hodin." },
        },
        {
          "@type": "Question",
          name: "Kde je pobočka v Praze Letňanech?",
          acceptedAnswer: { "@type": "Answer", text: "Naše pražská pobočka sídlí na adrese Toužimská 720, Praha Letňany." },
        },
      ],
    },
  ],
};

export default function PrahaLetnanyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
