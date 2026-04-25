"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const C = { navy: "#092d62", lime: "#8cc63f", limeDk: "#6fa32e" };
const FONT = "var(--font-dm), DM Sans, sans-serif";

const WELCOME: Message = {
  role: "assistant",
  content:
    "Dobrý den! Jsem asistent BezKarbonu.cz. Mohu vám poradit s vodíkovou dekarbonizací, cenami, pobočkami nebo objednávkou. Jak vám mohu pomoci?",
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.message }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Omlouvám se, nastala chyba. Kontaktujte nás na info@bezkarbonu.cz nebo +420 792 767 337." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <>
      <style>{`
        @keyframes bzk-bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }
        .bzk-msg a { color: ${C.lime}; text-decoration: underline; }
        .bzk-scroll::-webkit-scrollbar { width: 4px; }
        .bzk-scroll::-webkit-scrollbar-thumb { background: #ddd; border-radius: 4px; }
      `}</style>

      <div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 9999, fontFamily: FONT }}>

        {/* Chat window */}
        {open && (
          <div style={{
            width: "360px", height: "520px", background: "#fff", borderRadius: "16px",
            boxShadow: "0 12px 48px rgba(0,0,0,0.18)", display: "flex", flexDirection: "column",
            overflow: "hidden", marginBottom: "12px",
            animation: "none",
          }}>
            {/* Header */}
            <div style={{ background: C.navy, padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: 36, height: 36, background: C.lime, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "#fff", fontSize: "0.85rem", flexShrink: 0 }}>
                  H₂
                </div>
                <div>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.9rem", lineHeight: 1.2 }}>BezKarbonu Asistent</div>
                  <div style={{ color: C.lime, fontSize: "0.72rem", display: "flex", alignItems: "center", gap: "4px" }}>
                    <span style={{ width: 6, height: 6, background: C.lime, borderRadius: "50%", display: "inline-block" }} />
                    Online
                  </div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: "1.1rem", padding: "4px", lineHeight: 1 }}>✕</button>
            </div>

            {/* Messages */}
            <div className="bzk-scroll" style={{ flex: 1, overflowY: "auto", padding: "16px 14px", display: "flex", flexDirection: "column", gap: "10px", background: "#f5f7fa" }}>
              {messages.map((m, i) => (
                <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                  {m.role === "assistant" && (
                    <div style={{ width: 28, height: 28, background: C.navy, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontWeight: 900, color: "#fff", flexShrink: 0, marginRight: "6px", alignSelf: "flex-end" }}>
                      H₂
                    </div>
                  )}
                  <div
                    className="bzk-msg"
                    style={{
                      maxWidth: "75%", padding: "9px 13px",
                      borderRadius: m.role === "user" ? "14px 14px 3px 14px" : "14px 14px 14px 3px",
                      background: m.role === "user" ? C.lime : "#fff",
                      color: m.role === "user" ? "#fff" : "#2a2a2a",
                      fontSize: "0.855rem", lineHeight: 1.55,
                      boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
                      whiteSpace: "pre-wrap", wordBreak: "break-word",
                    }}
                  >
                    {m.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div style={{ display: "flex", alignItems: "flex-end", gap: "6px" }}>
                  <div style={{ width: 28, height: 28, background: C.navy, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontWeight: 900, color: "#fff", flexShrink: 0 }}>H₂</div>
                  <div style={{ background: "#fff", padding: "10px 14px", borderRadius: "14px 14px 14px 3px", boxShadow: "0 1px 3px rgba(0,0,0,0.07)", display: "flex", gap: "5px", alignItems: "center" }}>
                    {[0, 0.2, 0.4].map((delay, i) => (
                      <span key={i} style={{ width: 7, height: 7, background: "#c0c0c0", borderRadius: "50%", display: "inline-block", animation: `bzk-bounce 1.1s infinite ${delay}s` }} />
                    ))}
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Quick suggestions (only when no user messages yet) */}
            {messages.length === 1 && (
              <div style={{ padding: "6px 12px", background: "#f5f7fa", display: "flex", gap: "6px", flexWrap: "wrap", borderTop: "1px solid #eee" }}>
                {["Jaká je cena?", "Kde jsou pobočky?", "Jak to funguje?", "Chci se objednat"].map((q) => (
                  <button key={q} onClick={() => { setInput(q); inputRef.current?.focus(); }}
                    style={{ background: "#fff", border: `1px solid ${C.lime}`, color: C.limeDk, borderRadius: "20px", padding: "4px 10px", fontSize: "0.75rem", cursor: "pointer", fontFamily: FONT, fontWeight: 600 }}>
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div style={{ padding: "10px 12px", background: "#fff", borderTop: "1px solid #eee", display: "flex", gap: "8px", flexShrink: 0 }}>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKey}
                placeholder="Napište dotaz..."
                disabled={loading}
                style={{ flex: 1, border: "1.5px solid #e0e0e0", borderRadius: "8px", padding: "8px 12px", fontSize: "0.855rem", outline: "none", fontFamily: FONT, background: loading ? "#f9f9f9" : "#fff", transition: "border-color 0.15s" }}
                onFocus={(e) => (e.target.style.borderColor = C.lime)}
                onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
              />
              <button
                onClick={send}
                disabled={loading || !input.trim()}
                style={{ background: input.trim() && !loading ? C.lime : "#e0e0e0", border: "none", borderRadius: "8px", width: "38px", height: "38px", color: "#fff", fontWeight: 700, cursor: input.trim() && !loading ? "pointer" : "not-allowed", fontSize: "1.1rem", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.15s", flexShrink: 0 }}
              >
                ➤
              </button>
            </div>
          </div>
        )}

        {/* Floating toggle button */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={() => setOpen((v) => !v)}
            title={open ? "Zavřít chat" : "Otevřít chat asistenta"}
            style={{
              width: "56px", height: "56px", borderRadius: "50%",
              background: open ? "#555" : C.lime,
              border: "none", cursor: "pointer",
              boxShadow: `0 4px 20px ${open ? "rgba(0,0,0,0.2)" : "rgba(140,198,63,0.45)"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.5rem", transition: "background 0.2s, transform 0.2s",
              color: "#fff",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.07)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            {open ? "✕" : "💬"}
          </button>
        </div>
      </div>
    </>
  );
}
