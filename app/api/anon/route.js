import { pipeline, redisReady } from "@/lib/redis";

// Pesan anonim dari halaman "Pesan Anonim".
// - Pesan diteruskan ke WhatsApp Lestari lewat CallMeBot (isi CALLMEBOT_PHONE & CALLMEBOT_APIKEY di Vercel).
// - Salinan pesan disimpan di Upstash Redis (list "anon:msgs") sebagai cadangan.
// - Pengirim tetap anonim: yang dikirim hanya isi pesan. IP cuma dipakai (dalam bentuk hash) untuk membatasi spam.

export const dynamic = "force-dynamic";

const MAX = 500;
const LIMIT_PER_HOUR = 5;

async function hash(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].slice(0, 12).map((b) => b.toString(16).padStart(2, "0")).join("");
}

const json = (data, status = 200) => Response.json(data, { status });

export async function POST(req) {
  let body = {};
  try { body = await req.json(); } catch {}

  // Kolom jebakan untuk bot: manusia tidak melihatnya, bot biasanya mengisinya.
  if (body.website) return json({ ok: true });

  const message = String(body.message || "").replace(/\r/g, "").trim().slice(0, MAX);
  if (!message) return json({ ok: false, reason: "empty" }, 400);

  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "0";

  if (redisReady()) {
    const key = `anon:rl:${await hash(ip)}`;
    const [, count] = await pipeline([["SET", key, 0, "EX", 3600, "NX"], ["INCR", key]]);
    if (Number(count) > LIMIT_PER_HOUR) return json({ ok: false, reason: "limit" }, 429);
    await pipeline([["LPUSH", "anon:msgs", JSON.stringify({ m: message, t: new Date().toISOString() })], ["LTRIM", "anon:msgs", 0, 499]]);
  }

  const phone = process.env.CALLMEBOT_PHONE;
  const apikey = process.env.CALLMEBOT_APIKEY;
  let sent = false;
  if (phone && apikey) {
    const text = `💌 Pesan anonim dari portofolio:\n\n${message}`;
    const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(phone)}&text=${encodeURIComponent(text)}&apikey=${encodeURIComponent(apikey)}`;
    try { sent = (await fetch(url, { cache: "no-store" })).ok; } catch {}
  }

  if (!sent && !redisReady()) return json({ ok: false, reason: "not-configured" }, 503);
  return json({ ok: true });
}
