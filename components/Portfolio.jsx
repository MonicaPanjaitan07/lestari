"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X, MessageCircle, Music2, Pause, ArrowDown, ArrowUp, ArrowUpRight, Github, Instagram, Linkedin, FileText, Download, Database, Cpu, Palette, Sparkles, Code2 } from "lucide-react";
import Network from "./Network";
import { ui, site, TECH, navLinks, facts, about, education, skills, projects, certs, contacts } from "./data";

const dev = (p) => `https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/${p}.svg`;
const LU = { Databases: Database, "Data Engineering (bootcamp)": Cpu, "UI/UX Design": Palette, Prototyping: Sparkles };
const GI = { Data: Database, Design: Palette, Web: Code2 };

function Ico({ name, size = 20 }) {
  if (TECH[name]) return <img src={dev(TECH[name])} alt="" width={size} height={size} loading="lazy" />;
  const C = LU[name];
  return C ? <C size={size} /> : null;
}

function Logo({ src, fb }) {
  const [bad, setBad] = useState(false);
  const r = useRef(null);
  useEffect(() => { const im = r.current; if (im && im.complete && im.naturalWidth === 0) setBad(true); }, []);
  return <span className="logo">{bad ? <b>{fb}</b> : <img ref={r} src={src} alt="" onError={() => setBad(true)} />}</span>;
}

function Counter({ to }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const run = (now) => {
        const p = Math.min(1, (now - t0) / 1200);
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(run);
      };
      requestAnimationFrame(run);
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{n}</span>;
}

function Typewriter({ words, into }) {
  const [text, setText] = useState("");
  useEffect(() => {
    let w = 0, i = 0, del = false, tm;
    const tick = () => {
      const word = words[w];
      i += del ? -1 : 1;
      setText(word.slice(0, i));
      let wait = del ? 40 : 90;
      if (!del && i === word.length) { del = true; wait = 1400; }
      else if (del && i === 0) { del = false; w = (w + 1) % words.length; wait = 350; }
      tm = setTimeout(tick, wait);
    };
    tm = setTimeout(tick, 500);
    return () => clearTimeout(tm);
  }, [words]);
  return <p className="role">{into} <b>{text}</b><span className="caret" /></p>;
}

function ContactForm({ t }) {
  const [n, setN] = useState(""), [m, setM] = useState("");
  const href = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`${t(ui.hello)} ${n || "..."}. ${m}`)}`;
  return (
    <div className="card form rv">
      <label>{t(ui.name)}<input value={n} onChange={(e) => setN(e.target.value)} placeholder={t(ui.yourName)} /></label>
      <label>{t(ui.message)}<textarea rows={4} value={m} onChange={(e) => setM(e.target.value)} placeholder={t(ui.write)} /></label>
      <a className="cta" href={href} target="_blank" rel="noopener noreferrer">{t(ui.send)}</a>
    </div>
  );
}

export default function Portfolio() {
  const audio = useRef(null);
  const [lang, setLang] = useState("en");
  const [playing, setPlaying] = useState(false);
  const [vol, setVol] = useState(0.5);
  const [open, setOpen] = useState(false);
  const [top, setTop] = useState(false);
  const t = (o) => (o && typeof o === "object" && !Array.isArray(o) && "en" in o ? o[lang] : o);
  const ext = { target: "_blank", rel: "noopener noreferrer" };
  const skillCount = skills.reduce((a, [, items]) => a + items.length, 0);

  useEffect(() => { try { const s = localStorage.getItem("lang"); if (s === "id" || s === "en") setLang(s); } catch {} }, []);
  useEffect(() => { document.documentElement.lang = lang; try { localStorage.setItem("lang", lang); } catch {} }, [lang]);
  useEffect(() => {
    const a = new Audio("/music/lofi-dreamy.mp3"); a.loop = true; a.volume = 0.5; audio.current = a;
    return () => a.pause();
  }, []);
  useEffect(() => { if (audio.current) audio.current.volume = vol; }, [vol]);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.12 });
    document.querySelectorAll(".rv").forEach((el) => io.observe(el));
    const f = () => { const d = document.documentElement; d.style.setProperty("--sp", d.scrollTop / Math.max(1, d.scrollHeight - innerHeight)); setTop(d.scrollTop > 500); };
    const spot = (e) => {
      const c = e.target.closest ? e.target.closest(".card, .b") : null;
      if (!c) return;
      const r = c.getBoundingClientRect();
      c.style.setProperty("--mx", `${e.clientX - r.left}px`);
      c.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    addEventListener("scroll", f, { passive: true });
    addEventListener("pointermove", spot, { passive: true });
    return () => { io.disconnect(); removeEventListener("scroll", f); removeEventListener("pointermove", spot); };
  }, []);

  const play = async () => { try { await audio.current.play(); setPlaying(true); } catch { setPlaying(false); } };
  const toggle = () => (playing ? (audio.current.pause(), setPlaying(false)) : play());
  const explore = () => { if (!playing) play(); document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }); };
  const Title = ({ k, n }) => <h2 className="sec-title rv"><i>{`0${n} /`}</i><span>{t(ui[k])}</span></h2>;
  const marquee = Object.keys(TECH);

  return (
    <main>
      <Network />
      <div className="progress" />
      <header>
        <a href="#home" className="brand" aria-label="Home"><span>&lt;</span>ML<span>/&gt;</span></a>
        <nav className="topnav" aria-label="Navigation">{navLinks.map(([l, h]) => <a key={h} href={h}>{t(l)}</a>)}</nav>
        <button className="lang" onClick={() => setLang(lang === "en" ? "id" : "en")} aria-label="Change language">
          <b className={lang === "en" ? "on" : ""}>EN</b><b className={lang === "id" ? "on" : ""}>ID</b>
        </button>
        <button className="fab menu-btn" onClick={() => setOpen(true)} aria-label="Open menu"><Menu size={22} /></button>
      </header>
      {open && (
        <nav className="sheet" aria-label="Main menu">
          <button className="fab menu-btn" onClick={() => setOpen(false)} aria-label="Close menu"><X size={22} /></button>
          {navLinks.map(([l, h]) => <a key={h} href={h} onClick={() => setOpen(false)}>{t(l)}</a>)}
        </nav>
      )}

      <section id="home" className="wrap hero">
        <div className="hero-text">
          <span className="live"><i />{t(ui.open)}</span>
          <h1 className="hi">{t(ui.hi)}</h1>
          <h1 className="im">{t(ui.im)} <span className="n1">Monica</span> <span className="n2">Putri Lestari</span> <span className="n3">Panjaitan</span></h1>
          <Typewriter words={t(site.roles)} into={t(ui.into)} />
          <div className="actions">
            <button className="cta" onClick={explore}>{t(ui.aboutBtn)} <ArrowDown size={20} /></button>
            {site.cv && <a className="ghost" href={site.cv} {...ext}><FileText size={18} /> {t(ui.cvBtn)}</a>}
          </div>
          <div className="socials">
            <a href="https://www.linkedin.com/" {...ext} aria-label="LinkedIn"><Linkedin size={22} /></a>
            <a href="https://github.com/MonicaPanjaitan07" {...ext} aria-label="GitHub"><Github size={22} /></a>
            <a href="https://instagram.com/lestariiipjtan" {...ext} aria-label="Instagram"><Instagram size={22} /></a>
            <a href={`https://wa.me/${site.whatsapp}`} {...ext} aria-label="WhatsApp"><MessageCircle size={22} /></a>
          </div>
        </div>
        <div className="stage">
          <figure className="polaroid"><img src="/images/profile.jpg" alt={site.name} /></figure>
          <span className="fl f1"><img src={dev(TECH.Laravel)} alt="" /></span>
          <span className="fl f2"><img src={dev(TECH.Figma)} alt="" /></span>
          <span className="fl f3"><img src={dev(TECH["Next.js"])} alt="" /></span>
          <span className="fl f4"><img src={dev(TECH.MySQL)} alt="" /></span>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="track">
          {[...marquee, ...marquee].map((n, i) => (
            <span className="tk" key={i}><img src={dev(TECH[n])} alt="" width="20" height="20" />{n}</span>
          ))}
        </div>
      </div>

      <section id="about" className="wrap sec">
        <Title k="aboutT" n={1} />
        <div className="bento">
          <div className="b photo rv">
            <div className={`pic ${site.collage ? "collage" : ""}`}><img src={site.photo} alt={site.name} /></div>
          </div>
          <div className="b bio rv">
            {about.map((p, i) => <p key={i}>{t(p)}</p>)}
            {site.cv && (
              <div className="actions">
                <a className="cta" href={site.cv} {...ext}><FileText size={18} /> {t(ui.cvBtn)}</a>
                <a className="ghost" href={site.cv} download><Download size={18} /> {t(ui.cvDl)}</a>
              </div>
            )}
          </div>
          <div className="b stat rv">
            <div className="stats">
              <div><strong><Counter to={projects.length} /></strong><span>{t(ui.statProj)}</span></div>
              <div><strong><Counter to={certs.length} /></strong><span>{t(ui.statCert)}</span></div>
              <div><strong><Counter to={skillCount} /></strong><span>{t(ui.statSkill)}</span></div>
            </div>
          </div>
          <div className="b facts rv">
            <dl>{facts.map(([k, v]) => <div key={k.en || k}><dt>{t(k)}</dt><dd>{t(v)}</dd></div>)}</dl>
          </div>
        </div>
      </section>

      <section id="education" className="wrap sec">
        <Title k="eduT" n={2} />
        <div className="timeline">{education.map((e) => (
          <div key={e.school} className="tl">
            <div className="card edu rv">
              <Logo src={e.logo} fb={e.abbr} />
              <div className="edu-text">
                <h3>{e.school}</h3>
                <p>{t(e.major)} · {t(e.place)}</p>
              </div>
              <span className="tagr">{t(e.note)}</span>
            </div>
          </div>
        ))}</div>
      </section>

      <section id="skills" className="wrap sec">
        <Title k="skillsT" n={3} />
        <div className="grid">{skills.map(([g, items]) => {
          const GIc = GI[g.en];
          return (
            <div key={g.en} className="card rv">
              <div className="sk-head"><span className="ico big">{GIc && <GIc size={22} />}</span><h3>{t(g)}</h3></div>
              <ul className="sk-list">{items.map((s) => <li key={s}><span className="ico"><Ico name={s} /></span>{s}</li>)}</ul>
            </div>
          );
        })}</div>
      </section>

      <section id="projects" className="wrap sec">
        <Title k="projectsT" n={4} />
        <div className="grid two">{projects.map((p) => (
          <article key={p.title} className="card proj rv">
            <img className="cover" src={p.cover} alt={p.title} loading="lazy" />
            <p className="meta">{t(p.year)}</p>
            <h3>{p.title}</h3>
            <p>{t(p.desc)}</p>
            <ul>{t(p.features).map((f) => <li key={f}>{f}</li>)}</ul>
            <p className="meta">{t(ui.role)}: {t(p.role)}</p>
            <div className="chips small">{p.stack.map((s) => <span key={s}><Ico name={s} size={14} />{s}</span>)}</div>
            <img className="cover team" src={p.team} alt={`${t(ui.team)} ${p.title}`} loading="lazy" />
            <div className="links"><a href={p.repo} {...ext}>{t(ui.code)} <ArrowUpRight size={16} /></a></div>
          </article>
        ))}</div>
      </section>

      <section id="certs" className="wrap sec">
        <Title k="certsT" n={5} />
        <p className="lead rv">{t(ui.tapZoom)}</p>
        <div className="grid">{certs.map((c) => (
          <a key={c.img} className="card cert rv" href={c.img} {...ext}>
            <img className="cover" src={c.img} alt={t(c.t)} loading="lazy" />
            <p className="meta">{t(c.cat)} · {t(c.d)}</p><h3>{t(c.t)}</h3><p>{c.by}</p>
          </a>
        ))}</div>
      </section>

      <section id="contact" className="wrap sec">
        <Title k="contactT" n={6} />
        <p className="lead rv">{t(ui.contactLead)}</p>
        <div className="two-col">
          <div className="grid two">{contacts.map(([l, v, h]) => (
            <a key={l} className="card contact rv" href={h} {...ext}><span>{l}</span><strong>{v}</strong></a>
          ))}</div>
          <ContactForm t={t} />
        </div>
      </section>

      <footer>© 2026 {site.name}</footer>

      <button className={`fab totop ${top ? "show" : ""}`} onClick={() => scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top"><ArrowUp size={20} /></button>
      <a className="fab chat-btn" aria-label="WhatsApp chat" href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(t(site.chatText))}`} {...ext}><MessageCircle size={24} /></a>
      <div className="music">
        <button onClick={toggle} aria-label="Music">{playing ? <Pause size={18} /> : <Music2 size={18} />}</button>
        <input type="range" min="0" max="1" step="0.05" value={vol} onChange={(e) => setVol(+e.target.value)} aria-label="Volume" />
      </div>
    </main>
  );
}
