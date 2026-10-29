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
  const [lang, setLang] =