"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MapPin, GraduationCap, FileText, Download, MessageCircle, Github, Instagram, Linkedin, Mail, ArrowUpRight, ChevronDown, Search, Bug, Briefcase, Check, Send } from "lucide-react";
import { useApp } from "./App";
import { site, ui, about, facts, education, experience, skills, projects, certs, purposes } from "./data";

const INV = ["nextjs", "github"];
const Logo = ({ k, size = 24 }) => k ? <img className={INV.includes(k) ? "lg inv" : "lg"} width={size} height={size} loading="lazy" alt="" src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${k}/${k}-original.svg`} /> : <Bug size={size - 4} />;
const Tiktok = ({ size = 24 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" /></svg>;
const Head = ({ title, sub }) => <div className="ph"><h1>{title}</h1><p>{sub}</p></div>;

function useTyping(words) {
  const [text, setText] = useState("");
  useEffect(() => {
    let w = 0, i = 0, del = false, tm;
    const tick = () => {
      const word = words[w]; i += del ? -1 : 1; setText(word.slice(0, i));
      let wait = del ? 40 : 90;
      if (!del && i === word.length) { del = true; wait = 1400; } else if (del && i === 0) { del = false; w = (w + 1) % words.length; wait = 350; }
      tm = setTimeout(tick, wait);
    };
    tm = setTimeout(tick, 400);
    return () => clearTimeout(tm);
  }, [words]);
  return text;
}

const socials = () => [[Github, site.github, "GitHub"], [Instagram, site.instagram, "Instagram"], [MessageCircle, `https://wa.me/${site.whatsapp}`, "WhatsApp"], [Tiktok, site.tiktok, "TikTok"], [Mail, `mailto:${site.email}`, "Email"], ...(site.linkedin ? [[Linkedin, site.linkedin, "LinkedIn"]] : [])];

export function Home() {
  const { t, badge } = useApp();
  const [cat, setCat] = useState("All");
  const text = useTyping(t(site.roles));
  const cats = ["All", ...new Set(skills.map((s) => s[2]))];
  const list = skills.filter((s) => cat === "All" || s[2] === cat);
  return (
    <div className="wrap page">
      <section className="hero">
        <p key={badge} className="pill swap"><i />{badge}</p>
        <h1>{t(ui.hi)} <span className="acc">{site.short}</span></h1>
        <p className="full">{site.name}</p>
        <p className="type">&gt; {text}<span className="caret" /></p>
        <p className="meta"><MapPin size={15} />{t(site.location)}</p>
        <p className="meta"><GraduationCap size={15} />Institut Teknologi Del</p>
        <p className="lead">{t(about[0])}</p>
        <div className="btns">
          {site.cv && <><a className="btn pri" href={site.cv} target="_blank" rel="noopener noreferrer"><FileText size={17} />{t(ui.viewcv)}</a><a className="btn" href={site.cv} download><Download size={17} />{t(ui.dl)}</a></>}
          <Link className="btn" href="/contact"><MessageCircle size={17} />{t(ui.contact)}</Link>
        </div>
        <div className="soc">{socials().map(([I, h, n]) => <a key={n} href={h} target="_blank" rel="noopener noreferrer" aria-label={n}><I size={19} /></a>)}</div>
      </section>
      <div className="card stats">{[[projects.length, ui.projects], [certs.length, ui.certs], [skills.length, ui.skills]].map(([n, l], i) => <div key={i}><b>{n}</b><span>{t(l)}</span></div>)}</div>
      <section>
        <h2 className="sh">{t(ui.skills)}</h2><p className="sub">{t(ui.skillsSub)}</p>
        <div className="chips">{cats.map((c) => <button key={c} className={"chip" + (cat === c ? " on" : "")} onClick={() => setCat(c)}>{c === "All" ? t(ui.all) : c}<em>{c === "All" ? skills.length : skills.filter((s) => s[2] === c).length}</em></button>)}</div>
        <div className="sk">{list.map(([n, k, c]) => <div key={n} className="card sk-i"><span className="tile"><Logo k={k} /></span><b>{n}</b><small>{c}</small></div>)}</div>
      </section>
    </div>
  );
}

export function About() {
  const { t } = useApp();
  return (
    <div className="wrap page">
      <Head title={t(ui.aboutT)} sub={t(ui.aboutSub)} />
      <div className="card who">
        <img className="portrait" src="/images/profile.jpg" alt={site.name} />
        <div><h2>{site.name}</h2><p className="type sm">{t(site.roles).join("  ·  ")}</p>{about.map((p, i) => <p key={i}>{t(p)}</p>)}</div>
      </div>
      <div className="facts">{facts.map(([k, v], i) => <div key={i} className="card"><small>{t(k)}</small><b>{t(v)}</b></div>)}</div>
      <h2 className="sh">{t(ui.eduT)}</h2>
      <div className="list">{education.map((e) => <div key={e.school} className="card row"><span className="tile"><GraduationCap size={22} /></span><div><small>{t(e.note)}</small><b>{e.school}</b><p>{t(e.major)} · {e.place}</p></div></div>)}</div>
      <h2 className="sh">{t(ui.expT)}</h2>
      <div className="list">{experience.map((e, i) => <div key={i} className="card row"><span className="tile"><Briefcase size={22} /></span><div><small>{t(e.date)} · {e.org}</small><b>{t(e.title)}</b><p>{t(e.text)}</p></div></div>)}</div>
    </div>
  );
}

function Project({ p }) {
  const { t } = useApp();
  const [open, setOpen] = useState(false);
  return (
    <article className="card pj">
      <img className="cover" style={{ objectPosition: p.pos }} src={p.cover} alt={p.title} loading="lazy" />
      <small>{t(p.year)}</small><h3>{p.title}</h3><p>{t(p.desc)}</p>
      <div className="tags">{p.stack.map(([n, k]) => <span key={n} className="tag"><Logo k={k} size={16} />{n}</span>)}</div>
      <button className="more" onClick={() => setOpen(!open)}>{t(open ? ui.hide : ui.show)}<ChevronDown size={16} className={open ? "up" : ""} /></button>
      {open && (
        <div className="det">
          <h4>{t(ui.feat)}</h4><ul>{t(p.features).map((f) => <li key={f}>{f}</li>)}</ul>
          <h4>{t(ui.role)}</h4><p>{t(p.role)}</p>
          <h4>{t(ui.team)}</h4><img className="cover team" style={{ objectPosition: p.tpos }} src={p.team} alt={p.title} loading="lazy" />
          <a className="btn pri" href={p.repo} target="_blank" rel="noopener noreferrer">{t(ui.code)} <ArrowUpRight size={16} /></a>
        </div>
      )}
    </article>
  );
}
export function Projects() {
  const { t } = useApp();
  return <div className="wrap page"><Head title={t(ui.projT)} sub={t(ui.projSub)} /><div className="grid2">{projects.map((p) => <Project key={p.title} p={p} />)}</div></div>;
}

export function Achievements() {
  const { t } = useApp();
  const [q, setQ] = useState(""), [cat, setCat] = useState("All");
  const cats = ["All", ...new Set(certs.map((c) => c.cat.en))];
  const list = certs.filter((c) => (cat === "All" || c.cat.en === cat) && (t(c.t) + c.by).toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="wrap page">
      <Head title={t(ui.achT)} sub={t(ui.achSub)} />
      <label className="search"><Search size={18} /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t(ui.search)} /></label>
      <div className="chips">{cats.map((c) => <button key={c} className={"chip" + (cat === c ? " on" : "")} onClick={() => setCat(c)}>{c === "All" ? t(ui.all) : t(certs.find((x) => x.cat.en === c).cat)}</button>)}</div>
      <div className="grid2">{list.map((c) => (
        <a key={c.img} className="card cert" href={c.img} target="_blank" rel="noopener noreferrer">
          <img className="cover" src={c.img} alt={t(c.t)} loading="lazy" />
          <small>{t(c.d)}</small><h3>{t(c.t)}</h3><p>{c.by}</p><div className="tags"><span className="tag">{t(c.cat)}</span></div>
        </a>))}
      </div>
      {!list.length && <p className="sub">{t(ui.none)}</p>}
    </div>
  );
}

export function Contact() {
  const { t } = useApp();
  const [step, setStep] = useState(0), [pur, setPur] = useState(-1), [msg, setMsg] = useState(""), [name, setName] = useState("");
  const href = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`${t(ui.hello)} ${name}. ${pur >= 0 ? t(purposes[pur][1]) + ". " : ""}${msg}`)}`;
  const cards = [
    ["gh", Github, site.github, "GitHub", L2("Explore the Code", "Lihat Kodenya"), L2("Explore my open-source work.", "Lihat karya-karyaku.")],
    ["ig", Instagram, site.instagram, "Instagram", L2("Follow Along", "Ikuti Aku"), L2("Behind the scenes and daily life.", "Keseharian dan di balik layar.")],
    ["tt", Tiktok, site.tiktok, "TikTok", L2("Join the Fun", "Ikut Serunya"), L2("Watch fun and engaging content.", "Tonton konten seru dan menarik.")],
    ["wa", MessageCircle, `https://wa.me/${site.whatsapp}`, "WhatsApp", L2("Let's Chat", "Ayo Ngobrol"), L2("Message me directly.", "Kirim pesan langsung.")],
    ["gm", Mail, `mailto:${site.email}`, "Email", L2("Stay in Touch", "Tetap Terhubung"), L2("Reach out for inquiries or collaborations.", "Hubungi untuk pertanyaan atau kolaborasi.")],
    ...(site.linkedin ? [["li", Linkedin, site.linkedin, "LinkedIn", L2("Let's Connect", "Mari Terhubung"), L2("Connect with me professionally.", "Terhubung denganku secara profesional.")]] : []),
  ];
  return (
    <div className="wrap page">
      <Head title={t(ui.conT)} sub={t(ui.conSub)} />
      <h2 className="sh">{t(ui.startT)}</h2><p className="sub">{t(ui.startSub)}</p>
      <div className="card form">
        <div className="steps">{[0, 1, 2].map((i) => <span key={i} className={i === step ? "on" : i < step ? "done" : ""}>{i < step ? <Check size={14} /> : i + 1}</span>)}</div>
        <h3>{t([ui.q1, ui.q2, ui.q3][step])}</h3>
        {step === 0 && <div className="opts">{purposes.map(([e, l], i) => <button key={i} className={"opt" + (pur === i ? " on" : "")} onClick={() => setPur(i)}><span>{e}</span>{t(l)}</button>)}</div>}
        {step === 1 && <textarea rows={4} value={msg} onChange={(e) => setMsg(e.target.value)} placeholder={t(ui.ph2)} />}
        {step === 2 && <input value={name} onChange={(e) => setName(e.target.value)} placeholder={t(ui.ph3)} />}
        <div className="fnav">
          {step > 0 ? <button className="btn" onClick={() => setStep(step - 1)}>{t(ui.back)}</button> : <span />}
          {step < 2 ? <button className="btn pri" disabled={step === 0 && pur < 0} onClick={() => setStep(step + 1)}>{t(ui.next)}</button> : <a className="btn pri" href={href} target="_blank" rel="noopener noreferrer">{t(ui.send)}</a>}
        </div>
      </div>
      <p className="safe">🔒 {t(ui.safe)}</p>
      <h2 className="sh">{t(ui.social)}</h2>
      <div className="grid2">{cards.map(([c, I, h, n, ti, de]) => (
        <div key={c} className={"sc c-" + c}>
          <h3>{t(ti)}</h3><p>{t(de)}</p>
          <a className="go" href={h} target="_blank" rel="noopener noreferrer">{t(ui.go)} {n} <ArrowUpRight size={16} /></a>
          <span className="ico"><I size={34} /></span>
        </div>))}
      </div>
    </div>
  );
}
function L2(en, id) { return { en, id }; }

// Chat Room: shared messages need a small free database (Supabase). Without it, it runs in demo mode on this device only.
const SB = process.env.NEXT_PUBLIC_SUPABASE_URL, KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const hdr = { apikey: KEY, Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" };
export function Chat() {
  const { t, lang } = useApp();
  const [msgs, setMsgs] = useState([]), [name, setName] = useState(""), [text, setText] = useState(""), [err, setErr] = useState(""), [busy, setBusy] = useState(false);
  const live = !!(SB && KEY);
  const load = async () => {
    try {
      if (live) { const r = await fetch(`${SB}/rest/v1/messages?select=id,name,message,created_at&order=created_at.desc&limit=50`, { headers: hdr }); if (r.ok) setMsgs(await r.json()); }
      else setMsgs(JSON.parse(localStorage.getItem("demoChat") || "[]"));
    } catch {}
  };
  useEffect(() => { load(); if (!live) return; const id = setInterval(load, 10000); return () => clearInterval(id); }, []);
  const send = async () => {
    const n = name.trim().slice(0, 40), m = text.trim().slice(0, 300);
    if (!n || !m || busy) return;
    setBusy(true); setErr("");
    try {
      if (live) { const r = await fetch(`${SB}/rest/v1/messages`, { method: "POST", headers: { ...hdr, Prefer: "return=minimal" }, body: JSON.stringify({ name: n, message: m }) }); if (!r.ok) throw new Error("send"); }
      else { const cur = JSON.parse(localStorage.getItem("demoChat") || "[]"); localStorage.setItem("demoChat", JSON.stringify([{ id: Date.now(), name: n, message: m, created_at: new Date().toISOString() }, ...cur].slice(0, 50))); }
      setText(""); await load();
    } catch { setErr(t(ui.chatErr)); }
    setBusy(false);
  };
  const fmt = (d) => new Date(d).toLocaleString(lang === "id" ? "id-ID" : "en-GB", { dateStyle: "short", timeStyle: "short" });
  return (
    <div className="wrap page">
      <Head title={t(ui.chatT)} sub={t(ui.chatSub)} />
      {!live && <p className="note">{t(ui.chatDemo)}</p>}
      <div className="card chat">
        <div className="msgs">
          {msgs.map((m) => <div key={m.id} className="msg"><span><b>{m.name}</b> <small>{fmt(m.created_at)}</small></span><p>{m.message}</p></div>)}
          <div className="msg me"><span><b>Monica</b></span><p>{t(ui.chatHi)}</p></div>
        </div>
        <div className="cform">
          <input value={name} maxLength={40} onChange={(e) => setName(e.target.value)} placeholder={t(ui.name)} />
          <div className="crow">
            <input value={text} maxLength={300} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder={t(ui.chatPh)} />
            <button className="send" onClick={send} disabled={busy} aria-label="Send"><Send size={18} /></button>
          </div>
          {err && <small className="err">{err}</small>}
        </div>
      </div>
    </div>
  );
}
