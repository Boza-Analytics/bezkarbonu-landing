"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Zap, Fuel, ShieldCheck, Clock, Leaf, Wrench,
  MapPin, Phone, Mail, ArrowRight, CheckCircle2,
  Star, ChevronDown, ChevronRight,
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

const S = {
  tag:    { fontFamily: FONT, fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, display: "block", marginBottom: "10px" },
  h2:     { fontFamily: FONT, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 700, letterSpacing: "-0.8px", lineHeight: 1.15, margin: 0 },
  sub:    { fontFamily: FONT, fontSize: "1.05rem", lineHeight: 1.8, color: C.textMd, marginTop: "14px", fontWeight: 400 },
  divider:{ width: "32px", height: "3px", background: C.lime, display: "block", margin: "14px 0 0" },
};
const btnPrimary: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", gap: "8px",
  background: C.lime, color: C.white,
  fontFamily: FONT, fontWeight: 600, fontSize: "0.9rem",
  padding: "13px 24px", border: "none", cursor: "pointer",
  textDecoration: "none", transition: "background 0.2s",
};

const PRICING = [
  { label: "do 1,9 l", benzin: "2 390", diesel: "2 690", time: "50–60 min" },
  { label: "nad 2,0 l", benzin: "2 890", diesel: "3 190", time: "60–80 min" },
];

const REVIEWS = [
  { name: "Martin N.", text: "Byl jsem skeptický, ale po dekarbonizaci motor nastartoval jako nový. Cukání zmizelo úplně. Přišel jsem i s druhým autem.", initials: "MN" },
  { name: "Petra K.", text: "Rychlá obsluha, příjemné prostředí a okamžitě znatelný výsledek. Motor je výrazně tišší a auto táhne líp. Doporučuju všem.", initials: "PK" },
  { name: "Tomáš H.", text: "Spotřeba klesla o skoro litr na stovce. Za cenu jedné dekarbonizace se mi to vrátí do půl roku. Škoda, že jsem to neudělal dřív.", initials: "TH" },
];

const FAQS = [
  { q: "Jak se objednám na dekarbonizaci v Liberci?", a: "Zavolejte nám na +420 601 269 600, napište e-mail nebo vyplňte formulář níže. Ozveme se do 24 hodin a domluvíme termín, který vám vyhovuje. Fungujeme výhradně na objednání." },
  { q: "Kde přesně se pobočka v Liberci nachází?", a: "Naše liberecká pobočka sídlí na adrese Tanvaldská 1458, Liberec. Snadno dostupné z centra i okolních čtvrtí — parkování přímo u provozovny." },
  { q: "Jak dlouho vodíková dekarbonizace trvá?", a: "Záleží na objemu motoru. Počítejte s 50 minutami u malých motorů, u větších až 80 minut. Celou dobu počkáte přímo u nás." },
  { q: "Je vodíková metoda opravdu bezpečná?", a: "Ano, vodíková dekarbonizace je nejšetrnější dostupná metoda. Pracuje pouze s vodíko-kyslíkovou směsí — bez jakýchkoliv chemikálií. Na konci procesu zbyde jen voda a CO₂. Motor zůstane netknutý, olej nevyměňujete." },
  { q: "Pro jaká auta to funguje?", a: "Pro všechna vozidla s benzínovým, dieselovým nebo hybridním motorem. Sloužíme osobním autům, dodávkám i firemním flotilám. Nevhodné pouze pro čistě elektrická vozidla." },
  { q: "Poznám výsledek ihned?", a: "Většina zákazníků odchází s tišším motorem a lepší odezvou na plyn. Pokles spotřeby se projeví při příštích tankováních — obvykle do 100–200 km." },
];

function Logo() {
  return (
    <span className="font-extrabold text-lg tracking-tight" style={{ fontFamily: FONT }}>
      <span className="text-white">Čištění</span>
      <span className="text-[#8cc63f]">Vodíkem</span>
    </span>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: C.navyDk, borderBottom: `3px solid ${C.lime}` }}>
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-8" style={{ height: "60px" }}>
        <a href="/" style={{ textDecoration: "none" }}><Logo /></a>
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Hlavní stránka", href: "/" },
            { label: "O službě", href: "/#about" },
            { label: "Ceník", href: "/#pricing" },
            { label: "Kontakt", href: "#contact" },
          ].map((l) => (
            <a key={l.href} href={l.href} style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.875rem", fontWeight: 700, textDecoration: "none", fontFamily: FONT, transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}>
              {l.label}
            </a>
          ))}
        </div>
        <a href="tel:+420601269600" className="hidden md:flex items-center gap-2"
          style={{ background: C.lime, color: "#fff", fontWeight: 600, fontSize: "0.875rem", padding: "8px 16px", textDecoration: "none", fontFamily: FONT, transition: "background 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.background = C.limeDk)}
          onMouseLeave={e => (e.currentTarget.style.background = C.lime)}>
          <Phone size={13} /> +420 601 269 600
        </a>
        <button className="md:hidden" onClick={() => setOpen(!open)} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", padding: "4px" }}>
          {open ? "✕" : "☰"}
        </button>
      </div>
      {open && (
        <div style={{ background: C.navyDk, borderTop: "1px solid rgba(255,255,255,0.08)", padding: "16px" }}>
          {[
            { label: "Hlavní stránka", href: "/" },
            { label: "O službě", href: "/#about" },
            { label: "Ceník", href: "/#pricing" },
            { label: "Kontakt", href: "#contact" },
          ].map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              style={{ display: "block", color: "rgba(255,255,255,0.8)", padding: "10px 0", fontSize: "0.95rem", fontFamily: FONT, textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              {l.label}
            </a>
          ))}
          <a href="tel:+420601269600" style={{ display: "block", marginTop: "12px", ...btnPrimary, justifyContent: "center" }}>
            <Phone size={13}/> +420 601 269 600
          </a>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "88d43b16-7eeb-46ee-9c4e-3c60da81b2db");
    formData.append("subject", "Rychlá poptávka — Liberec");
    formData.append("from_name", "Čištění Vodíkem - Liberec");
    try {
      const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
      const data = await response.json();
      if (data.success) {
        setSent(true);
        if (typeof window !== "undefined" && (window as any).gtag) {
          (window as any).gtag("event", "generate_lead", { event_category: "form", event_label: "hero_liberec", send_to: "G-RNLHTENSDQ" });
          (window as any).gtag("event", "conversion", { send_to: "AW-18028160012/yuN9CJyp9oscEIzIv5RD" });
        }
      } else {
        alert("Něco se pokazilo. Zkuste to prosím znovu.");
      }
    } catch {
      alert("Chyba připojení. Zkontrolujte svůj internet a zkuste to znovu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: "60px", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0 }}>
        <Image
          src="/liberec.jpg"
          alt="Liberec — vodíková dekarbonizace motoru" fill
          style={{ objectFit: "cover", objectPosition: "center" }} priority
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, rgba(9,45,98,0.96) 0%, rgba(9,45,98,0.85) 55%, rgba(9,45,98,0.6) 100%)" }} />
      </div>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "4px", background: C.lime }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 w-full relative" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="flex items-center gap-1 mb-6" style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", fontFamily: FONT }}>
          <a href="/" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Hlavní stránka</a>
          <ChevronRight size={12} />
          <span style={{ color: "rgba(255,255,255,0.8)" }}>Dekarbonizace Liberec</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 lg:gap-12 items-center">
          <div>
            <span style={{ ...S.tag, color: C.lime }}>Vodíková dekarbonizace motoru · Liberec</span>
            <div style={{ width: "40px", height: "3px", background: C.lime, marginBottom: "20px" }} />
            <h1 style={{ fontFamily: FONT, fontSize: "clamp(2.2rem, 5.5vw, 4.2rem)", fontWeight: 700, color: "#fff", lineHeight: 1.1, letterSpacing: "-1.5px", margin: 0 }}>
              Dekarbonizace motoru<br />
              <span style={{ color: C.lime }}>přímo v Liberci</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "clamp(0.95rem, 2vw, 1.1rem)", lineHeight: 1.75, marginTop: "20px", maxWidth: "520px" }}>
              Profesionální vodíková dekarbonizace na pobočce Liberec — Tanvaldská 1458. Obnovíme výkon vašeho motoru, snížíme spotřebu a připravíme vás na STK. Bez demontáže, za 50–80 minut.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <a href="#contact" style={btnPrimary}
                onMouseEnter={e => (e.currentTarget.style.background = C.limeDk)}
                onMouseLeave={e => (e.currentTarget.style.background = C.lime)}>
                Objednat v Liberci <ArrowRight size={15}/>
              </a>
              <a href="tel:+420601269600" style={{ ...btnPrimary, background: "transparent", border: "1.5px solid rgba(255,255,255,0.35)" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.7)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)")}>
                <Phone size={14}/> Zavolat
              </a>
            </div>
            <div className="flex flex-wrap gap-6 sm:gap-8 mt-10 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}>
              {[
                { num: "50–80 min", label: "procedura" },
                { num: "Po–Pá", label: "8:00–16:00" },
                { num: "100%", label: "bez chemikálií" },
              ].map((s, i) => (
                <div key={s.label} style={{ paddingRight: i < 2 ? "20px" : "0", borderRight: i < 2 ? "1px solid rgba(255,255,255,0.12)" : "none" }}>
                  <div style={{ fontFamily: FONT, fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.5px" }}>{s.num}</div>
                  <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" as const, letterSpacing: "0.08em", marginTop: "2px" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block" style={{ background: "rgba(9,45,98,0.9)", border: "1px solid rgba(255,255,255,0.1)", padding: "28px 24px", borderTop: `3px solid ${C.lime}` }}>
            {sent ? (
              <div className="py-10 text-center text-white">
                <CheckCircle2 size={40} style={{ color: C.lime, margin: "0 auto 16px" }} />
                <h3 className="font-bold text-lg">Děkujeme!</h3>
                <p className="opacity-70 text-sm mt-2">Ozveme se vám do 2 hodin.</p>
              </div>
            ) : (
              <>
                <h3 style={{ fontFamily: FONT, color: "#fff", fontWeight: 600, fontSize: "1.05rem", letterSpacing: "-0.3px", marginBottom: "6px" }}>Zavoláme vám zpět</h3>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.82rem", marginBottom: "20px", lineHeight: 1.6 }}>Vyplňte číslo a ozveme se do 2 hodin v pracovní době.</p>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />
                  <input name="Pobocka" type="hidden" value="Liberec" />
                  <input name="Jmeno" required type="text" placeholder="Vaše jméno"
                    style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", padding: "10px 12px", color: "#fff", fontFamily: FONT, fontSize: "0.875rem", outline: "none", width: "100%" }} />
                  <input name="Telefon" required type="tel" placeholder="Telefonní číslo"
                    style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", padding: "10px 12px", color: "#fff", fontFamily: FONT, fontSize: "0.875rem", outline: "none", width: "100%" }} />
                  <button type="submit" disabled={isSubmitting}
                    style={{ ...btnPrimary, justifyContent: "center", marginTop: "2px", width: "100%", opacity: isSubmitting ? 0.7 : 1 }}>
                    {isSubmitting ? "Odesílám..." : "Chci být kontaktován"}
                  </button>
                </form>
                <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.68rem", marginTop: "10px", lineHeight: 1.6 }}>Odesláním souhlasíte se zpracováním osobních údajů.</p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function LocationInfo() {
  return (
    <section style={{ background: C.navy, padding: "40px 0" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: <MapPin size={18}/>, title: "Adresa pobočky", val: "Tanvaldská 1458, Liberec", sub: "Parkování přímo u provozovny", href: "https://maps.google.com/?q=Tanvaldsk%C3%A1+1458,+Liberec" },
            { icon: <Clock size={18}/>, title: "Otevírací doba", val: "Po–Pá: 8:00–16:00", sub: "Výhradně na objednání" },
            { icon: <Phone size={18}/>, title: "Telefonní kontakt", val: "+420 601 269 600", sub: "Odpovíme do 24 hodin", href: "tel:+420601269600" },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-4">
              <div style={{ width: "44px", height: "44px", background: C.lime, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", flexShrink: 0 }}>{item.icon}</div>
              <div>
                <div style={{ fontFamily: FONT, fontSize: "0.7rem", fontWeight: 700, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px" }}>{item.title}</div>
                {item.href
                  ? <a href={item.href} style={{ fontFamily: FONT, fontSize: "1rem", fontWeight: 600, color: C.white, textDecoration: "none" }}>{item.val}</a>
                  : <div style={{ fontFamily: FONT, fontSize: "1rem", fontWeight: 600, color: C.white }}>{item.val}</div>
                }
                <div style={{ fontFamily: FONT, fontSize: "0.8rem", color: "rgba(255,255,255,0.45)", marginTop: "2px" }}>{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  const items = [
    { icon: <Fuel size={22}/>, title: "Nižší spotřeba paliva", desc: "Čistý motor spaluje efektivněji. Zákazníci z Liberce hlásí úsporu až 1 litr na 100 km hned po první dekarbonizaci." },
    { icon: <Zap size={22}/>, title: "Výkon jako z výroby", desc: "Uhlíkové nánosy brzdí motor. Po jejich odstranění se výkon i akcelerace vrátí na tovární hodnoty." },
    { icon: <Wrench size={22}/>, title: "Méně výdajů za opravy", desc: "Čisté vstřikovače, ventily a DPF filtr se opotřebovávají mnohem pomaleji. Ušetříte na opravách v servisu." },
    { icon: <Leaf size={22}/>, title: "Projdete emisní kontrolou", desc: "Snížíme emise škodlivin tak, aby váš vůz emisní kontrolou na STK prošel bez problémů." },
  ];
  return (
    <section id="about" className="py-16 lg:py-24" style={{ background: C.white }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <span style={{ ...S.tag, color: C.navy }}>Proč to funguje</span>
            <h2 style={{ ...S.h2, color: C.textDk }}>Co vaše auto po dekarbonizaci získá</h2>
            <div style={S.divider} />
            <p style={{ ...S.sub, maxWidth: "460px" }}>
              Uhlíkové usazeniny se v motoru hromadí od prvního dne provozu. Čím déle čekáte, tím víc vás to stojí — vyšší spotřeba, slabší výkon, dražší opravy v servisu.
            </p>
            <div className="mt-8">
              <Image src="/auto-peugeot.jpg" alt="Vodíková dekarbonizace Liberec — HHO přístroj připojený k motoru"
                width={1080} height={1080} style={{ width: "100%", height: "auto", display: "block" }} />
              <div style={{ background: C.lime, padding: "13px 18px", display: "flex", alignItems: "center", gap: "10px" }}>
                <ShieldCheck size={17} style={{ color: "#fff", flexShrink: 0 }} />
                <span style={{ color: "#fff", fontWeight: 600, fontSize: "0.875rem", fontFamily: FONT }}>Základní diagnostika vozidla ZDARMA ke každé zakázce</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ background: C.gray }}>
            {items.map((b, i) => (
              <div key={b.title} style={{ background: C.white, padding: "28px 22px", borderTop: `3px solid ${i < 2 ? C.navy : C.lime}` }}>
                <div style={{ color: C.navy, marginBottom: "12px" }}>{b.icon}</div>
                <h3 style={{ fontFamily: FONT, fontSize: "1rem", fontWeight: 600, color: C.textDk, marginBottom: "8px", letterSpacing: "-0.2px" }}>{b.title}</h3>
                <p style={{ fontSize: "0.95rem", color: C.textMd, lineHeight: 1.7, fontFamily: FONT }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

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
                "50–80 minut — počkáte přímo u nás v Liberci",
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
            <Image src="/motor-detail.jpg" alt="Vodíková dekarbonizace Liberec — HHO hadice v sání motoru"
              width={1400} height={933} style={{ width: "100%", height: "auto", display: "block", borderLeft: `4px solid ${C.lime}` }} />
            <div className="grid grid-cols-2 gap-px mt-px" style={{ background: "rgba(255,255,255,0.08)" }}>
              {[{ num: "H₂O", label: "jediný vedlejší produkt" }, { num: "50–80 min", label: "a hotovo" }].map((s) => (
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

function Pricing() {
  return (
    <section id="pricing" className="py-16 lg:py-24" style={{ background: C.offWhite }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        <div className="flex flex-wrap justify-between items-end gap-6 mb-10">
          <div>
            <span style={{ ...S.tag, color: C.navy }}>Ceník · Liberec</span>
            <h2 style={{ ...S.h2, color: C.textDk }}>Transparentní ceny, žádná překvapení</h2>
            <div style={S.divider} />
          </div>
          <p style={{ fontFamily: FONT, fontSize: "0.875rem", color: C.textLt, maxWidth: "300px", lineHeight: 1.7 }}>
            Objem motoru najdete v technickém průkazu pod „zdvihový objem".
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[
            { key: "benzin" as const, label: "Benzín / LPG / CNG", accent: C.lime },
            { key: "diesel" as const, label: "Diesel", accent: C.navy },
          ].map((fuel) => (
            <div key={fuel.key} style={{ background: C.white, border: `1px solid ${C.border}`, overflow: "hidden" }}>
              <div style={{ background: fuel.accent, padding: "20px 24px" }}>
                <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: "1.1rem", color: "#fff" }}>{fuel.label}</div>
                <div style={{ fontFamily: FONT, fontSize: "0.72rem", color: "rgba(255,255,255,0.7)", marginTop: "2px" }}>cena s DPH</div>
              </div>
              {PRICING.map((tier, i) => (
                <div key={tier.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 24px", borderBottom: i < PRICING.length - 1 ? `1px solid ${C.border}` : "none", background: i === 1 ? "#fafbfc" : C.white }}>
                  <div>
                    <div style={{ fontFamily: FONT, fontSize: "0.78rem", fontWeight: 600, color: C.textLt, textTransform: "uppercase" as const, letterSpacing: "0.08em", marginBottom: "3px" }}>Objem motoru</div>
                    <div style={{ fontFamily: FONT, fontSize: "1.05rem", fontWeight: 700, color: C.textDk }}>{tier.label}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: FONT, fontSize: "2rem", fontWeight: 800, color: fuel.accent, letterSpacing: "-1px", lineHeight: 1 }}>
                      {tier[fuel.key]}<span style={{ fontSize: "1rem", fontWeight: 500, color: C.textLt, marginLeft: "4px" }}>Kč</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px", justifyContent: "flex-end", marginTop: "4px" }}>
                      <Clock size={11} style={{ color: C.textLt }} />
                      <span style={{ fontFamily: FONT, fontSize: "0.78rem", color: C.textLt }}>{tier.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ marginTop: "16px", background: C.white, border: `1px solid ${C.border}`, borderLeft: `4px solid ${C.lime}`, padding: "15px 20px", display: "flex", alignItems: "center", gap: "10px" }}>
          <ShieldCheck size={17} style={{ color: C.lime, flexShrink: 0 }} />
          <span style={{ fontFamily: FONT, fontSize: "0.9rem", color: C.textMd, lineHeight: 1.6 }}>
            <strong style={{ color: C.textDk }}>Diagnostika zdarma</strong> ke každé dekarbonizaci (hodnota 300 Kč). Objem motoru najdete v technickém průkazu pod „zdvihový objem".
          </span>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="py-16 lg:py-24" style={{ background: C.navy }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 lg:gap-16 items-start">
          <div>
            <span style={{ ...S.tag, color: C.lime }}>Zákazníci</span>
            <h2 style={{ ...S.h2, color: C.white }}>Co říkají spokojení zákazníci</h2>
            <div style={{ ...S.divider }} />
            <p style={{ ...S.sub, color: "rgba(255,255,255,0.55)" }}>Přes 500 spokojených zákazníků. Průměrné hodnocení 4,9 z 5 na Google.</p>
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
                <div style={{ width: "48px", height: "48px", flexShrink: 0, borderRadius: "50%", background: C.lime, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.95rem", color: C.navyDk, fontFamily: FONT }}>
                  {r.initials}
                </div>
                <div>
                  <div className="flex gap-0.5 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={11} style={{ color: "#f59e0b", fill: "#f59e0b" }} />
                    ))}
                  </div>
                  <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.95rem", lineHeight: 1.75, marginBottom: "10px", fontStyle: "italic", fontFamily: FONT }}>&ldquo;{r.text}&rdquo;</p>
                  <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "rgba(255,255,255,0.6)", fontFamily: FONT }}>
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

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="py-16 lg:py-24" style={{ background: C.white }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-8 lg:gap-16 items-start">
          <div>
            <span style={{ ...S.tag, color: C.navy }}>Časté otázky</span>
            <h2 style={{ ...S.h2, color: C.textDk }}>Vše o dekarbonizaci v Liberci</h2>
            <div style={S.divider} />
            <p style={{ ...S.sub }}>Nenašli jste co hledáte? Zavolejte nebo napište — odpovíme rychle.</p>
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
                  <span style={{ fontSize: "1rem", fontWeight: 600, color: open === i ? C.navy : C.textDk }}>{faq.q}</span>
                  <ChevronDown size={17} style={{ color: C.navy, flexShrink: 0, transform: open === i ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.25s" }} />
                </button>
                {open === i && (
                  <div style={{ paddingBottom: "18px", fontSize: "0.95rem", color: C.textMd, lineHeight: 1.8, fontFamily: FONT }}>{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

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
    formData.append("access_key", "88d43b16-7eeb-46ee-9c4e-3c60da81b2db");
    try {
      const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
      const data = await response.json();
      if (data.success) {
        setSent(true);
        if (typeof window !== "undefined" && (window as any).gtag) {
          (window as any).gtag("event", "generate_lead", { event_category: "form", event_label: "contact_liberec", send_to: "G-RNLHTENSDQ" });
          (window as any).gtag("event", "conversion", { send_to: "AW-18028160012/yuN9CJyp9oscEIzIv5RD" });
        }
      } else {
        alert("Něco se pokazilo při odesílání. Zkuste to prosím znovu.");
      }
    } catch {
      alert("Chyba připojení. Zkontrolujte svůj internet a zkuste to znovu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 lg:py-24" style={{ background: C.offWhite }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-16 items-start">
          <div>
            <span style={{ ...S.tag, color: C.navy }}>Objednávka · Liberec</span>
            <h2 style={{ ...S.h2, color: C.textDk }}>Objednejte se na dekarbonizaci</h2>
            <div style={S.divider} />
            <p style={{ ...S.sub }}>Vyplňte formulář, zavolejte nebo napište e-mail. Termín domluvíme do 24 hodin — bez závazků.</p>
            <div className="flex flex-col gap-4 mt-8">
              {[
                { icon: <Phone size={16}/>, label: "Telefon", val: "+420 601 269 600", href: "tel:+420601269600" },
                { icon: <MapPin size={16}/>, label: "Adresa", val: "Tanvaldská 1458, Liberec", href: "https://maps.google.com/?q=Tanvaldsk%C3%A1+1458,+Liberec" },
                { icon: <Mail size={16}/>, label: "E-mail", val: "info@cistenivodikem.cz", href: "mailto:info@cistenivodikem.cz" },
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
                  <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />
                  <input name="Pobocka" type="hidden" value="Liberec — Tanvaldská 1458" />
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
                    <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: C.textMd, marginBottom: "5px", fontFamily: FONT }}>Zpráva (nepovinné)</label>
                    <textarea name="Zprava" rows={3} placeholder="Objem motoru, preferovaný termín nebo cokoliv dalšího..." style={{ ...field, resize: "none" }}
                      onFocus={e => (e.currentTarget.style.borderColor = C.navy)}
                      onBlur={e => (e.currentTarget.style.borderColor = C.border)} />
                  </div>
                  <label className="flex items-start gap-2 cursor-pointer" style={{ fontSize: "0.78rem", color: C.textLt, lineHeight: 1.6, fontFamily: FONT }}>
                    <input required type="checkbox" style={{ marginTop: "2px", flexShrink: 0, accentColor: C.navy }} />
                    Souhlasím se zpracováním osobních údajů dle <a href="/" style={{ color: C.navy, fontWeight: 600 }}>zásad ochrany osobních údajů</a>. *
                  </label>
                  <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-2 mt-1 disabled:opacity-70 disabled:cursor-not-allowed"
                    style={{ ...btnPrimary, padding: "14px" }}
                    onMouseEnter={e => { if (!isSubmitting) e.currentTarget.style.background = C.limeDk; }}
                    onMouseLeave={e => { if (!isSubmitting) e.currentTarget.style.background = C.lime; }}>
                    {isSubmitting ? "Odesílám..." : "Objednat se v Liberci"} <ArrowRight size={15}/>
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

function Footer() {
  return (
    <footer style={{ background: C.navyDk, borderTop: `4px solid ${C.lime}` }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-12 pb-8">
        <div className="flex flex-wrap justify-between gap-10 mb-10">
          <div>
            <div className="mb-4"><Logo /></div>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", maxWidth: "230px", lineHeight: 1.8, fontFamily: FONT }}>
              Vodíková dekarbonizace motorů.<br />
              Liberec a České Budějovice.<br /><br />
              <strong style={{ color: "rgba(255,255,255,0.75)" }}>RespiPlus Care s.r.o.</strong><br />
              IČO: 09701982<br />
              Korunní 2569/108, Praha 10<br /><br />
              <a href="mailto:info@cistenivodikem.cz" style={{ color: C.lime, textDecoration: "none", fontWeight: 600 }}>info@cistenivodikem.cz</a>
            </p>
          </div>
          <div className="flex flex-wrap gap-10">
            {[
              { h: "Pobočky", links: [{ label: "Liberec", href: "/dekarbonizace-liberec" }, { label: "České Budějovice", href: "/dekarbonizace-ceske-budejovice" }] },
              { h: "Info", links: [{ label: "Hlavní stránka", href: "/" }, { label: "Ceník", href: "/#pricing" }, { label: "FAQ", href: "#faq" }] },
            ].map((col) => (
              <div key={col.h}>
                <h4 style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.12em", marginBottom: "14px", fontFamily: FONT }}>{col.h}</h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.95rem", textDecoration: "none", fontFamily: FONT }}>{l.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap justify-between items-center gap-3 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.85rem", fontFamily: FONT }}>© 2026 cistenivodikem.cz · RespiPlus Care s.r.o.</p>
          <a href="https://inetio.cz" target="_blank" rel="noopener noreferrer"
            style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.85rem", textDecoration: "none", fontFamily: FONT }}>
            Vytvořilo Inetio s.r.o.
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function LiberecPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <LocationInfo />
      <Benefits />
      <HowItWorks />
      <Pricing />
      <Reviews />
      <FAQ />
      <ContactForm />
      <Footer />
    </>
  );
}
