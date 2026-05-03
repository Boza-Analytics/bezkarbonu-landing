import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { posts, formatDate } from "../lib/blog";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "Blog o dekarbonizaci motoru — Rady, tipy a návody | CisteniVodikem.cz",
  description: "Odborné články o vodíkové dekarbonizaci motorů, péči o DPF filtr, turbodmychadlo a jak ušetřit na servisu. Praktické rady pro každého řidiče.",
  keywords: [
    "vodíková dekarbonizace blog",
    "péče o motor rady",
    "DPF filtr čištění",
    "turbodmychadlo životnost",
    "dekarbonizace vs oprava motoru",
    "jak snížit spotřebu paliva",
    "STK emise tipy",
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.cistenivodikem.cz/blog" },
  openGraph: {
    title: "Blog o dekarbonizaci motoru — Rady, tipy a návody | CisteniVodikem.cz",
    description: "Odborné články o vodíkové dekarbonizaci motorů, péči o DPF filtr, turbodmychadlo a jak ušetřit na servisu.",
    url: "https://www.cistenivodikem.cz/blog",
    type: "website",
    siteName: "CisteniVodikem.cz",
    locale: "cs_CZ",
    images: [{ url: "/motor-detail.jpg", width: 1400, height: 933, alt: "Vodíková dekarbonizace motoru — blog CisteniVodikem.cz" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog o dekarbonizaci motoru | CisteniVodikem.cz",
    description: "Odborné články o vodíkové dekarbonizaci, DPF filtrech a péči o motor.",
    images: ["/motor-detail.jpg"],
  },
};

const C = {
  navy: "#0d3a79",
  navyDk: "#092d62",
  lime: "#8cc63f",
  limeDk: "#6fa32e",
};

const CATEGORY_COLORS: Record<string, string> = {
  "Rady & tipy": "#8cc63f",
  "Srovnání": "#0d3a79",
  "STK & Emise": "#e05a00",
  "Technologie": "#1a6bb5",
  "Ekonomika": "#2a9d8f",
  "Péče o motor": "#6f42c1",
  "Příběhy zákazníků": "#c0392b",
};

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <div style={{ fontFamily: "var(--font-dm), DM Sans, sans-serif", background: "#f8f9fa", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ background: `linear-gradient(135deg, ${C.navyDk} 0%, ${C.navy} 100%)`, padding: "64px 24px 48px" }}>
        <div style={{ maxWidth: "1152px", margin: "0 auto" }}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "16px", alignItems: "center" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", textDecoration: "none" }}>Domů</Link>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem" }}>›</span>
            <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.8rem" }}>Blog</span>
          </div>
          <h1 style={{ color: "#fff", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, margin: "0 0 12px", lineHeight: 1.2 }}>
            Rady a tipy o péči o motor
          </h1>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1.1rem", maxWidth: "600px", margin: 0, lineHeight: 1.6 }}>
            Praktické návody, srovnání a reálné příběhy ze světa vodíkové dekarbonizace a péče o spalovací motory.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "48px 24px 80px" }}>
        {/* Featured post */}
        <div style={{ marginBottom: "48px" }}>
          <Link href={`/blog/${featured.slug}`} style={{ textDecoration: "none", display: "block", background: "#fff", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", transition: "transform 0.2s, box-shadow 0.2s" }}>
            <div className="blog-featured-grid">
              <div className="blog-featured-img">
                <Image src={featured.image} alt={featured.imageAlt} fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 576px" priority />
              </div>
              <div className="blog-featured-body">
                <div style={{ display: "flex", gap: "10px", marginBottom: "16px", alignItems: "center" }}>
                  <span style={{ background: CATEGORY_COLORS[featured.category] ?? C.navy, color: "#fff", fontSize: "0.72rem", fontWeight: 700, padding: "4px 10px", borderRadius: "4px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    {featured.category}
                  </span>
                  <span style={{ background: C.lime, color: "#fff", fontSize: "0.72rem", fontWeight: 700, padding: "4px 10px", borderRadius: "4px" }}>Nejnovější</span>
                </div>
                <h2 style={{ color: C.navyDk, fontSize: "1.5rem", fontWeight: 800, margin: "0 0 14px", lineHeight: 1.3 }}>{featured.title}</h2>
                <p style={{ color: "#555", fontSize: "0.95rem", lineHeight: 1.7, margin: "0 0 20px" }}>{featured.excerpt}</p>
                <div style={{ display: "flex", gap: "16px", color: "#888", fontSize: "0.8rem", marginTop: "auto" }}>
                  <span>{formatDate(featured.date)}</span>
                  <span>·</span>
                  <span>{featured.readTime} min čtení</span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Grid of remaining posts */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "28px" }}>
          {rest.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: "none", background: "#fff", borderRadius: "10px", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", display: "flex", flexDirection: "column", transition: "transform 0.2s, box-shadow 0.2s" }}>
              <div style={{ position: "relative", height: "200px" }}>
                <Image src={post.image} alt={post.imageAlt} fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 380px" />
                <div style={{ position: "absolute", top: "12px", left: "12px" }}>
                  <span style={{ background: CATEGORY_COLORS[post.category] ?? C.navy, color: "#fff", fontSize: "0.68rem", fontWeight: 700, padding: "3px 9px", borderRadius: "4px", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                    {post.category}
                  </span>
                </div>
              </div>
              <div style={{ padding: "20px 22px 24px", display: "flex", flexDirection: "column", flex: 1 }}>
                <h3 style={{ color: C.navyDk, fontSize: "1.05rem", fontWeight: 800, margin: "0 0 10px", lineHeight: 1.35 }}>{post.title}</h3>
                <p style={{ color: "#666", fontSize: "0.88rem", lineHeight: 1.65, margin: "0 0 16px", flex: 1 }}>{post.excerpt}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#999", fontSize: "0.78rem", borderTop: "1px solid #f0f0f0", paddingTop: "12px" }}>
                  <span>{formatDate(post.date)}</span>
                  <span style={{ color: C.lime, fontWeight: 700 }}>Číst více →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
      <section style={{ background: C.navyDk, padding: "60px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <h2 style={{ color: "#fff", fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 800, margin: "0 0 14px" }}>
            Zjistěte, co dekarbonizace udělá pro váš motor
          </h2>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1rem", margin: "0 0 28px", lineHeight: 1.6 }}>
            Diagnostika zdarma. Výsledek garantován. Objednejte se na termín ještě dnes.
          </p>
          <Link href="/#contact" style={{ background: C.lime, color: "#fff", fontWeight: 700, fontSize: "1rem", padding: "14px 32px", textDecoration: "none", borderRadius: "4px", display: "inline-block" }}>
            Objednat termín
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#06213d", padding: "24px", textAlign: "center" }}>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", margin: 0 }}>
          © {new Date().getFullYear()} CisteniVodikem.cz — RespiPlus Care s.r.o.
        </p>
      </footer>

      <style>{`
        .blog-featured-grid { display: grid; grid-template-columns: 1fr 1fr; min-height: 340px; }
        .blog-featured-img { position: relative; min-height: 280px; }
        .blog-featured-body { padding: 40px; display: flex; flex-direction: column; justify-content: center; }
        @media (max-width: 700px) {
          .blog-featured-grid { grid-template-columns: 1fr; }
          .blog-featured-img { min-height: 220px; }
          .blog-featured-body { padding: 24px; }
        }
      `}</style>
    </div>
  );
}
