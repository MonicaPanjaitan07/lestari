"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

// Transisi polkadot: layar tertutup bulatan-bulatan, halaman pindah, lalu bulatannya mengecil lagi.
// Pola munculnya bulatan berbeda untuk tiap bagian (lihat `delayFor`).

const SPREAD = 420; // ms, jarak waktu bulatan pertama s/d terakhir
const GROW = 380; // ms, durasi satu bulatan membesar/mengecil
const EASE = "cubic-bezier(.65,0,.35,1)";
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

function delayFor(variant, d, ctx) {
  const { w, h, ox, oy, rows, cols, maxDist } = ctx;
  switch (variant) {
    case "diagonal":
      return ((d.x / w + d.y / h) / 2) * SPREAD;
    case "rows": // gelombang dari atas ke bawah, kolom selang-seling
      return ((d.r + (d.c % 2) * 0.6) / (rows + 0.6)) * SPREAD;
    case "columns":
      return (d.c / cols) * SPREAD;
    case "random":
      return d.rand * SPREAD;
    default: // radial, menyebar dari titik klik
      return (Math.hypot(d.x - ox, d.y - oy) / maxDist) * SPREAD;
  }
}

const DotTransition = forwardRef(function DotTransition({ intro }, ref) {
  const root = useRef(null);
  const label = useRef(null);
  const busy = useRef(false);

  const build = () => {
    const el = root.current;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const size = w < 640 ? 46 : 62;
    const cols = Math.ceil(w / size) + 1;
    const rows = Math.ceil(h / size) + 1;
    const offX = (w - (cols - 1) * size) / 2;
    const offY = (h - (rows - 1) * size) / 2;
    el.querySelectorAll(".dot").forEach((d) => d.remove());
    const frag = document.createDocumentFragment();
    const dots = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const s = document.createElement("span");
        const x = offX + c * size;
        const y = offY + r * size;
        s.className = "dot";
        s.style.cssText = `left:${x}px;top:${y}px;width:${size * 1.5}px;height:${size * 1.5}px`;
        frag.append(s);
        dots.push({ el: s, x, y, r, c, rand: Math.random() });
      }
    }
    el.prepend(frag);
    return { dots, w, h, rows, cols };
  };

  const run = (dots, delays, dir) => {
    const from = "translate(-50%,-50%) scale(0)";
    const to = "translate(-50%,-50%) scale(1)";
    const kf = dir === "in" ? [{ transform: from }, { transform: to }] : [{ transform: to }, { transform: from }];
    return Promise.all(
      dots.map((d, i) => d.el.animate(kf, { duration: GROW, delay: delays[i], easing: EASE, fill: "forwards" }).finished)
    );
  };

  const showLabel = (text, on) => {
    const l = label.current;
    if (on) l.textContent = text;
    return l.animate(
      on
        ? [{ opacity: 0, transform: "translateY(14px)" }, { opacity: 1, transform: "none" }]
        : [{ opacity: 1, transform: "none" }, { opacity: 0, transform: "translateY(-14px)" }],
      { duration: 260, easing: EASE, fill: "forwards" }
    ).finished;
  };

  const cleanup = () => {
    root.current.classList.remove("on", "intro");
    root.current.querySelectorAll(".dot").forEach((d) => d.remove());
    busy.current = false;
  };

  useImperativeHandle(ref, () => ({
    async play({ x, y, variant = "radial", text = "", onCovered }) {
      if (busy.current) return;
      busy.current = true;
      const { dots, w, h, rows, cols } = build();
      const ox = x ?? w / 2;
      const oy = y ?? h / 2;
      const maxDist = Math.max(Math.hypot(ox, oy), Math.hypot(w - ox, oy), Math.hypot(ox, h - oy), Math.hypot(w - ox, h - oy));
      const ctx = { w, h, ox, oy, rows, cols, maxDist };
      const delays = dots.map((d) => delayFor(variant, d, ctx));
      root.current.classList.add("on");
      await run(dots, delays, "in");
      onCovered?.();
      if (text) {
        await showLabel(text, true);
        await wait(220);
        showLabel(text, false);
      } else {
        await wait(120);
      }
      await run(dots, delays, "out");
      cleanup();
    },
  }));

  // Intro saat halaman pertama dibuka: layar sudah tertutup, lalu bulatan mengecil dari tengah.
  useEffect(() => {
    if (!intro) return;
    const el = root.current;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return cleanup();
    busy.current = true;
    const { dots, w, h } = build();
    dots.forEach((d) => (d.el.style.transform = "translate(-50%,-50%) scale(1)"));
    el.classList.add("on");
    el.classList.remove("intro"); // ganti latar padat dengan bulatan
    const maxDist = Math.hypot(w / 2, h / 2);
    const delays = dots.map((d) => (Math.hypot(d.x - w / 2, d.y - h / 2) / maxDist) * SPREAD);
    let alive = true;
    (async () => {
      await showLabel(intro, true);
      await wait(450);
      if (!alive) return;
      showLabel(intro, false);
      dots.forEach((d) => (d.el.style.transform = ""));
      await run(dots, delays, "out");
      if (alive) cleanup();
    })();
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={root} className={`dots${intro ? " intro on" : ""}`} aria-hidden="true">
      <span ref={label} className="dots-label" />
    </div>
  );
});

export default DotTransition;
