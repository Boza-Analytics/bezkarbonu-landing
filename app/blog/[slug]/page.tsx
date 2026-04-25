import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, getPost, formatDate } from "../../lib/blog";

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const url = `https://www.cistenivodikem.cz/blog/${post.slug}`;
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url,
      type: "article",
      publishedTime: post.date,
      images: [{ url: post.image, alt: post.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
      images: [post.image],
    },
  };
}

const C = { navy: "#0d3a79", navyDk: "#092d62", lime: "#8cc63f", limeDk: "#6fa32e" };

const CATEGORY_COLORS: Record<string, string> = {
  "Rady & tipy": "#8cc63f",
  "Srovnání": "#0d3a79",
  "STK & Emise": "#e05a00",
  "Technologie": "#1a6bb5",
  "Ekonomika": "#2a9d8f",
  "Péče o motor": "#6f42c1",
  "Příběhy zákazníků": "#c0392b",
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    image: post.image,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: "CisteniVodikem.cz" },
    publisher: {
      "@type": "Organization",
      name: "CisteniVodikem.cz",
      logo: { "@type": "ImageObject", url: "https://www.cistenivodikem.cz/icon-logo.svg" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://www.cistenivodikem.cz/blog/${post.slug}` },
    keywords: post.keywords.join(", "),
  };

  return (
    <div style={{ fontFamily: "var(--font-dm), DM Sans, sans-serif", background: "#f8f9fa", minHeight: "100vh" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Nav */}
      <nav style={{ background: C.navyDk, borderBottom: `3px solid ${C.lime}`, position: "sticky", top: 0, zIndex: 40 }}>
        <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 24px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <span style={{ fontFamily: "var(--font-dm), DM Sans, sans-serif", fontWeight: 800, fontSize: "1.125rem", letterSpacing: "-0.01em" }}>
              <span style={{ color: "#fff" }}>Čištění</span><span style={{ color: C.lime }}>Vodíkem</span>
            </span>
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            {[
              { label: "Hlavní stránka", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: "Kontakt", href: "/#contact" },
            ].map((l) => (
              <Link key={l.href} href={l.href} style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.875rem", fontWeight: 700, textDecoration: "none" }}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero image */}
      <div style={{ position: "relative", height: "clamp(260px, 40vw, 480px)", background: C.navyDk }}>
        <Image src={post.image} alt={post.imageAlt} fill style={{ objectFit: "cover", opacity: 0.55 }} priority sizes="100vw" />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(9,45,98,0.85) 0%, rgba(9,45,98,0.2) 100%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "clamp(24px, 4vw, 48px)", maxWidth: "820px", margin: "0 auto" }}>
          <nav aria-label="breadcrumb" style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "12px", fontSize: "0.78rem" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Domů</Link>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>›</span>
            <Link href="/blog" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Blog</Link>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>›</span>
            <span style={{ color: "rgba(255,255,255,0.8)" }}>{post.category}</span>
          </nav>
          <span style={{ background: CATEGORY_COLORS[post.category] ?? C.navy, color: "#fff", fontSize: "0.72rem", fontWeight: 700, padding: "4px 10px", borderRadius: "4px", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "12px", display: "inline-block" }}>
            {post.category}
          </span>
          <h1 style={{ color: "#fff", fontSize: "clamp(1.4rem, 3.5vw, 2.4rem)", fontWeight: 900, margin: "10px 0 14px", lineHeight: 1.2 }}>
            {post.title}
          </h1>
          <div style={{ display: "flex", gap: "16px", color: "rgba(255,255,255,0.65)", fontSize: "0.82rem" }}>
            <span>{formatDate(post.date)}</span>
            <span>·</span>
            <span>{post.readTime} min čtení</span>
          </div>
        </div>
      </div>

      {/* Article */}
      <div style={{ maxWidth: "820px", margin: "0 auto", padding: "48px 24px 80px" }}>
        <div style={{ background: "#fff", borderRadius: "12px", padding: "clamp(24px, 5vw, 52px)", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
          <article
            className="blog-body"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />

          {/* CTA box */}
          <div style={{ marginTop: "48px", background: `linear-gradient(135deg, ${C.navyDk}, ${C.navy})`, borderRadius: "10px", padding: "32px", textAlign: "center" }}>
            <h3 style={{ color: "#fff", fontSize: "1.3rem", fontWeight: 800, margin: "0 0 10px" }}>
              Připraveni vyčistit váš motor?
            </h3>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.95rem", margin: "0 0 20px", lineHeight: 1.5 }}>
              Diagnostika zdarma. Výsledek garantován. Termín zpravidla do týdne.
            </p>
            <Link href="/#contact" style={{ background: C.lime, color: "#fff", fontWeight: 700, fontSize: "0.95rem", padding: "12px 28px", textDecoration: "none", borderRadius: "4px", display: "inline-block" }}>
              Objednat termín
            </Link>
          </div>
        </div>

        {/* Related posts */}
        <div style={{ marginTop: "48px" }}>
          <h2 style={{ color: C.navyDk, fontSize: "1.25rem", fontWeight: 800, margin: "0 0 24px" }}>Mohlo by vás také zajímat</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "20px" }}>
            {related.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} style={{ textDecoration: "none", background: "#fff", borderRadius: "8px", overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.07)", display: "flex", flexDirection: "column" }}>
                <div style={{ position: "relative", height: "140px" }}>
                  <Image src={p.image} alt={p.imageAlt} fill style={{ objectFit: "cover" }} sizes="280px" />
                </div>
                <div style={{ padding: "14px 16px" }}>
                  <p style={{ color: C.navyDk, fontSize: "0.88rem", fontWeight: 700, margin: "0 0 6px", lineHeight: 1.3 }}>{p.title}</p>
                  <span style={{ color: C.lime, fontSize: "0.78rem", fontWeight: 700 }}>Číst →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: "#06213d", padding: "24px", textAlign: "center" }}>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", margin: 0 }}>
          © {new Date().getFullYear()} CisteniVodikem.cz — RespiPlus Care s.r.o.
        </p>
      </footer>

      <style>{`
        .blog-body { color: #333; font-size: 1rem; line-height: 1.8; }
        .blog-body p { margin: 0 0 1.2em; }
        .blog-body h2 { color: #092d62; font-size: 1.4rem; font-weight: 800; margin: 2em 0 0.6em; line-height: 1.3; }
        .blog-body h3 { color: #092d62; font-size: 1.1rem; font-weight: 700; margin: 1.6em 0 0.5em; }
        .blog-body ul, .blog-body ol { margin: 0 0 1.2em 1.4em; padding: 0; }
        .blog-body li { margin-bottom: 0.5em; }
        .blog-body strong { color: #092d62; }
        .blog-body a { color: #8cc63f; font-weight: 600; text-decoration: underline; text-underline-offset: 2px; }
        .blog-body a:hover { color: #6fa32e; }
      `}</style>
    </div>
  );
}
