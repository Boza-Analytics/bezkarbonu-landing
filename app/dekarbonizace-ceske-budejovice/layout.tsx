import type { Metadata } from "next";

const SITE_URL = "https://www.cistenivodikem.cz";

export const metadata: Metadata = {
  title: "Dekarbonizace motoru České Budějovice | Vodíkové čištění | CisteniVodikem.cz",
  description:
    "Profesionální vodíková dekarbonizace motoru v Českých Budějovicích — Rudolfovská tř. 612. Obnovte výkon, snižte spotřebu a projděte STK. Benzín i diesel. Objednání do 24 hodin.",
  keywords: [
    "dekarbonizace České Budějovice",
    "vodíková dekarbonizace České Budějovice",
    "čištění motoru vodíkem České Budějovice",
    "dekarbonizace motoru České Budějovice",
    "HHO dekarbonizace České Budějovice",
    "čištění DPF České Budějovice",
    "snížení emisí České Budějovice",
    "servis motoru České Budějovice",
    "vodíkové čištění motoru Budějovice",
    "emise STK České Budějovice",
  ],
  openGraph: {
    title: "Dekarbonizace motoru České Budějovice | CisteniVodikem.cz",
    description:
      "Vodíková dekarbonizace přímo v Českých Budějovicích. Obnovte výkon, snižte spotřebu a projděte STK. Bez demontáže, za 50–80 minut.",
    url: `${SITE_URL}/dekarbonizace-ceske-budejovice`,
    siteName: "CisteniVodikem.cz",
    locale: "cs_CZ",
    type: "website",
    images: [
      {
        url: "/ceske-budejovice.jpg",
        width: 1200,
        height: 800,
        alt: "Dekarbonizace motoru České Budějovice — vodíkové čištění",
      },
    ],
  },
  alternates: {
    canonical: `${SITE_URL}/dekarbonizace-ceske-budejovice`,
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
      "@id": `${SITE_URL}/dekarbonizace-ceske-budejovice#business`,
      name: "Čištění Vodíkem — Dekarbonizace České Budějovice",
      description:
        "Profesionální vodíková dekarbonizace benzínových a dieselových motorů bez demontáže v Českých Budějovicích. Obnovte výkon, snižte spotřebu a prodlužte životnost motoru.",
      url: `${SITE_URL}/dekarbonizace-ceske-budejovice`,
      telephone: "+420601269600",
      email: "info@cistenivodikem.cz",
      legalName: "RespiPlus Care s.r.o.",
      priceRange: "od 2 390 Kč",
      currenciesAccepted: "CZK",
      paymentAccepted: "Hotovost, Karta",
      image: `${SITE_URL}/ceske-budejovice.jpg`,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Rudolfovská tř. 612",
        addressLocality: "České Budějovice",
        postalCode: "370 01",
        addressCountry: "CZ",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 48.9747,
        longitude: 14.4746,
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
        description: "Výhradně na objednání",
      },
      areaServed: { "@type": "City", name: "České Budějovice" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Hlavní stránka", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Dekarbonizace České Budějovice", item: `${SITE_URL}/dekarbonizace-ceske-budejovice` },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Jak se objednám na dekarbonizaci v Českých Budějovicích?",
          acceptedAnswer: { "@type": "Answer", text: "Zavolejte na +420 601 269 600 nebo vyplňte formulář na webu. Termín domluvíme do 24 hodin." },
        },
        {
          "@type": "Question",
          name: "Kde je pobočka v Českých Budějovicích?",
          acceptedAnswer: { "@type": "Answer", text: "Naše budějovická pobočka sídlí na adrese Rudolfovská tř. 612, České Budějovice." },
        },
      ],
    },
  ],
};

export default function CeskeBudejoviceLayout({ children }: { children: React.ReactNode }) {
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
