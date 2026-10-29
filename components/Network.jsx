"use client";

import { useEffect, useRef } from "react";

const MOSS = "77,122,88";
const PINK = "224,112,154";
const DIRS = [[1, 0], [-1, 0], [0, 1], [0, -1]];

export default function Network() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = { x: -9999, y: -9999 };
    const rnd = (a, b) => a + Math.random() * (b - a);

    let w = 0, h = 0, dpr = 1, cell = 56, cols = 0, rows = 0;
    let packets = [], pings = [], raf = 0, last = 0, nextPing = 0;

    const inside = (x, y) => x >= 0 && x <= cols * cell && y >= 0 && y <= rows * cell;

    const pickDir = (p, allowTurn) => {
      const options = DIRS.filter(([dx, dy]) => {
        if (dx === -p.dx && dy === -p.dy) return false; // do not reverse
        if (!allowTurn && (dx !== p.dx || dy !== p.dy)) return false;
        return inside(p.x + dx * cell, p.y + dy * cell);
      });
      const pool = options.length ? options : DIRS.filter(([dx, dy]) => inside(p.x + dx * cell, p.y + dy * cell));
      const d = pool[(Math.random() * pool.length) | 0];
      p.dx = d[0];
      p.dy = d[1];
    };

    const spawn = () => {
      const p = {
        x: ((Math.random() * cols) | 0) * cell,
        y: ((Math.random() * rows) | 0) * cell,
        dx: 1, dy: 0, dist: 0,
        speed: rnd(70, 140),
        col: Math.random() < 0.3 ? PINK : MOSS,
        trail: [],
      };
      pickDir(p, true);
      return p;
    };

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cell = w < 700 ? 44 : 56;
      cols = Math.ceil(w / cell) + 1;
      rows = Math.ceil(h / cell) + 1;
      const count = Math.min(24, Math.max(8, Math.round((w * h) / 52000)));
      packets = Array.from({ length: count }, spawn);
      pings = [];
    };

    const draw = (dt) => {
      ctx.clearRect(0, 0, w, h);

      // grid lines
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(${MOSS},0.09)`;
      ctx.beginPath();
      for (let i = 0; i <= cols; i++) { ctx.moveTo(i * cell + 0.5, 0); ctx.lineTo(i * cell + 0.5, h); }
      for (let j = 0; j <= rows; j++) { ctx.moveTo(0, j * cell + 0.5); ctx.lineTo(w, j * cell + 0.5); }
      ctx.stroke();

      // nodes (glow near the cursor)
      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const x = i * cell, y = j * cell;
          const near = Math.max(0, 1 - Math.hypot(x - mouse.x, y - mouse.y) / 130);
          if (near > 0) {
            ctx.fillStyle = `rgba(${PINK},${0.25 + near * 0.6})`;
            ctx.beginPath();
            ctx.arc(x, y, 2 + near * 3.5, 0, 6.283);
            ctx.fill();
          } else {
            ctx.fillStyle = `rgba(${MOSS},0.2)`;
            ctx.fillRect(x - 1.5, y - 1.5, 3, 3);
          }
        }
      }

      // pings (ripples)
      pings = pings.filter((p) => p.t < 1);
      for (const p of pings) {
        p.t += dt / 1.8;
        ctx.strokeStyle = `rgba(${PINK},${(1 - p.t) * 0.5})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.t * 80, 0, 6.283);
        ctx.stroke();
      }

      // data packets
      for (const p of packets) {
        const step = p.speed * dt;
        p.x += p.dx * step;
        p.y += p.dy * step;
        p.dist += step;
        if (p.dist >= cell) {
          p.x = Math.round(p.x / cell) * cell;
          p.y = Math.round(p.y / cell) * cell;
          p.dist = 0;
          pickDir(p, Math.random() < 0.4);
        }
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 26) p.trail.shift();

        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        for (let k = 1; k < p.trail.length; k++) {
          ctx.strokeStyle = `rgba(${p.col},${(k / p.trail.length) * 0.5})`;
          ctx.beginPath();
          ctx.moveTo(p.trail[k - 1].x, p.trail[k - 1].y);
          ctx.lineTo(p.trail[k].x, p.trail[k].y);
          ctx.stroke();
        }
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${p.col},0.9)`;
        ctx.fillStyle = `rgba(${p.col},0.95)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.8, 0, 6.283);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    const loop = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
      last = now;
      if (now > nextPing) {
        pings.push({ x: ((Math.random() * cols) | 0) * cell, y: ((Math.random() * rows) | 0) * cell, t: 0 });
        nextPing = now + rnd(1800, 3200);
      }
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
      if (window.innerWidth === lastW) return; // ignore height changes while scrolling on phones
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
