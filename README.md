# Monica Putri Lestari Panjaitan — Portfolio

Next.js. Dua bahasa (ID/EN), tiga tema (terang, gelap, alam 🍃), transisi polkadot antar halaman, musik latar, dan tombol WhatsApp.

## Jalankan lokal
npm install && npm run dev  → http://localhost:3000

## Deploy
Timpa isi repo GitHub dengan folder ini lalu push — Vercel otomatis deploy ulang.

## Ubah konten — semuanya di `components/data.js`
- Profil, kontak & sosial media: `site`, `socials`
- About, pendidikan (+ logo), pengalaman: `about`, `education`, `experience`
- Sertifikat: `achievements` (gambar & PDF di `public/certificates/`)
- Keahlian: `skills` (ikon dari devicon.dev)
- Proyek: `projects` (screenshot di `public/projects/`)
- Foto: `public/images/lestari.jpg` (foto penuh) & `public/images/avatar.jpg` (bulat di sidebar)
- Logo sekolah: `public/logos/`
- CV: taruh PDF di `public/` lalu isi `site.cv`
- Warna tema: bagian atas `app/globals.css`
- Lagu latar: `public/music/bye-ariana.mp3` (atur di `site.music`)
- Ikon bergerak di samping nama: `public/icon/ikon.mp4` & `ikon.webm`

## Dashboard (halaman /#dashboard)
**GitHub** langsung jalan (data diambil dari profil `MonicaPanjaitan07`, diperbarui tiap 1 jam).
Opsional: di Vercel → Settings → Environment Variables, isi `GITHUB_TOKEN` (token GitHub tanpa izin apa pun) supaya batas aksesnya lebih besar.

**Analitik pengunjung** butuh database gratis Upstash Redis (sekali setup, ±3 menit):
1. Buka project di vercel.com → tab **Storage** → **Create Database** → pilih **Upstash for Redis** → plan **Free** → Create.
2. Pilih **Connect** ke project portofolio ini (centang semua environment).
3. Vercel otomatis menambahkan env `KV_REST_API_URL` & `KV_REST_API_TOKEN`.
4. Tab **Deployments** → titik tiga di deployment terbaru → **Redeploy**.
Setelah itu setiap kunjungan tercatat. Yang disimpan hanya angka & kode acak (hash) — tidak ada IP atau data pribadi.
