"use client";
import { useEffect, useRef } from "react";

export default function Network() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current, x = c.getContext("2d");
    let w, h, raf, m = { x: -999, y: -999 };
    const rs = () => { w = c.width = innerWidth; h = c.height = innerHeight; };
    rs();
    const n = innerWidth < 700 ? 34 : 70;
    const ps = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5 }));
    const mv = (e) => { m = { x: e.clientX, y: e.clientY }; };
    addEventListener("resize", rs); addEventListener("pointermove", mv);
    const line = (a, b, col, d, r) => { x.strokeStyle = `rgba(${col},${0.3 * (1 - d / r)})`; x.beginPath(); x.moveTo(a.x, a.y); x.lineTo(b.x, b.y); x.stroke(); };
    const loop = () => {
      x.clearRect(0, 0, w, h);
      for (const p of ps) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        x.fillStyle = "rgba(60,80,65,.5)"; x.beginPath(); x.arc(p.x, p.y, 1.8, 0, 7); x.fill();
        const d = Math.hypot(p.x - m.x, p.y - m.y);
        if (d < 160) line(p, m, "224,112,154", d, 160);
      }
      for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
        const d = Math.hypot(ps[i].x - ps[j].x, ps[i].y - ps[j].y);
        if (d < 130) line(ps[i], ps[j], "60,80,65", d, 130);
      }
      raf = requestAnimationFrame(loop);
    };
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) loop();
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", rs); removeEventListener("pointermove", mv); };
  }, []);
  return <canvas ref={ref} className="net" aria-hidden="true" />;
}
