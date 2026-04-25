import type { Metadata } from "next";
import Chatbot from "../components/Chatbot";

export const metadata: Metadata = {
  title: "AI Asistent — BezKarbonu.cz",
  description: "Testovací stránka AI asistenta BezKarbonu.cz",
  robots: { index: false, follow: false },
};

const C = {
  red: "#b30404",
  dark: "#231f20",
  body: "#1c2126",
  bg: "#fbf8f8",
  border: "#e9e9e9",
};

export default function ChatbotPage() {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "var(--font-dm), DM Sans, sans-serif", display: "flex", flexDirection: "column" }}>

      {/* Header */}
      <header style={{ background: C.dark, borderBottom: `3px solid ${C.red}`, padding: "0 24px" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="https://www.bezkarbonu.cz" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: 36, height: 36, background: C.red, borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "#fff", fontSize: "0.85rem" }}>BK</div>
            <span style={{ color: "#fff", fontWeight: 800, fontSize: "1.1rem", letterSpacing: "-0.01em" }}>
              Bez<span style={{ color: C.red }}>Karbonu</span>.cz
            </span>
          </a>
          <span style={{ background: "rgba(179,4,4,0.15)", color: "#ff6b6b", fontSize: "0.72rem", fontWeight: 700, padding: "4px 10px", borderRadius: "20px", border: "1px solid rgba(179,4,4,0.3)", letterSpacing: "0.05em", textTransform: "uppercase" }}>
            Testovací prostředí
          </span>
        </div>
      </header>

      {/* Hero */}
      <section style={{ background: `linear-gradient(135deg, ${C.dark} 0%, #3a0000 100%)`, padding: "48px 24px 40px", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <div style={{ width: 64, height: 64, background: C.red, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "#fff", fontSize: "1.2rem", margin: "0 auto 20px" }}>AI</div>
          <h1 style={{ color: "#fff", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, margin: "0 0 12px", lineHeight: 1.2 }}>
            AI Asistent BezKarbonu.cz
          </h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "1rem", margin: "0 0 28px", lineHeight: 1.6 }}>
            Zeptejte se na ceny, pobočky, jak funguje dekarbonizace nebo jak se objednat. Asistent odpoví okamžitě.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            {["Jaká je cena?", "Kde jsou pobočky?", "Jak to funguje?", "Chci se objednat"].map((q) => (
              <span key={q} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.8)", borderRadius: "20px", padding: "6px 14px", fontSize: "0.82rem", fontWeight: 600 }}>
                {q}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Info cards */}
      <section style={{ padding: "40px 24px", maxWidth: "960px", margin: "0 auto", width: "100%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
          {[
            { icon: "🏢", title: "20 poboček", desc: "Po celé České republice" },
            { icon: "⏱️", title: "50–120 minut", desc: "Podle objemu motoru" },
            { icon: "⭐", title: "4,9 / 5", desc: "450+ Google recenzí" },
            { icon: "🔧", title: "Bez demontáže", desc: "Neinvazivní čistění" },
          ].map((card) => (
            <div key={card.title} style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: "10px", padding: "20px", textAlign: "center" }}>
              <div style={{ fontSize: "1.8rem", marginBottom: "8px" }}>{card.icon}</div>
              <div style={{ color: C.red, fontWeight: 800, fontSize: "1rem" }}>{card.title}</div>
              <div style={{ color: "#666", fontSize: "0.82rem", marginTop: "4px" }}>{card.desc}</div>
            </div>
          ))}
        </div>

        <p style={{ textAlign: "center", color: "#999", fontSize: "0.78rem", marginTop: "32px" }}>
          Tato stránka slouží pro testování AI asistenta. Produkční verze bude na{" "}
          <a href="https://www.bezkarbonu.cz" target="_blank" rel="noopener noreferrer" style={{ color: C.red }}>bezkarbonu.cz</a>.
        </p>
      </section>

      {/* Chatbot widget is rendered via the component */}
      <Chatbot />
    </div>
  );
}
