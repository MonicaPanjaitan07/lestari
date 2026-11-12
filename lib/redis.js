// Klien kecil untuk Upstash Redis (REST API) — tanpa library tambahan.
// Env diisi otomatis oleh Vercel saat kamu menambahkan Upstash Redis dari tab "Storage".
const URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || "";
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || "";

export const redisReady = () => Boolean(URL && TOKEN);

// Jalankan beberapa perintah sekaligus. Mengembalikan array hasil.
export async function pipeline(commands) {
  const res = await fetch(`${URL}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(commands),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Redis ${res.status}`);
  const data = await res.json();
  return data.map((d) => (d.error ? null : d.result));
}
