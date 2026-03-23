import type { Metadata } from "next";

const SITE_URL = "https://www.cistenivodikem.cz";

export const metadata: Metadata = {
  title: "Dekarbonizace motoru Liberec | Vodíkové čištění | CisteniVodikem.cz",
  description:
    "Profesionální vodíková dekarbonizace motoru v Liberci — Tanvaldská 1458. Obnovte výkon, snižte spotřebu a projděte STK. Benzín i diesel. Objednání do 24 hodin.",
  keywords: [
    "dekarbonizace Liberec",
    "vodíková dekarbonizace Liberec",
    "čištění motoru vodíkem Liberec",
    "dekarbonizace motoru Liberec",
    "HHO dekarbonizace Liberec",
    "čištění DPF Liberec",
    "snížení emisí Liberec",
    "servis motoru Liberec",
    "vodíkové čištění motoru Liberec",
    "emise STK Liberec",
  ],
  openGraph: {
    title: "Dekarbonizace motoru Liberec | CisteniVodikem.cz",
    description:
      "Vodíková dekarbonizace přímo v Liberci. Obnovte výkon, snižte spotřebu a projděte STK. Bez demontáže, za 50–80 minut.",
    url: `${SITE_URL}/dekarbonizace-liberec`,
    siteName: "CisteniVodikem.cz",
    locale: "cs_CZ",
    type: "website",
    images: [
      {
        url: "/liberec.jpg",
        width: 1200,
        height: 800,
        alt: "Dekarbonizace motoru Liberec — vodíkové čištění",
      },
    ],
  },
  alternates: {
    canonical: `${SITE_URL}/dekarbonizace-liberec`,
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
      "@id": `${SITE_URL}/dekarbonizace-liberec#business`,
      name: "Čištění Vodíkem — Dekarbonizace Liberec",
      description:
        "Profesionální vodíková dekarbonizace benzínových a dieselových motorů bez demontáže v Liberci. Obnovte výkon, snižte spotřebu a prodlužte životnost motoru.",
      url: `${SITE_URL}/dekarbonizace-liberec`,
      telephone: "+420601269600",
      email: "info@cistenivodikem.cz",
      legalName: "RespiPlus Care s.r.o.",
      priceRange: "od 2 390 Kč",
      currenciesAccepted: "CZK",
      paymentAccepted: "Hotovost, Karta",
      image: `${SITE_URL}/liberec.jpg`,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Tanvaldská 1458",
        addressLocality: "Liberec",
        postalCode: "460 01",
        addressCountry: "CZ",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 50.7663,
        longitude: 15.0543,
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "16:00",
        description: "Výhradně na objednání",
      },
      areaServed: { "@type": "City", name: "Liberec" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Hlavní stránka", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Dekarbonizace Liberec", item: `${SITE_URL}/dekarbonizace-liberec` },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Jak se objednám na dekarbonizaci v Liberci?",
          acceptedAnswer: { "@type": "Answer", text: "Zavolejte na +420 601 269 600 nebo vyplňte formulář na webu. Termín domluvíme do 24 hodin." },
        },
        {
          "@type": "Question",
          name: "Kde je pobočka v Liberci?",
          acceptedAnswer: { "@type": "Answer", text: "Naše liberecká pobočka sídlí na adrese Tanvaldská 1458, Liberec." },
        },
      ],
    },
  ],
};

export default function LiberecLayout({ children }: { children: React.ReactNode }) {
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
