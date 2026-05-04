import { list } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

const SECRET = process.env.LOGS_SECRET ?? "bzkadmin";

export async function GET(req: NextRequest) {
  if (req.nextUrl.searchParams.get("key") !== SECRET) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return new NextResponse(
      `<h2>Chybí BLOB_READ_WRITE_TOKEN</h2>
       <p>Vercel Blob storage není nakonfigurován. Jdi do <b>Vercel Dashboard → tvůj projekt → Storage → Connect Store → Create Blob</b> a připoj ho k projektu. Pak redeploy.</p>`,
      { status: 500, headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  }

  const { blobs } = await list({ prefix: "conversations/", limit: 500 });

  // Fetch all entries
  const entries: { ts: string; sessionId: string; history: { role: string; content: string }[] }[] = [];
  await Promise.all(
    blobs.map(async (blob) => {
      try {
        const res = await fetch(blob.url);
        entries.push(await res.json());
      } catch { /* skip corrupt entries */ }
    })
  );

  // Group by sessionId, keep only the entry with longest history per session
  const sessions = new Map<string, (typeof entries)[0]>();
  for (const e of entries) {
    const existing = sessions.get(e.sessionId);
    if (!existing || e.history.length > existing.history.length) {
      sessions.set(e.sessionId, e);
    }
  }

  const sorted = [...sessions.values()].sort((a, b) => b.ts.localeCompare(a.ts));

  const rows = sorted.map((s) => {
    const msgs = s.history.filter((m) => m.role !== "assistant" || s.history.indexOf(m) > 0);
    const bubbles = msgs.map((m) => `
      <div style="display:flex;justify-content:${m.role === "user" ? "flex-end" : "flex-start"};margin-bottom:8px">
        <div style="max-width:75%;padding:8px 12px;border-radius:${m.role === "user" ? "12px 12px 3px 12px" : "12px 12px 12px 3px"};background:${m.role === "user" ? "#b30404" : "#f3f4f6"};color:${m.role === "user" ? "#fff" : "#1c2126"};font-size:0.875rem;line-height:1.5;white-space:pre-wrap;word-break:break-word">
          ${m.content.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}
        </div>
      </div>`).join("");

    const date = new Date(s.ts).toLocaleString("cs-CZ", { timeZone: "Europe/Prague" });
    const msgCount = msgs.filter((m) => m.role === "user").length;

    return `
      <div style="background:#fff;border:1px solid #e5e7eb;border-radius:10px;margin-bottom:20px;overflow:hidden">
        <div style="background:#092d62;color:#fff;padding:10px 16px;font-size:0.8rem;display:flex;justify-content:space-between;align-items:center">
          <span>${date}</span>
          <span style="opacity:0.6">${msgCount} otázek · session ${s.sessionId}</span>
        </div>
        <div style="padding:16px">${bubbles}</div>
      </div>`;
  }).join("");

  const html = `<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Chatbot logy — BezKarbonu</title>
  <style>
    *{box-sizing:border-box}
    body{font-family:"DM Sans",sans-serif;background:#f8f9fa;margin:0;padding:24px}
    h1{color:#092d62;font-size:1.4rem;margin:0 0 4px}
    .meta{color:#6b7280;font-size:0.85rem;margin-bottom:24px}
  </style>
</head>
<body>
  <h1>Chatbot konverzace</h1>
  <div class="meta">${sorted.length} session${sorted.length === 1 ? "a" : "í"} · seřazeno od nejnovější</div>
  ${sorted.length === 0 ? "<p style='color:#888'>Zatím žádné konverzace.</p>" : rows}
</body>
</html>`;

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
