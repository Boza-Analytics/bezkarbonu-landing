"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const FONT = "var(--font-dm), 'DM Sans', system-ui, sans-serif";

const C = {
  orange:  "#ff5500",
  orangeDk:"#d94700",
  yellow:  "#ffd000",
  dark:    "#111111",
  card:    "#1e1e1e",
  red:     "#e01c1c",
  white:   "#ffffff",
  textMd:  "#cccccc",
  textLt:  "#888888",
  green:   "#22c55e",
};

const btnOrange: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px",
  background: C.orange, color: C.white, border: "none", cursor: "pointer",
  fontFamily: FONT, fontWeight: 800, fontSize: "1.15rem", letterSpacing: "-0.3px",
  padding: "18px 36px", textDecoration: "none", transition: "background 0.15s",
};
const btnOrangeSm: React.CSSProperties = {
  ...btnOrange, fontSize: "1rem", padding: "14px 26px",
};
const btnWhiteOutline: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px",
  background: "transparent", color: C.white, border: "2px solid rgba(255,255,255,0.35)",
  cursor: "pointer", fontFamily: FONT, fontWeight: 700, fontSize: "1rem",
  padding: "16px 28px", textDecoration: "none", transition: "border-color 0.15s",
};

const PAIN_POINTS = [
  { emoji: "⛽", title: "Spotřeba neustále roste" },
  { emoji: "🔧", title: "Motor táhne slabě" },
  { emoji: "⚠️", title: "Svítí kontrolka DPF" },
  { emoji: "🚗", title: "Neprojdete STK emisemi" },
  { emoji: "❄️", title: "Těžce startuje nebo cukne" },
  { emoji: "💨", title: "Tmavý kouř z výfuku" },
];

const COST_COMPARE = [
  { problem: "Výměna DPF filtru", cost: "20 000–60 000 Kč" },
  { problem: "Oprava vstřikovačů", cost: "15 000–40 000 Kč" },
  { problem: "Generální oprava motoru", cost: "30 000–80 000 Kč" },
  { problem: "Naše dekarbonizace", cost: "od 2 390 Kč", isSolution: true },
];

const REVIEWS = [
  {
    name: "Martin N.", carImg: "/review-vw-caddy.jpg",
    result: "Spotřeba klesla o 1,2 l/100 km",
    text: "Byl jsem skeptický, ale po dekarbonizaci motor nastartoval jako nový. Cukání zmizelo úplně. Přišel jsem i s druhým autem.",
  },
  {
    name: "Petra K.", carImg: "/review-volvo.jpg",
    result: "Motor je výrazně tišší",
    text: "Okamžitě znatelný výsledek. Auto táhne líp. Doporučuju všem.",
  },
  {
    name: "Tomáš H.", carImg: "/review-vw-touareg.jpg",
    result: "Úspora ~3 000 Kč za rok",
    text: "Spotřeba klesla o skoro litr na stovce. Vrátí se mi to do půl roku. Škoda, že jsem to neudělal dřív.",
  },
];

const STEPS = [
  { num: "1", title: "Přijedete", desc: "Zavoláte nebo objednáte online." },
  { num: "2", title: "Čistíme", desc: "50–80 minut. Bez demontáže." },
  { num: "3", title: "Odjedete", desc: "Čistý motor. Poznáte hned." },
];

const PRICING = [
  { label: "do 1,9 l", benzin: "2 390", diesel: "2 690", time: "50–60 min" },
  { label: "nad 2,0 l", benzin: "2 890", diesel: "3 190", time: "60–80 min" },
];

const FAQS = [
  { q: "Funguje to opravdu?", a: "Výsledky měříme před a po. Emise klesají až o 87 %, spotřeba o 0,2–1,2 l/100 km. 500+ zákazníků, hodnocení 4,9/5 na Google." },
  { q: "Musím demontovat motor nebo měnit olej?", a: "Ne. Přístroj se připojí jen ke vstupu vzduchu. Motor zůstane netknutý. Přijdete, počkáte, odjedete." },
  { q: "Kdy to pocítím?", a: "Tišší motor a lepší odezva na plyn — okamžitě. Pokles spotřeby — do prvních 200 km." },
  { q: "Svítí mi kontrolka DPF. Pomůže to?", a: "Ano. Dekarbonizace čistí DPF filtr zevnitř. Ušetříte tisíce oproti výměně filtru." },
  { q: "Na jaká auta to funguje?", a: "Benzín, diesel, LPG, hybrid. Osobní auta i dodávky. Jen ne čistě elektrická." },
];

/* ─── TOP BAR ─── */
function TopBar() {
  return (
    <div style={{ background: C.red, padding: "10px 16px", textAlign: "center", fontFamily: FONT }}>
      <span style={{ color: "#fff", fontWeight: 700, fontSize: "0.95rem" }}>
        ⚠️&nbsp; Svítí kontrolka DPF nebo motoru? Zavolejte ihned:&nbsp;
        <a href="tel:+420601269600" style={{ color: C.yellow, textDecoration: "none", fontWeight: 800 }}>
          +420 601 269 600
        </a>
      </span>
    </div>
  );
}

/* ─── NAVBAR ─── */
function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav style={{ background: C.dark, borderBottom: `3px solid ${C.orange}`, position: "sticky", top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 20px", height: "62px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="#" style={{ textDecoration: "none", fontFamily: FONT, fontWeight: 800, fontSize: "1.2rem", color: C.white }}>
          Čištění<span style={{ color: C.orange }}>Vodíkem</span>
        </a>
        <div className="hidden md:flex" style={{ gap: "28px", alignItems: "center" }}>
          {[["Jak to funguje", "#jak-to-funguje"], ["Ceny", "#ceny"], ["Recenze", "#recenze"], ["Pobočky", "#pobocky"], ["Kontakt", "#kontakt"]].map(([label, href]) => (
            <a key={href} href={href} style={{ color: C.textMd, fontSize: "0.9rem", fontWeight: 600, textDecoration: "none", fontFamily: FONT, transition: "color 0.15s" }}
              onMouseEnter={e => (e.currentTarget.style.color = C.white)}
              onMouseLeave={e => (e.currentTarget.style.color = C.textMd)}>
              {label}
            </a>
          ))}
        </div>
        <a href="tel:+420601269600" className="hidden md:flex" style={{ ...btnOrangeSm, fontSize: "0.9rem", padding: "10px 20px" }}
          onMouseEnter={e => (e.currentTarget.style.background = C.orangeDk)}
          onMouseLeave={e => (e.currentTarget.style.background = C.orange)}>
          📞 +420 601 269 600
        </a>
        <button onClick={() => setOpen(!open)} className="md:hidden"
          style={{ background: "none", border: "none", color: C.white, cursor: "pointer", fontSize: "1.5rem", padding: "4px" }}>
          {open ? "✕" : "☰"}
        </button>
      </div>
      {open && (
        <div style={{ background: "#1a1a1a", borderTop: "1px solid #333", padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
          {[["Jak to funguje", "#jak-to-funguje"], ["Ceny", "#ceny"], ["Recenze", "#recenze"], ["Pobočky", "#pobocky"], ["Kontakt", "#kontakt"]].map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}
              style={{ color: C.white, fontSize: "1.1rem", fontWeight: 700, textDecoration: "none", fontFamily: FONT }}>
              {label}
            </a>
          ))}
          <a href="tel:+420601269600" style={{ ...btnOrange, justifyContent: "center", marginTop: "4px" }}>
            📞 Zavolat hned
          </a>
        </div>
      )}
    </nav>
  );
}

/* ─── HERO ─── */
function Hero() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "88d43b16-7eeb-46ee-9c4e-3c60da81b2db");
    formData.append("subject", "Poptávka z Hero sekce — Funnel");
    formData.append("from_name", "Čištění Vodíkem — Funnel");
    try {
      const r = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
      const d = await r.json();
      if (d.success) {
        setSent(true);
        if (typeof window !== "undefined" && (window as any).gtag) {
          (window as any).gtag("event", "generate_lead", { event_category: "form", event_label: "hero_funnel" });
          (window as any).gtag("event", "conversion", { send_to: "AW-18028160012/yuN9CJyp9oscEIzIv5RD" });
        }
      } else { alert("Chyba při odesílání. Zkuste to znovu."); }
    } catch { alert("Chyba připojení."); }
    finally { setSubmitting(false); }
  };

  return (
    <section style={{ background: C.dark, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0 }}>
        <Image
          src="https://www.bezkarbonu.cz/wp-content/themes/bezkarbonu/assets/img/backgrounds/2024-04-25_hp-hero-bg-small.avif"
          alt="" fill style={{ objectFit: "cover", objectPosition: "center", opacity: 0.15 }} unoptimized priority
        />
      </div>

      <div style={{ position: "relative", maxWidth: "1100px", margin: "0 auto", padding: "70px 20px 80px" }}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 items-start">

          {/* LEFT */}
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,208,0,0.12)", border: "1px solid rgba(255,208,0,0.3)", padding: "7px 16px", marginBottom: "28px" }}>
              <span style={{ color: C.yellow, fontSize: "0.9rem", fontWeight: 700, fontFamily: FONT }}>
                ⭐ 500+ zákazníků · 4,9/5 na Google
              </span>
            </div>

            <h1 style={{ fontFamily: FONT, fontSize: "clamp(2.6rem, 6vw, 4.8rem)", fontWeight: 900, color: C.white, lineHeight: 1.0, letterSpacing: "-2px", margin: "0 0 20px" }}>
              Váš motor ztrácí výkon<br />
              <span style={{ color: C.orange }}>a stojí vás zbytečně víc.</span>
            </h1>

            <p style={{ fontFamily: FONT, color: C.textMd, fontSize: "clamp(1.05rem, 2.2vw, 1.3rem)", lineHeight: 1.7, maxWidth: "520px", margin: "0 0 36px" }}>
              Vyčistíme motor vodíkem za <strong style={{ color: C.white }}>50–80 minut</strong>.<br />
              Bez demontáže. Od <strong style={{ color: C.yellow }}>2 390 Kč</strong>.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "40px" }}>
              <a href="#kontakt" style={btnOrange}
                onMouseEnter={e => (e.currentTarget.style.background = C.orangeDk)}
                onMouseLeave={e => (e.currentTarget.style.background = C.orange)}>
                ZAREZERVOVAT TERMÍN →
              </a>
              <a href="tel:+420601269600" style={btnWhiteOutline}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.7)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)")}>
                📞 Zavolat hned
              </a>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 24px" }}>
              {["✅ Bez demontáže", "✅ Výsledek hned", "✅ Diagnostika zdarma", "✅ Benzín i diesel"].map(item => (
                <span key={item} style={{ fontFamily: FONT, fontSize: "1rem", color: "rgba(255,255,255,0.75)", fontWeight: 600 }}>{item}</span>
              ))}
            </div>
          </div>

          {/* RIGHT — quick form */}
          <div style={{ background: C.card, border: `2px solid ${C.orange}`, overflow: "hidden" }}>
            <div style={{ background: C.orange, padding: "14px 20px", textAlign: "center" }}>
              <span style={{ fontFamily: FONT, color: C.white, fontWeight: 800, fontSize: "1rem" }}>📅 ZAREZERVUJTE TERMÍN ZDARMA</span>
            </div>
            {sent ? (
              <div style={{ textAlign: "center", padding: "40px 24px" }}>
                <div style={{ fontSize: "3rem", marginBottom: "12px" }}>✅</div>
                <h3 style={{ fontFamily: FONT, color: C.white, fontSize: "1.3rem", fontWeight: 800, marginBottom: "8px" }}>Ozveme se vám!</h3>
                <p style={{ fontFamily: FONT, color: C.textMd, fontSize: "0.95rem" }}>Do 2 hodin v pracovní době.</p>
              </div>
            ) : (
              <div style={{ padding: "24px" }}>
                <p style={{ fontFamily: FONT, color: C.textMd, fontSize: "0.9rem", marginBottom: "18px", lineHeight: 1.6 }}>
                  Vyplňte číslo — zavoláme vám zpět do 2 hodin.
                </p>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <input type="checkbox" name="botcheck" style={{ display: "none" }} />
                  {[
                    { name: "Jmeno", placeholder: "Vaše jméno *", type: "text" },
                    { name: "Telefon", placeholder: "Telefonní číslo *", type: "tel" },
                  ].map(f => (
                    <input key={f.name} name={f.name} required type={f.type} placeholder={f.placeholder}
                      style={{ background: "#2a2a2a", border: "1px solid #444", color: C.white, padding: "13px 14px", fontFamily: FONT, fontSize: "0.95rem", outline: "none", width: "100%" }}
                      onFocus={e => (e.currentTarget.style.borderColor = C.orange)}
                      onBlur={e => (e.currentTarget.style.borderColor = "#444")} />
                  ))}
                  <select name="Pobocka" required
                    style={{ background: "#1e1e1e", border: "1px solid #444", color: C.white, padding: "13px 14px", fontFamily: FONT, fontSize: "0.95rem", outline: "none", width: "100%", cursor: "pointer" }}
                    onFocus={e => (e.currentTarget.style.borderColor = C.orange)}
                    onBlur={e => (e.currentTarget.style.borderColor = "#444")}>
                    <option value="">Vyberte pobočku *</option>
                    <option value="Praha Letnany">Praha Letňany</option>
                    <option value="Ceske Budejovice">České Budějovice</option>
                  </select>
                  <button type="submit" disabled={submitting} style={{ ...btnOrange, width: "100%", marginTop: "4px", opacity: submitting ? 0.7 : 1 }}
                    onMouseEnter={e => { if (!submitting) (e.currentTarget as HTMLButtonElement).style.background = C.orangeDk; }}
                    onMouseLeave={e => { if (!submitting) (e.currentTarget as HTMLButtonElement).style.background = C.orange; }}>
                    {submitting ? "Odesílám..." : "CHCI TERMÍN ZDARMA →"}
                  </button>
                </form>
                <p style={{ fontFamily: FONT, color: "#555", fontSize: "0.72rem", marginTop: "10px", textAlign: "center" }}>
                  Žádný závazek. Souhlasíte se zprac. osobních údajů.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── PROOF BAR ─── */
function ProofBar() {
  return (
    <div style={{ background: C.orange, padding: "20px 16px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px 48px" }}>
        {[
          { num: "500+", label: "zákazníků" },
          { num: "4,9 / 5", label: "Google hodnocení" },
          { num: "−87 %", label: "snížení emisí" },
          { num: "5+ let", label: "na trhu" },
        ].map(item => (
          <div key={item.num} style={{ textAlign: "center", fontFamily: FONT }}>
            <div style={{ fontSize: "1.8rem", fontWeight: 900, color: C.white, letterSpacing: "-0.5px", lineHeight: 1 }}>{item.num}</div>
            <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.85)", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" as const }}>{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── PAIN POINTS ─── */
function PainPoints() {
  return (
    <section style={{ background: "#161616", padding: "90px 20px" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <div style={{ display: "inline-block", background: C.red, color: C.white, fontFamily: FONT, fontWeight: 800, fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, padding: "6px 18px", marginBottom: "20px" }}>
            Poznáváte se?
          </div>
          <h2 style={{ fontFamily: FONT, fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 900, color: C.white, letterSpacing: "-1.5px", lineHeight: 1.05, margin: "0 0 16px" }}>
            Tyto problémy nejsou normální.
          </h2>
          <p style={{ fontFamily: FONT, color: C.textMd, fontSize: "1.15rem", margin: "0 auto", lineHeight: 1.7 }}>
            Ale každý den, kdy je ignorujete, vás stojí peníze.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3" style={{ gap: "2px", background: "#2a2a2a" }}>
          {PAIN_POINTS.map((p) => (
            <div key={p.title} style={{ background: C.card, padding: "36px 24px", textAlign: "center", borderTop: `3px solid ${C.red}` }}>
              <div style={{ fontSize: "2.8rem", marginBottom: "16px" }}>{p.emoji}</div>
              <h3 style={{ fontFamily: FONT, fontSize: "1.05rem", fontWeight: 700, color: C.white, lineHeight: 1.3 }}>{p.title}</h3>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "48px", padding: "36px 24px", background: C.card, border: `2px solid ${C.orange}` }}>
          <p style={{ fontFamily: FONT, fontSize: "clamp(1.2rem, 2.5vw, 1.7rem)", fontWeight: 800, color: C.white, margin: "0 0 20px", letterSpacing: "-0.5px", lineHeight: 1.3 }}>
            To jsou <span style={{ color: C.orange }}>uhlíkové nánosy</span>.<br />My je odstraníme za 50–80 minut.
          </p>
          <a href="#kontakt" style={btnOrange}
            onMouseEnter={e => (e.currentTarget.style.background = C.orangeDk)}
            onMouseLeave={e => (e.currentTarget.style.background = C.orange)}>
            CHCI TO OPRAVIT →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── PRICE ANCHOR ─── */
function PriceAnchor() {
  return (
    <section style={{ background: C.dark, padding: "90px 20px" }}>
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "44px" }}>
          <h2 style={{ fontFamily: FONT, fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 900, color: C.white, letterSpacing: "-1.5px", lineHeight: 1.05, margin: "0 0 12px" }}>
            Ignorování vyjde mnohonásobně dráž.
          </h2>
          <p style={{ fontFamily: FONT, color: C.textMd, fontSize: "1.1rem" }}>
            Podívejte se sami.
          </p>
        </div>

        <div style={{ overflow: "hidden", border: "1px solid #333" }}>
          {COST_COMPARE.map((row, i) => (
            <div key={row.problem} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "22px 28px",
              background: row.isSolution ? C.orange : (i % 2 === 0 ? "#1a1a1a" : C.card),
              borderTop: i === 0 ? "none" : `1px solid #2a2a2a`,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ fontSize: "1.3rem" }}>{row.isSolution ? "✅" : "❌"}</span>
                <span style={{ fontFamily: FONT, fontWeight: row.isSolution ? 800 : 600, color: C.white, fontSize: row.isSolution ? "1.1rem" : "1rem" }}>
                  {row.problem}
                </span>
              </div>
              <span style={{ fontFamily: FONT, fontWeight: 900, fontSize: row.isSolution ? "1.6rem" : "1.1rem", color: row.isSolution ? C.white : C.red, letterSpacing: "-0.5px", whiteSpace: "nowrap" as const, marginLeft: "20px" }}>
                {row.cost}
              </span>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "36px" }}>
          <a href="#kontakt" style={{ ...btnOrange, fontSize: "1.2rem", padding: "20px 44px" }}
            onMouseEnter={e => (e.currentTarget.style.background = C.orangeDk)}
            onMouseLeave={e => (e.currentTarget.style.background = C.orange)}>
            OBJEDNAT ZA 2 390 KČ →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── HOW IT WORKS ─── */
function HowItWorks() {
  return (
    <section id="jak-to-funguje" style={{ background: "#161616", padding: "90px 20px" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <h2 style={{ fontFamily: FONT, fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 900, color: C.white, letterSpacing: "-1.5px", margin: "0 0 12px" }}>
            Jednoduché. 3 kroky.
          </h2>
          <p style={{ fontFamily: FONT, color: C.textMd, fontSize: "1.1rem" }}>
            Žádné komplikace, žádné překvapení.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "2px", background: "#2a2a2a", marginBottom: "36px" }}>
          {STEPS.map((step) => (
            <div key={step.num} style={{ background: C.card, padding: "52px 32px", textAlign: "center" }}>
              <div style={{ width: "80px", height: "80px", background: C.orange, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontFamily: FONT, fontWeight: 900, fontSize: "2.2rem", color: C.white }}>
                {step.num}
              </div>
              <h3 style={{ fontFamily: FONT, fontSize: "1.5rem", fontWeight: 900, color: C.white, marginBottom: "12px", letterSpacing: "-0.5px" }}>{step.title}</h3>
              <p style={{ fontFamily: FONT, fontSize: "1.05rem", color: C.textMd, lineHeight: 1.6 }}>{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "2px" }}>
          {[
            { src: "/auto-peugeot.jpg", label: "Přístroj připojený ke sání motoru" },
            { src: "/motor-detail.jpg", label: "Motor po vyčištění" },
          ].map(img => (
            <div key={img.src} style={{ position: "relative", height: "300px", overflow: "hidden" }}>
              <Image src={img.src} alt={img.label} fill style={{ objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)" }} />
              <div style={{ position: "absolute", bottom: "18px", left: "20px", fontFamily: FONT, color: C.white, fontWeight: 700, fontSize: "1rem" }}>
                {img.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── REVIEWS ─── */
function Reviews() {
  return (
    <section id="recenze" style={{ background: C.dark, padding: "90px 20px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: "4px", marginBottom: "16px" }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} style={{ color: "#f59e0b", fontSize: "1.8rem" }}>★</span>
            ))}
          </div>
          <h2 style={{ fontFamily: FONT, fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 900, color: C.white, letterSpacing: "-1.5px", margin: "0 0 10px" }}>
            Co říkají zákazníci
          </h2>
          <p style={{ fontFamily: FONT, color: C.textMd, fontSize: "1.1rem" }}>
            Průměrně 4,9 z 5 hvězd. Přes 500 recenzí na Google.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "2px", background: "#333" }}>
          {REVIEWS.map((r) => (
            <div key={r.name} style={{ background: C.card, padding: "36px 28px" }}>
              <div style={{ display: "inline-block", background: "#1a3a1a", border: "1px solid #2d6a2d", color: C.green, fontFamily: FONT, fontWeight: 700, fontSize: "0.9rem", padding: "5px 14px", marginBottom: "20px" }}>
                {r.result}
              </div>
              <div style={{ display: "flex", gap: "3px", marginBottom: "16px" }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} style={{ color: "#f59e0b", fontSize: "1rem" }}>★</span>
                ))}
              </div>
              <p style={{ fontFamily: FONT, fontSize: "1.05rem", color: "rgba(255,255,255,0.9)", lineHeight: 1.75, marginBottom: "20px", fontStyle: "italic" }}>
                &ldquo;{r.text}&rdquo;
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", overflow: "hidden", position: "relative", flexShrink: 0 }}>
                  <Image src={r.carImg} alt="" fill style={{ objectFit: "cover" }} />
                </div>
                <div>
                  <div style={{ fontFamily: FONT, fontWeight: 700, color: C.white, fontSize: "0.95rem" }}>{r.name}</div>
                  <div style={{ fontFamily: FONT, fontSize: "0.8rem", color: C.orange, fontWeight: 600 }}>Ověřená Google recenze</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PRICING ─── */
function Pricing() {
  return (
    <section id="ceny" style={{ background: "#111", padding: "90px 20px" }}>
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "44px" }}>
          <div style={{ display: "inline-block", background: C.orange, color: C.white, fontFamily: FONT, fontWeight: 800, fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, padding: "6px 18px", marginBottom: "20px" }}>
            Ceník
          </div>
          <h2 style={{ fontFamily: FONT, fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 900, color: C.white, letterSpacing: "-1.5px", margin: "0 0 10px" }}>
            Jasná cena, žádná překvapení.
          </h2>
          <p style={{ fontFamily: FONT, color: C.textMd, fontSize: "1.05rem" }}>Objem motoru najdete v technickém průkazu pod „zdvihový objem".</p>
        </div>

        <div style={{ overflow: "hidden", border: "2px solid #333" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", background: "#1a1a1a", borderBottom: "2px solid #333" }}>
            {["Objem", "Benzín / LPG", "Diesel", "Čas"].map(h => (
              <div key={h} style={{ padding: "14px 12px", fontFamily: FONT, fontWeight: 700, fontSize: "0.85rem", color: C.textMd, textTransform: "uppercase" as const, letterSpacing: "0.06em", textAlign: "center" }}>{h}</div>
            ))}
          </div>
          {PRICING.map((tier, i) => (
            <div key={tier.label} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", background: i % 2 === 0 ? C.card : "#181818", borderTop: i === 0 ? "none" : "1px solid #2a2a2a" }}>
              <div style={{ padding: "22px 12px", fontFamily: FONT, fontWeight: 700, color: C.white, fontSize: "1.05rem", textAlign: "center" }}>{tier.label}</div>
              <div style={{ padding: "22px 12px", fontFamily: FONT, fontWeight: 900, color: C.orange, fontSize: "1.5rem", letterSpacing: "-0.5px", textAlign: "center" }}>
                {tier.benzin}<span style={{ fontSize: "0.85rem", color: C.textLt, fontWeight: 500 }}> Kč</span>
              </div>
              <div style={{ padding: "22px 12px", fontFamily: FONT, fontWeight: 900, color: C.orange, fontSize: "1.5rem", letterSpacing: "-0.5px", textAlign: "center" }}>
                {tier.diesel}<span style={{ fontSize: "0.85rem", color: C.textLt, fontWeight: 500 }}> Kč</span>
              </div>
              <div style={{ padding: "22px 12px", fontFamily: FONT, fontWeight: 600, color: C.textMd, fontSize: "0.95rem", textAlign: "center" }}>{tier.time}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#1a2a1a", border: "1px solid #2d6a2d", padding: "16px 22px", marginTop: "12px", display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ color: C.green, fontSize: "1.3rem" }}>✅</span>
          <span style={{ fontFamily: FONT, fontSize: "1rem", color: "rgba(255,255,255,0.85)" }}>
            <strong style={{ color: C.white }}>Diagnostika ZDARMA</strong> ke každé zakázce (hodnota 300 Kč).
          </span>
        </div>

        <div style={{ textAlign: "center", marginTop: "36px" }}>
          <a href="#kontakt" style={{ ...btnOrange, fontSize: "1.2rem", padding: "20px 44px" }}
            onMouseEnter={e => (e.currentTarget.style.background = C.orangeDk)}
            onMouseLeave={e => (e.currentTarget.style.background = C.orange)}>
            ZAREZERVOVAT TERMÍN →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── LOCATIONS ─── */
function Locations() {
  const locations = [
    { city: "Praha Letňany", address: "Toužimská 720", phone: "+420 601 269 600", hours: "Po–Pá: 8:00–18:00", img: "/praha-letnany.jpg", pageUrl: "/dekarbonizace-praha-letnany" },
    { city: "České Budějovice", address: "Rudolfovská tř. 612", phone: "+420 601 269 600", hours: "Po–Pá: 8:00–18:00", img: "/ceske-budejovice.jpg", pageUrl: "/dekarbonizace-ceske-budejovice" },
  ];
  return (
    <section id="pobocky" style={{ background: "#161616", padding: "90px 20px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "44px" }}>
          <h2 style={{ fontFamily: FONT, fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 900, color: C.white, letterSpacing: "-1.5px", margin: "0 0 10px" }}>
            Dvě pobočky. Jedno číslo.
          </h2>
          <p style={{ fontFamily: FONT, color: C.textMd, fontSize: "1.1rem" }}>
            Termín domluvíme do 24 hodin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "2px", background: "#2a2a2a" }}>
          {locations.map(loc => (
            <div key={loc.city} style={{ background: C.card }}>
              <a href={loc.pageUrl} style={{ display: "block", position: "relative", height: "260px", overflow: "hidden", textDecoration: "none" }}>
                <Image src={loc.img} alt={loc.city} fill style={{ objectFit: "cover", transition: "transform 0.4s" }}
                  onMouseOver={e => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)")}
                  onMouseOut={e => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)" }} />
                <div style={{ position: "absolute", bottom: "16px", left: "20px" }}>
                  <h3 style={{ fontFamily: FONT, color: C.white, fontSize: "1.6rem", fontWeight: 900, margin: 0, letterSpacing: "-0.5px" }}>{loc.city}</h3>
                  <span style={{ fontFamily: FONT, fontSize: "0.85rem", color: C.orange, fontWeight: 700 }}>Více o pobočce →</span>
                </div>
              </a>
              <div style={{ padding: "24px 24px 28px", borderTop: `3px solid ${C.orange}` }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
                  {[
                    { icon: "📍", val: loc.address },
                    { icon: "📞", val: loc.phone, href: `tel:${loc.phone.replace(/\s/g, "")}` },
                    { icon: "🕐", val: loc.hours },
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", fontFamily: FONT, fontSize: "1rem", color: C.textMd }}>
                      <span>{item.icon}</span>
                      {item.href
                        ? <a href={item.href} style={{ color: C.textMd, textDecoration: "none" }}
                            onMouseEnter={e => (e.currentTarget.style.color = C.white)}
                            onMouseLeave={e => (e.currentTarget.style.color = C.textMd)}>{item.val}</a>
                        : <span>{item.val}</span>
                      }
                    </div>
                  ))}
                </div>
                <a href="#kontakt" style={btnOrangeSm}
                  onMouseEnter={e => (e.currentTarget.style.background = C.orangeDk)}
                  onMouseLeave={e => (e.currentTarget.style.background = C.orange)}>
                  Objednat v {loc.city} →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ─── */
function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <section style={{ background: C.dark, padding: "90px 20px" }}>
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2 style={{ fontFamily: FONT, fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 900, color: C.white, letterSpacing: "-1.5px", margin: 0 }}>
            Časté dotazy
          </h2>
        </div>
        {FAQS.map((faq, i) => (
          <div key={i} style={{ borderBottom: "1px solid #2a2a2a" }}>
            <button onClick={() => setOpenIdx(openIdx === i ? null : i)}
              style={{ background: "none", border: "none", width: "100%", textAlign: "left", padding: "22px 0", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", fontFamily: FONT }}>
              <span style={{ fontSize: "1.1rem", fontWeight: 700, color: openIdx === i ? C.orange : C.white }}>{faq.q}</span>
              <span style={{ color: C.orange, fontSize: "1.5rem", flexShrink: 0, transition: "transform 0.2s", transform: openIdx === i ? "rotate(45deg)" : "rotate(0)" }}>+</span>
            </button>
            {openIdx === i && (
              <div style={{ paddingBottom: "22px", fontFamily: FONT, fontSize: "1.05rem", color: C.textMd, lineHeight: 1.8 }}>{faq.a}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── CONTACT FORM ─── */
function ContactForm() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "88d43b16-7eeb-46ee-9c4e-3c60da81b2db");
    formData.append("subject", "Nová poptávka — Funnel kontaktní formulář");
    formData.append("from_name", "Čištění Vodíkem — Funnel");
    try {
      const r = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
      const d = await r.json();
      if (d.success) {
        setSent(true);
        if (typeof window !== "undefined" && (window as any).gtag) {
          (window as any).gtag("event", "generate_lead", { event_category: "form", event_label: "contact_funnel" });
          (window as any).gtag("event", "conversion", { send_to: "AW-18028160012/yuN9CJyp9oscEIzIv5RD" });
        }
      } else { alert("Chyba při odesílání."); }
    } catch { alert("Chyba připojení."); }
    finally { setSubmitting(false); }
  };

  const lightInput: React.CSSProperties = { background: "#f9f9f9", border: "1.5px solid #ddd", color: C.dark, padding: "14px 16px", fontFamily: FONT, fontSize: "1rem", outline: "none", width: "100%", transition: "border-color 0.15s" };

  return (
    <section id="kontakt" style={{ background: C.orange, padding: "90px 20px" }}>
      <div style={{ maxWidth: "640px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h2 style={{ fontFamily: FONT, fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 900, color: C.white, letterSpacing: "-1.5px", lineHeight: 1.05, margin: "0 0 12px" }}>
            Objednejte se ještě dnes.
          </h2>
          <p style={{ fontFamily: FONT, color: "rgba(255,255,255,0.9)", fontSize: "1.15rem", margin: 0 }}>
            Zavoláme vám zpět do 2 hodin.
          </p>
        </div>

        {sent ? (
          <div style={{ background: C.white, padding: "56px 32px", textAlign: "center" }}>
            <div style={{ fontSize: "3.5rem", marginBottom: "16px" }}>✅</div>
            <h3 style={{ fontFamily: FONT, fontSize: "1.6rem", fontWeight: 900, color: C.dark, marginBottom: "10px" }}>Zpráva odeslána!</h3>
            <p style={{ fontFamily: FONT, color: "#555", fontSize: "1.05rem" }}>Ozveme se nejpozději do 24 hodin.</p>
          </div>
        ) : (
          <div style={{ background: C.white, padding: "36px 32px" }}>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <input type="checkbox" name="botcheck" style={{ display: "none" }} />
              <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "14px" }}>
                <input name="Jmeno" required type="text" placeholder="Jméno *" style={lightInput}
                  onFocus={e => (e.currentTarget.style.borderColor = C.orange)}
                  onBlur={e => (e.currentTarget.style.borderColor = "#ddd")} />
                <input name="Prijmeni" required type="text" placeholder="Příjmení *" style={lightInput}
                  onFocus={e => (e.currentTarget.style.borderColor = C.orange)}
                  onBlur={e => (e.currentTarget.style.borderColor = "#ddd")} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "14px" }}>
                <input name="Telefon" required type="tel" placeholder="Telefon *" style={lightInput}
                  onFocus={e => (e.currentTarget.style.borderColor = C.orange)}
                  onBlur={e => (e.currentTarget.style.borderColor = "#ddd")} />
                <input name="E-mail" required type="email" placeholder="E-mail *" style={lightInput}
                  onFocus={e => (e.currentTarget.style.borderColor = C.orange)}
                  onBlur={e => (e.currentTarget.style.borderColor = "#ddd")} />
              </div>
              <select name="Pobocka" required style={{ ...lightInput, cursor: "pointer" }}
                onFocus={e => (e.currentTarget.style.borderColor = C.orange)}
                onBlur={e => (e.currentTarget.style.borderColor = "#ddd")}>
                <option value="">Vyberte pobočku *</option>
                <option value="Praha Letňany">Praha Letňany — Toužimská 720</option>
                <option value="České Budějovice">České Budějovice — Rudolfovská tř. 612</option>
              </select>
              <textarea name="Zprava" rows={3} placeholder="Objem motoru, termín... (nepovinné)"
                style={{ ...lightInput, resize: "none" }}
                onFocus={e => (e.currentTarget.style.borderColor = C.orange)}
                onBlur={e => (e.currentTarget.style.borderColor = "#ddd")} />
              <label style={{ display: "flex", alignItems: "flex-start", gap: "8px", cursor: "pointer", fontFamily: FONT, fontSize: "0.85rem", color: "#666", lineHeight: 1.6 }}>
                <input required type="checkbox" style={{ marginTop: "2px", flexShrink: 0, accentColor: C.orange }} />
                Souhlasím se zpracováním osobních údajů.
              </label>
              <button type="submit" disabled={submitting} style={{ ...btnOrange, width: "100%", fontSize: "1.2rem", padding: "19px", marginTop: "4px", opacity: submitting ? 0.7 : 1 }}
                onMouseEnter={e => { if (!submitting) (e.currentTarget as HTMLButtonElement).style.background = C.orangeDk; }}
                onMouseLeave={e => { if (!submitting) (e.currentTarget as HTMLButtonElement).style.background = C.orange; }}>
                {submitting ? "Odesílám..." : "ODESLAT A ZAREZERVOVAT →"}
              </button>
            </form>
            <div style={{ display: "flex", justifyContent: "center", gap: "28px", marginTop: "18px", flexWrap: "wrap" }}>
              <a href="tel:+420601269600" style={{ fontFamily: FONT, fontWeight: 700, fontSize: "1rem", color: C.dark, textDecoration: "none" }}>📞 +420 601 269 600</a>
              <a href="mailto:info@cistenivodikem.cz" style={{ fontFamily: FONT, fontWeight: 700, fontSize: "1rem", color: C.dark, textDecoration: "none" }}>✉️ info@cistenivodikem.cz</a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer style={{ background: "#0a0a0a", borderTop: `3px solid ${C.orange}`, padding: "48px 20px 28px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "32px", marginBottom: "32px" }}>
          <div>
            <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: "1.2rem", color: C.white, marginBottom: "14px" }}>
              Čištění<span style={{ color: C.orange }}>Vodíkem</span>
            </div>
            <p style={{ fontFamily: FONT, color: C.textLt, fontSize: "0.9rem", lineHeight: 1.9, maxWidth: "240px" }}>
              Vodíková dekarbonizace motorů.<br />Praha Letňany a České Budějovice.<br /><br />
              <strong style={{ color: C.textMd }}>Jakub Franc · IČ: 04874455</strong><br />
              Jiráskova 637/33, Česká Lípa<br /><br />
              <a href="mailto:info@cistenivodikem.cz" style={{ color: C.orange, textDecoration: "none", fontWeight: 600 }}>info@cistenivodikem.cz</a>
            </p>
          </div>
          <div style={{ display: "flex", gap: "44px", flexWrap: "wrap" }}>
            {[
              { h: "Pobočky", links: [{ l: "Praha Letňany", h: "/dekarbonizace-praha-letnany" }, { l: "České Budějovice", h: "/dekarbonizace-ceske-budejovice" }] },
              { h: "Info", links: [{ l: "Jak to funguje", h: "#jak-to-funguje" }, { l: "Ceník", h: "#ceny" }, { l: "Blog", h: "/blog" }, { l: "Kontakt", h: "#kontakt" }] },
            ].map(col => (
              <div key={col.h}>
                <h4 style={{ fontFamily: FONT, fontSize: "0.75rem", fontWeight: 700, color: "#555", textTransform: "uppercase" as const, letterSpacing: "0.12em", marginBottom: "14px" }}>{col.h}</h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                  {col.links.map(l => (
                    <li key={l.l}>
                      <a href={l.h} style={{ fontFamily: FONT, fontSize: "0.95rem", color: C.textLt, textDecoration: "none", transition: "color 0.15s" }}
                        onMouseEnter={e => (e.currentTarget.style.color = C.white)}
                        onMouseLeave={e => (e.currentTarget.style.color = C.textLt)}>{l.l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid #1e1e1e", paddingTop: "18px", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "8px", alignItems: "center" }}>
          <p style={{ fontFamily: FONT, color: "#444", fontSize: "0.85rem" }}>© 2026 cistenivodikem.cz · Jakub Franc</p>
          <a href="https://inetio.cz" target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: FONT, color: "#444", fontSize: "0.85rem", textDecoration: "none", transition: "color 0.15s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#888")}
            onMouseLeave={e => (e.currentTarget.style.color = "#444")}>
            Vytvořilo Inetio s.r.o.
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ─── STICKY MOBILE CTA ─── */
function StickyCTA() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(t);
  }, []);
  if (!visible) return null;
  return (
    <>
      <style>{`@media (min-width: 768px) { #sticky-cta { display: none !important; } }`}</style>
      <div id="sticky-cta" style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: C.orange, padding: "10px 16px", display: "flex", gap: "8px", zIndex: 1000, boxShadow: "0 -4px 20px rgba(0,0,0,0.5)" }}>
        <a href="#kontakt" style={{ ...btnOrange, flex: 1, fontSize: "0.95rem", padding: "13px 16px", background: C.white, color: C.orange, fontWeight: 800 }}>
          Zarezervovat termín
        </a>
        <a href="tel:+420601269600" style={{ ...btnOrange, padding: "13px 20px", fontSize: "1rem", background: "rgba(0,0,0,0.2)" }}>
          📞
        </a>
      </div>
    </>
  );
}

/* ─── PAGE ─── */
export default function Page() {
  return (
    <>
      <TopBar />
      <Navbar />
      <Hero />
      <ProofBar />
      <PainPoints />
      <PriceAnchor />
      <HowItWorks />
      <Reviews />
      <Pricing />
      <Locations />
      <FAQ />
      <ContactForm />
      <Footer />
      <StickyCTA />
    </>
  );
}
