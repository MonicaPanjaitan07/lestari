// Efek saat menu diklik:
// 1) burst()      → gelombang riak (seperti air) melebar dari titik klik, warna mengikuti tema.
// 2) loadingBar() → tirai bergaris (blinds) menutup lalu membuka area konten saat halaman berganti.

let layer = null;

function ensure() {
  if (layer && document.body.contains(layer)) return;
  layer = document.createElement("div");
  layer.className = "fx-layer";
  layer.setAttribute("aria-hidden", "true");
  document.body.append(layer);
}

const off = () => typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function burst(x, y) {
  if (off()) return;
  ensure();
  // Tiga cincin bergantian + satu titik kecil di tengah
  [0, 110, 220].forEach((delay, i) => {
    const r = document.createElement("span");
    r.className = "fx-ring";
    r.style.cssText = `left:${x}px;top:${y}px`;
    layer.append(r);
    r.animate(
      [
        { transform: "translate(-50%,-50%) scale(.1)", opacity: 0.9, borderWidth: "3px" },
        { transform: `translate(-50%,-50%) scale(${1.3 + i * 0.45})`, opacity: 0, borderWidth: "1px" },
      ],
      { duration: 750, delay, easing: "cubic-bezier(.2,.8,.2,1)", fill: "both" }
    ).finished.then(() => r.remove(), () => r.remove());
  });
  const d = document.createElement("span");
  d.className = "fx-dot";
  d.style.cssText = `left:${x}px;top:${y}px`;
  layer.append(d);
  d.animate(
    [
      { transform: "translate(-50%,-50%) scale(0)", opacity: 1 },
      { transform: "translate(-50%,-50%) scale(1)", opacity: 1, offset: 0.35 },
      { transform: "translate(-50%,-50%) scale(.2)", opacity: 0 },
    ],
    { duration: 520, easing: "ease-out", fill: "both" }
  ).finished.then(() => d.remove(), () => d.remove());
}

// Tirai bergaris (blinds): 7 bilah turun bergantian menutup konten,
// halaman berganti, lalu bilah naik lagi membuka halaman baru.
export function loadingBar(onCovered) {
  const main = document.querySelector("main.content");
  if (off() || !main) { onCovered?.(); return; }
  const r = main.getBoundingClientRect();
  const wrap = document.createElement("div");
  wrap.className = "fx-blinds";
  wrap.style.cssText = `left:${r.left}px;width:${r.width}px`;
  const N = 7, STEP = 45, DUR = 300;
  const bars = Array.from({ length: N }, (_, i) => {
    const b = document.createElement("span");
    b.style.setProperty("--k", i);
    wrap.append(b);
    return b;
  });
  document.body.append(wrap);
  Promise.all(bars.map((b, i) => b.animate(
    [{ transform: "scaleY(0)", transformOrigin: "top" }, { transform: "scaleY(1)", transformOrigin: "top" }],
    { duration: DUR, delay: i * STEP, easing: "cubic-bezier(.65,0,.35,1)", fill: "forwards" }
  ).finished)).then(() => {
    onCovered?.();
    return new Promise((res) => setTimeout(res, 90));
  }).then(() => Promise.all(bars.map((b, i) => b.animate(
    [{ transform: "scaleY(1)", transformOrigin: "bottom" }, { transform: "scaleY(0)", transformOrigin: "bottom" }],
    { duration: DUR, delay: i * STEP, easing: "cubic-bezier(.65,0,.35,1)", fill: "forwards" }
  ).finished))).finally(() => wrap.remove());
}
