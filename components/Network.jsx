"use client";

import { useEffect, useRef } from "react";

const CHARS = "01{}<>/=;()[]+-*#$&%".split("");
const MOSS = "77,122,88";
const PINE = "35,64,47";
const PINK = "224,112,154";

export default function Network() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = { x: -9999, y: -9999 };
    const rnd = (a, b) => a + Math.random() * (b - a);
    const pick = () => CHARS[(Math.random() * CHARS.length) | 0];

    let w = 0, h = 0, dpr = 1, size = 18, streams = [], raf = 0, last = 0;

    const makeStream = (x, initial) => ({
      x,
      y: initial ? rnd(-h, h) : rnd(-h * 0.4, 0),
      speed: rnd(35, 95),
      len: 8 + ((Math.random() * 14) | 0),
      chars: Array.from({ length: 24 }, pick),
    });

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      size = w < 700 ? 16 : 18;
      const gap = size * (w < 700 ? 2.2 : 1.8);
      const cols = Math.floor(w / gap);
      streams = [];
      for (let i = 0; i < cols; i++) {
        if (Math.random() < 0.4) continue; // dibuat jarang supaya tidak ramai
        streams.push(makeStream(i * gap + gap / 2, true));
      }
    };

    const draw = (dt) => {
      ctx.clearRect(0, 0, w, h);
      ctx.font = `${size - 3}px ui-monospace, "Cascadia Code", Consolas, monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (const s of streams) {
        s.y += s.speed * dt;
        if (s.y - s.len * size > h) Object.assign(s, makeStream(s.x, false));

        for (let k = 0; k < s.len; k++) {
          const y = s.y - k * size;
          if (y < -size || y > h + size) continue;
          if (Math.random() < 0.02) s.chars[k] = pick();

          const fade = 1 - k / s.len;
          const dx = s.x - mouse.x, dy = y - mouse.y;
          const near = Math.max(0, 1 - Math.hypot(dx, dy) / 130);

          if (near > 0) {
            ctx.fillStyle = `rgba(${PINK},${Math.min(0.9, 0.25 + near * 0.7)})`;
          } else if (k === 0) {
            ctx.fillStyle = `rgba(${PINE},0.5)`;
          } else {
            ctx.fillStyle = `rgba(${MOSS},${fade * 0.32})`;
          }
          ctx.fillText(s.chars[k], s.x, y);
        }
      }
    };

    const loop = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
      last = now;
      draw(dt);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    const onVisibility = () => (document.hidden ? cancelAnimationFrame(raf) : start());
    let lastW = window.innerWidth;
    const onResize = () => {
      if (window.innerWidth === lastW) return; // abaikan perubahan tinggi saat scroll di HP
      lastW = window.innerWidth;
      build();
    };

    build();
    if (reduce) draw(0);
    else start();

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} className="net" aria-hidden="true" style={{ width: "100%", height: "100%" }} />;
}