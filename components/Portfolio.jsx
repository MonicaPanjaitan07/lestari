"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X, MessageCircle, Music2, Pause, ArrowUpRight, FileDown } from "lucide-react";
import { site, navLinks, facts, about, education, experience, certificates, skills, projects, contacts } from "./data";

const bubbles = [
  [8, 12, 26, 0], [82, 20, 16, 1.5], [18, 46, 14, 3], [86, 58, 30, 2],
  [10, 74, 20, 4], [70, 84, 14, 0.8], [50, 8, 12, 2.4],
];

function Typewriter({ words }) {
  const [text, setText] = useState("");
  useEffect(() => {
    let w = 0, i = 0, del = false, t;
    const tick = () => {
      const word = words[w];
      i += del ? -1 : 1;
      setText(word.slice(0, i));
      let wait = del ? 40 : 90;
      if (!del && i === word.length) { del = true; wait = 1400; }
      else if (del && i === 0) { del = false; w = (w + 1) % words.length; wait = 350; }
      t = setTimeout(tick, wait);
    };
    t = setTimeout(tick, 600);
    return () => clearTimeout(t);
  }, [words]);
  return <p className="role">{text}<span className="caret" /></p>;
}

function Title({ children }) {
  return <h2 className="sec-title"><span>{children}</span></h2>;
}

export default function Portfolio() {
  const audio = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [vol, setVol] = useState(0.5);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const a = new Audio("/music/lofi-dreamy.mp3");
    a.loop = true; a.volume = 0.5; audio.current = a;
    return () => a.pause();
  }, []);
  useEffect(() => { if (audio.current) audio.current.volume = vol; }, [vol]);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);

  const play = async () => { try { await audio.current.play(); setPlaying(true); } catch { setPlaying(false); } };
  const toggle = () => (playing ? (audio.current.pause(), setPlaying(false)) : play());
  const explore = () => { if (!playing) play(); document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }); };
  const ext = { target: "_blank", rel: "noopener noreferrer" };

  return (
    <main>
      <div className="bg" aria-hidden="true">
        {bubbles.map(([x, y, s, d], i) => (
          <span key={i} className="bubble" style={{ left: `${x}%`, top: `${y}%`, width: s, height: s, animationDelay: `${d}s` }} />
        ))}
      </div>

      <header className="topbar">
        <nav className="topnav" aria-label="Navigasi">
          {navLinks.map(([l, h]) => <a key={h} href={h}>{l}</a>)}
        </nav>
        <button className="fab menu-btn" onClick={() => setOpen(true)} aria-label="Buka menu"><Menu size={22} /></button>
      </header>

      {open && (
        <nav className="sheet" aria-label="Menu utama">
          <button className="fab menu-btn" onClick={() => setOpen(false)} aria-label="Tutup menu"><X size={22} /></button>
          {navLinks.map(([l, h]) => <a key={h} href={h} onClick={() => setOpen(false)}>{l}</a>)}
        </nav>
      )}

      <section id="home" className="wrap hero">
        <div className="hero-text">
          <p className="open"><i />{site.open}</p>
          <h1>Welcome to {site.name}&apos;s Portfolio</h1>
          <Typewriter words={site.roles} />
          <p className="tagline">{site.tagline}</p>
          <div className="actions">
            <button className="cta" onClick={explore}>Explore My Journey</button>
            <a className="ghost" href="#projects">Lihat proyek</a>
            {site.cv && <a className="ghost" href={site.cv} download><FileDown size={17} /> CV</a>}
          </div>
        </div>
        <figure className="polaroid">
          <img src="/images/profile.jpeg" alt={`Foto ${site.name}`} />
          <figcaption>Monica ✿ IT Del</figcaption>
        </figure>
      </section>

      <section id="about" className="wrap sec">
        <Title>About me</Title>
        <div className="two-col">
          <div>{about.map((t, i) => <p key={i}>{t}</p>)}</div>
          <dl className="facts">{facts.map(([k, v]) => (<div key={k}><dt>{k}</dt><dd>{v}</dd></div>))}</dl>
        </div>
      </section>

      <section id="education" className="wrap sec">
        <Title>Education</Title>
        {education.map((e) => (
          <div key={e.school} className="card edu">
            <h3>{e.school}</h3>
            <p className="meta">{e.major} · {e.place}</p>
            <p>{e.note}</p>
          </div>
        ))}
      </section>

      {experience.length > 0 && (
        <section id="experience" className="wrap sec">
          <Title>Experience</Title>
          <div className="grid">{experience.map((x) => (
            <div key={x.title} className="card"><h3>{x.title}</h3><p className="meta">{x.where} · {x.when}</p><p>{x.text}</p></div>
          ))}</div>
        </section>
      )}

      <section id="skills" className="wrap sec">
        <Title>Skills</Title>
        <div className="grid skills">
          {skills.map(([g, items]) => (
            <div key={g} className="card">
              <h3>{g}</h3>
              <div className="chips">{items.map((s) => <span key={s}>{s}</span>)}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="wrap sec">
        <Title>Projects</Title>
        <div className="grid">
          {projects.map((p) => (
            <article key={p.title} className="card proj">
              <p className="meta">{p.role}</p>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
              <div className="chips small">{p.stack.map((s) => <span key={s}>{s}</span>)}</div>
              {(p.demo || p.repo) && (
                <div className="links">
                  {p.demo && <a href={p.demo} {...ext}>Demo <ArrowUpRight size={15} /></a>}
                  {p.repo && <a href={p.repo} {...ext}>Kode <ArrowUpRight size={15} /></a>}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      {certificates.length > 0 && (
        <section id="certificates" className="wrap sec">
          <Title>Certificates</Title>
          <div className="grid">{certificates.map((c) => (
            <div key={c.title} className="card"><h3>{c.title}</h3><p className="meta">{c.by} · {c.when}</p></div>
          ))}</div>
        </section>
      )}

      <section id="contact" className="wrap sec">
        <Title>Let&apos;s connect</Title>
        <p className="lead">Terbuka untuk magang, freelance, atau sekadar ngobrol soal teknologi dan desain.</p>
        <div className="grid four">
          {contacts.map(([l, v, h]) => (
            <a key={l} className="card contact" href={h} {...ext}><span>{l}</span><strong>{v}</strong></a>
          ))}
        </div>
      </section>

      <footer>© 2026 {site.name}</footer>

      <a className="fab chat-btn" aria-label="Chat via WhatsApp" href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.chatText)}`} {...ext}><MessageCircle size={24} /></a>

      <div className="music">
        <button onClick={toggle} aria-label={playing ? "Jeda musik" : "Putar musik"}>{playing ? <Pause size={18} /> : <Music2 size={18} />}</button>
        <input type="range" min="0" max="1" step="0.05" value={vol} onChange={(e) => setVol(+e.target.value)} aria-label="Volume" />
      </div>
    </main>
  );
}
