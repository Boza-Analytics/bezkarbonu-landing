"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Phone, Menu, X, ChevronDown } from "lucide-react";

const C = { navyDk: "#092d62", lime: "#8cc63f", limeDk: "#6fa32e" };
const FONT = "var(--font-dm), 'DM Sans', system-ui, sans-serif";

const links = [
  { label: "O službě", href: "/#about" },
  { label: "Ceník", href: "/#pricing" },
  { label: "Výsledky", href: "/#results" },
  { label: "Blog", href: "/blog" },
  { label: "Kontakt", href: "/#contact" },
];

const locationLinks = [
  { label: "Praha Letňany", href: "/dekarbonizace-praha-letnany" },
  { label: "České Budějovice", href: "/dekarbonizace-ceske-budejovice" },
];

function Logo() {
  return (
    <span style={{ fontFamily: FONT, fontWeight: 800, fontSize: "1.125rem", letterSpacing: "-0.01em" }}>
      <span style={{ color: "#fff" }}>Čištění</span>
      <span style={{ color: C.lime }}>Vodíkem</span>
    </span>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileLocOpen, setMobileLocOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const linkStyle: React.CSSProperties = {
    color: "rgba(255,255,255,0.75)", fontSize: "0.875rem", fontWeight: 700,
    textDecoration: "none", fontFamily: FONT, transition: "color 0.2s",
  };

  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 50, background: C.navyDk, borderBottom: `3px solid ${C.lime}` }}>
      <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 24px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        <Link href="/" style={{ textDecoration: "none" }}>
          <Logo />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex" style={{ alignItems: "center", gap: "28px" }}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} style={linkStyle}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}>
              {l.label}
            </Link>
          ))}

          {/* Pobočky dropdown */}
          <div style={{ position: "relative" }}
            onMouseEnter={() => { if (closeTimer.current) clearTimeout(closeTimer.current); setDropdownOpen(true); }}
            onMouseLeave={() => { closeTimer.current = setTimeout(() => setDropdownOpen(false), 200); }}>
            <Link href="/#locations" style={{ ...linkStyle, display: "flex", alignItems: "center", gap: "4px" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}>
              Pobočky
              <ChevronDown size={13} style={{ transition: "transform 0.2s", transform: dropdownOpen ? "rotate(180deg)" : "rotate(0)" }} />
            </Link>
            {dropdownOpen && (
              <div style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", marginTop: "8px", background: C.navyDk, border: "1px solid rgba(255,255,255,0.1)", borderTop: `2px solid ${C.lime}`, minWidth: "200px", boxShadow: "0 8px 24px rgba(0,0,0,0.3)" }}>
                {locationLinks.map((l) => (
                  <Link key={l.href} href={l.href}
                    style={{ display: "block", padding: "12px 18px", color: "rgba(255,255,255,0.8)", fontSize: "0.875rem", fontWeight: 600, fontFamily: FONT, textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.06)", transition: "background 0.15s, color 0.15s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.8)"; }}>
                    {l.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Phone CTA — desktop */}
        <Link href="tel:+420601269600" className="hidden md:flex"
          style={{ alignItems: "center", gap: "6px", background: C.lime, color: "#fff", fontWeight: 600, fontSize: "0.875rem", padding: "8px 16px", textDecoration: "none", fontFamily: FONT, transition: "background 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.background = C.limeDk)}
          onMouseLeave={e => (e.currentTarget.style.background = C.lime)}>
          <Phone size={13} /> +420 601 269 600
        </Link>

        {/* Hamburger */}
        <button className="md:hidden" onClick={() => setOpen(!open)}
          style={{ background: "none", border: "none", color: "white", cursor: "pointer", padding: "4px" }}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: C.navyDk, borderTop: "1px solid rgba(255,255,255,0.08)", padding: "20px 24px", display: "flex", flexDirection: "column", gap: "18px" }}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              style={{ color: "rgba(255,255,255,0.85)", fontSize: "1rem", fontWeight: 700, textDecoration: "none", fontFamily: FONT }}>
              {l.label}
            </Link>
          ))}

          <button onClick={() => setMobileLocOpen(!mobileLocOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", padding: 0, fontFamily: FONT }}>
            <span style={{ color: "rgba(255,255,255,0.85)", fontSize: "1rem", fontWeight: 700 }}>Pobočky</span>
            <ChevronDown size={16} style={{ color: "rgba(255,255,255,0.6)", transform: mobileLocOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }} />
          </button>
          {mobileLocOpen && (
            <div style={{ paddingLeft: "16px", display: "flex", flexDirection: "column", gap: "12px", borderLeft: `2px solid ${C.lime}` }}>
              {locationLinks.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                  style={{ color: C.lime, fontSize: "0.95rem", fontWeight: 600, textDecoration: "none", fontFamily: FONT }}>
                  {l.label}
                </Link>
              ))}
            </div>
          )}

          <Link href="tel:+420601269600"
            style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "6px", background: C.lime, color: "#fff", fontWeight: 600, fontSize: "0.9rem", padding: "13px 24px", textDecoration: "none", fontFamily: FONT, marginTop: "4px" }}>
            <Phone size={13} /> +420 601 269 600
          </Link>
          <Link href="/#contact" onClick={() => setOpen(false)}
            style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "6px", background: "transparent", color: "#fff", fontWeight: 600, fontSize: "0.9rem", padding: "12px 24px", border: "1.5px solid rgba(255,255,255,0.35)", textDecoration: "none", fontFamily: FONT }}>
            Objednat termín
          </Link>
        </div>
      )}
    </nav>
  );
}
