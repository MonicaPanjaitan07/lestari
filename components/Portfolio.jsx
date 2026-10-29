"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X, MessageCircle, Music2, Pause, ArrowDown, ArrowUp, ArrowUpRight, Github, Instagram, Linkedin } from "lucide-react";
import Network from "./Network";
import { ui, site, navLinks, facts, about, education, skills, projects, certs, contacts } from "./data";

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

export default function Portfolio() {
  const audio = useRef(null);
  const [lang, setLang] = useState("en");
  const [playing, setPlaying] = useState(false);
  const [vol, setVol] = useState(0.5);
  const [open, setOpen] = useState(false);
  const [top, setTop] = useState(false);
  const t = (o) => (o && typeof o === "object" && !Array.isArray(o) && "en" in o ? o[lang] : o);
  const ext = { target: "_blank", rel: "noopener noreferrer" };

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
    addEventListener("scroll", f, { passive: true });
    return () => { io.disconnect(); removeEventListener("scroll", f); };
  }, []);

  const play = async () => { try { await audio.current.play(); setPlaying(true); } catch { setPlaying(false); } };
  const toggle = () => (playing ? (audio.current.pause(), setPlaying(false)) : play());
  const explore = () => { if (!playing) play(); document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }); };
  const Title = ({ k }) => <h2 className="sec-title rv"><span>{t(ui[k])}</span></h2>;

  return (
    <main>
      <Network />
      <div className="progress" />
      <header>
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
          <h1 className="hi">{t(ui.hi)}</h1>
          <h1 className="im">{t(ui.im)} <span className="n1">Monica</span> <span className="n2">Putri Lestari</span> <span className="n3">Panjaitan</span></h1>
          <Typewriter words={t(site.roles)} into={t(ui.into)} />
          <div className="actions">
            <button className="cta" onClick={explore}>{t(ui.aboutBtn)} <ArrowDown size={20} /></button>
            {site.cv && <a className="ghost" href={site.cv} download>{t(ui.cv)}</a>}
          </div>
          <div className="socials">
            <a href="https://www.linkedin.com/" {...ext} aria-label="LinkedIn"><Linkedin size={22} /></a>
            <a href="https://github.com/MonicaPanjaitan07" {...ext} aria-label="GitHub"><Github size={22} /></a>
            <a href="https://instagram.com/lestariiipjtan" {...ext} aria-label="Instagram"><Instagram size={22} /></a>
            <a href={`https://wa.me/${site.whatsapp}`} {...ext} aria-label="WhatsApp"><MessageCircle size={22} /></a>
          </div>
        </div>
        <figure className="polaroid"><img src="/images/profile.jpg" alt={site.name} /><figcaption>Monica ✿ IT Del</figcaption></figure>
      </section>

      <section id="about" className="wrap sec">
        <Title k="aboutT" />
        <div className="two-col">
          <div className="rv">
            {about.map((p, i) => <p key={i}>{t(p)}</p>)}
            <dl className="facts">{facts.map(([k, v]) => <div key={k.en || k}><dt>{t(k)}</dt><dd>{t(v)}</dd></div>)}</dl>
          </div>
          <div className="code rv" aria-hidden="true">
            <div className="dots"><i /><i /><i /></div>
            <span className="l" style={{ "--i": 0 }}><em className="k">const</em> monica = {"{"}</span>
            <span className="l" style={{ "--i": 1 }}>{"  "}role: [<em className="s">&quot;Data Analyst&quot;</em>, <em className="s">&quot;UI/UX&quot;</em>, <em className="s">&quot;Web&quot;</em>],</span>
            <span className="l" style={{ "--i": 2 }}>{"  "}campus: <em className="s">&quot;Institut Teknologi Del&quot;</em>,</span>
            <span className="l" style={{ "--i": 3 }}>{"  "}major: <em className="s">&quot;Information Technology&quot;</em>,</span>
            <span className="l" style={{ "--i": 4 }}>{"  "}stack: [<em className="s">&quot;Laravel&quot;</em>, <em className="s">&quot;Figma&quot;</em>, <em className="s">&quot;MySQL&quot;</em>],</span>
            <span className="l" style={{ "--i": 5 }}>{"  "}openToWork: <em className="c">true</em>,</span>
            <span className="l" style={{ "--i": 6 }}>{"}"};</span>
          </div>
        </div>
      </section>

      <section id="education" className="wrap sec">
        <Title k="eduT" />
        <div className="grid two">{education.map((e) => (
          <div key={e.school} className="card rv"><p className="meta">{t(e.note)}</p><h3>{e.school}</h3><p>{t(e.major)} · {t(e.place)}</p></div>
        ))}</div>
      </section>

      <section id="skills" className="wrap sec">
        <Title k="skillsT" />
        <div className="grid skills3">{skills.map(([g, items]) => (
          <div key={g.en} className="card rv"><h3>{t(g)}</h3><div className="chips">{items.map((s) => <span key={s}>{s}</span>)}</div></div>
        ))}</div>
      </section>

      <section id="projects" className="wrap sec">
        <Title k="projectsT" />
        <div className="grid two">{projects.map((p) => (
          <article key={p.title} className="card proj rv">
            <img className="cover" src={p.cover} alt={p.title} loading="lazy" />
            <p className="meta">{t(p.year)}</p>
            <h3>{p.title}</h3>
            <p>{t(p.desc)}</p>
            <ul>{t(p.features).map((f) => <li key={f}>{f}</li>)}</ul>
            <p className="meta">{t(ui.role)}: {t(p.role)}</p>
            <div className="chips small">{p.stack.map((s) => <span key={s}>{s}</span>)}</div>
            <img className="cover team" src={p.team} alt={`${t(ui.team)} ${p.title}`} loading="lazy" />
            <div className="links"><a href={p.repo} {...ext}>{t(ui.code)} <ArrowUpRight size={16} /></a></div>
          </article>
        ))}</div>
      </section>

      <section id="certs" className="wrap sec">
        <Title k="certsT" />
        <p className="lead rv">{t(ui.tapZoom)}</p>
        <div className="grid">{certs.map((c) => (
          <a key={c.img} className="card cert rv" href={c.img} {...ext}>
            <img className="cover" src={c.img} alt={t(c.t)} loading="lazy" />
            <p className="meta">{t(c.cat)} · {t(c.d)}</p><h3>{t(c.t)}</h3><p>{c.by}</p>
          </a>
        ))}</div>
      </section>

      <section id="contact" className="wrap sec">
        <Title k="contactT" />
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
