"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Zap, Fuel, ShieldCheck, Clock, Leaf, Wrench,
  MapPin, Phone, Mail, ArrowRight, CheckCircle2,
  Star, Menu, X, ChevronDown,
} from "lucide-react";

/* ── PALETTE ── */
const C = {
  navy:    "#0d3a79",
  navyDk:  "#092d62",
  lime:    "#8cc63f",
  limeDk:  "#6fa32e",
  white:   "#ffffff",
  offWhite:"#f4f5f7",
  gray:    "#e8eaed",
  textDk:  "#111827",
  textMd:  "#374151",
  textLt:  "#6b7280",
  border:  "#d1d5db",
};
const FONT = "var(--font-dm), 'DM Sans', system-ui, sans-serif";

/* ── SHARED STYLES ── */
const S = {
  tag:    { fontFamily: FONT, fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, display: "block", marginBottom: "10px" },
  h2:     { fontFamily: FONT, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 700, letterSpacing: "-0.8px", lineHeight: 1.15, margin: 0 },
  sub:    { fontFamily: FONT, fontSize: "1rem", lineHeight: 1.75, color: C.textMd, marginTop: "14px", fontWeight: 400 },
  divider:{ width: "32px", height: "3px", background: C.lime, display: "block", margin: "14px 0 0" },
};
const btnPrimary: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", gap: "8px",
  background: C.lime, color: C.white,
  fontFamily: FONT, fontWeight: 600, fontSize: "0.9rem",
  padding: "13px 24px", border: "none", cursor: "pointer",
  textDecoration: "none", transition: "background 0.2s",
};
const btnOutline: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", gap: "8px",
  background: "transparent", color: C.white,
  fontFamily: FONT, fontWeight: 600, fontSize: "0.9rem",
  padding: "12px 24px", border: "1.5px solid rgba(255,255,255,0.35)",
  cursor: "pointer", textDecoration: "none", transition: "border-color 0.2s",
};

/* ── DATA ── */
const PRICING = [
  { vol: "do 1 300 cm³", price: "2 690", time: "50 min" },
  { vol: "do 1 900 cm³", price: "2 990", time: "60 min", popular: true },
  { vol: "do 2 500 cm³", price: "3 290", time: "70 min", best: true },
  { vol: "do 5 000 cm³", price: "3 990", time: "80 min" },
  { vol: "nad 5 000 cm³", price: "5 990", time: "120 min" },
];
const BENEFITS = [
  { icon: <Fuel size={22}/>, title: "Spotřeba klesne", desc: "Čistý motor spaluje efektivněji. Zákazníci hlásí úsporu až 1 litr na 100 km hned po první dekarbonizaci." },
  { icon: <Zap size={22}/>, title: "Výkon jako z výroby", desc: "Uhlíkové nánosy brzdí motor. Po jejich odstranění se výkon i akcelerace vrátí na tovární hodnoty." },
  { icon: <Wrench size={22}/>, title: "Levnější provoz", desc: "Čisté vstřikovače, ventily a DPF filtr se opotřebovávají mnohem pomaleji. Ušetříte na opravách." },
  { icon: <Leaf size={22}/>, title: "Bez starostí u STK", desc: "Snížíme emise škodlivin tak, aby váš vůz emisní kontrolou prošel bez problémů." },
];
const LOCATIONS = [
  {
    city: "Liberec",
    address: "Tanvaldská 1458, Liberec",
    phone: "+420 792 767 337",
    email: "objednavky@bezkarbonu.cz",
    hours: "Po–Pá: 8:00–18:00",
    note: "Nutné objednat se předem",
    img: "https://www.bezkarbonu.cz/wp-content/uploads/2023/06/VW-Golf-na-dekarbonizaci-1-500x499.jpg",
  },
  {
    city: "České Budějovice",
    address: "Rudolfovská tř. 612, České Budějovice",
    phone: "+420 792 767 337",
    email: "objednavky@bezkarbonu.cz",
    hours: "Po–Pá: 8:00–18:00",
    note: "Nutné objednat se předem",
    img: "https://www.bezkarbonu.cz/wp-content/uploads/2025/05/Ford-Mondeo-mk4-800x533-1.webp",
  },
];
const FAQS = [
  { q: "Jak poznám, že můj motor potřebuje dekarbonizaci?", a: "Nejčastější signály jsou: zvýšená spotřeba paliva, slabší akcelerace, tmavý výfuk nebo obtížné studené startování. Pokud ale žádný příznak nemáte, nevadí — doporučujeme ji preventivně každých 15 000–25 000 km, aby k těmto problémům vůbec nedošlo." },
  { q: "Je vodíková metoda opravdu bezpečná?", a: "Ano, vodíková dekarbonizace je nejšetrnější dostupná metoda. Pracuje pouze s vodíko-kyslíkovou směsí — bez jakýchkoliv chemikálií. Na konci procesu zbyde jen voda a CO₂. Motor zůstane netknutý, olej nevyměňujete." },
  { q: "Jak dlouho budu čekat?", a: "Záleží na objemu motoru. Počítejte s 50 minutami u malých motorů, u větších až 2 hodiny. Celou dobu počkáte přímo u nás — nabídneme vám kávu." },
  { q: "Poznám výsledek ihned?", a: "Většina zákazníků odchází s tišším motorem a lepší odezvou na plyn. Pokles spotřeby se projeví při příštích tankováních — obvykle do 100–200 km." },
  { q: "Jak se objednám?", a: "Zavolejte nám, napište e-mail nebo vyplňte formulář níže. Ozveme se do 24 hodin a domluvíme termín, který vám vyhovuje. Fungujeme výhradně na objednání." },
  { q: "Pro jaká auta to funguje?", a: "Pro všechna vozidla s benzínovým, dieselovým nebo hybridním motorem. Sloužíme osobním autům, dodávkám i firemním flotilám. Nevhodné pouze pro čistě elektrická vozidla." },
];
const REVIEWS = [
  { name: "Martin N.", text: "Byl jsem skeptický, ale po dekarbonizaci motor nastartoval jako nový. Cukání zmizelo úplně. Přišel jsem i s druhým autem.", initials: "MN", img: "https://www.bezkarbonu.cz/wp-content/uploads/2023/11/IMG_5720-2-500x467.jpg" },
  { name: "Petra K.", text: "Rychlá obsluha, příjemné prostředí a okamžitě znatelný výsledek. Motor je výrazně tišší a auto táhne líp. Doporučuju všem.", initials: "PK", img: "https://www.bezkarbonu.cz/wp-content/uploads/2023/11/IMG_5725-2-1-500x597.jpg" },
  { name: "Tomáš H.", text: "Spotřeba klesla o skoro litr na stovce. Za cenu jedné dekarbonizace se mi to vrátí do půl roku. Škoda, že jsem to neudělal dřív.", initials: "TH", img: "https://www.bezkarbonu.cz/wp-content/uploads/2023/10/IMG_6455-500x667.jpeg" },
];

/* ─────────────────────── LOGO COMPONENT ─────────────────────── */
function Logo() {
  return (
    <div className="flex items-center gap-2">
      {/* Načtení SVG ikony ze složky public */}
      <Image 
        src="/icon-logo.svg" 
        alt="Logo" 
        width={28} 
        height={28} 
        className="flex-shrink-0 shadow-sm"
      />
      
      {/* Tvůj původní text zůstává nedotčený */}
      <span className="font-extrabold text-lg tracking-tight" style={{ fontFamily: FONT }}>
        <span className="text-white">Čištění</span>
        <span className="text-[#8cc63f]">Vodíkem</span>
      </span>
    </div>
  );
}

/* ─────────────────────── NAVBAR ─────────────────────── */
function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "O službě", href: "#about" },
    { label: "Ceník", href: "#pricing" },
    { label: "Pobočky", href: "#locations" },
    { label: "Kontakt", href: "#contact" },
  ];
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: C.navyDk, borderBottom: `3px solid ${C.lime}` }}>
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-8" style={{ height: "60px" }}>
        
        <a href="#" style={{ textDecoration: "none" }}>
          <Logo />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.875rem", fontWeight: 500, textDecoration: "none", fontFamily: FONT, transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}>
              {l.label}
            </a>
          ))}
        </div>

        <a href="tel:+420792767337" className="hidden md:flex items-center gap-2"
          style={{ background: C.lime, color: "#fff", fontWeight: 600, fontSize: "0.875rem", padding: "8px 16px", textDecoration: "none", fontFamily: FONT, transition: "background 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.background = C.limeDk)}
          onMouseLeave={e => (e.currentTarget.style.background = C.lime)}>
          <Phone size={13} /> +420 792 767 337
        </a>

        <button className="md:hidden" onClick={() => setOpen(!open)}
          style={{ background: "none", border: "none", color: "white", cursor: "pointer", padding: "4px" }}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div style={{ background: C.navyDk, borderTop: "1px solid rgba(255,255,255,0.08)", padding: "20px 16px", display: "flex", flexDirection: "column", gap: "16px" }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              style={{ color: "rgba(255,255,255,0.7)", fontSize: "1rem", fontWeight: 500, textDecoration: "none", fontFamily: FONT }}>
              {l.label}
            </a>
          ))}
          <a href="tel:+420792767337" style={{ ...btnPrimary, justifyContent: "center", marginTop: "8px" }}>
            <Phone size={13}/> +420 792 767 337
          </a>
          <a href="#contact" onClick={() => setOpen(false)} style={{ ...btnOutline, justifyContent: "center", borderColor: "rgba(255,255,255,0.25)" }}>
            Objednat termín
          </a>
        </div>
      )}
    </nav>
  );
}

/* ─────────────────────── HERO ─────────────────────── */
function Hero() {
  return (
    <section id="hero" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: "60px", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0 }}>
        <Image
          src="https://www.bezkarbonu.cz/wp-content/themes/bezkarbonu/assets/img/backgrounds/2024-04-25_hp-hero-bg-small.avif"
          alt="" fill style={{ objectFit: "cover", objectPosition: "center" }} unoptimized priority
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, rgba(9,45,98,0.95) 0%, rgba(9,45,98,0.82) 55%, rgba(9,45,98,0.55) 100%)" }} />
      </div>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "4px", background: C.lime }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 w-full relative" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 lg:gap-12 items-center">

          {/* Left — copy */}
          <div>
            <span style={{ ...S.tag, color: C.lime }}>Liberec &amp; České Budějovice</span>
            <div style={{ width: "40px", height: "3px", background: C.lime, marginBottom: "20px" }} />
            <h1 style={{ fontFamily: FONT, fontSize: "clamp(2.2rem, 5.5vw, 4.2rem)", fontWeight: 700, color: "#fff", lineHeight: 1.1, letterSpacing: "-1.5px", margin: 0 }}>
              Váš motor si zaslouží<br />
              <span style={{ color: C.lime }}>fungovat naplno</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "clamp(0.95rem, 2vw, 1.1rem)", lineHeight: 1.75, marginTop: "20px", maxWidth: "520px" }}>
              Vodíková dekarbonizace obnoví výkon, sníží spotřebu a prodlouží životnost motoru. Bez demontáže, bez chemikálií — za 50–80 minut.
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              <a href="#contact" style={btnPrimary}
                onMouseEnter={e => (e.currentTarget.style.background = C.limeDk)}
                onMouseLeave={e => (e.currentTarget.style.background = C.lime)}>
                Objednat termín <ArrowRight size={15}/>
              </a>
              <a href="#pricing" style={btnOutline}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.7)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)")}>
                Zobrazit ceny
              </a>
            </div>

            <div className="flex flex-wrap gap-6 sm:gap-8 mt-10 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}>
              {[
                { num: "50–80 min", label: "procedura" },
                { num: "5 + let", label: "zkušeností" },
                { num: "100%", label: "bez chemikálií" },
              ].map((s, i) => (
                <div key={s.label} style={{ paddingRight: i < 2 ? "20px" : "0", borderRight: i < 2 ? "1px solid rgba(255,255,255,0.12)" : "none" }}>
                  <div style={{ fontFamily: FONT, fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.5px" }}>{s.num}</div>
                  <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" as const, letterSpacing: "0.08em", marginTop: "2px" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — quick callback form, hidden on mobile */}
          <div className="hidden lg:block" style={{ background: "rgba(9,45,98,0.9)", border: "1px solid rgba(255,255,255,0.1)", padding: "28px 24px", borderTop: `3px solid ${C.lime}` }}>
            <h3 style={{ fontFamily: FONT, color: "#fff", fontWeight: 600, fontSize: "1.05rem", letterSpacing: "-0.3px", marginBottom: "6px" }}>Zavoláme vám zpět</h3>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.82rem", marginBottom: "20px", lineHeight: 1.6 }}>Vyplňte číslo a ozveme se do 2 hodin v pracovní době.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {["Vaše jméno", "Telefonní číslo"].map((ph) => (
                <input key={ph} type={ph.includes("číslo") ? "tel" : "text"} placeholder={ph}
                  style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", padding: "10px 12px", color: "#fff", fontFamily: FONT, fontSize: "0.875rem", outline: "none", width: "100%" }} />
              ))}
              <select style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", padding: "10px 12px", color: "#fff", fontFamily: FONT, fontSize: "0.875rem", outline: "none", width: "100%", cursor: "pointer" }}>
                <option value="">Pobočka</option>
                <option>Liberec</option>
                <option>České Budějovice</option>
              </select>
              <button style={{ ...btnPrimary, justifyContent: "center", marginTop: "2px", width: "100%" }}>Chci být kontaktován</button>
            </div>
            <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.68rem", marginTop: "10px", lineHeight: 1.6 }}>Odesláním souhlasíte se zpracováním osobních údajů.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── TRUST BAR ─────────────────────── */
function TrustBar() {
  const items = ["5+ let na trhu", "Vodíková HHO technologie", "Diagnostika zdarma", "Benzín · Diesel · Hybrid", "Bez demontáže motoru"];
  return (
    <div style={{ background: C.navy, borderBottom: `3px solid ${C.limeDk}` }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-8 flex flex-wrap justify-center">
        {items.map((item, i) => (
          <div key={item} className="flex items-center gap-2" style={{ padding: "13px 16px", borderRight: i < items.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
            <div style={{ width: "5px", height: "5px", background: C.lime, flexShrink: 0 }} />
            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.75rem", fontWeight: 500, whiteSpace: "nowrap", fontFamily: FONT }}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────── BENEFITS ─────────────────────── */
function Benefits() {
  return (
    <section id="about" className="py-16 lg:py-24" style={{ background: C.white }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Left */}
          <div>
            <span style={{ ...S.tag, color: C.navy }}>Co získáte</span>
            <h2 style={{ ...S.h2, color: C.textDk }}>Čtyři důvody, proč to má smysl</h2>
            <div style={S.divider} />
            <p style={{ ...S.sub, maxWidth: "460px" }}>
              Uhlíkové usazeniny se v motoru hromadí od prvního dne. Čím déle čekáte, tím víc vás to stojí — vyšší spotřeba, slabší výkon, dražší opravy.
            </p>

            <div className="mt-8">
              <Image
                src="https://www.bezkarbonu.cz/wp-content/uploads/2025/05/Ford-Mondeo-mk4-800x533-1.webp"
                alt="Výsledky dekarbonizace motoru"
                width={540} height={360}
                style={{ width: "100%", height: "auto", display: "block" }}
                unoptimized
              />
              <div style={{ background: C.lime, padding: "13px 18px", display: "flex", alignItems: "center", gap: "10px" }}>
                <ShieldCheck size={17} style={{ color: "#fff", flexShrink: 0 }} />
                <span style={{ color: "#fff", fontWeight: 600, fontSize: "0.875rem", fontFamily: FONT }}>Základní diagnostika vozidla ZDARMA ke každé zakázce</span>
              </div>
            </div>
          </div>

          {/* Right — 4 benefit cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ background: C.gray }}>
            {BENEFITS.map((b, i) => (
              <div key={b.title} style={{ background: C.white, padding: "28px 22px", borderTop: `3px solid ${i < 2 ? C.navy : C.lime}` }}>
                <div style={{ color: C.navy, marginBottom: "12px" }}>{b.icon}</div>
                <h3 style={{ fontFamily: FONT, fontSize: "1rem", fontWeight: 600, color: C.textDk, marginBottom: "8px", letterSpacing: "-0.2px" }}>{b.title}</h3>
                <p style={{ fontSize: "0.875rem", color: C.textMd, lineHeight: 1.65, fontFamily: FONT }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── HOW IT WORKS ─────────────────────── */
function HowItWorks() {
  return (
    <section className="py-16 lg:py-24" style={{ background: C.navy }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <span style={{ ...S.tag, color: C.lime }}>Jak to funguje</span>
            <h2 style={{ ...S.h2, color: C.white }}>Vodík vyčistí, co chemie neumí</h2>
            <div style={{ ...S.divider }} />
            <p style={{ ...S.sub, color: "rgba(255,255,255,0.65)" }}>
              Stroj generuje vodíko-kyslíkovou směs (HHO), která vstoupí do sání motoru. Při spalování se spojí s uhlíkovými usazeninami a rozloží je — výsledkem je jen voda a CO₂. Žádné chemikálie, žádné riziko.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              {[
                "Žádná demontáž ani výměna oleje",
                "Vhodné pro benzín, diesel i hybridní motory",
                "Preventivně každých 15 000–25 000 km",
                "30 až 120 minut — počkáte přímo u nás",
                "Certifikovaní technici, moderní vybavení",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div style={{ width: "17px", height: "17px", background: C.lime, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                    <span style={{ color: "#fff", fontSize: "0.6rem", fontWeight: 700 }}>✓</span>
                  </div>
                  <span style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.65, fontFamily: FONT }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Image
              src="https://www.bezkarbonu.cz/wp-content/uploads/2023/06/zakarbonovany-egr-ventil-115_1920-500x251.jpg"
              alt="Zakarbonatovaný EGR ventil před a po dekarbonizaci"
              width={540} height={270}
              style={{ width: "100%", height: "auto", display: "block", borderLeft: `4px solid ${C.lime}` }}
              unoptimized
            />
            <div className="grid grid-cols-2 gap-px mt-px" style={{ background: "rgba(255,255,255,0.08)" }}>
              {[
                { num: "0", label: "chemikálií použito" },
                { num: "30–60 min", label: "a hotovo" },
              ].map((s) => (
                <div key={s.label} style={{ background: C.navyDk, padding: "20px 24px" }}>
                  <div style={{ fontFamily: FONT, fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, color: C.lime, letterSpacing: "-1px" }}>{s.num}</div>
                  <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" as const, letterSpacing: "0.08em", marginTop: "3px", fontFamily: FONT }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── PRICING ─────────────────────── */
function Pricing() {
  return (
    <section id="pricing" className="py-16 lg:py-24" style={{ background: C.offWhite }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="flex flex-wrap justify-between items-end gap-6 mb-10">
          <div>
            <span style={{ ...S.tag, color: C.navy }}>Ceník</span>
            <h2 style={{ ...S.h2, color: C.textDk }}>Transparentní ceny, žádná překvapení</h2>
            <div style={S.divider} />
          </div>
          <p style={{ fontFamily: FONT, fontSize: "0.875rem", color: C.textLt, maxWidth: "340px", lineHeight: 1.7 }}>
            Objem motoru najdete v technickém průkazu pod "zdvihový objem".
          </p>
        </div>

        {/* Desktop table — hidden on mobile */}
        <div className="hidden sm:block" style={{ border: `1px solid ${C.border}`, background: C.white }}>
          <div className="grid" style={{ gridTemplateColumns: "1fr 1fr 100px 1fr", background: C.navy, padding: "12px 24px" }}>
            {["Objem motoru", "Cena s DPH", "Čas", ""].map((h) => (
              <div key={h} style={{ fontSize: "0.72rem", fontWeight: 500, color: "rgba(255,255,255,0.5)", fontFamily: FONT }}>{h}</div>
            ))}
          </div>
          {PRICING.map((tier, i) => (
            <div key={tier.vol} className="grid items-center" style={{
              gridTemplateColumns: "1fr 1fr 100px 1fr",
              padding: "18px 24px",
              borderBottom: i < PRICING.length - 1 ? `1px solid ${C.border}` : "none",
              background: tier.best ? "rgba(140,198,63,0.05)" : i % 2 === 0 ? C.white : "#fafbfc",
              borderLeft: tier.best ? `4px solid ${C.lime}` : "4px solid transparent",
            }}>
              <div style={{ fontSize: "0.95rem", fontWeight: 500, color: C.textDk, fontFamily: FONT }}>{tier.vol}</div>
              <div style={{ fontFamily: FONT, fontSize: "1.5rem", fontWeight: 700, color: tier.best ? C.lime : C.navy, letterSpacing: "-0.5px" }}>
                {tier.price} <span style={{ fontSize: "0.85rem", fontWeight: 400, color: C.textLt }}>Kč</span>
              </div>
              <div className="flex items-center gap-1" style={{ fontSize: "0.82rem", color: C.textLt, fontFamily: FONT }}>
                <Clock size={12}/> {tier.time}
              </div>
              <div className="flex gap-2">
                {tier.best && <span style={{ background: C.lime, color: "#fff", fontSize: "0.65rem", fontWeight: 600, padding: "3px 9px", fontFamily: FONT }}>Nejprodávanější</span>}
                {tier.popular && !tier.best && <span style={{ border: `1px solid ${C.navy}`, color: C.navy, fontSize: "0.65rem", fontWeight: 600, padding: "3px 9px", fontFamily: FONT }}>Oblíbené</span>}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile cards */}
        <div className="sm:hidden grid grid-cols-1 gap-2">
          {PRICING.map((tier) => (
            <div key={tier.vol} style={{
              background: tier.best ? C.lime : C.white,
              border: `1px solid ${tier.best ? C.lime : C.border}`,
              borderLeft: tier.best ? `4px solid ${C.limeDk}` : `4px solid ${C.border}`,
              padding: "16px 18px",
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <div>
                <div style={{ fontSize: "0.75rem", color: tier.best ? "rgba(255,255,255,0.7)" : C.textLt, fontFamily: FONT }}>Motor {tier.vol}</div>
                {tier.best && <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.8)", fontFamily: FONT, marginTop: "2px" }}>✓ Nejprodávanější</div>}
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: FONT, fontSize: "1.4rem", fontWeight: 700, color: tier.best ? "#fff" : C.navy, letterSpacing: "-0.5px" }}>
                  {tier.price} Kč
                </div>
                <div style={{ fontSize: "0.72rem", color: tier.best ? "rgba(255,255,255,0.6)" : C.textLt, fontFamily: FONT }}>{tier.time}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          <div style={{ background: C.white, border: `1px solid ${C.border}`, borderLeft: `4px solid ${C.lime}`, padding: "15px 18px", fontSize: "0.875rem", color: C.textMd, lineHeight: 1.65, fontFamily: FONT }}>
            🎁 <strong style={{ color: C.textDk }}>Diagnostika zdarma</strong> (hodnota 300 Kč) ke každé dekarbonizaci. Ozón dezinfekce interiéru za příplatek 500 Kč.
          </div>
          <div style={{ background: C.white, border: `1px solid ${C.border}`, borderLeft: `4px solid ${C.navy}`, padding: "15px 18px", fontSize: "0.875rem", color: C.textMd, lineHeight: 1.65, fontFamily: FONT }}>
            Spravujete firemní flotilu?{" "}<a href="#contact" style={{ color: C.navy, fontWeight: 600, textDecoration: "none" }}>Vyžádejte B2B ceník</a>{" "}— tarify bez DPH pro pravidelné zákazníky.
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── WHEN TO SERVICE ─────────────────────── */
function WhenToService() {
  const items = [
    { num: "01", title: "Každých 15–25 tis. km", desc: "Preventivní interval pro benzínové motory. Diesel doporučujeme max. po 20 000 km. Nečekejte na problémy." },
    { num: "02", title: "Koupili jste ojeté auto", desc: "Nevíte, jak předchozí majitel pečoval o motor. Dekarbonizace je nejlepší způsob, jak začít s čistým štítem." },
    { num: "03", title: "Motor jezdí hůř než dřív", desc: "Pokles výkonu, vyšší spotřeba nebo tmavý výfuk — to jsou jasné signály, že motor volá o pomoc." },
    { num: "04", title: "Jezdíte hlavně ve městě", desc: "Krátké jízdy a nízké otáčky usazeniny tvoří rychleji. Interval zkraťte na 12–15 000 km." },
  ];
  return (
    <section className="py-16 lg:py-24" style={{ background: C.white }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="flex flex-wrap justify-between items-end gap-6 mb-10">
          <div>
            <span style={{ ...S.tag, color: C.navy }}>Kdy přijet</span>
            <h2 style={{ ...S.h2, color: C.textDk }}>Nemusíte čekat na poruchu</h2>
            <div style={S.divider} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: C.gray }}>
          {items.map((item) => (
            <div key={item.num} className="group" style={{ background: C.white, padding: "28px 22px", borderBottom: `3px solid transparent`, transition: "border-color 0.25s", cursor: "default" }}
              onMouseEnter={e => (e.currentTarget.style.borderBottomColor = C.lime)}
              onMouseLeave={e => (e.currentTarget.style.borderBottomColor = "transparent")}>
              <div style={{ fontFamily: FONT, fontSize: "2.5rem", fontWeight: 700, color: C.gray, lineHeight: 1, marginBottom: "14px", userSelect: "none" as const }}>{item.num}</div>
              <h3 style={{ fontFamily: FONT, fontSize: "0.95rem", fontWeight: 600, color: C.textDk, letterSpacing: "-0.2px", marginBottom: "8px" }}>{item.title}</h3>
              <p style={{ fontSize: "0.855rem", color: C.textMd, lineHeight: 1.65, fontFamily: FONT }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── LOCATIONS ─────────────────────── */
function Locations() {
  return (
    <section id="locations" className="py-16 lg:py-24" style={{ background: C.offWhite }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <span style={{ ...S.tag, color: C.navy }}>Kde nás najdete</span>
        <h2 style={{ ...S.h2, color: C.textDk }}>Dvě pobočky, jedno číslo</h2>
        <div style={S.divider} />
        <p style={{ ...S.sub, marginBottom: "40px", maxWidth: "480px" }}>
          Liberec a České Budějovice. Stačí zavolat nebo vyplnit formulář — domluvíme termín do 24 hodin.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: C.gray }}>
          {LOCATIONS.map((loc) => (
            <div key={loc.city} style={{ background: C.white }}>
              <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
                <Image src={loc.img} alt={`Pobočka ${loc.city}`} fill style={{ objectFit: "cover" }} unoptimized />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(9,45,98,0.65) 0%, transparent 55%)" }} />
                <div style={{ position: "absolute", bottom: "14px", left: "18px" }}>
                  <h3 style={{ fontFamily: FONT, color: "#fff", fontSize: "1.4rem", fontWeight: 700, letterSpacing: "-0.5px", margin: 0 }}>{loc.city}</h3>
                </div>
              </div>
              <div style={{ padding: "24px", borderTop: `4px solid ${C.navy}` }}>
                <div className="flex flex-col gap-3 mb-5">
                  {[
                    { icon: <MapPin size={14}/>, val: loc.address },
                    { icon: <Phone size={14}/>, val: loc.phone, href: `tel:${loc.phone.replace(/\s/g,"")}` },
                    { icon: <Mail size={14}/>, val: loc.email, href: `mailto:${loc.email}` },
                    { icon: <Clock size={14}/>, val: loc.hours, sub: loc.note },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3" style={{ fontSize: "0.875rem", color: C.textMd, fontFamily: FONT }}>
                      <span style={{ color: C.navy, flexShrink: 0, marginTop: "2px" }}>{item.icon}</span>
                      {item.href
                        ? <a href={item.href} style={{ color: C.textMd, textDecoration: "none" }}
                            onMouseEnter={e => (e.currentTarget.style.color = C.navy)}
                            onMouseLeave={e => (e.currentTarget.style.color = C.textMd)}>{item.val}</a>
                        : <div>{item.val}{item.sub && <div style={{ fontSize: "0.75rem", color: C.textLt, marginTop: "1px" }}>{item.sub}</div>}</div>
                      }
                    </div>
                  ))}
                </div>
                <a href="#contact" style={btnPrimary}
                  onMouseEnter={e => (e.currentTarget.style.background = C.limeDk)}
                  onMouseLeave={e => (e.currentTarget.style.background = C.lime)}>
                  Objednat v {loc.city} <ArrowRight size={13}/>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── REVIEWS ─────────────────────── */
function Reviews() {
  return (
    <section className="py-16 lg:py-24" style={{ background: C.navy }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 lg:gap-16 items-start">
          <div>
            <span style={{ ...S.tag, color: C.lime }}>Zákazníci</span>
            <h2 style={{ ...S.h2, color: C.white }}>Co říkají ti, kteří to zkusili</h2>
            <div style={{ ...S.divider }} />
            <p style={{ ...S.sub, color: "rgba(255,255,255,0.55)" }}>
              Přes 500 spokojených zákazníků. Průměrné hodnocení 4,9 z 5 na Google.
            </p>
            <div className="flex items-center gap-1 mt-5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} style={{ color: "#f59e0b", fill: "#f59e0b" }} />
              ))}
              <span style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.82rem", marginLeft: "8px", fontFamily: FONT }}>4,9 / 5</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-px" style={{ background: "rgba(255,255,255,0.06)" }}>
            {REVIEWS.map((r) => (
              <div key={r.name} className="flex flex-col sm:flex-row gap-4 items-start" style={{ background: C.navyDk, padding: "22px 24px" }}>
                <div style={{ width: "48px", height: "48px", flexShrink: 0, overflow: "hidden", position: "relative" }}>
                  <Image src={r.img} alt={r.name} fill style={{ objectFit: "cover" }} unoptimized />
                </div>
                <div>
                  <div className="flex gap-0.5 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={11} style={{ color: "#f59e0b", fill: "#f59e0b" }} />
                    ))}
                  </div>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "10px", fontStyle: "italic", fontFamily: FONT }}>&ldquo;{r.text}&rdquo;</p>
                  <div style={{ fontSize: "0.78rem", fontWeight: 600, color: "rgba(255,255,255,0.45)", fontFamily: FONT }}>
                    {r.name} &mdash; <span style={{ color: C.lime }}>Google recenze</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── FAQ ─────────────────────── */
function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="py-16 lg:py-24" style={{ background: C.white }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-8 lg:gap-16 items-start">
          <div>
            <span style={{ ...S.tag, color: C.navy }}>Časté otázky</span>
            <h2 style={{ ...S.h2, color: C.textDk }}>Máte dotazy? Máme odpovědi.</h2>
            <div style={S.divider} />
            <p style={{ ...S.sub }}>Nenašli jste co hledáte? Zavolejte nebo napište — odpovíme rychle a bez obchodního tlaku.</p>
            <a href="#contact" className="inline-flex mt-8" style={btnPrimary}
              onMouseEnter={e => (e.currentTarget.style.background = C.limeDk)}
              onMouseLeave={e => (e.currentTarget.style.background = C.lime)}>
              Napsat dotaz
            </a>
          </div>

          <div>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                <button onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex justify-between items-center gap-4 text-left py-4"
                  style={{ background: "none", border: "none", cursor: "pointer", fontFamily: FONT }}>
                  <span style={{ fontSize: "0.95rem", fontWeight: 600, color: open === i ? C.navy : C.textDk }}>{faq.q}</span>
                  <ChevronDown size={17} style={{ color: C.navy, flexShrink: 0, transform: open === i ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.25s" }} />
                </button>
                {open === i && (
                  <div style={{ paddingBottom: "18px", fontSize: "0.875rem", color: C.textMd, lineHeight: 1.75, fontFamily: FONT }}>{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── CONTACT FORM ─────────────────────── */
function ContactForm() {
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const field: React.CSSProperties = {
    width: "100%", background: C.white, border: `1.5px solid ${C.border}`,
    padding: "11px 13px", fontFamily: FONT, fontSize: "0.9rem",
    color: C.textDk, outline: "none", transition: "border-color 0.2s",
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    
    formData.append("access_key", "f5a890ca-be50-4128-b31d-dd19d00053f0");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setSent(true); 
      } else {
        alert('Něco se pokazilo při odesílání. Zkuste to prosím znovu.');
      }
    } catch (error) {
      alert('Chyba připojení. Zkontrolujte svůj internet a zkuste to znovu.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 lg:py-24" style={{ background: C.offWhite }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-16 items-start">

          {/* Left */}
          <div>
            <span style={{ ...S.tag, color: C.navy }}>Kontakt</span>
            <h2 style={{ ...S.h2, color: C.textDk }}>Objednejte se ještě dnes</h2>
            <div style={S.divider} />
            <p style={{ ...S.sub }}>
              Vyplňte formulář, zavolejte nebo napište e-mail. Termín domluvíme do 24 hodin — bez závazků.
            </p>
            <div className="flex flex-col gap-4 mt-8">
              {[
                { icon: <Phone size={16}/>, label: "Telefon", val: "+420 792 767 337", href: "tel:+420792767337" },
                { icon: <Mail size={16}/>, label: "E-mail", val: "objednavky@bezkarbonu.cz", href: "mailto:objednavky@bezkarbonu.cz" },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-3">
                  <div style={{ width: "38px", height: "38px", background: C.navy, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", flexShrink: 0 }}>{c.icon}</div>
                  <div>
                    <div style={{ fontSize: "0.7rem", fontWeight: 600, color: C.textLt, textTransform: "uppercase" as const, letterSpacing: "0.08em", fontFamily: FONT }}>{c.label}</div>
                    <a href={c.href} style={{ fontSize: "0.9rem", fontWeight: 600, color: C.textDk, textDecoration: "none", fontFamily: FONT }}>{c.val}</a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div>
            {sent ? (
              <div className="text-center" style={{ background: C.white, border: `1px solid ${C.border}`, borderTop: `4px solid ${C.lime}`, padding: "48px 32px" }}>
                <CheckCircle2 size={48} style={{ color: C.lime, margin: "0 auto 16px", display: "block" }} />
                <h3 style={{ fontFamily: FONT, fontSize: "1.35rem", fontWeight: 700, letterSpacing: "-0.5px", marginBottom: "8px" }}>Zpráva odeslána!</h3>
                <p style={{ color: C.textMd, fontSize: "0.9rem", fontFamily: FONT }}>Ozveme se vám nejpozději do 24 hodin a domluvíme termín.</p>
              </div>
            ) : (
              <div style={{ background: C.white, border: `1px solid ${C.border}`, borderTop: `4px solid ${C.navy}`, padding: "28px 24px" }}>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: C.textMd, marginBottom: "5px", fontFamily: FONT }}>Jméno *</label>
                      <input name="Jmeno" required type="text" placeholder="Jan" style={field}
                        onFocus={e => (e.currentTarget.style.borderColor = C.navy)}
                        onBlur={e => (e.currentTarget.style.borderColor = C.border)} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: C.textMd, marginBottom: "5px", fontFamily: FONT }}>Příjmení *</label>
                      <input name="Prijmeni" required type="text" placeholder="Novák" style={field}
                        onFocus={e => (e.currentTarget.style.borderColor = C.navy)}
                        onBlur={e => (e.currentTarget.style.borderColor = C.border)} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: C.textMd, marginBottom: "5px", fontFamily: FONT }}>Telefon *</label>
                      <input name="Telefon" required type="tel" placeholder="+420 123 456 789" style={field}
                        onFocus={e => (e.currentTarget.style.borderColor = C.navy)}
                        onBlur={e => (e.currentTarget.style.borderColor = C.border)} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: C.textMd, marginBottom: "5px", fontFamily: FONT }}>E-mail *</label>
                      <input name="E-mail" required type="email" placeholder="jan@email.cz" style={field}
                        onFocus={e => (e.currentTarget.style.borderColor = C.navy)}
                        onBlur={e => (e.currentTarget.style.borderColor = C.border)} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: C.textMd, marginBottom: "5px", fontFamily: FONT }}>Pobočka *</label>
                    <select name="Pobocka" required style={{ ...field, cursor: "pointer" }}
                      onFocus={e => (e.currentTarget.style.borderColor = C.navy)}
                      onBlur={e => (e.currentTarget.style.borderColor = C.border)}>
                      <option value="">Vyberte pobočku...</option>
                      <option value="Liberec">Liberec — Tanvaldská 1458</option>
                      <option value="České Budějovice">České Budějovice — Rudolfovská tř. 612</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: C.textMd, marginBottom: "5px", fontFamily: FONT }}>Zpráva (nepovinné)</label>
                    <textarea name="Zprava" rows={3} placeholder="Objem motoru, preferovaný termín nebo cokoliv dalšího..." style={{ ...field, resize: "none" }}
                      onFocus={e => (e.currentTarget.style.borderColor = C.navy)}
                      onBlur={e => (e.currentTarget.style.borderColor = C.border)} />
                  </div>
                  <label className="flex items-start gap-2 cursor-pointer" style={{ fontSize: "0.78rem", color: C.textLt, lineHeight: 1.6, fontFamily: FONT }}>
                    <input required type="checkbox" style={{ marginTop: "2px", flexShrink: 0, accentColor: C.navy }} />
                    Souhlasím se zpracováním osobních údajů dle <a href="#" style={{ color: C.navy, fontWeight: 600 }}>zásad ochrany osobních údajů</a>. *
                  </label>
                  <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-2 mt-1 disabled:opacity-70 disabled:cursor-not-allowed"
                    style={{ ...btnPrimary, padding: "14px" }}
                    onMouseEnter={e => { if(!isSubmitting) e.currentTarget.style.background = C.limeDk }}
                    onMouseLeave={e => { if(!isSubmitting) e.currentTarget.style.background = C.lime }}>
                    {isSubmitting ? 'Odesílám...' : 'Odeslat zprávu'} <ArrowRight size={15}/>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── FOOTER ─────────────────────── */
function Footer() {
  return (
    <footer style={{ background: C.navyDk, borderTop: `4px solid ${C.lime}` }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-12 pb-8">
        <div className="flex flex-wrap justify-between gap-10 mb-10">
          <div>
            <div className="mb-4">
               <Logo />
            </div>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.85rem", maxWidth: "200px", lineHeight: 1.7, fontFamily: FONT }}>
              Vodíková dekarbonizace motorů. Liberec a České Budějovice. Provoz HPower s.r.o.
            </p>
          </div>
          <div className="flex flex-wrap gap-10">
            {[
              { h: "Služby", links: ["Dekarbonizace motoru", "Mobilní dekarbonizace", "Diagnostika vozidla", "B2B & flotily"] },
              { h: "Pobočky", links: ["Liberec", "České Budějovice"] },
              { h: "Info", links: ["O nás", "Ceník", "FAQ", "Ochrana osobních údajů"] },
            ].map((col) => (
              <div key={col.h}>
                <h4 style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.68rem", fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.12em", marginBottom: "14px", fontFamily: FONT }}>{col.h}</h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#" style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.85rem", textDecoration: "none", fontFamily: FONT, transition: "color 0.2s" }}
                        onMouseEnter={e => (e.currentTarget.style.color = C.white)}
                        onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}>{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap justify-between items-center gap-3 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.78rem", fontFamily: FONT }}>© 2026 cistenivodikem.cz · HPower s.r.o.</p>
          <div className="flex gap-5">
            {["Ochrana osobních údajů", "Cookies"].map((l) => (
              <a key={l} href="#" style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.78rem", textDecoration: "none", fontFamily: FONT, transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.2)")}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────── PAGE ─────────────────────── */
export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <TrustBar />
      <Benefits />
      <HowItWorks />
      <Pricing />
      <WhenToService />
      <Locations />
      <Reviews />
      <FAQ />
      <ContactForm />
      <Footer />
    </>
  );
}