# Monica Putri Lestari Panjaitan - Portfolio

Next.js, mobile-first, dengan musik latar dan tombol chat WhatsApp.

## Jalankan lokal
npm install && npm run dev  → http://localhost:3000

## Deploy ke Vercel (supaya linknya bisa ditaruh di bio Instagram)
1. Upload folder ini ke GitHub.
2. vercel.com → Add New Project → pilih repo → Deploy.
3. (Opsional) Settings → Environment Variables: NEXT_PUBLIC_SITE_URL = link Vercel-mu, supaya preview link benar.
4. Instagram → Edit profil → Tautan → Tambahkan tautan eksternal → tempel link Vercel.

## Ubah konten
- Teks, proyek, kontak: `components/data.js`
- Foto: `public/images/profile.jpeg`
- Lagu: `public/music/lofi-dreamy.mp3` (ganti file, nama tetap atau ubah di `components/Portfolio.jsx`)
- Warna: variabel di bagian atas `app/globals.css`
