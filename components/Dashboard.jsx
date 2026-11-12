"use client";

import { useEffect, useMemo, useState } from "react";
import { Eye, Users, Globe, Monitor, Link2, BarChart3, MapPin, Github, Star, BookMarked, GitCommitHorizontal, ArrowUpRight, Activity } from "lucide-react";

// Warna bahasa pemrograman (mengikuti GitHub)
const LANG_COLOR = {
  PHP: "#4F5D95", Blade: "#f7523f", JavaScript: "#f1e05a", TypeScript: "#3178c6", HTML: "#e34c26", CSS: "#663399",
  Python: "#3572A5", Java: "#b07219", Dart: "#00B4AB", Kotlin: "#A97BFF", Vue: "#41b883", "Jupyter Notebook": "#DA5B0B",
};

function useFetch(url) {
  const [state, setState] = useState({ loading: true, data: null, error: false });
  useEffect(() => {
    let alive = true;
    fetch(url).then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data) => alive && setState({ loading: false, data, error: false }))
      .catch(() => alive && setState({ loading: false, data: null, error: true }));
    return () => { alive = false; };
  }, [url]);
  return state;
}

function Stat({ icon: Icon, label, value, big, i, tone }) {
  return (
    <div className={`stat rv${big ? " big" : ""}`} style={{ "--i": i }}>
      <span className={`stat-ic ${tone || ""}`}><Icon size={big ? 20 : 16} /></span>
      <span className="stat-label">{label}</span>
      <strong className="stat-value">{value}</strong>
    </div>
  );
}

function Skeleton({ h = 120 }) {
  return <div className="skel" style={{ height: h }} />;
}

// Grafik garis sederhana (SVG) dengan tooltip saat kursor diarahkan.
function TrendChart({ data, series, fmtDate, labels }) {
  const [hover, setHover] = useState(null);
  const W = 640, H = 220, P = { l: 34, r: 12, t: 14, b: 26 };
  const max = Math.max(4, ...data.flatMap((d) => series.map((s) => d[s.key])));
  const step = Math.ceil(max / 4);
  const top = step * 4;
  const x = (i) => P.l + (data.length < 2 ? 0 : (i * (W - P.l - P.r)) / (data.length - 1));
  const y = (v) => H - P.b - (v / top) * (H - P.t - P.b);
  const path = (k) => data.map((d, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(d[k]).toFixed(1)}`).join("");
  const area = (k) => `${path(k)}L${x(data.length - 1)},${H - P.b}L${x(0)},${H - P.b}Z`;
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * W;
    const i = Math.round(((px - P.l) / (W - P.l - P.r)) * (data.length - 1));
    setHover(Math.max(0, Math.min(data.length - 1, i)));
  };
  const ticks = data.length > 1 ? [0, Math.floor((data.length - 1) / 2), data.length - 1] : [0];
  return (
    <div className="chart">
      <div className="chart-legend">
        {series.map((s) => <span key={s.key}><i style={{ background: s.color }} />{labels[s.key]}</span>)}
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} onMouseMove={onMove} onMouseLeave={() => setHover(null)} role="img" aria-label="Traffic chart">
        {[0, 1, 2, 3, 4].map((k) => (
          <g key={k}>
            <line x1={P.l} x2={W - P.r} y1={y(step * k)} y2={y(step * k)} className="grid" />
            <text x={P.l - 8} y={y(step * k) + 4} textAnchor="end" className="axis">{step * k}</text>
          </g>
        ))}
        {ticks.map((i) => <text key={i} x={x(i)} y={H - 6} textAnchor={i === 0 ? "start" : i === data.length - 1 ? "end" : "middle"} className="axis">{fmtDate(data[i].date)}</text>)}
        {series.map((s) => (
          <g key={s.key}>
            <path d={area(s.key)} fill={s.color} opacity=".12" />
            <path d={path(s.key)} fill="none" stroke={s.color} strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" className="line" />
          </g>
        ))}
        {hover !== null && (
          <g>
            <line x1={x(hover)} x2={x(hover)} y1={P.t} y2={H - P.b} className="cursor" />
            {series.map((s) => <circle key={s.key} cx={x(hover)} cy={y(data[hover][s.key])} r="4" fill={s.color} stroke="var(--card)" strokeWidth="2" />)}
          </g>
        )}
      </svg>
      {hover !== null && (
        <div className="chart-tip" style={{ left: `${(x(hover) / W) * 100}%` }}>
          <strong>{fmtDate(data[hover].date, true)}</strong>
          {series.map((s) => <span key={s.key}><i style={{ background: s.color }} />{labels[s.key]}: {data[hover][s.key]}</span>)}
        </div>
      )}
    </div>
  );
}

function Flag({ cc }) {
  if (!cc || cc.length !== 2) return <Globe size={14} />;
  return <img className="flag" src={`https://flagcdn.com/24x18/${cc.toLowerCase()}.png`} alt="" width="20" height="15" loading="lazy" />;
}

function RankList({ title, icon: Icon, rows, i }) {
  const max = Math.max(1, ...rows.map((r) => r.count));
  return (
    <div className="panel rv" style={{ "--i": i }}>
      <h3 className="panel-h"><Icon size={15} /> {title}</h3>
      {rows.length ? (
        <ol className="rank">
          {rows.map((r, k) => (
            <li key={k}>
              <span className="rank-n">{k + 1}</span>
              <span className="rank-name"><Flag cc={r.cc} /> {r.name}</span>
              <span className="rank-bar"><i style={{ width: `${(r.count / max) * 100}%` }} /></span>
              <span className="rank-c">{r.count}</span>
            </li>
          ))}
        </ol>
      ) : <p className="small">—</p>}
    </div>
  );
}

function Heatmap({ days, fmtDate, T }) {
  // Susun per minggu (kolom) × hari (baris), dimulai hari Minggu.
  const weeks = useMemo(() => {
    if (!days?.length) return [];
    const first = new Date(days[0][0]).getUTCDay();
    const cells = [...Array(first).fill(null), ...days];
    const out = [];
    for (let i = 0; i < cells.length; i += 7) out.push(cells.slice(i, i + 7));
    return out;
  }, [days]);
  return (
    <div className="heat-wrap">
      <div className="heat" role="img" aria-label="GitHub contributions">
        {weeks.map((w, wi) => (
          <div key={wi} className="heat-col">
            {w.map((d, di) => d
              ? <span key={di} className={`hc l${d[2]}`} title={`${d[1]} ${T.contribs} · ${fmtDate(d[0], true)}`} style={{ "--w": wi }} />
              : <span key={di} className="hc empty" />)}
          </div>
        ))}
      </div>
      <div className="heat-legend small">{T.less} <span className="hc l0" /><span className="hc l1" /><span className="hc l2" /><span className="hc l3" /><span className="hc l4" /> {T.more}</div>
    </div>
  );
}

export default function Dashboard({ T, lang, PageHead }) {
  const visits = useFetch("/api/visit");
  const gh = useFetch("/api/github");
  const [range, setRange] = useState("30");
  const D = T.dash;
  const loc = lang === "id" ? "id-ID" : "en-US";
  const nf = (n) => new Intl.NumberFormat(loc).format(n || 0);
  const fmtDate = (s, long) => new Date(s).toLocaleDateString(loc, long ? { day: "numeric", month: "long", year: "numeric" } : { day: "numeric", month: "short" });
  const region = useMemo(() => { try { return new Intl.DisplayNames([loc], { type: "region" }); } catch { return null; } }, [loc]);
  const isLocal = typeof window !== "undefined" && /^(localhost|127\.|192\.168\.)/.test(location.hostname);

  const v = visits.data;
  const showVisits = visits.loading || v?.configured || isLocal;
  const g = gh.data;

  return (
    <>
      <PageHead title={T.nav.dashboard} sub={D.sub} />

      {showVisits && (
        <section>
          <div className="sec-title rv" style={{ "--i": 1 }}>
            <h2><Activity size={18} /> {D.visitors}</h2>
            <p>{D.visitorsSub}</p>
          </div>

          {visits.loading ? (
            <div className="stat-grid"><Skeleton /><Skeleton /></div>
          ) : !v?.configured ? (
            <div className="notice rv" style={{ "--i": 2 }}>
              <strong>{D.notReady}</strong>
              <p>{D.notReadyText}</p>
            </div>
          ) : (
            <>
              <div className="stat-grid">
                <Stat big icon={Eye} label={D.views} value={nf(v.views)} i={2} tone="t1" />
                <Stat big icon={Users} label={D.uniq} value={nf(v.visitors)} i={3} tone="t2" />
              </div>
              <div className="stat-grid three">
                <Stat icon={Globe} label={D.countries} value={nf(v.countryCount)} i={4} />
                <Stat icon={Monitor} label={D.topDevice} value={v.devices[0] ? D.device[v.devices[0][0]] || v.devices[0][0] : "—"} i={5} />
                <Stat icon={Link2} label={D.topSource} value={v.sources[0]?.[0] || "—"} i={6} />
              </div>

              <div className="panel rv" style={{ "--i": 7 }}>
                <div className="panel-top">
                  <h3 className="panel-h"><BarChart3 size={15} /> {D.trend}</h3>
                  <div className="mini-tabs">
                    <button className={range === "30" ? "on" : ""} onClick={() => setRange("30")}>{D.days30}</button>
                    <button className={range === "all" ? "on" : ""} onClick={() => setRange("all")}>{D.allTime}</button>
                  </div>
                </div>
                {range === "30" ? (
                  <TrendChart data={v.daily} fmtDate={fmtDate} labels={{ views: D.views, visitors: D.uniq }}
                    series={[{ key: "views", color: "var(--c1)" }, { key: "visitors", color: "var(--c2)" }]} />
                ) : (
                  <TrendChart data={v.allTime.length ? v.allTime : v.daily} fmtDate={fmtDate} labels={{ views: D.views }}
                    series={[{ key: "views", color: "var(--c1)" }]} />
                )}
              </div>

              <div className="two tight">
                <RankList title={D.topCountries} icon={Globe} i={8}
                  rows={v.countries.map(([cc, n]) => ({ cc, name: region?.of(cc) || cc, count: n }))} />
                <RankList title={D.topCities} icon={MapPin} i={9}
                  rows={v.cities.map((c) => ({ cc: c.cc, name: c.name, count: c.count }))} />
              </div>
            </>
          )}
          <hr className="rule" />
        </section>
      )}

      <section>
        <div className="sec-row">
          <div className="sec-title rv" style={{ "--i": 10 }}>
            <h2><Github size={18} /> GitHub</h2>
            <p>{D.ghSub}</p>
          </div>
          {g?.ok && <a className="link rv" style={{ "--i": 10 }} href={g.profile?.url || g.url} target="_blank" rel="noopener noreferrer">@{g.username} <ArrowUpRight size={14} /></a>}
        </div>

        {gh.loading ? (
          <><div className="stat-grid four"><Skeleton h={96} /><Skeleton h={96} /><Skeleton h={96} /><Skeleton h={96} /></div><Skeleton h={160} /></>
        ) : gh.error || !g?.ok ? (
          <div className="notice"><p>{D.ghError}</p></div>
        ) : (
          <>
            {(() => {
              const cards = [
                g.contributions && <Stat key="c" icon={GitCommitHorizontal} label={D.contribYear} value={nf(g.contributions.total)} i={11} tone="t1" />,
                g.profile && <Stat key="r" icon={BookMarked} label={D.repos} value={nf(g.profile.repos)} i={12} />,
                g.stars !== undefined && <Stat key="s" icon={Star} label={D.stars} value={nf(g.stars)} i={13} />,
                g.profile && <Stat key="f" icon={Users} label={D.followers} value={nf(g.profile.followers)} i={14} />,
              ].filter(Boolean);
              return <div className={`stat-grid ${cards.length >= 4 ? "four" : cards.length === 1 ? "one" : ""}`}>{cards}</div>;
            })()}

            {g.contributions?.days?.length > 0 && (
              <div className="panel rv" style={{ "--i": 15 }}>
                <h3 className="panel-h"><GitCommitHorizontal size={15} /> {D.contribTitle}</h3>
                <Heatmap days={g.contributions.days} fmtDate={fmtDate} T={D} />
              </div>
            )}

            <div className="two tight">
              {g.languages?.length > 0 && (
                <div className="panel rv" style={{ "--i": 16 }}>
                  <h3 className="panel-h">{D.languages}</h3>
                  <div className="lang-bar">
                    {g.languages.map(([name, n]) => <i key={name} style={{ flex: n, background: LANG_COLOR[name] || "var(--muted)" }} title={name} />)}
                  </div>
                  <ul className="lang-list">
                    {g.languages.map(([name, n]) => (
                      <li key={name}><i style={{ background: LANG_COLOR[name] || "var(--muted)" }} />{name}<span>{n} repo</span></li>
                    ))}
                  </ul>
                </div>
              )}
              {g.recent?.length > 0 && (
                <div className="panel rv" style={{ "--i": 17 }}>
                  <h3 className="panel-h">{D.recent}</h3>
                  <ul className="repo-list">
                    {g.recent.map((r) => (
                      <li key={r.name}>
                        <a href={r.url} target="_blank" rel="noopener noreferrer">
                          <strong>{r.name}</strong>
                          <span className="small">
                            {r.lang && <><i style={{ background: LANG_COLOR[r.lang] || "var(--muted)" }} />{r.lang} · </>}
                            {D.updated} {fmtDate(r.pushed)}
                          </span>
                        </a>
                        <ArrowUpRight size={14} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </>
        )}
      </section>
    </>
  );
}
