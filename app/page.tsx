"use client";

import { useState, useRef } from "react";
import Image from "next/image";

const FONT = "var(--font-dm), 'DM Sans', system-ui, sans-serif";

const C = {
  orange:  "#ff5500",
  orangeDk:"#d94700",
  yellow:  "#ffd000",
  dark:    "#111111",
  card:    "#1e1e1e",
  cardBdr: "#2e2e2e",
  red:     "#e01c1c",
  white:   "#ffffff",
  offWhite:"#f5f5f5",
  textMd:  "#cccccc",
  textLt:  "#888888",
  green:   "#22c55e",
};

/* ── shared button styles ── */
const btnOrange: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px",
  background: C.orange, color: C.white, border: "none", cursor: "pointer",
  fontFamily: FONT, fontWeight: 800, fontSize: "1.1rem", letterSpacing: "-0.3px",
  padding: "17px 32px", textDecoration: "none", transition: "background 0.15s",
};
const btnOrangeSm: React.CSSProperties = {
  ...btnOrange, fontSize: "0.95rem", padding: "13px 24px",
};
const btnWhiteOutline: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px",
  background: "transparent", color: C.white, border: "2px solid rgba(255,255,255,0.3)",
  cursor: "pointer", fontFamily: FONT, fontWeight: 700, fontSize: "0.95rem",
  padding: "13px 24px", textDecoration: "none", transition: "border-color 0.15s",
};

/* ── data ── */
const PAIN_POINTS = [
  { emoji: "⛽", title: "Spotřeba benzínu nebo nafty stoupla", desc: "Čím více usazenin, tím méně km z každého litru. Platíte víc, jedete stejně." },
  { emoji: "🔧", title: "Motor táhne slabě, ztrácí výkon", desc: "Ucpané vstřikovače a ventily neumožní motoru pracovat naplno." },
  { emoji: "⚠️", title: "Svítí kontrolka DPF nebo motoru", desc: "Zanešený filtr pevných částic je předzvěstí opravy za desítky tisíc." },
  { emoji: "🚗", title: "Neprojdete emisní kontrolou u STK", desc: "Vysoké emise = neúspěch. My emise snížíme ještě před STK." },
  { emoji: "❄️", title: "Těžce startuje, cukne při rozjezdu", desc: "Špatná komprese od uhlíkových nánosů se projeví hlavně za studena." },
  { emoji: "💨", title: "Z výfuku vychází tmavý kouř", desc: "Viditelný kouř = hoří usazeniny. Motor to říká nahlas — poslechněte ho." },
];

const COST_COMPARE = [
  { problem: "Výměna DPF filtru", cost: "20 000–60 000 Kč", highlight: true },
  { problem: "Oprava vstřikovačů", cost: "15 000–40 000 Kč", highlight: false },
  { problem: "Generální oprava hlavy motoru", cost: "30 000–80 000 Kč", highlight: false },
  { problem: "Naše vodíková dekarbonizace", cost: "od 2 390 Kč", highlight: false, isSolution: true },
];

const REVIEWS = [
  {
    name: "Martin N.", stars: 5, carImg: "/review-vw-caddy.jpg",
    result: "Spotřeba klesla o 1,2 l/100 km",
    text: "Byl jsem skeptický, ale po dekarbonizaci motor nastartoval jako nový. Cukání zmizelo úplně. Přišel jsem i s druhým autem.",
  },
  {
    name: "Petra K.", stars: 5, carImg: "/review-volvo.jpg",
    result: "Motor je výrazně tišší",
    text: "Rychlá obsluha, příjemné prostředí a okamžitě znatelný výsledek. Auto táhne líp. Doporučuju všem.",
  },
  {
    name: "Tomáš H.", stars: 5, carImg: "/review-vw-touareg.jpg",
    result: "Úspora ~3 000 Kč za rok",
    text: "Spotřeba klesla o skoro litr na stovce. Za cenu jedné dekarbonizace se mi to vrátí do půl roku. Škoda, že jsem to neudělal dřív.",
  },
];

const STEPS = [
  { num: "1", title: "Přijedete", desc: "Objednáte se online nebo zavoláte. Přijedete v domluvený čas." },
  { num: "2", title: "Čistíme", desc: "Technik připojí přístroj k motoru. Bez demontáže, bez chemikálií. 50–80 minut." },
  { num: "3", title: "Odjedete", desc: "Motor je čistý. Výkon obnoven, spotřeba nižší. Hned to poznáte." },
];

const PRICING = [
  { label: "do 1,9 l", benzin: "2 390", diesel: "2 690", time: "50–60 min", popular: false },
  { label: "nad 2,0 l", benzin: "2 890", diesel: "3 190", time: "60–80 min", popular: false },
];

const FAQS = [
  { q: "Funguje to opravdu? Nejsou to jen prázdné sliby?", a: "Výsledky měříme přístrojem před a po. Emise klesají o 40–87 %, spotřeba o 0,2–1,2 l/100 km. Máme přes 500 zákazníků s průměrným hodnocením 4,9/5 na Google. To nejsou sliby — to jsou čísla." },
  { q: "Musím vyměnit olej nebo demontovat motor?", a: "Ne. Přístroj se připojí jen ke vstupu vzduchu. Motor zůstane netknutý, olej nevyměňujete. Přijdete, počkáte, odjedete." },
  { q: "Jak rychle to pocítím?", a: "Tišší motor a lepší odezva na plyn jsou znatelné okamžitě. Pokles spotřeby se projeví při příštích tankováních — obvykle do 200 km." },
  { q: "Pomůže to, když svítí kontrolka DPF?", a: "Ano. Vodíková dekarbonizace čistí DPF filtr a odstraňuje příčinu jeho zanášení. Doporučujeme ji jako první krok — ušetříte tisíce oproti výměně filtru." },
  { q: "Na jaká auta to funguje?", a: "Na všechna — benzín, diesel, LPG, hybrid. Osobní auta, dodávky, firemní flotily. Nevhodné jen pro čistě elektrická vozidla." },
];

/* ───────────────────────────────────────────────────────── */
function TopBar() {
  return (
    <div style={{ background: C.red, padding: "8px 16px", textAlign: "center", fontFamily: FONT }}>
      <span style={{ color: "#fff", fontWeight: 700, fontSize: "0.85rem" }}>
        ⚠️&nbsp; Svítí kontrolka DPF nebo motoru? Zavolejte ihned:&nbsp;
        <a href="tel:+420601269600" style={{ color: C.yellow, textDecoration: "none", fontWeight: 800 }}>
          +420 601 269 600
        </a>
      </span>
    </div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav style={{ background: C.dark, borderBottom: `3px solid ${C.orange}`, position: "sticky", top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 16px", height: "58px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="#" style={{ textDecoration: "none", fontFamily: FONT, fontWeight: 800, fontSize: "1.1rem", color: C.white }}>
          Čištění<span style={{ color: C.orange }}>Vodíkem</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex" style={{ gap: "28px", alignItems: "center" }}>
          {[["Jak to funguje", "#jak-to-funguje"], ["Ceny", "#ceny"], ["Recenze", "#recenze"], ["Pobočky", "#pobocky"], ["Kontakt", "#kontakt"]].map(([label, href]) => (
            <a key={href} href={href} style={{ color: C.textMd, fontSize: "0.875rem", fontWeight: 600, textDecoration: "none", fontFamily: FONT, transition: "color 0.15s" }}
              onMouseEnter={e => (e.currentTarget.style.color = C.white)}
              onMouseLeave={e => (e.currentTarget.style.color = C.textMd)}>
              {label}
            </a>
          ))}
        </div>

        <a href="tel:+420601269600" className="hidden md:flex" style={{ ...btnOrangeSm, fontSize: "0.875rem", padding: "9px 18px" }}
          onMouseEnter={e => (e.currentTarget.style.background = C.orangeDk)}
          onMouseLeave={e => (e.currentTarget.style.background = C.orange)}>
          📞 +420 601 269 600
        </a>

        <button onClick={() => setOpen(!open)} className="md:hidden"
          style={{ background: "none", border: "none", color: C.white, cursor: "pointer", fontSize: "1.4rem", padding: "4px" }}>
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div style={{ background: "#1a1a1a", borderTop: "1px solid #333", padding: "16px", display: "flex", flexDirection: "column", gap: "14px" }}>
          {[["Jak to funguje", "#jak-to-funguje"], ["Ceny", "#ceny"], ["Recenze", "#recenze"], ["Pobočky", "#pobocky"], ["Kontakt", "#kontakt"]].map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}
              style={{ color: C.white, fontSize: "1rem", fontWeight: 700, textDecoration: "none", fontFamily: FONT }}>
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

/* ─────────── HERO ─────────── */
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
      {/* Background image overlay */}
      <div style={{ position: "absolute", inset: 0 }}>
        <Image
          src="https://www.bezkarbonu.cz/wp-content/themes/bezkarbonu/assets/img/backgrounds/2024-04-25_hp-hero-bg-small.avif"
          alt="" fill style={{ objectFit: "cover", objectPosition: "center", opacity: 0.18 }} unoptimized priority
        />
      </div>

      <div style={{ position: "relative", maxWidth: "1100px", margin: "0 auto", padding: "60px 16px 70px" }}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 items-start">

          {/* LEFT — copy */}
          <div>
            {/* Social proof pill */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,208,0,0.12)", border: "1px solid rgba(255,208,0,0.3)", padding: "6px 14px", marginBottom: "24px" }}>
              <span style={{ color: C.yellow, fontSize: "0.8rem", fontWeight: 700, fontFamily: FONT, letterSpacing: "0.04em" }}>
                ⭐ 500+ zákazníků · Hodnocení 4,9/5 na Google
              </span>
            </div>

            <h1 style={{ fontFamily: FONT, fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 900, color: C.white, lineHeight: 1.05, letterSpacing: "-2px", margin: "0 0 16px" }}>
              Váš motor ztrácí výkon<br />
              <span style={{ color: C.orange }}>a stojí vás zbytečně víc.</span>
            </h1>

            <p style={{ fontFamily: FONT, color: C.textMd, fontSize: "clamp(1rem, 2vw, 1.2rem)", lineHeight: 1.7, maxWidth: "540px", margin: "0 0 28px" }}>
              Uhlíkové nánosy způsobují <strong style={{ color: C.white }}>vyšší spotřebu, slabší výkon a problémy u STK</strong>.
              My to vyčistíme za 50 minut — bez demontáže, od <strong style={{ color: C.yellow }}>2 390 Kč</strong>.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "36px" }}>
              <a href="#kontakt" style={btnOrange}
                onMouseEnter={e => (e.currentTarget.style.background = C.orangeDk)}
                onMouseLeave={e => (e.currentTarget.style.background = C.orange)}>
                ZAREZERVOVAT TERMÍN →
              </a>
              <a href="tel:+420601269600" style={btnWhiteOutline}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)")}>
                📞 Zavolat hned
              </a>
            </div>

            {/* Trust checklist */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 20px" }}>
              {["✅ Bez demontáže motoru", "✅ Výsledek hned na místě", "✅ Diagnostika ZDARMA", "✅ Benzín i diesel"].map(item => (
                <span key={item} style={{ fontFamily: FONT, fontSize: "0.875rem", color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>{item}</span>
              ))}
            </div>
          </div>

          {/* RIGHT — quick form */}
          <div style={{ background: C.card, border: `2px solid ${C.orange}`, padding: "28px 24px" }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{ fontSize: "3rem", marginBottom: "12px" }}>✅</div>
                <h3 style={{ fontFamily: FONT, color: C.white, fontSize: "1.2rem", fontWeight: 800, marginBottom: "8px" }}>Ozveme se vám!</h3>
                <p style={{ fontFamily: FONT, color: C.textMd, fontSize: "0.9rem" }}>Do 2 hodin v pracovní době.</p>
              </div>
            ) : (
              <>
                <div style={{ background: C.orange, margin: "-28px -24px 20px", padding: "12px 20px", textAlign: "center" }}>
                  <span style={{ fontFamily: FONT, color: C.white, fontWeight: 800, fontSize: "0.95rem" }}>📅 ZAREZERVUJTE TERMÍN ZDARMA</span>
                </div>
                <p style={{ fontFamily: FONT, color: C.textMd, fontSize: "0.85rem", marginBottom: "16px", lineHeight: 1.6 }}>
                  Zavoláme vám zpět do 2 hodin a domluvíme termín, který vám vyhovuje.
                </p>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <input type="checkbox" name="botcheck" style={{ display: "none" }} />
                  <input name="Jmeno" required type="text" placeholder="Vaše jméno *"
                    style={{ background: "#2a2a2a", border: "1px solid #444", color: C.white, padding: "11px 13px", fontFamily: FONT, fontSize: "0.9rem", outline: "none", width: "100%" }}
                    onFocus={e => (e.currentTarget.style.borderColor = C.orange)}
                    onBlur={e => (e.currentTarget.style.borderColor = "#444")} />
                  <input name="Telefon" required type="tel" placeholder="Telefonní číslo *"
                    style={{ background: "#2a2a2a", border: "1px solid #444", color: C.white, padding: "11px 13px", fontFamily: FONT, fontSize: "0.9rem", outline: "none", width: "100%" }}
                    onFocus={e => (e.currentTarget.style.borderColor = C.orange)}
                    onBlur={e => (e.currentTarget.style.borderColor = "#444")} />
                  <select name="Pobocka" required
                    style={{ background: "#1e1e1e", border: "1px solid #444", color: C.white, padding: "11px 13px", fontFamily: FONT, fontSize: "0.9rem", outline: "none", width: "100%", cursor: "pointer" }}
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
                <p style={{ fontFamily: FONT, color: "#555", fontSize: "0.7rem", marginTop: "10px", textAlign: "center" }}>
                  Žádný závazek. Odesláním souhlasíte se zprac. osobních údajů.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────── PROOF BAR ─────────── */
function ProofBar() {
  const items = [
    { num: "500+", label: "spokojených zákazníků" },
    { num: "4,9/5", label: "průměrné Google hodnocení" },
    { num: "−87 %", label: "snížení emisí (doložené případy)" },
    { num: "5+ let", label: "na trhu" },
  ];
  return (
    <div style={{ background: C.orange, padding: "16px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px 40px" }}>
        {items.map(item => (
          <div key={item.num} style={{ textAlign: "center", fontFamily: FONT }}>
            <div style={{ fontSize: "1.5rem", fontWeight: 900, color: C.white, letterSpacing: "-0.5px", lineHeight: 1 }}>{item.num}</div>
            <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.8)", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" as const }}>{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────── PAIN POINTS ─────────── */
function PainPoints() {
  return (
    <section style={{ background: "#161616", padding: "64px 16px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ display: "inline-block", background: C.red, color: C.white, fontFamily: FONT, fontWeight: 800, fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, padding: "5px 14px", marginBottom: "16px" }}>
            Poznáváte se?
          </div>
          <h2 style={{ fontFamily: FONT, fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 900, color: C.white, letterSpacing: "-1px", lineHeight: 1.1, margin: "0 0 12px" }}>
            Tyto problémy nejsou normální.
          </h2>
          <p style={{ fontFamily: FONT, color: C.textMd, fontSize: "1.05rem", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>
            Ale každý den, kdy je ignorujete, vás stojí peníze.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: "1px", background: "#2a2a2a" }}>
          {PAIN_POINTS.map((p) => (
            <div key={p.title} style={{ background: C.card, padding: "28px 24px", borderTop: `3px solid ${C.red}` }}>
              <div style={{ fontSize: "2rem", marginBottom: "12px" }}>{p.emoji}</div>
              <h3 style={{ fontFamily: FONT, fontSize: "1rem", fontWeight: 700, color: C.white, marginBottom: "8px", letterSpacing: "-0.2px" }}>{p.title}</h3>
              <p style={{ fontFamily: FONT, fontSize: "0.9rem", color: C.textMd, lineHeight: 1.7 }}>{p.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "40px", padding: "24px", background: C.card, border: `2px solid ${C.orange}` }}>
          <p style={{ fontFamily: FONT, fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", fontWeight: 800, color: C.white, margin: "0 0 16px", letterSpacing: "-0.5px" }}>
            To nejsou příznaky stáří auta — to jsou <span style={{ color: C.orange }}>uhlíkové nánosy</span>.
          </p>
          <p style={{ fontFamily: FONT, color: C.textMd, fontSize: "0.95rem", margin: "0 0 20px" }}>
            A my je odstraníme za 50–80 minut, bez demontáže motoru.
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

/* ─────────── PRICE ANCHOR ─────────── */
function PriceAnchor() {
  return (
    <section style={{ background: C.dark, padding: "64px 16px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{ display: "inline-block", background: "#2a2a2a", border: `1px solid #444`, color: C.textMd, fontFamily: FONT, fontWeight: 800, fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, padding: "5px 14px", marginBottom: "16px" }}>
            Porovnání nákladů
          </div>
          <h2 style={{ fontFamily: FONT, fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 900, color: C.white, letterSpacing: "-1px", lineHeight: 1.1, margin: "0 0 12px" }}>
            Ignorování vyjde mnohonásobně dráž.
          </h2>
        </div>

        <div style={{ overflow: "hidden", border: "1px solid #333" }}>
          {COST_COMPARE.map((row, i) => (
            <div key={row.problem} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "18px 24px",
              background: row.isSolution ? C.orange : (i % 2 === 0 ? "#1a1a1a" : C.card),
              borderTop: row.isSolution ? "none" : (i === 0 ? "none" : "1px solid #2a2a2a"),
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "1.1rem" }}>{row.isSolution ? "✅" : "❌"}</span>
                <span style={{ fontFamily: FONT, fontWeight: row.isSolution ? 800 : 600, color: row.isSolution ? C.white : C.textMd, fontSize: row.isSolution ? "1.05rem" : "0.95rem" }}>
                  {row.problem}
                </span>
              </div>
              <span style={{ fontFamily: FONT, fontWeight: 900, fontSize: row.isSolution ? "1.4rem" : "1rem", color: row.isSolution ? C.white : C.red, letterSpacing: "-0.5px", whiteSpace: "nowrap" as const, marginLeft: "16px" }}>
                {row.cost}
              </span>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "28px" }}>
          <p style={{ fontFamily: FONT, color: C.textMd, fontSize: "0.95rem", marginBottom: "20px" }}>
            Prevence je 10× levnější než oprava. Objednejte se ještě dnes.
          </p>
          <a href="#kontakt" style={btnOrange}
            onMouseEnter={e => (e.currentTarget.style.background = C.orangeDk)}
            onMouseLeave={e => (e.currentTarget.style.background = C.orange)}>
            OBJEDNAT ZA 2 390 KČ →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────── HOW IT WORKS ─────────── */
function HowItWorks() {
  return (
    <section id="jak-to-funguje" style={{ background: "#161616", padding: "64px 16px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2 style={{ fontFamily: FONT, fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 900, color: C.white, letterSpacing: "-1px", lineHeight: 1.1, margin: "0 0 12px" }}>
            Jednoduché. 3 kroky.
          </h2>
          <p style={{ fontFamily: FONT, color: C.textMd, fontSize: "1rem" }}>
            Žádné komplikace, žádné překvapení.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "2px", background: "#2a2a2a" }}>
          {STEPS.map((step) => (
            <div key={step.num} style={{ background: C.card, padding: "36px 28px", textAlign: "center" }}>
              <div style={{ width: "64px", height: "64px", background: C.orange, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontFamily: FONT, fontWeight: 900, fontSize: "1.8rem", color: C.white }}>
                {step.num}
              </div>
              <h3 style={{ fontFamily: FONT, fontSize: "1.2rem", fontWeight: 800, color: C.white, marginBottom: "10px", letterSpacing: "-0.3px" }}>{step.title}</h3>
              <p style={{ fontFamily: FONT, fontSize: "0.95rem", color: C.textMd, lineHeight: 1.7 }}>{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ marginTop: "28px" }}>
          <div style={{ position: "relative", height: "280px", overflow: "hidden" }}>
            <Image src="/auto-peugeot.jpg" alt="Vodíková dekarbonizace" fill style={{ objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)" }} />
            <div style={{ position: "absolute", bottom: "16px", left: "16px", fontFamily: FONT, color: C.white, fontWeight: 700, fontSize: "0.9rem" }}>
              Přístroj připojený ke sání motoru
            </div>
          </div>
          <div style={{ position: "relative", height: "280px", overflow: "hidden" }}>
            <Image src="/motor-detail.jpg" alt="Motor po dekarbonizaci" fill style={{ objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)" }} />
            <div style={{ position: "absolute", bottom: "16px", left: "16px", fontFamily: FONT, color: C.white, fontWeight: 700, fontSize: "0.9rem" }}>
              Motor po vyčištění
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────── REVIEWS ─────────── */
function Reviews() {
  return (
    <section id="recenze" style={{ background: C.dark, padding: "64px 16px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: "4px", marginBottom: "12px" }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} style={{ color: "#f59e0b", fontSize: "1.5rem" }}>★</span>
            ))}
          </div>
          <h2 style={{ fontFamily: FONT, fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 900, color: C.white, letterSpacing: "-1px", lineHeight: 1.1, margin: "0 0 8px" }}>
            Co říkají zákazníci
          </h2>
          <p style={{ fontFamily: FONT, color: C.textMd, fontSize: "0.95rem" }}>
            Přes 500 recenzí. Průměrně 4,9 z 5 hvězd na Google.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "2px", background: "#333" }}>
          {REVIEWS.map((r) => (
            <div key={r.name} style={{ background: C.card, padding: "28px 24px" }}>
              {/* Result badge */}
              <div style={{ display: "inline-block", background: "#1a3a1a", border: "1px solid #2d6a2d", color: C.green, fontFamily: FONT, fontWeight: 700, fontSize: "0.8rem", padding: "4px 12px", marginBottom: "16px" }}>
                {r.result}
              </div>
              <div style={{ display: "flex", gap: "2px", marginBottom: "12px" }}>
                {Array.from({ length: r.stars }).map((_, i) => (
                  <span key={i} style={{ color: "#f59e0b", fontSize: "0.9rem" }}>★</span>
                ))}
              </div>
              <p style={{ fontFamily: FONT, fontSize: "0.95rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.75, marginBottom: "16px", fontStyle: "italic" }}>
                &ldquo;{r.text}&rdquo;
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", overflow: "hidden", position: "relative", flexShrink: 0 }}>
                  <Image src={r.carImg} alt="" fill style={{ objectFit: "cover" }} />
                </div>
                <div>
                  <div style={{ fontFamily: FONT, fontWeight: 700, color: C.white, fontSize: "0.9rem" }}>{r.name}</div>
                  <div style={{ fontFamily: FONT, fontSize: "0.75rem", color: C.orange, fontWeight: 600 }}>Ověřená Google recenze</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── PRICING ─────────── */
function Pricing() {
  return (
    <section id="ceny" style={{ background: "#111", padding: "64px 16px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{ display: "inline-block", background: C.orange, color: C.white, fontFamily: FONT, fontWeight: 800, fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, padding: "5px 14px", marginBottom: "16px" }}>
            Ceník
          </div>
          <h2 style={{ fontFamily: FONT, fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 900, color: C.white, letterSpacing: "-1px", margin: "0 0 8px" }}>
            Jasná cena, žádná překvapení.
          </h2>
          <p style={{ fontFamily: FONT, color: C.textMd, fontSize: "0.95rem" }}>Ceny jsou s DPH. Objem motoru najdete v TP pod „zdvihový objem".</p>
        </div>

        {/* Pricing table */}
        <div style={{ overflow: "hidden", border: "2px solid #333" }}>
          {/* Header */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", background: "#1a1a1a", borderBottom: "2px solid #333" }}>
            {["Objem motoru", "Benzín / LPG", "Diesel", "Čas"].map(h => (
              <div key={h} style={{ padding: "12px 16px", fontFamily: FONT, fontWeight: 700, fontSize: "0.78rem", color: C.textMd, textTransform: "uppercase" as const, letterSpacing: "0.06em", textAlign: "center" }}>{h}</div>
            ))}
          </div>
          {PRICING.map((tier, i) => (
            <div key={tier.label} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", background: i % 2 === 0 ? C.card : "#181818", borderBottom: i < PRICING.length - 1 ? "1px solid #2a2a2a" : "none" }}>
              <div style={{ padding: "18px 16px", fontFamily: FONT, fontWeight: 700, color: C.white, fontSize: "1rem", textAlign: "center" }}>{tier.label}</div>
              <div style={{ padding: "18px 16px", fontFamily: FONT, fontWeight: 900, color: C.orange, fontSize: "1.3rem", letterSpacing: "-0.5px", textAlign: "center" }}>
                {tier.benzin} <span style={{ fontSize: "0.8rem", color: C.textLt, fontWeight: 500 }}>Kč</span>
              </div>
              <div style={{ padding: "18px 16px", fontFamily: FONT, fontWeight: 900, color: C.orange, fontSize: "1.3rem", letterSpacing: "-0.5px", textAlign: "center" }}>
                {tier.diesel} <span style={{ fontSize: "0.8rem", color: C.textLt, fontWeight: 500 }}>Kč</span>
              </div>
              <div style={{ padding: "18px 16px", fontFamily: FONT, fontWeight: 600, color: C.textMd, fontSize: "0.9rem", textAlign: "center" }}>{tier.time}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#1a2a1a", border: "1px solid #2d6a2d", padding: "14px 20px", marginTop: "12px", display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ color: C.green, fontSize: "1.2rem" }}>✅</span>
          <span style={{ fontFamily: FONT, fontSize: "0.9rem", color: "rgba(255,255,255,0.85)" }}>
            <strong style={{ color: C.white }}>Diagnostika vozidla ZDARMA</strong> ke každé zakázce. Hodnota 300 Kč.
          </span>
        </div>

        <div style={{ textAlign: "center", marginTop: "28px" }}>
          <a href="#kontakt" style={{ ...btnOrange, fontSize: "1.15rem", padding: "18px 40px" }}
            onMouseEnter={e => (e.currentTarget.style.background = C.orangeDk)}
            onMouseLeave={e => (e.currentTarget.style.background = C.orange)}>
            ZAREZERVOVAT TERMÍN →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────── LOCATIONS ─────────── */
function Locations() {
  const locations = [
    { city: "Praha Letňany", address: "Toužimská 720, Praha Letňany", phone: "+420 601 269 600", hours: "Po–Pá: 8:00–18:00", img: "/praha-letnany.jpg", pageUrl: "/dekarbonizace-praha-letnany" },
    { city: "České Budějovice", address: "Rudolfovská tř. 612", phone: "+420 601 269 600", hours: "Po–Pá: 8:00–18:00", img: "/ceske-budejovice.jpg", pageUrl: "/dekarbonizace-ceske-budejovice" },
  ];
  return (
    <section id="pobocky" style={{ background: "#161616", padding: "64px 16px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h2 style={{ fontFamily: FONT, fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 900, color: C.white, letterSpacing: "-1px", margin: "0 0 8px" }}>
            Dvě pobočky. Jedno číslo.
          </h2>
          <p style={{ fontFamily: FONT, color: C.textMd, fontSize: "0.95rem" }}>
            Zavolejte nebo vyplňte formulář — termín domluvíme do 24 hodin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "2px", background: "#2a2a2a" }}>
          {locations.map(loc => (
            <div key={loc.city} style={{ background: C.card }}>
              <a href={loc.pageUrl} style={{ display: "block", position: "relative", height: "220px", overflow: "hidden", textDecoration: "none" }}>
                <Image src={loc.img} alt={loc.city} fill style={{ objectFit: "cover", transition: "transform 0.4s" }}
                  onMouseOver={e => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)")}
                  onMouseOut={e => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)" }} />
                <div style={{ position: "absolute", bottom: "14px", left: "16px" }}>
                  <h3 style={{ fontFamily: FONT, color: C.white, fontSize: "1.4rem", fontWeight: 800, margin: 0, letterSpacing: "-0.5px" }}>{loc.city}</h3>
                  <span style={{ fontFamily: FONT, fontSize: "0.78rem", color: C.orange, fontWeight: 700 }}>Více o pobočce →</span>
                </div>
              </a>
              <div style={{ padding: "20px 20px 24px", borderTop: `3px solid ${C.orange}` }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
                  {[
                    { icon: "📍", val: loc.address },
                    { icon: "📞", val: loc.phone, href: `tel:${loc.phone.replace(/\s/g, "")}` },
                    { icon: "🕐", val: loc.hours },
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: FONT, fontSize: "0.9rem", color: C.textMd }}>
                      <span style={{ fontSize: "0.9rem" }}>{item.icon}</span>
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

/* ─────────── FAQ ─────────── */
function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <section style={{ background: C.dark, padding: "64px 16px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h2 style={{ fontFamily: FONT, fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", fontWeight: 900, color: C.white, letterSpacing: "-1px", margin: "0 0 8px" }}>
            Časté dotazy
          </h2>
        </div>
        {FAQS.map((faq, i) => (
          <div key={i} style={{ borderBottom: "1px solid #2a2a2a" }}>
            <button onClick={() => setOpenIdx(openIdx === i ? null : i)}
              style={{ background: "none", border: "none", width: "100%", textAlign: "left", padding: "18px 0", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", fontFamily: FONT }}>
              <span style={{ fontSize: "1rem", fontWeight: 700, color: openIdx === i ? C.orange : C.white }}>{faq.q}</span>
              <span style={{ color: C.orange, fontSize: "1.3rem", flexShrink: 0, transition: "transform 0.2s", transform: openIdx === i ? "rotate(45deg)" : "rotate(0)" }}>+</span>
            </button>
            {openIdx === i && (
              <div style={{ paddingBottom: "18px", fontFamily: FONT, fontSize: "0.95rem", color: C.textMd, lineHeight: 1.8 }}>{faq.a}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────── CONTACT FORM ─────────── */
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

  const inputStyle: React.CSSProperties = { background: "#1e1e1e", border: "1.5px solid #333", color: C.white, padding: "13px 14px", fontFamily: FONT, fontSize: "0.95rem", outline: "none", width: "100%", transition: "border-color 0.15s" };

  return (
    <section id="kontakt" style={{ background: C.orange, padding: "64px 16px" }}>
      <div style={{ maxWidth: "680px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <h2 style={{ fontFamily: FONT, fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 900, color: C.white, letterSpacing: "-1px", lineHeight: 1.1, margin: "0 0 10px" }}>
            Objednejte se ještě dnes.
          </h2>
          <p style={{ fontFamily: FONT, color: "rgba(255,255,255,0.85)", fontSize: "1.05rem", margin: 0 }}>
            Termíny obsazujeme rychle. Zavoláme vám zpět do 2 hodin.
          </p>
        </div>

        {sent ? (
          <div style={{ background: C.white, padding: "48px 32px", textAlign: "center" }}>
            <div style={{ fontSize: "3rem", marginBottom: "12px" }}>✅</div>
            <h3 style={{ fontFamily: FONT, fontSize: "1.4rem", fontWeight: 800, color: C.dark, marginBottom: "8px" }}>Zpráva odeslána!</h3>
            <p style={{ fontFamily: FONT, color: "#555", fontSize: "0.95rem" }}>Ozveme se nejpozději do 24 hodin a domluvíme termín.</p>
          </div>
        ) : (
          <div style={{ background: C.white, padding: "32px 28px" }}>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <input type="checkbox" name="botcheck" style={{ display: "none" }} />
              <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "12px" }}>
                <input name="Jmeno" required type="text" placeholder="Jméno *" style={{ ...inputStyle, color: C.dark, background: "#f9f9f9", border: "1.5px solid #ddd" }}
                  onFocus={e => (e.currentTarget.style.borderColor = C.orange)}
                  onBlur={e => (e.currentTarget.style.borderColor = "#ddd")} />
                <input name="Prijmeni" required type="text" placeholder="Příjmení *" style={{ ...inputStyle, color: C.dark, background: "#f9f9f9", border: "1.5px solid #ddd" }}
                  onFocus={e => (e.currentTarget.style.borderColor = C.orange)}
                  onBlur={e => (e.currentTarget.style.borderColor = "#ddd")} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "12px" }}>
                <input name="Telefon" required type="tel" placeholder="Telefon *" style={{ ...inputStyle, color: C.dark, background: "#f9f9f9", border: "1.5px solid #ddd" }}
                  onFocus={e => (e.currentTarget.style.borderColor = C.orange)}
                  onBlur={e => (e.currentTarget.style.borderColor = "#ddd")} />
                <input name="E-mail" required type="email" placeholder="E-mail *" style={{ ...inputStyle, color: C.dark, background: "#f9f9f9", border: "1.5px solid #ddd" }}
                  onFocus={e => (e.currentTarget.style.borderColor = C.orange)}
                  onBlur={e => (e.currentTarget.style.borderColor = "#ddd")} />
              </div>
              <select name="Pobocka" required style={{ ...inputStyle, color: C.dark, background: "#f9f9f9", border: "1.5px solid #ddd", cursor: "pointer" }}
                onFocus={e => (e.currentTarget.style.borderColor = C.orange)}
                onBlur={e => (e.currentTarget.style.borderColor = "#ddd")}>
                <option value="">Vyberte pobočku *</option>
                <option value="Praha Letňany">Praha Letňany — Toužimská 720</option>
                <option value="České Budějovice">České Budějovice — Rudolfovská tř. 612</option>
              </select>
              <textarea name="Zprava" rows={3} placeholder="Objem motoru, preferovaný termín... (nepovinné)"
                style={{ ...inputStyle, color: C.dark, background: "#f9f9f9", border: "1.5px solid #ddd", resize: "none" }}
                onFocus={e => (e.currentTarget.style.borderColor = C.orange)}
                onBlur={e => (e.currentTarget.style.borderColor = "#ddd")} />
              <label style={{ display: "flex", alignItems: "flex-start", gap: "8px", cursor: "pointer", fontFamily: FONT, fontSize: "0.78rem", color: "#555", lineHeight: 1.6 }}>
                <input required type="checkbox" style={{ marginTop: "2px", flexShrink: 0, accentColor: C.orange }} />
                Souhlasím se zpracováním osobních údajů.
              </label>
              <button type="submit" disabled={submitting} style={{ ...btnOrange, width: "100%", fontSize: "1.15rem", padding: "17px", marginTop: "4px", opacity: submitting ? 0.7 : 1 }}
                onMouseEnter={e => { if (!submitting) (e.currentTarget as HTMLButtonElement).style.background = C.orangeDk; }}
                onMouseLeave={e => { if (!submitting) (e.currentTarget as HTMLButtonElement).style.background = C.orange; }}>
                {submitting ? "Odesílám..." : "ODESLAT A ZAREZERVOVAT →"}
              </button>
            </form>
            <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginTop: "16px", flexWrap: "wrap" }}>
              <a href="tel:+420601269600" style={{ fontFamily: FONT, fontWeight: 700, fontSize: "0.9rem", color: C.dark, textDecoration: "none" }}>
                📞 +420 601 269 600
              </a>
              <a href="mailto:info@cistenivodikem.cz" style={{ fontFamily: FONT, fontWeight: 700, fontSize: "0.9rem", color: C.dark, textDecoration: "none" }}>
                ✉️ info@cistenivodikem.cz
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ─────────── FOOTER ─────────── */
function Footer() {
  return (
    <footer style={{ background: "#0a0a0a", borderTop: `3px solid ${C.orange}`, padding: "40px 16px 24px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "28px", marginBottom: "28px" }}>
          <div>
            <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: "1.1rem", color: C.white, marginBottom: "12px" }}>
              Čištění<span style={{ color: C.orange }}>Vodíkem</span>
            </div>
            <p style={{ fontFamily: FONT, color: C.textLt, fontSize: "0.875rem", lineHeight: 1.8, maxWidth: "240px" }}>
              Vodíková dekarbonizace motorů.<br />
              Praha Letňany a České Budějovice.<br /><br />
              <strong style={{ color: C.textMd }}>Jakub Franc · IČ: 04874455</strong><br />
              Jiráskova 637/33, Česká Lípa<br /><br />
              <a href="mailto:info@cistenivodikem.cz" style={{ color: C.orange, textDecoration: "none", fontWeight: 600 }}>info@cistenivodikem.cz</a>
            </p>
          </div>
          <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
            {[
              { h: "Pobočky", links: [{ l: "Praha Letňany", h: "/dekarbonizace-praha-letnany" }, { l: "České Budějovice", h: "/dekarbonizace-ceske-budejovice" }] },
              { h: "Info", links: [{ l: "O nás", h: "#jak-to-funguje" }, { l: "Ceník", h: "#ceny" }, { l: "Blog", h: "/blog" }, { l: "Kontakt", h: "#kontakt" }] },
            ].map(col => (
              <div key={col.h}>
                <h4 style={{ fontFamily: FONT, fontSize: "0.72rem", fontWeight: 700, color: "#555", textTransform: "uppercase" as const, letterSpacing: "0.12em", marginBottom: "12px" }}>{col.h}</h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                  {col.links.map(l => (
                    <li key={l.l}>
                      <a href={l.h} style={{ fontFamily: FONT, fontSize: "0.9rem", color: C.textLt, textDecoration: "none", transition: "color 0.15s" }}
                        onMouseEnter={e => (e.currentTarget.style.color = C.white)}
                        onMouseLeave={e => (e.currentTarget.style.color = C.textLt)}>{l.l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid #1e1e1e", paddingTop: "16px", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "8px", alignItems: "center" }}>
          <p style={{ fontFamily: FONT, color: "#444", fontSize: "0.82rem" }}>© 2026 cistenivodikem.cz · Jakub Franc</p>
          <a href="https://inetio.cz" target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: FONT, color: "#444", fontSize: "0.82rem", textDecoration: "none", transition: "color 0.15s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#888")}
            onMouseLeave={e => (e.currentTarget.style.color = "#444")}>
            Vytvořilo Inetio s.r.o.
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ─────────── STICKY BOTTOM CTA (mobile) ─────────── */
function StickyCTA() {
  const [visible, setVisible] = useState(false);
  const shown = useRef(false);

  if (typeof window !== "undefined") {
    if (!shown.current) {
      shown.current = true;
      setTimeout(() => setVisible(true), 2000);
    }
  }

  if (!visible) return null;
  return (
    <>
      <style>{`@media (min-width: 768px) { #sticky-cta { display: none !important; } }`}</style>
      <div id="sticky-cta" style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: C.orange, padding: "10px 16px", display: "flex", gap: "8px", zIndex: 1000, boxShadow: "0 -4px 20px rgba(0,0,0,0.4)" }}>
        <a href="#kontakt" style={{ ...btnOrange, flex: 1, fontSize: "0.9rem", padding: "12px 16px", background: C.white, color: C.orange, fontWeight: 800 }}>
          Zarezervovat termín
        </a>
        <a href="tel:+420601269600" style={{ ...btnOrange, padding: "12px 20px", fontSize: "0.9rem", background: "rgba(0,0,0,0.2)" }}>
          📞
        </a>
      </div>
    </>
  );
}

/* ─────────── PAGE ─────────── */
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
