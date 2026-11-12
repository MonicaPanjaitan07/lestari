import { pipeline, redisReady } from "@/lib/redis";

// Analitik pengunjung sederhana.
// POST: catat kunjungan (dipanggil sekali per sesi dari browser).
// GET : kembalikan ringkasan untuk halaman Dashboard.
// Yang disimpan hanya angka & hash anonim — tidak ada IP atau data pribadi.

export const dynamic = "force-dynamic";

const BOT = /bot|crawl|spider|slurp|preview|facebookexternalhit|whatsapp\/|telegrambot|discordbot|headless|lighthouse/i;
const DAYS = 30;

const today = (d = new Date()) => d.toISOString().slice(0, 10);
const lastDays = (n) => Array.from({ length: n }, (_, i) => today(new Date(Date.now() - (n - 1 - i) * 864e5)));

function device(ua) {
  if (/ipad|tablet|(android(?!.*mobile))/i.test(ua)) return "Tablet";
  if (/mobi|iphone|android/i.test(ua)) return "Mobile";
  return "Desktop";
}

function source(ref, utm) {
  const s = `${utm || ""} ${ref || ""}`.toLowerCase();
  if (!s.trim()) return "Direct";
  if (s.includes("instagram") || s.includes(" ig") || s.startsWith("ig")) return "Instagram";
  if (s.includes("tiktok")) return "TikTok";
  if (s.includes("linkedin") || s.includes("lnkd")) return "LinkedIn";
  if (s.includes("whatsapp") || s.includes("wa.me")) return "WhatsApp";
  if (s.includes("google")) return "Google";
  if (s.includes("github")) return "GitHub";
  if (s.includes("facebook") || s.includes("fb.")) return "Facebook";
  return "Other";
}

async function hash(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].slice(0, 12).map((b) => b.toString(16).padStart(2, "0")).join("");
}

const json = (data, init = {}) => Response.json(data, init);

export async function POST(req) {
  if (!redisReady()) return json({ ok: false, reason: "not-configured" });
  const ua = req.headers.get("user-agent") || "";
  if (BOT.test(ua)) return json({ ok: true, skipped: "bot" });

  let body = {};
  try { body = await req.json(); } catch {}
  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "0";
  const country = (req.headers.get("x-vercel-ip-country") || "").toUpperCase();
  let city = req.headers.get("x-vercel-ip-city") || "";
  try { city = decodeURIComponent(city); } catch {}
  const day = today();
  const id = await hash(`${ip}|${ua}`);

  const [, , , isNew] = await pipeline([
    ["INCR", "stats:views"],
    ["HINCRBY", "stats:days", day, 1],
    ["PFADD", `stats:v:${day}`, id],
    ["PFADD", "stats:visitors", id],
  ]);

  // Negara, kota, perangkat & sumber dihitung per pengunjung unik (bukan per halaman).
  if (isNew === 1) {
    const cmds = [
      ["HINCRBY", "stats:devices", device(ua), 1],
      ["HINCRBY", "stats:sources", source(body.ref, body.utm), 1],
    ];
    if (country) cmds.push(["ZINCRBY", "stats:countries", 1, country]);
    if (city) cmds.push(["ZINCRBY", "stats:cities", 1, `${city}|${country}`]);
    await pipeline(cmds);
  }
  return json({ ok: true });
}

const pairs = (arr) => {
  const out = [];
  for (let i = 0; i < (arr || []).length; i += 2) out.push([arr[i], Number(arr[i + 1])]);
  return out;
};

export async function GET() {
  if (!redisReady()) return json({ configured: false });
  const days = lastDays(DAYS);
  const res = await pipeline([
    ["GET", "stats:views"],
    ["PFCOUNT", "stats:visitors"],
    ["HGETALL", "stats:days"],
    ["HGETALL", "stats:devices"],
    ["HGETALL", "stats:sources"],
    ["ZREVRANGE", "stats:countries", 0, 9, "WITHSCORES"],
    ["ZREVRANGE", "stats:cities", 0, 9, "WITHSCORES"],
    ["ZCARD", "stats:countries"],
    ...days.map((d) => ["PFCOUNT", `stats:v:${d}`]),
  ]);
  const [views, visitors, dayViews, devices, sources, countries, cities, countryCount, ...dayVisitors] = res;
  const dv = Object.fromEntries(pairs(dayViews));
  const sortDesc = (o) => pairs(o).sort((a, b) => b[1] - a[1]);

  return json(
    {
      configured: true,
      views: Number(views || 0),
      visitors: Number(visitors || 0),
      countryCount: Number(countryCount || 0),
      devices: sortDesc(devices),
      sources: sortDesc(sources),
      countries: pairs(countries),
      cities: pairs(cities).map(([k, v]) => { const [name, cc] = k.split("|"); return { name, cc, count: v }; }),
      daily: days.map((d, i) => ({ date: d, views: dv[d] || 0, visitors: Number(dayVisitors[i] || 0) })),
      allTime: Object.entries(dv).sort(([a], [b]) => (a < b ? -1 : 1)).map(([date, v]) => ({ date, views: v })),
    },
    { headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" } }
  );
}
