"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { flushSync, createPortal } from "react-dom";
import {
  Home, User, Award, FolderGit2, Mail, Sun, Moon, Leaf, Menu, X, MapPin, GraduationCap, Briefcase,
  Search, ArrowUpRight, ArrowRight, FileDown, Music2, Pause, Copy, Check, Code2, Send, Globe,
  Instagram, Linkedin, Github, LayoutGrid, PanelLeft, PanelTop, Trophy, Layers, Languages, Sparkles, BookOpen,
  Database, Workflow, PenTool, MousePointerClick, MessagesSquare, Users, Bot, Regex,
} from "lucide-react";
import { burst } from "./ClickBurst";
import Dashboard from "./Dashboard";
import { TikTokIcon, WhatsAppIcon } from "./BrandIcons";
import {
  site, socials, ui, about, languages, education, experience, achievements, achievementTypes,
  skillGroups, skills, interests, projects,
} from "./data";

const PAGES = ["home", "about", "dashboard", "achievements", "projects", "contact"];
const NAV_ICON = { home: Home, about: User, achievements: Award, projects: FolderGit2, dashboard: LayoutGrid, contact: Mail };
const THEMES = [["light", Sun], ["dark", Moon], ["nature", Leaf]];
const SOCIAL_ICON = { email: Mail, whatsapp: WhatsAppIcon, linkedin: Linkedin, github: Github, instagram: Instagram, tiktok: TikTokIcon };
const SKILL_ICON = { Database, Workflow, PenTool, MousePointerClick, MessagesSquare, Users, Bot, Sparkles, Regex };
const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/";
const ext = { target: "_blank", rel: "noopener noreferrer" };

const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const store = {
  get: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
  set: (k, v) => { try { localStorage.setItem(k, v); } catch {} },
};

/* ───────── Potongan kecil ───────── */

function PageHead({ title, sub }) {
  return (
    <header className="page-head rv" style={{ "--i": 0 }}>
      <h1 className="split" aria-label={title}>{String(title).split(" ").map((w, i) => <span key={i} className="w" aria-hidden="true"><span style={{ "--k": i }}>{w}</span></span>)}</h1>
      <p>{sub}</p>
    </header>
  );
}

function SecTitle({ icon: Icon, title, sub, i }) {
  return (
    <div className="sec-title rv" style={{ "--i": i }}>
      <h2><Icon size={18} strokeWidth={2} /> {title}</h2>
      {sub && <p>{sub}</p>}
    </div>
  );
}

function CertCard({ c, L, T, onOpen, i }) {
  return (
    <button className={`cert-card rv${c.kind === "course" ? " course" : ""}`} style={{ "--i": i }} onClick={() => onOpen(c)}>
      <div className="cert-img">
        <img src={c.img} alt="" loading="lazy" />
        {c.kind === "course" && <span className="cert-ribbon"><BookOpen size={12} /> {L(achievementTypes[c.type])}</span>}
      </div>
      <div className="cert-body">
        <p className="cert-code">{L(c.code)}</p>
        <h3>{L(c.title)}</h3>
        <p className="cert-issuer">{c.issuer}</p>
        <div className="tags">
          <span className="tag strong">{L(achievementTypes[c.type])}</span>
          {c.tags.map((t, j) => <span key={j} className="tag">{L(t)}</span>)}
        </div>
        <p className="cert-date">{T.issued} {L(c.date)}</p>
      </div>
    </button>
  );
}

function Logo({ src, name }) {
  return (
    <div className="logo">
      {src ? <img src={src} alt={`Logo ${name}`} loading="lazy" /> : <GraduationCap size={22} />}
    </div>
  );
}

/* ───────── Halaman ───────── */

function HomePage({ T, L, go, openCert }) {
  const [filter, setFilter] = useState("all");
  const groups = ["all", ...Object.keys(skillGroups)];
  const count = (g) => (g === "all" ? skills.length : skills.filter((s) => s.group === g).length);
  const shown = filter === "all" ? skills : skills.filter((s) => s.group === filter);

  return (
    <>
      <section className="hero">
        <div className="hero-top rv" style={{ "--i": 0 }}>
          <h1 className="hi">{T.hi}<NameIcon /></h1>
          {site.cv && <a className="btn" href={site.cv} download><FileDown size={15} /> CV</a>}
        </div>
        <ul className="hero-meta rv" style={{ "--i": 1 }}>
          <li><MapPin size={14} /> {site.location}</li>
          <li><GraduationCap size={14} /> {L(site.role)}</li>
        </ul>
        <p className="headline rv" style={{ "--i": 1 }}>{site.headline}</p>
        <p className="hero-intro rv" style={{ "--i": 2 }}>{T.intro}</p>
        <div className="hero-actions rv" style={{ "--i": 3 }}>
          <a href="#contact" className="btn solid" onClick={(e) => go("contact", e)}>{T.contactMe} <ArrowRight size={15} /></a>
          <a href="#about" className="btn" onClick={(e) => go("about", e)}>{T.nav.about}</a>
        </div>
      </section>

      <hr className="rule" />

      <section>
        <SecTitle icon={Code2} title={T.skills} sub={T.skillsSub} i={4} />
        <div className="chips rv" style={{ "--i": 5 }} role="tablist">
          {groups.map((g) => (
            <button key={g} role="tab" aria-selected={filter === g} className={`chip${filter === g ? " on" : ""}`} onClick={() => setFilter(g)}>
              {g === "all" ? T.all : L(skillGroups[g])} <small>{count(g)}</small>
            </button>
          ))}
        </div>
        <ul className="skills rv" style={{ "--i": 6 }} key={filter}>
          {shown.map((s, i) => (
            <li key={L(s.name)} style={{ "--j": i }}>
              {s.icon
                ? <img src={`${DEVICON}${s.icon}.svg`} alt="" className={s.invert ? "invert" : ""} loading="lazy" />
                : s.lucide && SKILL_ICON[s.lucide]
                  ? (() => { const I = SKILL_ICON[s.lucide]; return <span className="skill-ic" style={{ "--sc": s.color }}><I size={13} strokeWidth={2.2} /></span>; })()
                  : <span className="skill-dot" />}
              {L(s.name)}
            </li>
          ))}
        </ul>
      </section>

      <hr className="rule" />

      <section>
        <div className="sec-row">
          <SecTitle icon={Trophy} title={T.latest} sub={T.latestSub} i={7} />
          <a href="#achievements" className="link rv" style={{ "--i": 7 }} onClick={(e) => go("achievements", e)}>
            {T.seeAll} <ArrowRight size={14} />
          </a>
        </div>
        <div className="cert-grid">
          {achievements.filter((c) => c.kind === "official").slice(0, 3).map((c, i) => <CertCard key={c.key} c={c} L={L} T={T} onOpen={openCert} i={8 + i} />)}
        </div>
      </section>
    </>
  );
}

function AboutPage({ T, L, lang }) {
  return (
    <>
      <PageHead title={T.nav.about} sub={T.aboutSub} />
      <section className="about-text">
        {about[lang].map((p, i) => <p key={i} className="rv" style={{ "--i": i + 1 }}>{p}</p>)}
        <p className="rv" style={{ "--i": 4 }}>{T.regards}</p>
        <p className="signature rv" style={{ "--i": 5 }}>Lestari</p>
      </section>

      <hr className="rule" />

      <section>
        <SecTitle icon={GraduationCap} title={T.education} sub={T.educationSub} i={6} />
        <div className="list">
          {education.map((e, i) => (
            <article key={i} className="row-card rv" style={{ "--i": 7 + i }}>
              <Logo src={e.logo} name={e.school} />
              <div>
                <h3>{e.school}</h3>
                <p className="muted">{L(e.detail)} · {e.place}</p>
                {e.years && <p className="small">{e.years}</p>}
              </div>
            </article>
          ))}
        </div>
      </section>

      <hr className="rule" />

      <section>
        <SecTitle icon={Briefcase} title={T.experience} sub={T.experienceSub} i={10} />
        <div className="list">
          {experience.map((x, i) => (
            <article key={i} className="row-card rv" style={{ "--i": 11 + i }}>
              <Logo src={x.logo} name={x.org} />
              <div>
                <h3>{L(x.title)}</h3>
                <p className="muted">{x.org}</p>
                <p className="small">{L(x.when)}</p>
                <p className="row-text">{L(x.text)}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <hr className="rule" />

      <section className="two">
        <div>
          <SecTitle icon={Languages} title={T.languages} sub={T.languagesSub} i={12} />
          <div className="langs">
            {languages.map((l, i) => (
              <div key={i} className="lang rv" style={{ "--i": 13 + i }}>
                <div className="lang-top"><strong>{L(l.name)}</strong><span>{L(l.level)}</span></div>
                <div className="bar"><i style={{ "--w": `${l.pct}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <SecTitle icon={Sparkles} title={T.interests} i={14} />
          <div className="tags big rv" style={{ "--i": 15 }}>
            {interests.map((x, i) => <span key={i} className="tag">{L(x)}</span>)}
          </div>
        </div>
      </section>
    </>
  );
}

function AchievementsPage({ T, L, openCert }) {
  const [tab, setTab] = useState("official");
  const [q, setQ] = useState("");
  const [type, setType] = useState("all");
  const inTab = achievements.filter((c) => c.kind === tab);
  const types = [...new Set(inTab.map((c) => c.type))];
  const list = inTab.filter((c) => {
    const text = `${L(c.title)} ${c.issuer} ${c.tags.map(L).join(" ")}`.toLowerCase();
    return (type === "all" || c.type === type) && text.includes(q.trim().toLowerCase());
  });
  const switchTab = (t) => { setTab(t); setType("all"); setQ(""); };
  return (
    <>
      <PageHead title={T.nav.achievements} sub={T.achSub} />
      <div className="tabs rv" style={{ "--i": 1 }} role="tablist">
        {["official", "course"].map((t) => (
          <button key={t} role="tab" aria-selected={tab === t} className={tab === t ? "on" : ""} onClick={() => switchTab(t)}>
            {t === "official" ? <Award size={15} /> : <BookOpen size={15} />} {T.tabs[t]}
            <small>{achievements.filter((c) => c.kind === t).length}</small>
          </button>
        ))}
        <span className="tab-ink" style={{ "--x": tab === "official" ? 0 : 1 }} aria-hidden="true" />
      </div>
      <p className="tab-note rv" style={{ "--i": 2 }} key={`n-${tab}`}>{T.tabNote[tab]}</p>
      <div className="toolbar rv" style={{ "--i": 3 }}>
        <label className="search">
          <Search size={15} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={T.search} aria-label={T.search} />
        </label>
        <select value={type} onChange={(e) => setType(e.target.value)} aria-label="Filter">
          <option value="all">{T.all}</option>
          {types.map((k) => <option key={k} value={k}>{L(achievementTypes[k])}</option>)}
        </select>
      </div>
      <p className="small rv" style={{ "--i": 4 }}>{T.total}: {list.length}</p>
      {list.length ? (
        <div className="cert-grid" key={tab}>
          {list.map((c, i) => <CertCard key={c.key} c={c} L={L} T={T} onOpen={openCert} i={4 + i} />)}
        </div>
      ) : <p className="empty">{T.empty}</p>}
    </>
  );
}

function ProjectModal({ p, T, L, onClose }) {
  const [zoom, setZoom] = useState(null);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") { e.stopImmediatePropagation(); zoom ? setZoom(null) : onClose(); } };
    window.addEventListener("keydown", onKey, true);
    return () => { window.removeEventListener("keydown", onKey, true); document.body.style.overflow = ""; };
  }, [zoom, onClose]);
  const phones = p.screens.filter((x) => x.kind === "phone");
  const webs = p.screens.filter((x) => x.kind === "web");
  return (
    <div className="modal pmodal" role="dialog" aria-modal="true" aria-label={p.title} onClick={onClose}>
      <article className="pm-card" onClick={(e) => e.stopPropagation()}>
        <button className="icon-btn modal-x" onClick={onClose} aria-label={T.close} autoFocus><X size={18} /></button>
        {p.image && <div className="pm-cover"><img src={p.image} alt={p.title} /></div>}
        <div className="pm-body">
          <p className="proj-label">{L(p.label)}</p>
          <h2 className="pm-title">{p.title}</h2>
          <div className="pm-meta">
            <span><User size={14} /> {T.role}: {p.role}</span>
            <div className="tags">{p.stack.map((x) => <span key={x} className="tag">{x}</span>)}</div>
          </div>
          {(p.demo || p.repo) && (
            <div className="pm-links">
              {p.demo && <a className="btn solid small" href={p.demo} {...ext}><Globe size={14} /> {T.visit} <ArrowUpRight size={14} /></a>}
              {p.repo && <a className="btn small" href={p.repo} {...ext}><Github size={14} /> {T.code} <ArrowUpRight size={14} /></a>}
            </div>
          )}

          <h3 className="pm-h">{T.overview}</h3>
          <div className="pm-text">{L(p.text).map((t, i) => <p key={i}>{t}</p>)}</div>

          {L(p.features).length > 0 && (
            <>
              <h3 className="pm-h">{T.features}</h3>
              <ul className="pm-feats">{L(p.features).map((f, i) => <li key={i}><Check size={15} /> {f}</li>)}</ul>
            </>
          )}

          {p.screens.length > 0 && (
            <>
              <h3 className="pm-h">{T.screens}</h3>
              <div className="pm-stage">
                {phones.length > 0 && (
                  <div className="pm-phones">
                    {phones.map((x, i) => (
                      <figure key={i} style={{ "--k": i }}>
                        <button onClick={() => setZoom(x)} aria-label={L(x.caption)}><img src={x.src} alt={L(x.caption)} loading="lazy" /></button>
                        <figcaption>{L(x.caption)}</figcaption>
                      </figure>
                    ))}
                  </div>
                )}
                {webs.length > 0 && <div className={`pm-webs${webs.length > 1 ? " multi" : ""}`}>{webs.map((x, i) => (
                  <figure key={i} className={`pm-web${x.wide ? " wide" : ""}`} style={{ "--k": i }}>
                    <button onClick={() => setZoom(x)} aria-label={L(x.caption)}><img src={x.src} alt={L(x.caption)} loading="lazy" /></button>
                    <figcaption>{L(x.caption)}</figcaption>
                  </figure>
                ))}</div>}
              </div>
            </>
          )}

          {p.team.length > 0 && (
            <>
              <h3 className="pm-h">{T.team}</h3>
              <div className={`pm-team n${p.team.length}`}>
                {p.team.map((x, i) => (
                  <figure key={i}>
                    <button onClick={() => setZoom(x)} aria-label={L(x.caption)}><img src={x.src} alt={L(x.caption)} loading="lazy" /></button>
                    <figcaption>{L(x.caption)}</figcaption>
                  </figure>
                ))}
              </div>
            </>
          )}
        </div>
      </article>
      {zoom && (
        <div className="zoom" onClick={(e) => { e.stopPropagation(); setZoom(null); }}>
          <img src={zoom.src} alt={L(zoom.caption)} />
          <p>{L(zoom.caption)}</p>
        </div>
      )}
    </div>
  );
}

function ProjectsPage({ T, L }) {
  const [open, setOpen] = useState(null);
  return (
    <>
      <PageHead title={T.nav.projects} sub={T.projSub} />
      <div className="proj-grid">
        {projects.map((p, i) => (
          <article key={p.key} className="proj rv" style={{ "--i": i + 1 }}>
            <button className="proj-cover" onClick={() => setOpen(p)} aria-label={`${T.details}: ${p.title}`}>
              {p.image ? <img src={p.image} alt="" loading="lazy" /> : (
                <div className="proj-ph"><Layers size={20} /><span>{p.title}</span></div>
              )}
              <span className="proj-hover">{T.details} <ArrowUpRight size={14} /></span>
            </button>
            <div className="proj-body">
              <p className="proj-label">{L(p.label)} · {p.role}</p>
              <h3>{p.title}</h3>
              <p>{L(p.short)}</p>
              <div className="tags">{p.stack.map((s) => <span key={s} className="tag">{s}</span>)}</div>
              <div className="proj-links">
                <button className="btn solid small" onClick={() => setOpen(p)}>{T.details}</button>
                {p.demo && <a className="btn small" href={p.demo} {...ext}><Globe size={14} /> {T.visit}</a>}
                {p.repo && <a className="btn small" href={p.repo} {...ext}><Github size={14} /> {T.code}</a>}
              </div>
            </div>
          </article>
        ))}
      </div>
      {open && typeof document !== "undefined" && createPortal(<ProjectModal p={open} T={T} L={L} onClose={() => setOpen(null)} />, document.body)}
    </>
  );
}

function ContactPage({ T }) {
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [copied, setCopied] = useState(false);
  const body = `${msg}${name ? `\n\n— ${name}` : ""}`;
  const copy = async () => {
    try { await navigator.clipboard.writeText(site.email); } catch {}
    setCopied(true); setTimeout(() => setCopied(false), 1600);
  };
  return (
    <>
      <PageHead title={T.nav.contact} sub={T.contactSub} />
      <section>
        <SecTitle icon={Send} title={T.findMe} i={1} />
        <div className="social-grid">
          {socials.map((s, i) => {
            const Icon = SOCIAL_ICON[s.key];
            return (
              <a key={s.key} href={s.href} {...ext} className={`social rv s-${s.key}`} style={{ "--i": 2 + i }}>
                <span className="social-ic"><Icon size={18} /></span>
                <span className="social-txt"><small>{s.label}</small><strong>{s.value}</strong></span>
                <ArrowUpRight size={16} className="social-go" />
              </a>
            );
          })}
        </div>
        <button className="btn ghost small rv" style={{ "--i": 7 }} onClick={copy}>
          {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? T.copied : `${T.copy} email`}
        </button>
      </section>

      <hr className="rule" />

      <section>
        <SecTitle icon={Mail} title={T.sendMsg} sub={T.sendMsgSub} i={8} />
        <form className="form rv" style={{ "--i": 9 }} onSubmit={(e) => e.preventDefault()}>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder={T.yourName} aria-label={T.yourName} />
          <textarea value={msg} onChange={(e) => setMsg(e.target.value)} placeholder={T.yourMsg} aria-label={T.yourMsg} rows={5} />
          <div className="form-actions">
            <a className={`btn solid${msg.trim() ? "" : " disabled"}`} aria-disabled={!msg.trim()} {...ext}
              href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(body)}`}><WhatsAppIcon size={15} /> {T.viaWa}</a>
            <a className={`btn${msg.trim() ? "" : " disabled"}`} aria-disabled={!msg.trim()}
              href={`mailto:${site.email}?subject=${encodeURIComponent(`Halo Lestari${name ? ` — ${name}` : ""}`)}&body=${encodeURIComponent(body)}`}><Mail size={15} /> {T.viaMail}</a>
          </div>
        </form>
      </section>
    </>
  );
}

// Status yang berganti otomatis (fade out → fade in tiap ±2,8 detik).
function RotatingStatus({ items }) {
  const [i, setI] = useState(0);
  const [w, setW] = useState(null);
  const box = useRef(null);
  useEffect(() => {
    setI(0);
    if (items.length < 2 || reduced()) return;
    const id = setInterval(() => setI((n) => (n + 1) % items.length), 2800);
    return () => clearInterval(id);
  }, [items]);
  // Lebar kotak menyesuaikan panjang teks yang sedang tampil (berubah halus)
  useEffect(() => {
    const el = box.current?.querySelector(".rot > span.on");
    if (el) setW(el.scrollWidth);
  }, [i, items]);
  return (
    <span className="status" role="status" aria-live="polite" ref={box}>
      <i aria-hidden="true" />
      <span className="rot" style={w ? { width: w } : undefined}>
        {items.map((t, k) => <span key={k} className={k === i ? "on" : ""} aria-hidden={k !== i}>{t}</span>)}
      </span>
    </span>
  );
}

// Ikon bergerak di samping nama (video kecil yang berulang).
function NameIcon({ small }) {
  const v = useRef(null);
  useEffect(() => { const el = v.current; if (el) { el.muted = true; el.play().catch(() => {}); } }, []);
  return (
    <span className={`name-icon${small ? " sm" : ""}`} aria-hidden="true">
      <video ref={v} autoPlay muted loop playsInline preload="auto" poster="/icon/ikon-poster.jpg">
        <source src="/icon/ikon.webm" type="video/webm" />
        <source src="/icon/ikon.mp4" type="video/mp4" />
      </video>
    </span>
  );
}

/* ───────── Kerangka utama ───────── */

export default function Portfolio() {
  const [page, setPage] = useState("home");
  const [lang, setLang] = useState("id");
  const [theme, setTheme] = useState("light");
  const [layout, setLayout] = useState("side");
  const [drawer, setDrawer] = useState(false);
  const [cert, setCert] = useState(null);
  const [photo, setPhoto] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audio = useRef(null);
  const mainRef = useRef(null);
  const navReady = useRef(false);

  const T = ui[lang];
  const L = useMemo(() => (v) => (v && typeof v === "object" && !Array.isArray(v) ? v[lang] ?? v.id : v), [lang]);

  // Pengaturan tersimpan + halaman dari URL (#about, dst.)
  useEffect(() => {
    setTheme(document.documentElement.dataset.theme || "light");
    setLayout(document.documentElement.dataset.layout === "top" ? "top" : "side");
    const l = store.get("lang");
    if (l === "en" || l === "id") setLang(l);
    const fromHash = () => {
      const h = location.hash.slice(1);
      setPage(PAGES.includes(h) ? h : "home");
    };
    fromHash();
    window.addEventListener("popstate", fromHash);
    return () => window.removeEventListener("popstate", fromHash);
  }, []);

  // Catat kunjungan (sekali per sesi) untuk halaman Dashboard.
  useEffect(() => {
    try {
      if (sessionStorage.getItem("visited")) return;
      sessionStorage.setItem("visited", "1");
    } catch {}
    const utm = new URLSearchParams(location.search).get("utm_source") || "";
    const ref = document.referrer && !document.referrer.includes(location.host) ? document.referrer : "";
    fetch("/api/visit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ref, utm }), keepalive: true }).catch(() => {});
  }, []);

  useEffect(() => { document.title = `${page === "home" ? "" : `${T.nav[page]} | `}${site.name}`; }, [page, T]);

  // Musik langsung diputar saat web dibuka. Kalau browser memblokir autoplay,
  // musik mulai pada sentuhan/klik/scroll/tombol pertama di mana saja.
  useEffect(() => {
    const a = new Audio(site.music);
    a.loop = true; a.volume = 0.5; a.preload = "auto"; audio.current = a;
    a.addEventListener("play", () => setPlaying(true));
    a.addEventListener("pause", () => setPlaying(false));
    const events = ["pointerdown", "keydown", "touchstart", "wheel", "scroll"];
    const unlock = (ev) => {
      if (ev?.target?.closest?.(".fab-music")) return; // tombol musik ditangani sendiri
      events.forEach((ev) => window.removeEventListener(ev, unlock, true));
      if (store.get("music") !== "off" && a.paused) a.play().catch(() => {});
    };
    if (store.get("music") !== "off") {
      a.play().catch(() => events.forEach((ev) => window.addEventListener(ev, unlock, { capture: true, passive: true })));
    }
    return () => { events.forEach((ev) => window.removeEventListener(ev, unlock, true)); a.pause(); };
  }, []);
  const toggleMusic = async (e) => {
    e?.stopPropagation();
    const a = audio.current;
    if (!a.paused) { a.pause(); store.set("music", "off"); return; }
    store.set("music", "on");
    try { await a.play(); } catch {}
  };

  useEffect(() => {
    document.body.style.overflow = drawer || cert || photo ? "hidden" : "";
  }, [drawer, cert, photo]);
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") { setCert(null); setPhoto(false); setDrawer(false); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Pindah halaman
  const go = (id, e) => {
    e?.preventDefault();
    setDrawer(false);
    if (id === page) return window.scrollTo({ top: 0, behavior: "smooth" });
    const swap = () => {
      setPage(id);
      window.scrollTo(0, 0);
      history.pushState(null, "", id === "home" ? location.pathname : `#${id}`);
    };
    // Gelombang riak kecil dari titik klik
    if (e && e.detail !== 0 && e.clientX) burst(e.clientX, e.clientY);
    else {
      const el = e?.currentTarget?.getBoundingClientRect?.();
      if (el) burst(el.left + 24, el.top + el.height / 2);
    }
    // Ikon menu yang diklik memantul
    const ic = e?.currentTarget?.querySelector?.("svg");
    if (ic) { ic.classList.remove("pop"); void ic.getBoundingClientRect(); ic.classList.add("pop"); }
    // Halaman lama bergeser keluar (blur), lalu halaman baru masuk dari kanan
    const pg = mainRef.current?.querySelector(".page");
    if (reduced() || !pg) return swap();
    pg.classList.add("leaving");
    setTimeout(swap, 220);
  };

  // Ganti tema: lingkaran melebar dari tombol yang diklik
  const pickTheme = (next, e) => {
    if (next === theme) return;
    const apply = () => { document.documentElement.dataset.theme = next; setTheme(next); store.set("theme", next); };
    if (!document.startViewTransition || reduced()) return apply();
    const x = e.clientX || 80, y = e.clientY || 160;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    document.startViewTransition(() => flushSync(apply)).ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 600, easing: "cubic-bezier(.65,0,.35,1)", pseudoElement: "::view-transition-new(root)" }
      );
    });
  };

  // Ganti bahasa: teks blur sebentar
  const pickLang = (next) => {
    if (next === lang) return;
    const m = mainRef.current;
    const apply = () => { setLang(next); store.set("lang", next); document.documentElement.lang = next; };
    if (reduced() || !m) return apply();
    m.classList.add("swap-out");
    setTimeout(() => { apply(); m.classList.remove("swap-out"); m.classList.add("swap-in"); setTimeout(() => m.classList.remove("swap-in"), 400); }, 170);
  };

  // Dua posisi navigasi (desktop): sidebar kiri ↔ bar atas
  const toggleLayout = () => {
    const next = layout === "side" ? "top" : "side";
    const apply = () => { document.documentElement.dataset.layout = next; setLayout(next); store.set("layout", next); };
    if (!document.startViewTransition || reduced()) return apply();
    document.startViewTransition(() => flushSync(apply));
  };
  const LayoutBtn = (
    <button className="layout-btn" onClick={toggleLayout} aria-label={T.layoutLabel} title={layout === "side" ? T.layoutTop : T.layoutSide}>
      {layout === "side" ? <PanelTop size={16} /> : <PanelLeft size={16} />}
    </button>
  );

  // Sorotan menu aktif yang meluncur ke menu yang dipilih
  useEffect(() => {
    const place = (instant) => document.querySelectorAll(".nav").forEach((nav) => {
      const a = nav.querySelector("a.on"), ink = nav.querySelector(".nav-ink");
      if (!a || !ink) return;
      const top = !!nav.closest(".topbar");
      if (instant) ink.style.transition = "none";
      ink.style.width = `${a.offsetWidth}px`;
      ink.style.height = top ? "2px" : `${a.offsetHeight}px`;
      ink.style.transform = `translate(${a.offsetLeft}px, ${top ? a.offsetTop + a.offsetHeight - 2 : a.offsetTop}px)`;
      ink.style.opacity = "1";
      if (instant) { void ink.offsetWidth; ink.style.transition = ""; }
    });
    place(!navReady.current); navReady.current = true;
    const onR = () => place(true);
    window.addEventListener("resize", onR);
    return () => window.removeEventListener("resize", onR);
  }, [page, layout, lang, drawer]);

  const Toggles = (
    <div className="toggles">
      <div className="seg" role="group" aria-label={T.lang}>
        {["id", "en"].map((l) => (
          <button key={l} className={lang === l ? "on" : ""} onClick={() => pickLang(l)} aria-pressed={lang === l}>{l.toUpperCase()}</button>
        ))}
      </div>
      <div className="seg" role="group" aria-label="Theme">
        {THEMES.map(([k, Icon]) => (
          <button key={k} className={theme === k ? "on" : ""} onClick={(e) => pickTheme(k, e)} aria-pressed={theme === k} title={T.theme[k]} aria-label={T.theme[k]}>
            <Icon size={14} />
          </button>
        ))}
      </div>
      {LayoutBtn}
    </div>
  );

  const Nav = (
    <nav className="nav" aria-label="Navigasi">
      <span className="nav-ink" aria-hidden="true" />
      {PAGES.map((id) => {
        const Icon = NAV_ICON[id];
        return (
          <a key={id} href={id === "home" ? "#" : `#${id}`} className={page === id ? "on" : ""} aria-current={page === id ? "page" : undefined} onClick={(e) => go(id, e)}>
            <Icon size={17} strokeWidth={1.8} /> <span>{T.nav[id]}</span> <ArrowRight size={14} className="nav-arrow" />
          </a>
        );
      })}
    </nav>
  );

  const Profile = (
    <div className="profile">
      <button className="avatar" onClick={() => setPhoto(true)} aria-label={site.name}>
        <img src={site.avatar} alt={site.name} />
      </button>
      <h2 className="who">{site.name}</h2>
      <p className="handle">{site.handle}</p>
      <RotatingStatus items={site.statuses[lang]} />
    </div>
  );

  const pageProps = { T, L, lang, go, openCert: setCert };

  return (
    <>

      {/* Header HP */}
      <header className="mobile-bar">
        <a href="#" className="mb-id" onClick={(e) => go("home", e)}>
          <img src={site.avatar} alt="" />
          <span className="mb-name">{site.name}</span>
        </a>
        <button className="icon-btn" onClick={() => setDrawer((d) => !d)} aria-label={T.menu} aria-expanded={drawer}>
          {drawer ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>
      {drawer && (
        <div className="drawer" role="dialog" aria-modal="true" aria-label={T.menu}>
          {Profile}
          {Toggles}
          {Nav}
        </div>
      )}

      <div className={`shell ${layout}`}>
        {layout === "side" ? (
          <aside className="sidebar">
            {Profile}
            {Toggles}
            <hr className="rule thin" />
            {Nav}
            <hr className="rule thin" />
            <div className="side-foot">
              <p>© 2026 {site.short}. {T.rights}</p>
            </div>
          </aside>
        ) : (
          <header className="topbar">
            <div className="tb-row">
              <div className="tb-id">
                <button className="avatar sm" onClick={() => setPhoto(true)} aria-label={site.name}><img src={site.avatar} alt={site.name} /></button>
                <div>
                  <p className="who">{site.name}</p>
                  <p className="handle">{site.handle}</p>
                </div>
                <RotatingStatus items={site.statuses[lang]} />
              </div>
              {Toggles}
            </div>
            {Nav}
          </header>
        )}

        <main ref={mainRef} className="content">
          <div className="page" key={page}>
            {page === "home" && <HomePage {...pageProps} />}
            {page === "about" && <AboutPage {...pageProps} />}
            {page === "achievements" && <AchievementsPage {...pageProps} />}
            {page === "projects" && <ProjectsPage {...pageProps} />}
            {page === "dashboard" && <Dashboard {...pageProps} PageHead={PageHead} />}
            {page === "contact" && <ContactPage {...pageProps} />}
          </div>
          <footer className={`mobile-foot${layout === "top" ? " show" : ""}`}>© 2026 {site.name}. {T.rights}</footer>
        </main>
      </div>

      {cert && (
        <div className="modal" role="dialog" aria-modal="true" aria-label={L(cert.title)} onClick={() => setCert(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="icon-btn modal-x" onClick={() => setCert(null)} aria-label={T.close} autoFocus><X size={18} /></button>
            <img src={cert.img} alt={L(cert.title)} />
            <div className="modal-info">
              <span className="tag strong">{L(achievementTypes[cert.type])}</span>
              <h3>{L(cert.title)}</h3>
              <p className="muted">{cert.issuer}</p>
              <dl>
                <div><dt>{T.issued}</dt><dd>{L(cert.date)}</dd></div>
                {cert.valid && <div><dt>{T.validUntil}</dt><dd>{L(cert.valid)}</dd></div>}
                <div><dt>{T.credential}</dt><dd className="mono">{L(cert.code)}</dd></div>
              </dl>
              <a className="btn solid small" href={cert.pdf} {...ext}>{T.openPdf} <ArrowUpRight size={14} /></a>
            </div>
          </div>
        </div>
      )}

      {photo && (
        <div className="modal" role="dialog" aria-modal="true" aria-label={site.name} onClick={() => setPhoto(false)}>
          <div className="photo-card" onClick={(e) => e.stopPropagation()}>
            <button className="icon-btn modal-x" onClick={() => setPhoto(false)} aria-label={T.close} autoFocus><X size={18} /></button>
            <img src={site.photo} alt={site.name} />
          </div>
        </div>
      )}

      <button className={`fab fab-music${playing ? " on" : ""}`} onClick={toggleMusic} aria-label={T.music} data-label={`${playing ? "❚❚" : "▶"} ${T.music}`}>
        {playing ? <span className="eq" aria-hidden="true"><i /><i /><i /><i /></span> : <Music2 size={20} />}
      </button>

      <a className="fab" aria-label={T.chat} href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.chatText)}`} {...ext}>
        <WhatsAppIcon size={22} />
      </a>
    </>
  );
}
