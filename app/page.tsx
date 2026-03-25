"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Zap, Fuel, ShieldCheck, Clock, Leaf, Wrench,
  MapPin, Phone, Mail, ArrowRight, CheckCircle2,
  Star, Menu, X, ChevronDown, TrendingDown,
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
const btnOutline: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", gap: "8px",
  background: "transparent", color: C.white,
  fontFamily: FONT, fontWeight: 600, fontSize: "0.9rem",
  padding: "12px 24px", border: "1.5px solid rgba(255,255,255,0.35)",
  cursor: "pointer", textDecoration: "none", transition: "border-color 0.2s",
};

/* ── DATA ── */
const PRICING = [
  { label: "do 1,9 l", benzin: "2 390", diesel: "2 690", time: "50–60 min" },
  { label: "nad 2,0 l", benzin: "2 890", diesel: "3 190", time: "60–80 min" },
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
    phone: "+420 601 269 600",
    email: "info@cistenivodikem.cz",
    hours: "Po–Pá: 8:00–16:00",
    note: "Nutné objednat se předem",
    img: "/liberec.jpg",
    pageUrl: "/dekarbonizace-liberec",
  },
  {
    city: "České Budějovice",
    address: "Rudolfovská tř. 612, České Budějovice",
    phone: "+420 601 269 600",
    email: "info@cistenivodikem.cz",
    hours: "Po–Pá: 8:00–18:00",
    note: "Nutné objednat se předem",
    img: "/ceske-budejovice.jpg",
    pageUrl: "/dekarbonizace-ceske-budejovice",
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
  { name: "Martin N.", text: "Byl jsem skeptický, ale po dekarbonizaci motor nastartoval jako nový. Cukání zmizelo úplně. Přišel jsem i s druhým autem.", initials: "MN", carImg: "/review-vw-caddy.jpg" },
  { name: "Petra K.", text: "Rychlá obsluha, příjemné prostředí a okamžitě znatelný výsledek. Motor je výrazně tišší a auto táhne líp. Doporučuju všem.", initials: "PK", carImg: "/review-volvo.jpg" },
  { name: "Tomáš H.", text: "Spotřeba klesla o skoro litr na stovce. Za cenu jedné dekarbonizace se mi to vrátí do půl roku. Škoda, že jsem to neudělal dřív.", initials: "TH", carImg: "/review-vw-touareg.jpg" },
];

/* ─────────────────────── LOGO COMPONENT ─────────────────────── */
function Logo() {
  return (
    <span className="font-extrabold text-lg tracking-tight" style={{ fontFamily: FONT }}>
      <span className="text-white">Čištění</span>
      <span className="text-[#8cc63f]">Vodíkem</span>
    </span>
  );
}

/* ─────────────────────── NAVBAR ─────────────────────── */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileLocOpen, setMobileLocOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const links = [
    { label: "O službě", href: "#about" },
    { label: "Ceník", href: "#pricing" },
    { label: "Výsledky", href: "#results" },
    { label: "Kontakt", href: "#contact" },
  ];

  const locationLinks = [
    { label: "Liberec", href: "/dekarbonizace-liberec" },
    { label: "České Budějovice", href: "/dekarbonizace-ceske-budejovice" },
  ];

  const linkStyle: React.CSSProperties = { color: "rgba(255,255,255,0.75)", fontSize: "0.875rem", fontWeight: 700, textDecoration: "none", fontFamily: FONT, transition: "color 0.2s" };

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: C.navyDk, borderBottom: `3px solid ${C.lime}` }}>
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-8" style={{ height: "60px" }}>

        <a href="#" style={{ textDecoration: "none" }}>
          <Logo />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} style={linkStyle}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}>
              {l.label}
            </a>
          ))}

          {/* Pobočky dropdown */}
          <div style={{ position: "relative" }}
            onMouseEnter={() => { if (closeTimer.current) clearTimeout(closeTimer.current); setDropdownOpen(true); }}
            onMouseLeave={() => { closeTimer.current = setTimeout(() => setDropdownOpen(false), 200); }}>
            <a href="#locations" style={{ ...linkStyle, display: "flex", alignItems: "center", gap: "4px" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}>
              Pobočky
              <ChevronDown size={13} style={{ transition: "transform 0.2s", transform: dropdownOpen ? "rotate(180deg)" : "rotate(0)" }} />
            </a>
            {dropdownOpen && (
              <div style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", marginTop: "8px", background: C.navyDk, border: `1px solid rgba(255,255,255,0.1)`, borderTop: `2px solid ${C.lime}`, minWidth: "200px", boxShadow: "0 8px 24px rgba(0,0,0,0.3)" }}>
                {locationLinks.map((l) => (
                  <a key={l.href} href={l.href}
                    style={{ display: "block", padding: "12px 18px", color: "rgba(255,255,255,0.8)", fontSize: "0.875rem", fontWeight: 600, fontFamily: FONT, textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.06)", transition: "background 0.15s, color 0.15s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.8)"; }}>
                    {l.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <a href="tel:+420601269600" className="hidden md:flex items-center gap-2"
          style={{ background: C.lime, color: "#fff", fontWeight: 600, fontSize: "0.875rem", padding: "8px 16px", textDecoration: "none", fontFamily: FONT, transition: "background 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.background = C.limeDk)}
          onMouseLeave={e => (e.currentTarget.style.background = C.lime)}
          onClick={() => { if (typeof window !== 'undefined' && (window as any).gtag) (window as any).gtag('event', 'phone_click', { event_category: 'contact', send_to: 'G-RNLHTENSDQ' }); }}>
          <Phone size={13} /> +420 601 269 600
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
              style={{ color: "rgba(255,255,255,0.85)", fontSize: "1rem", fontWeight: 700, textDecoration: "none", fontFamily: FONT }}>
              {l.label}
            </a>
          ))}
          {/* Mobile pobočky accordion */}
          <button onClick={() => setMobileLocOpen(!mobileLocOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", padding: 0, fontFamily: FONT }}>
            <span style={{ color: "rgba(255,255,255,0.85)", fontSize: "1rem", fontWeight: 700 }}>Pobočky</span>
            <ChevronDown size={16} style={{ color: "rgba(255,255,255,0.6)", transform: mobileLocOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }} />
          </button>
          {mobileLocOpen && (
            <div style={{ paddingLeft: "16px", display: "flex", flexDirection: "column", gap: "12px", borderLeft: `2px solid ${C.lime}` }}>
              {locationLinks.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                  style={{ color: C.lime, fontSize: "0.95rem", fontWeight: 600, textDecoration: "none", fontFamily: FONT }}>
                  {l.label}
                </a>
              ))}
            </div>
          )}
          <a href="tel:+420601269600" style={{ ...btnPrimary, justifyContent: "center", marginTop: "8px" }}>
            <Phone size={13}/> +420 601 269 600
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleHeroSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    
    formData.append("access_key", "88d43b16-7eeb-46ee-9c4e-3c60da81b2db");
    formData.append("subject", "Rychlá poptávka z Hero sekce");
    formData.append("from_name", "Čištění Vodíkem - Hero Form");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setSent(true);
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'generate_lead', { event_category: 'form', event_label: 'hero_form', send_to: 'G-RNLHTENSDQ' });
          (window as any).gtag('event', 'conversion', { send_to: 'AW-18028160012/yuN9CJyp9oscEIzIv5RD' });
        }
      } else {
        alert('Něco se pokazilo. Zkuste to prosím znovu.');
      }
    } catch (error) {
      alert('Chyba připojení.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <span style={{ ...S.tag, color: C.lime }}>Prodlužte životnost vašemu motoru, snižte emise a obnovte výkon</span>
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

          {/* Right — quick callback form */}
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
                
                <form onSubmit={handleHeroSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
                  
                  <input 
                    name="Jmeno" 
                    required 
                    type="text" 
                    placeholder="Vaše jméno"
                    style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", padding: "10px 12px", color: "#fff", fontFamily: FONT, fontSize: "0.875rem", outline: "none", width: "100%" }} 
                  />
                  
                  <input 
                    name="Telefon" 
                    required 
                    type="tel" 
                    placeholder="Telefonní číslo"
                    style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", padding: "10px 12px", color: "#fff", fontFamily: FONT, fontSize: "0.875rem", outline: "none", width: "100%" }} 
                  />
                  
                  <select 
                    name="Pobocka" 
                    required
                    style={{ background: "rgba(9,45,98,1)", border: "1px solid rgba(255,255,255,0.15)", padding: "10px 12px", color: "#fff", fontFamily: FONT, fontSize: "0.875rem", outline: "none", width: "100%", cursor: "pointer" }}
                  >
                    <option value="" style={{ color: "#fff" }}>Vyberte pobočku</option>
                    <option value="Liberec">Liberec</option>
                    <option value="Ceske Budejovice">České Budějovice</option>
                  </select>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    style={{ ...btnPrimary, justifyContent: "center", marginTop: "2px", width: "100%", opacity: isSubmitting ? 0.7 : 1 }}
                  >
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

/* ─────────────────────── TRUST BAR ─────────────────────── */
function TrustBar() {
  const [counts, setCounts] = useState([0, 0, 0]);

  useEffect(() => {
    const targets = [350, 4200, 30];
    const steps = 80;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setCounts(targets.map(t => Math.floor(t * eased)));
      if (step >= steps) clearInterval(timer);
    }, 24);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    {
      Icon: Leaf,
      value: counts[0],
      unit: "kg",
      label: "CO₂ méně ročně",
      note: "průměrná úspora emisí na zákazníka",
    },
    {
      Icon: TrendingDown,
      value: counts[1],
      unit: "Kč",
      label: "úspora na palivu",
      note: "za rok při průměrném nájezdu 15 000 km",
    },
    {
      Icon: ShieldCheck,
      value: counts[2],
      unit: "%",
      label: "delší životnost",
      note: "vstřikovačů, ventilů a DPF filtru průměrně",
    },
  ];

  const badges = ["5+ let na trhu", "Vodíková HHO technologie", "Diagnostika zdarma", "Benzín · Diesel · Hybrid", "Bez demontáže motoru"];

  return (
    <section style={{ background: C.offWhite, padding: "72px 0 56px" }}>
      <style>{`
        @keyframes statFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div className="max-w-6xl mx-auto px-4 sm:px-8">

        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: "52px" }}>
          <span style={{ fontFamily: FONT, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: C.navy }}>
            Měřitelné výsledky
          </span>
          <h2 style={{ fontFamily: FONT, fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 700, color: C.textDk, letterSpacing: "-0.5px", margin: "10px 0 0" }}>
            Proč má dekarbonizace smysl
          </h2>
        </div>

        {/* 3 stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map(({ Icon, value, unit, label, note }, i) => (
            <div key={label} style={{
              background: C.white,
              border: `1px solid ${C.border}`,
              borderTop: `4px solid ${C.navy}`,
              padding: "44px 32px",
              textAlign: "center",
              animation: `statFadeUp 0.6s ease ${i * 0.12}s both`,
              boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
            }}>
              {/* Icon with navy ring */}
              <div style={{
                width: "64px", height: "64px", borderRadius: "50%",
                border: `2px solid ${C.navy}`,
                background: C.offWhite,
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 28px",
                color: C.navy,
              }}>
                <Icon size={26} strokeWidth={1.5} />
              </div>

              {/* Big number */}
              <div style={{ fontFamily: FONT, fontSize: "clamp(2.6rem, 4.5vw, 3.8rem)", fontWeight: 800, color: C.navy, letterSpacing: "-3px", lineHeight: 1 }}>
                {value.toLocaleString("cs-CZ")}
                <span style={{ fontSize: "1.3rem", fontWeight: 600, color: C.lime, marginLeft: "5px" }}>{unit}</span>
              </div>

              {/* Label */}
              <div style={{ fontFamily: FONT, fontSize: "0.95rem", fontWeight: 700, color: C.textDk, marginTop: "16px", letterSpacing: "-0.2px" }}>
                {label}
              </div>

              {/* Note */}
              <div style={{ fontFamily: FONT, fontSize: "0.8rem", color: C.textLt, marginTop: "6px", lineHeight: 1.65 }}>
                {note}
              </div>
            </div>
          ))}
        </div>

        {/* Trust badges strip */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mt-10 pt-8" style={{ borderTop: `1px solid ${C.border}` }}>
          {badges.map((item) => (
            <div key={item} className="flex items-center gap-2">
              <div style={{ width: "4px", height: "4px", background: C.lime, borderRadius: "50%", flexShrink: 0 }} />
              <span style={{ color: "#374151", fontSize: "0.82rem", fontWeight: 500, fontFamily: FONT, whiteSpace: "nowrap" as const }}>{item}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
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
                src="/auto-peugeot.jpg"
                alt="Vodíková dekarbonizace — přístroj připojený k motoru"
                width={1080} height={1080}
                style={{ width: "100%", height: "auto", display: "block" }}
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
                <p style={{ fontSize: "0.95rem", color: C.textMd, lineHeight: 1.7, fontFamily: FONT }}>{b.desc}</p>
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
              src="/motor-detail.jpg"
              alt="Motor při vodíkové dekarbonizaci — HHO hadice připojená k sání"
              width={1400} height={933}
              style={{ width: "100%", height: "auto", display: "block", borderLeft: `4px solid ${C.lime}` }}
            />
            <div className="grid grid-cols-2 gap-px mt-px" style={{ background: "rgba(255,255,255,0.08)" }}>
              {[
                { num: "H₂O", label: "jediný vedlejší produkt" },
                { num: "50–80 min", label: "a hotovo" },
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
  const fuelCols = [
    {
      key: "benzin" as const,
      label: "Benzín / LPG / CNG",
      accent: C.lime,
      accentDk: C.limeDk,
      textOnAccent: "#fff",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 22V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"/>
          <path d="M3 11h12"/>
          <path d="M15 6h1a2 2 0 0 1 2 2v3a2 2 0 0 0 2 2v0a2 2 0 0 0 2-2V9l-3-3"/>
          <line x1="3" y1="22" x2="15" y2="22"/>
        </svg>
      ),
    },
    {
      key: "diesel" as const,
      label: "Diesel",
      accent: C.navy,
      accentDk: C.navyDk,
      textOnAccent: "#fff",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="7" ry="3"/>
          <path d="M5 5v6c0 1.66 3.13 3 7 3s7-1.34 7-3V5"/>
          <path d="M5 11v6c0 1.66 3.13 3 7 3s7-1.34 7-3v-6"/>
        </svg>
      ),
    },
  ];

  return (
    <section id="pricing" className="py-16 lg:py-24" style={{ background: C.offWhite }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-8">

        {/* Header */}
        <div className="flex flex-wrap justify-between items-end gap-6 mb-10">
          <div>
            <span style={{ ...S.tag, color: C.navy }}>Ceník</span>
            <h2 style={{ ...S.h2, color: C.textDk }}>Transparentní ceny, žádná překvapení</h2>
            <div style={S.divider} />
          </div>
          <p style={{ fontFamily: FONT, fontSize: "0.875rem", color: C.textLt, maxWidth: "300px", lineHeight: 1.7 }}>
            Objem motoru najdete v technickém průkazu pod „zdvihový objem".
          </p>
        </div>

        {/* 2-column fuel cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {fuelCols.map((fuel) => (
            <div key={fuel.key} style={{ background: C.white, border: `1px solid ${C.border}`, overflow: "hidden" }}>
              {/* Card header */}
              <div style={{ background: fuel.accent, padding: "20px 24px", display: "flex", alignItems: "center", gap: "14px" }}>
                <div style={{ color: fuel.textOnAccent, opacity: 0.9 }}>{fuel.icon}</div>
                <div>
                  <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: "1.1rem", color: fuel.textOnAccent, letterSpacing: "-0.3px" }}>{fuel.label}</div>
                  <div style={{ fontFamily: FONT, fontSize: "0.72rem", color: fuel.textOnAccent, opacity: 0.7, marginTop: "2px", letterSpacing: "0.04em" }}>cena s DPH</div>
                </div>
              </div>

              {/* Rows */}
              {PRICING.map((tier, i) => (
                <div key={tier.label} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "18px 24px",
                  borderBottom: i < PRICING.length - 1 ? `1px solid ${C.border}` : "none",
                  background: i === 1 ? "#fafbfc" : C.white,
                }}>
                  <div>
                    <div style={{ fontFamily: FONT, fontSize: "0.78rem", fontWeight: 600, color: C.textLt, textTransform: "uppercase" as const, letterSpacing: "0.08em", marginBottom: "3px" }}>
                      Objem motoru
                    </div>
                    <div style={{ fontFamily: FONT, fontSize: "1.05rem", fontWeight: 700, color: C.textDk }}>{tier.label}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: FONT, fontSize: "2rem", fontWeight: 800, color: fuel.accent, letterSpacing: "-1px", lineHeight: 1 }}>
                      {tier[fuel.key]}
                      <span style={{ fontSize: "1rem", fontWeight: 500, color: C.textLt, marginLeft: "4px" }}>Kč</span>
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

        {/* Bottom note */}
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
              <h3 style={{ fontFamily: FONT, fontSize: "1rem", fontWeight: 600, color: C.textDk, letterSpacing: "-0.2px", marginBottom: "8px" }}>{item.title}</h3>
              <p style={{ fontSize: "0.925rem", color: C.textMd, lineHeight: 1.7, fontFamily: FONT }}>{item.desc}</p>
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
              <a href={loc.pageUrl} style={{ display: "block", position: "relative", height: "240px", overflow: "hidden", textDecoration: "none" }}>
                <Image src={loc.img} alt={`Pobočka ${loc.city}`} fill style={{ objectFit: "cover", objectPosition: "center", transition: "transform 0.4s ease" }}
                  onMouseOver={e => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)")}
                  onMouseOut={e => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(9,45,98,0.85) 0%, transparent 60%)" }} />
                <div style={{ position: "absolute", bottom: "14px", left: "18px" }}>
                  <h3 style={{ fontFamily: FONT, color: "#fff", fontSize: "1.4rem", fontWeight: 700, letterSpacing: "-0.5px", margin: 0 }}>{loc.city}</h3>
                  <span style={{ fontFamily: FONT, fontSize: "0.78rem", color: C.lime, fontWeight: 600, letterSpacing: "0.04em" }}>Více o pobočce →</span>
                </div>
              </a>
              <div style={{ padding: "24px", borderTop: `4px solid ${C.navy}` }}>
                <div className="flex flex-col gap-3 mb-5">
                  {[
                    { icon: <MapPin size={14}/>, val: loc.address },
                    { icon: <Phone size={14}/>, val: loc.phone, href: `tel:${loc.phone.replace(/\s/g,"")}` },
                    { icon: <Mail size={14}/>, val: loc.email, href: `mailto:${loc.email}` },
                    { icon: <Clock size={14}/>, val: loc.hours, sub: loc.note },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3" style={{ fontSize: "0.95rem", color: C.textMd, fontFamily: FONT }}>
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
                <div style={{ width: "48px", height: "48px", flexShrink: 0, borderRadius: "50%", overflow: "hidden", position: "relative" }}>
                  <Image src={r.carImg} alt={`Auto zákazníka ${r.name}`} fill style={{ objectFit: "cover" }} />
                </div>
                <div style={{ flex: 1 }}>
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
    
    formData.append("access_key", "88d43b16-7eeb-46ee-9c4e-3c60da81b2db");
    formData.append("subject", "Nová poptávka z kontaktního formuláře");
    formData.append("from_name", "Čištění Vodíkem - Kontaktní formulář");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setSent(true);
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'generate_lead', { event_category: 'form', event_label: 'contact_form', send_to: 'G-RNLHTENSDQ' });
          (window as any).gtag('event', 'conversion', { send_to: 'AW-18028160012/yuN9CJyp9oscEIzIv5RD' });
        }
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
                { icon: <Phone size={16}/>, label: "Telefon", val: "+420 601 269 600", href: "tel:+420601269600" },
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
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", maxWidth: "230px", lineHeight: 1.8, fontFamily: FONT }}>
              Vodíková dekarbonizace motorů.<br />
              Liberec a České Budějovice.<br /><br />
              <strong style={{ color: "rgba(255,255,255,0.75)" }}>RespiPlus Care s.r.o.</strong><br />
              IČO: 09701982<br />
              Korunní 2569/108, Praha 10<br /><br />
              <a href="mailto:info@cistenivodikem.cz" style={{ color: C.lime, textDecoration: "none", fontWeight: 600 }} onClick={() => { if (typeof window !== 'undefined' && (window as any).gtag) (window as any).gtag('event', 'email_click', { event_category: 'contact', send_to: 'G-RNLHTENSDQ' }); }}>info@cistenivodikem.cz</a>
            </p>
          </div>
          <div className="flex flex-wrap gap-10">
            {[
              { h: "Pobočky", links: [{ label: "Liberec", href: "/dekarbonizace-liberec" }, { label: "České Budějovice", href: "/dekarbonizace-ceske-budejovice" }] },
              { h: "Info", links: [{ label: "O nás", href: "#about" }, { label: "Ceník", href: "#pricing" }, { label: "FAQ", href: "#faq" }, { label: "Ochrana osobních údajů", href: "#" }] },
            ].map((col) => (
              <div key={col.h}>
                <h4 style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.12em", marginBottom: "14px", fontFamily: FONT }}>{col.h}</h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.95rem", textDecoration: "none", fontFamily: FONT, transition: "color 0.2s" }}
                        onMouseEnter={e => (e.currentTarget.style.color = C.white)}
                        onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}>{l.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap justify-between items-center gap-3 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.85rem", fontFamily: FONT }}>© 2026 cistenivodikem.cz · RespiPlus Care s.r.o.</p>
          <div className="flex gap-5 items-center">
            <a href="https://inetio.cz" target="_blank" rel="noopener noreferrer"
              style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.85rem", textDecoration: "none", fontFamily: FONT, transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}>
              Vytvořilo Inetio s.r.o.
            </a>
            {["Ochrana osobních údajů", "Cookies"].map((l) => (
              <a key={l} href="#" style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.85rem", textDecoration: "none", fontFamily: FONT, transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────── PROCESS ANIMATION ─────────────────────── */
function ProcessAnimation() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % 4), 3000);
    return () => clearInterval(t);
  }, []);

  const steps = [
    {
      num: "01",
      Icon: Wrench,
      title: "Připojení přístroje",
      desc: "Stroj se napojí přímo na sací potrubí. Žádná demontáž, žádný zásah do oleje.",
    },
    {
      num: "02",
      Icon: Zap,
      title: "Výroba HHO plynu",
      desc: "Elektrolýzou vody přístroj vyrábí čistou vodíko-kyslíkovou směs (HHO).",
    },
    {
      num: "03",
      Icon: Fuel,
      title: "Plyn vstupuje do motoru",
      desc: "HHO proudí sacím potrubím a při spalování rozkládá uhlíkové nánosy.",
    },
    {
      num: "04",
      Icon: Leaf,
      title: "Motor je čistý",
      desc: "Zbytky se přemění na vodu a CO₂, které přirozeně odejdou výfukem.",
    },
  ];

  return (
    <section style={{ background: C.white, padding: "80px 0" }}>
      <style>{`
        @keyframes pulseDot {
          0%, 100% { box-shadow: 0 0 0 0 rgba(140,198,63,0.5); }
          50% { box-shadow: 0 0 0 10px rgba(140,198,63,0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div style={{ textAlign: "center", marginBottom: "52px" }}>
          <span style={{ ...S.tag, color: C.navy }}>Proces</span>
          <h2 style={{ ...S.h2, color: C.textDk }}>Jak probíhá dekarbonizace</h2>
          <div style={{ ...S.divider, margin: "14px auto 0" }} />
        </div>

        {/* Desktop 4-col */}
        <div className="hidden md:grid" style={{ gridTemplateColumns: "repeat(4, 1fr)", position: "relative" }}>
          {/* Background line */}
          <div style={{
            position: "absolute", top: "35px",
            left: "calc(12.5% + 8px)", right: "calc(12.5% + 8px)",
            height: "2px", background: C.gray, zIndex: 0,
          }}>
            {/* Lime progress fill */}
            <div style={{
              position: "absolute", top: 0, left: 0, height: "100%",
              background: C.lime,
              width: active === 0 ? "0%" : active === 1 ? "33%" : active === 2 ? "66%" : "100%",
              transition: "width 0.7s ease",
            }} />
            {/* Moving dot */}
            <div style={{
              position: "absolute", top: "50%", transform: "translate(-50%, -50%)",
              width: "12px", height: "12px", borderRadius: "50%", background: C.lime,
              left: active === 0 ? "0%" : active === 1 ? "33%" : active === 2 ? "66%" : "100%",
              transition: "left 0.7s ease",
              animation: "pulseDot 1.5s ease-in-out infinite",
              zIndex: 2,
            }} />
          </div>

          {steps.map(({ num, Icon, title, desc }, i) => (
            <div key={num}
              onClick={() => setActive(i)}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0 12px", textAlign: "center", cursor: "pointer", zIndex: 1 }}>
              {/* Circle */}
              <div style={{
                width: "70px", height: "70px", borderRadius: "50%", marginBottom: "24px",
                background: i <= active ? C.lime : C.white,
                border: `2px solid ${i <= active ? C.lime : C.border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.5s ease",
                color: i <= active ? "#fff" : C.textLt,
                boxShadow: i === active ? "0 0 0 7px rgba(140,198,63,0.15)" : "none",
                flexShrink: 0,
              }}>
                {i < active
                  ? <CheckCircle2 size={26} />
                  : <Icon size={26} />
                }
              </div>
              {/* Card */}
              <div style={{
                background: i === active ? C.offWhite : "transparent",
                borderTop: `3px solid ${i === active ? C.lime : "transparent"}`,
                padding: "18px 12px",
                transition: "all 0.4s ease",
                width: "100%",
              }}>
                <div style={{ fontFamily: FONT, fontSize: "0.68rem", fontWeight: 700, color: C.lime, letterSpacing: "0.1em", marginBottom: "6px" }}>{num}</div>
                <h4 style={{ fontFamily: FONT, fontSize: "0.92rem", fontWeight: 700, color: i === active ? C.navy : C.textMd, margin: "0 0 8px", transition: "color 0.4s" }}>
                  {title}
                </h4>
                <p style={{ fontFamily: FONT, fontSize: "0.78rem", color: C.textLt, lineHeight: 1.65, margin: 0, opacity: i === active ? 1 : 0.55, transition: "opacity 0.4s" }}>
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: 2-col grid */}
        <div className="md:hidden grid grid-cols-2 gap-4">
          {steps.map(({ num, Icon, title, desc }, i) => (
            <div key={num}
              onClick={() => setActive(i)}
              style={{
                background: i === active ? C.offWhite : C.white,
                border: `1px solid ${i === active ? C.lime : C.border}`,
                borderTop: `3px solid ${i === active ? C.lime : C.border}`,
                padding: "18px 16px",
                cursor: "pointer",
                transition: "all 0.4s",
              }}>
              <div style={{
                width: "44px", height: "44px", borderRadius: "50%", marginBottom: "12px",
                background: i <= active ? C.lime : C.gray,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: i <= active ? "#fff" : C.textLt,
                transition: "all 0.5s",
              }}>
                {i < active ? <CheckCircle2 size={20} /> : <Icon size={20} />}
              </div>
              <div style={{ fontFamily: FONT, fontSize: "0.65rem", fontWeight: 700, color: C.lime, letterSpacing: "0.1em", marginBottom: "4px" }}>{num}</div>
              <h4 style={{ fontFamily: FONT, fontSize: "0.85rem", fontWeight: 700, color: C.textDk, margin: "0 0 6px" }}>{title}</h4>
              <p style={{ fontFamily: FONT, fontSize: "0.75rem", color: C.textLt, lineHeight: 1.6, margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>

        {/* Auto-play dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "36px" }}>
          {steps.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} style={{
              width: i === active ? "24px" : "8px", height: "8px",
              borderRadius: "4px", background: i === active ? C.lime : C.border,
              border: "none", cursor: "pointer", transition: "all 0.4s", padding: 0,
            }} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── BEFORE / AFTER ─────────────────────── */
function BeforeAfter() {
  return (
    <section id="results" style={{ background: C.offWhite, padding: "80px 0" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <span style={{ ...S.tag, color: C.navy }}>Výsledky</span>
          <h2 style={{ ...S.h2, color: C.textDk }}>Před a po dekarbonizaci</h2>
          <div style={{ ...S.divider, margin: "14px auto 0" }} />
          <p style={{ ...S.sub, marginTop: "16px", textAlign: "center" }}>
            Rozdíl je vidět pouhým okem. Černé nánosy zmizí, motor dýchá znovu naplno.
          </p>
        </div>

        {/* Example 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ marginBottom: "48px" }}>
          {/* BEFORE */}
          <div>
            <div style={{ position: "relative", borderLeft: `4px solid #ef4444`, overflow: "hidden", lineHeight: 0 }}>
              <Image
                src="/turbo-pred.jpg"
                alt="Turbo před dekarbonizací — uhlíkové nánosy"
                width={1349} height={842}
                style={{ width: "100%", height: "auto", display: "block" }}
              />
              <div style={{
                position: "absolute", top: "12px", left: "12px",
                background: "#ef4444", color: "#fff",
                fontFamily: FONT, fontWeight: 700, fontSize: "0.75rem",
                letterSpacing: "0.1em", padding: "5px 14px",
              }}>PŘED</div>
            </div>
            <p style={{ fontFamily: FONT, fontSize: "0.9rem", color: C.textMd, marginTop: "12px", lineHeight: 1.65 }}>
              Uhlíkové nánosy ucpávají lopatky turbodmychadla, EGR ventil a DPF filtr. Motor ztrácí výkon a spaluje více paliva.
            </p>
          </div>

          {/* AFTER */}
          <div>
            <div style={{ position: "relative", borderLeft: `4px solid ${C.lime}`, overflow: "hidden", lineHeight: 0 }}>
              <Image
                src="/turbo-po.jpg"
                alt="Turbo po dekarbonizaci — čisté jako z výroby"
                width={1349} height={843}
                style={{ width: "100%", height: "auto", display: "block" }}
              />
              <div style={{
                position: "absolute", top: "12px", left: "12px",
                background: C.lime, color: "#fff",
                fontFamily: FONT, fontWeight: 700, fontSize: "0.75rem",
                letterSpacing: "0.1em", padding: "5px 14px",
              }}>PO</div>
            </div>
            <p style={{ fontFamily: FONT, fontSize: "0.9rem", color: C.textMd, marginTop: "12px", lineHeight: 1.65 }}>
              Po vodíkové dekarbonizaci jsou lopatky čisté jako z výroby. Výkon, spotřeba i emise se vrátí na tovární hodnoty.
            </p>
          </div>
        </div>

        {/* Example 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* BEFORE 2 */}
          <div>
            <div style={{ position: "relative", borderLeft: `4px solid #ef4444`, overflow: "hidden", lineHeight: 0, height: "280px" }}>
              <Image
                src="/turbo2-pred.jpg"
                alt="Díl motoru před dekarbonizací — uhlíkové usazeniny"
                fill
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
              <div style={{
                position: "absolute", top: "12px", left: "12px",
                background: "#ef4444", color: "#fff",
                fontFamily: FONT, fontWeight: 700, fontSize: "0.75rem",
                letterSpacing: "0.1em", padding: "5px 14px",
              }}>PŘED</div>
            </div>
            <p style={{ fontFamily: FONT, fontSize: "0.9rem", color: C.textMd, marginTop: "12px", lineHeight: 1.65 }}>
              Dlouhodobé usazeniny karbonu na dílu motoru omezují průtok plynů a snižují účinnost celého systému.
            </p>
          </div>

          {/* AFTER 2 */}
          <div>
            <div style={{ position: "relative", borderLeft: `4px solid ${C.lime}`, overflow: "hidden", lineHeight: 0, height: "280px" }}>
              <Image
                src="/turbo2-po.jpg"
                alt="Díl motoru po dekarbonizaci — čistý povrch"
                fill
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
              <div style={{
                position: "absolute", top: "12px", left: "12px",
                background: C.lime, color: "#fff",
                fontFamily: FONT, fontWeight: 700, fontSize: "0.75rem",
                letterSpacing: "0.1em", padding: "5px 14px",
              }}>PO</div>
            </div>
            <p style={{ fontFamily: FONT, fontSize: "0.9rem", color: C.textMd, marginTop: "12px", lineHeight: 1.65 }}>
              Vodík rozloží veškerý karbon bez mechanického zásahu. Díl je čistý, průtok obnoven, motor pracuje efektivněji.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── EMISSIONS PROOF ─────────────────────── */
function EmissionsProof() {
  return (
    <section style={{ background: C.navy, padding: "80px 0" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <span style={{ ...S.tag, color: C.lime }}>Měřitelný důkaz</span>
          <h2 style={{ ...S.h2, color: C.white }}>Reálný emisní protokol — před a po</h2>
          <div style={{ ...S.divider, margin: "14px auto 0" }} />
          <p style={{ fontFamily: FONT, fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginTop: "16px" }}>
            Hyundai i30 D4FB diesel · 219 808 km · Měření DEKRA
          </p>
        </div>

        {/* Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_80px_1fr] gap-4 items-stretch">

          {/* PŘED */}
          <div style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)", borderTop: "4px solid #ef4444", padding: "32px 28px" }}>
            <div style={{ display: "inline-block", background: "#ef4444", padding: "5px 14px", marginBottom: "24px" }}>
              <span style={{ fontFamily: FONT, color: "#fff", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.1em" }}>PŘED DEKARBONIZACÍ</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {[
                { label: "Kouřivost naměřená", val: "1,35", unit: "m⁻¹" },
                { label: "Rozpětí 4 měření", val: "0,77", unit: "m⁻¹" },
              ].map(({ label, val, unit }) => (
                <div key={label}>
                  <div style={{ fontFamily: FONT, fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.05em", marginBottom: "5px" }}>{label}</div>
                  <div style={{ fontFamily: FONT, fontSize: "3rem", fontWeight: 800, color: "#ef4444", letterSpacing: "-2px", lineHeight: 1 }}>
                    {val}<span style={{ fontSize: "1.1rem", fontWeight: 500, color: "rgba(255,255,255,0.35)", marginLeft: "5px" }}>{unit}</span>
                  </div>
                </div>
              ))}
              <div style={{ marginTop: "4px", padding: "10px 14px", background: "rgba(239,68,68,0.12)", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontFamily: FONT, fontSize: "0.85rem", color: "rgba(255,255,255,0.5)" }}>Limit STK max 0,25 m⁻¹ —</span>
                <strong style={{ fontFamily: FONT, color: "#ef4444", fontSize: "0.85rem" }}>NEVYHOVUJE</strong>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="hidden md:flex" style={{ flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px" }}>
            <ArrowRight size={28} style={{ color: C.lime }} />
            <span style={{ fontFamily: FONT, fontSize: "0.62rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase" as const, writingMode: "vertical-lr" as const }}>dekarbonizace</span>
          </div>

          {/* PO */}
          <div style={{ background: "rgba(140,198,63,0.08)", border: `1px solid rgba(140,198,63,0.25)`, borderTop: `4px solid ${C.lime}`, padding: "32px 28px" }}>
            <div style={{ display: "inline-block", background: C.lime, padding: "5px 14px", marginBottom: "24px" }}>
              <span style={{ fontFamily: FONT, color: "#fff", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.1em" }}>PO DEKARBONIZACI</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {[
                { label: "Kouřivost naměřená", val: "0,25", unit: "m⁻¹" },
                { label: "Rozpětí 4 měření", val: "0,07", unit: "m⁻¹" },
              ].map(({ label, val, unit }) => (
                <div key={label}>
                  <div style={{ fontFamily: FONT, fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.05em", marginBottom: "5px" }}>{label}</div>
                  <div style={{ fontFamily: FONT, fontSize: "3rem", fontWeight: 800, color: C.lime, letterSpacing: "-2px", lineHeight: 1 }}>
                    {val}<span style={{ fontSize: "1.1rem", fontWeight: 500, color: "rgba(255,255,255,0.35)", marginLeft: "5px" }}>{unit}</span>
                  </div>
                </div>
              ))}
              <div style={{ marginTop: "4px", padding: "10px 14px", background: "rgba(140,198,63,0.12)", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontFamily: FONT, fontSize: "0.85rem", color: "rgba(255,255,255,0.5)" }}>Limit STK max 0,25 m⁻¹ —</span>
                <strong style={{ fontFamily: FONT, color: C.lime, fontSize: "0.85rem" }}>VYHOVUJE ✓</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Protocol photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div style={{ position: "relative", overflow: "hidden" }}>
            <img src="/emise-pred.jpg" alt="Emisní protokol PŘED dekarbonizací" style={{ width: "100%", height: "auto", display: "block" }} />
            <div style={{ position: "absolute", top: "10px", left: "10px", background: "#ef4444", padding: "4px 12px" }}>
              <span style={{ fontFamily: FONT, color: "#fff", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.08em" }}>PROTOKOL PŘED</span>
            </div>
          </div>
          <div style={{ position: "relative", overflow: "hidden" }}>
            <img src="/emise-po.jpg" alt="Emisní protokol PO dekarbonizaci" style={{ width: "100%", height: "auto", display: "block" }} />
            <div style={{ position: "absolute", top: "10px", left: "10px", background: C.lime, padding: "4px 12px" }}>
              <span style={{ fontFamily: FONT, color: "#fff", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.08em" }}>PROTOKOL PO</span>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-px mt-5" style={{ background: "rgba(255,255,255,0.06)" }}>
          {[
            { num: "−81 %", label: "pokles kouřivosti" },
            { num: "−91 %", label: "pokles rozpětí" },
            { num: "219 808 km", label: "nájezd vozidla" },
          ].map((s) => (
            <div key={s.label} style={{ background: C.navyDk, padding: "20px 24px", textAlign: "center" }}>
              <div style={{ fontFamily: FONT, fontSize: "1.7rem", fontWeight: 800, color: C.lime, letterSpacing: "-1px" }}>{s.num}</div>
              <div style={{ fontFamily: FONT, fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", marginTop: "4px", textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>{s.label}</div>
            </div>
          ))}
        </div>

        <p style={{ fontFamily: FONT, fontSize: "0.75rem", color: "rgba(255,255,255,0.2)", textAlign: "center", marginTop: "16px", lineHeight: 1.6 }}>
          Protokoly č. CZ-461131-23-08-0507 (před) a CZ-461131-28-08-0761 (po) · Měřicí přístroj ACTIA CZ s.r.o., AT605, R+OBD · DEKRA DATA SME
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────── FLOATING CTA ─────────────────────── */
function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{
      position: 'fixed', bottom: '88px', right: '20px', zIndex: 9998,
      background: C.navy,
      border: '1px solid rgba(255,255,255,0.1)',
      borderTop: `3px solid ${C.lime}`,
      padding: '18px 20px',
      boxShadow: '0 8px 40px rgba(0,0,0,0.35)',
      minWidth: '220px',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(16px)',
      pointerEvents: visible ? 'auto' : 'none',
      transition: 'opacity 0.35s ease, transform 0.35s ease',
    }}>
      <p style={{ fontFamily: FONT, fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase' as const, color: C.lime, margin: '0 0 10px' }}>
        Objednejte se ihned
      </p>
      <a href="tel:+420601269600" style={{ display: 'flex', alignItems: 'center', gap: '9px', color: '#fff', textDecoration: 'none', fontFamily: FONT, fontWeight: 700, fontSize: '1.05rem', marginBottom: '14px', letterSpacing: '-0.3px' }}
        onMouseEnter={e => (e.currentTarget.style.color = C.lime)}
        onMouseLeave={e => (e.currentTarget.style.color = '#fff')}
        onClick={() => { if (typeof window !== 'undefined' && (window as any).gtag) (window as any).gtag('event', 'phone_click', { event_category: 'contact', send_to: 'G-RNLHTENSDQ' }); }}>
        <Phone size={15} style={{ color: C.lime, flexShrink: 0 }} />
        +420 601 269 600
      </a>
      <a href="#contact" style={{ ...btnPrimary, display: 'flex', justifyContent: 'center', padding: '10px 16px', fontSize: '0.82rem', width: '100%' }}
        onMouseEnter={e => (e.currentTarget.style.background = C.limeDk)}
        onMouseLeave={e => (e.currentTarget.style.background = C.lime)}>
        Kontaktujte nás <ArrowRight size={14} />
      </a>
    </div>
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
      <ProcessAnimation />
      <BeforeAfter />
      <EmissionsProof />
      <Pricing />
      <WhenToService />
      <Locations />
      <Reviews />
      <FAQ />
      <ContactForm />
      <Footer />
      <FloatingCTA />
    </>
  );
}