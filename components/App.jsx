"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { Menu, X, Sun, Moon, MessageCircle } from "lucide-react";
import { site, ui, nav } from "./data";
import SpotifyPlayer from "./SpotifyPlayer";

const Ctx = createContext(null);
export const useApp = () => useContext(Ctx);

export default function App({ children }) {
  const path = usePathname();
  const [lang, setLang] = useState("en"), [theme, setTheme] = useState("light"), [open, setOpen] = useState(false);
  const [bi, setBi] = useState(0);
  const t = (o) => (o && typeof o === "object" && !Array.isArray(o) && "en" in o ? o[lang] : o);

  useEffect(() => {
    try { const l = localStorage.getItem("lang"); if (l === "en" || l === "id") setLang(l); } catch {}
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  }, []);
  useEffect(() => { document.documentElement.lang = lang; try { localStorage.setItem("lang", lang); } catch {} }, [lang]);
  useEffect(() => { document.documentElement.dataset.theme = theme; try { localStorage.setItem("theme", theme); } catch {} }, [theme]);
  useEffect(() => { setOpen(false); }, [path]);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);
  useEffect(() => { const id = setInterval(() => setBi((i) => i + 1), 2600); return () => clearInterval(id); }, []);
  const badge = t(ui.badges)[bi % 3];
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const colors = ["#ff7ba1", "#8b7bff", "#5ef2d0", "#ffd166", "#6ec1ff"];
    const burst = (e) => {
      if (!e.clientX && !e.clientY) return;
      const x = e.clientX, y = e.clientY;
      const ring = document.createElement("span"); ring.className = "ring"; ring.style.cssText = `left:${x}px;top:${y}px`;
      document.body.appendChild(ring); setTimeout(() => ring.remove(), 700);
      for (let i = 0; i < 14; i++) {
        const d = document.createElement("span"), a = Math.random() * 6.283, r = 40 + Math.random() * 60, s = 6 + Math.random() * 8;
        d.className = "dot";
        d.style.cssText = `left:${x}px;top:${y}px;width:${s}px;height:${s}px;background:${colors[i % 5]};--dx:${Math.cos(a) * r}px;--dy:${Math.sin(a) * r}px`;
        document.body.appendChild(d); setTimeout(() => d.remove(), 800);
      }
    };
    const glow = (e) => { const s = document.documentElement.style; s.setProperty("--mx", e.clientX + "px"); s.setProperty("--my", e.clientY + "px"); };
    addEventListener("click", burst); addEventListener("pointermove", glow);
    return () => { removeEventListener("click", burst); removeEventListener("pointermove", glow); };
  }, []);
  const on = (h) => (h === "/" ? path === "/" : path.startsWith(h));

  const Toggles = () => (
    <>
      <div className="seg" role="group" aria-label="Language">
        <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>EN</button>
        <button className={lang === "id" ? "on" : ""} onClick={() => setLang("id")}>ID</button>
      </div>
      <div className="seg" role="group" aria-label="Theme">
        <button className={theme === "light" ? "on" : ""} onClick={() => setTheme("light")} aria-label="Light"><Sun size={16} /></button>
        <button className={theme === "dark" ? "on" : ""} onClick={() => setTheme("dark")} aria-label="Dark"><Moon size={16} /></button>
      </div>
    </>
  );

  return (
    <Ctx.Provider value={{ t, lang, badge }}>
      <div className="glow" aria-hidden="true" />
      <header className="hd">
        <div className="hd-top">
          <Link href="/" className="brand"><img src="/images/profile.jpg" alt="" /><span><b>{site.short} Panjaitan</b><small>{site.handle}</small></span></Link>
          <span key={bi} className="pill sm swap"><i />{badge}</span>
          <div className="hd-tools"><Toggles /></div>
          <button className="icon-btn burger" onClick={() => setOpen(true)} aria-label="Menu"><Menu size={20} /></button>
        </div>
        <nav className="hd-nav">{nav.map(([l, h]) => <Link key={h} href={h} className={on(h) ? "on" : ""}>{t(l)}</Link>)}</nav>
      </header>
      {open && (
        <div className="sheet">
          <button className="icon-btn close" onClick={() => setOpen(false)} aria-label="Close"><X size={20} /></button>
          {nav.map(([l, h]) => <Link key={h} href={h} className={on(h) ? "on" : ""}>{t(l)}</Link>)}
          <div className="sheet-tools"><Toggles /></div>
        </div>
      )}
      {children}
      <footer>© 2026 {site.name}. {t(ui.rights)}</footer>
      <a className="fab" href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><MessageCircle size={24} /></a>
      <SpotifyPlayer />
    </Ctx.Provider>
  );
}