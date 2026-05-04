import { put, list } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

const SECRET = process.env.LOGS_SECRET ?? "bzkadmin";

export async function GET(req: NextRequest) {
  if (req.nextUrl.searchParams.get("key") !== SECRET) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const results: Record<string, unknown> = {
    BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN ? "✅ nastaven" : "❌ CHYBÍ",
  };

  // Test write
  try {
    const { url } = await put(`debug/test-${Date.now()}.txt`, "test", { access: "public", addRandomSuffix: false });
    results.write = `✅ OK — ${url}`;
  } catch (e: unknown) {
    results.write = `❌ CHYBA: ${e instanceof Error ? e.message : String(e)}`;
  }

  // Test list
  try {
    const { blobs } = await list({ prefix: "conversations/", limit: 10 });
    results.list = `✅ OK — ${blobs.length} záznamů`;
    results.blobs = blobs.map(b => ({ url: b.url, size: b.size, uploadedAt: b.uploadedAt }));
  } catch (e: unknown) {
    results.list = `❌ CHYBA: ${e instanceof Error ? e.message : String(e)}`;
  }

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Blob debug</title>
  <style>body{font-family:sans-serif;padding:32px;max-width:800px}pre{background:#f4f4f4;padding:16px;border-radius:8px;white-space:pre-wrap;word-break:break-all}</style>
  </head><body>
  <h2>Blob diagnostika</h2>
  <pre>${JSON.stringify(results, null, 2)}</pre>
  </body></html>`;

  return new NextResponse(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}
