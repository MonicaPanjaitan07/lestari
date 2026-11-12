// Statistik GitHub. Diambil di server lalu di-cache 1 jam,
// supaya pengunjung tidak kena batas akses GitHub (60x/jam per jaringan).
// Opsional: isi env GITHUB_TOKEN di Vercel untuk batas yang lebih besar.

const USER = "MonicaPanjaitan07";
const HOUR = 3600;

export const revalidate = 3600;

async function get(url, headers = {}) {
  const res = await fetch(url, { headers, next: { revalidate: HOUR } });
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  return res.json();
}

export async function GET() {
  const gh = { Accept: "application/vnd.github+json", "User-Agent": "lestari-portfolio" };
  if (process.env.GITHUB_TOKEN) gh.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  const [user, repos, contrib] = await Promise.allSettled([
    get(`https://api.github.com/users/${USER}`, gh),
    get(`https://api.github.com/users/${USER}/repos?per_page=100&sort=pushed`, gh),
    get(`https://github-contributions-api.jogruber.de/v4/${USER}?y=last`),
  ]);

  const out = { username: USER, url: `https://github.com/${USER}`, ok: [user, repos, contrib].some((r) => r.status === "fulfilled") };

  if (user.status === "fulfilled") {
    const u = user.value;
    out.profile = { repos: u.public_repos, followers: u.followers, following: u.following, since: u.created_at, url: u.html_url };
  }

  if (repos.status === "fulfilled") {
    const own = repos.value.filter((r) => !r.fork);
    const langs = {};
    own.forEach((r) => { if (r.language) langs[r.language] = (langs[r.language] || 0) + 1; });
    out.stars = own.reduce((n, r) => n + r.stargazers_count, 0);
    out.languages = Object.entries(langs).sort((a, b) => b[1] - a[1]).slice(0, 6);
    out.recent = own.slice(0, 6).map((r) => ({
      name: r.name, desc: r.description, lang: r.language, stars: r.stargazers_count, url: r.html_url, pushed: r.pushed_at,
    }));
  }

  if (contrib.status === "fulfilled") {
    const c = contrib.value;
    out.contributions = {
      total: c.total?.lastYear ?? (c.contributions || []).reduce((n, d) => n + d.count, 0),
      days: (c.contributions || []).map((d) => [d.date, d.count, d.level]),
    };
  }

  return Response.json(out, { headers: { "Cache-Control": `s-maxage=${HOUR}, stale-while-revalidate=${HOUR * 6}` } });
}
