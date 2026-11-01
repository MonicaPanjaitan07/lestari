// All portfolio content lives here. L("English", "Indonesian") gives both languages.
export const L = (en, id) => ({ en, id });

export const site = {
  name: "Monica Putri Lestari Panjaitan", short: "Monica", handle: "@lestariiipjtan",
  roles: L(["Web Developer", "UI/UX Designer", "Quality Assurance"], ["Web Developer", "UI/UX Designer", "Quality Assurance"]),
  location: L("North Sumatra, Indonesia", "Sumatera Utara, Indonesia"),
  whatsapp: "6281717377269", email: "monikaapanjaitan07@gmail.com",
  instagram: "https://instagram.com/lestariiipjtan", github: "https://github.com/MonicaPanjaitan07",
  linkedin: "https://www.linkedin.com/in/monica-putri-lestari-panjaitan-b600b7372",
  tiktok: "https://www.tiktok.com/@sleepybutterfly7",
  cv: "/cv-monica.pdf", // file lives in /public
};

// Add songs you are allowed to use: put the .mp3 in /public/music and add a line here.
export const tracks = [{ title: "Lo-fi Dreamy", artist: "Original instrumental", src: "/music/lofi-dreamy.mp3" }];

export const nav = [[L("Home", "Beranda"), "/"], [L("About", "Tentang"), "/about"], [L("Projects", "Proyek"), "/projects"], [L("Achievements", "Pencapaian"), "/achievements"], [L("Chat Room", "Ruang Obrolan"), "/chat"], [L("Contact", "Kontak"), "/contact"]];

export const ui = {
  badges: L(["Open to work", "Hire me", "Let's collaborate"], ["Terbuka untuk kerja", "Rekrut aku", "Ayo kolaborasi"]),
  chatT: L("Chat Room", "Ruang Obrolan"), chatSub: L("Leave a message for me. Everyone who visits can read it.", "Tinggalkan pesan untukku. Semua pengunjung bisa membacanya."),
  chatPh: L("Type your message...", "Tulis pesanmu..."), chatHi: L("Hi! Thanks for visiting my portfolio. Leave me a message here.", "Hai! Terima kasih sudah berkunjung. Tinggalkan pesan di sini."),
  chatErr: L("Message could not be sent. Please try again.", "Pesan gagal terkirim. Coba lagi."),
  chatDemo: L("Demo mode: messages are only saved on this device until the chat server is connected.", "Mode demo: pesan hanya tersimpan di perangkat ini sampai server obrolan terhubung."),
  open: L("Open to work", "Terbuka untuk kerja"), hi: L("Hi, I'm", "Hai, aku"),
  viewcv: L("View CV", "Lihat CV"), dl: L("Download", "Unduh"), contact: L("Contact me", "Hubungi aku"),
  projects: L("Projects", "Proyek"), certs: L("Certificates", "Sertifikat"), skills: L("Skills", "Keahlian"),
  skillsSub: L("My technical and design skills.", "Keahlian teknis dan desainku."), all: L("All", "Semua"),
  aboutT: L("About", "Tentang"), aboutSub: L("A little about me and my journey.", "Sedikit tentang aku dan perjalananku."),
  eduT: L("Education", "Pendidikan"), expT: L("Experience", "Pengalaman"),
  projT: L("Projects", "Proyek"), projSub: L("Team projects I designed and built.", "Proyek tim yang kurancang dan kubangun."),
  show: L("Show details", "Lihat detail"), hide: L("Hide details", "Tutup detail"), feat: L("Key features", "Fitur utama"),
  role: L("My role", "Peranku"), team: L("Team", "Tim"), code: L("View code", "Lihat kode"),
  achT: L("Achievements", "Pencapaian"), achSub: L("Certifications, competitions, and training.", "Sertifikasi, lomba, dan pelatihan."),
  search: L("Search achievements...", "Cari pencapaian..."), none: L("Nothing found.", "Tidak ditemukan."),
  conT: L("Contact", "Kontak"), conSub: L("Let's get in touch.", "Mari terhubung."),
  startT: L("Start a conversation", "Mulai percakapan"), startSub: L("A short form that opens WhatsApp.", "Form singkat yang membuka WhatsApp."),
  q1: L("What would you like to talk about?", "Apa yang ingin dibicarakan?"), q2: L("Tell me a bit more", "Ceritakan sedikit lebih lanjut"), q3: L("Your name", "Namamu"),
  ph2: L("Write your message here...", "Tulis pesanmu di sini..."), ph3: L("Your name", "Namamu"),
  next: L("Next", "Selanjutnya"), back: L("Back", "Kembali"), send: L("Send via WhatsApp", "Kirim lewat WhatsApp"),
  safe: L("Your message opens in WhatsApp. Nothing is stored.", "Pesanmu terbuka di WhatsApp. Tidak ada yang disimpan."),
  social: L("Find me on social media", "Temukan aku di media sosial"), go: L("Go to", "Buka"), rights: L("All rights reserved.", "Hak cipta dilindungi."),
  hello: L("Hi Monica, I'm", "Halo Monica, aku"),
};
export const purposes = [["🎓", L("Internship", "Magang")], ["💼", L("Freelance project", "Proyek freelance")], ["🤝", L("Collaboration", "Kolaborasi")], ["👋", L("Just saying hi", "Sekadar menyapa")]];

export const about = [
  L("I'm Monica Putri Lestari Panjaitan, a Diploma 3 Information Technology student at Institut Teknologi Del. I work across three areas: web development, UI/UX design, and quality assurance.",
    "Aku Monica Putri Lestari Panjaitan, mahasiswa D3 Teknologi Informasi di Institut Teknologi Del. Aku bekerja di tiga bidang: pengembangan web, desain UI/UX, dan quality assurance."),
  L("In team projects I design interfaces and prototypes, write code, and care about making sure what we build works well. I'm looking for internship and freelance opportunities.",
    "Di proyek kelompok, aku merancang antarmuka dan prototype, menulis kode, dan peduli memastikan hasilnya berjalan baik. Aku mencari kesempatan magang dan freelance."),
];
export const facts = [[L("Campus", "Kampus"), "Institut Teknologi Del"], [L("Major", "Jurusan"), L("Information Technology", "Teknologi Informasi")], [L("From", "Asal"), L("Silaen, North Sumatra", "Silaen, Sumatera Utara")], [L("Hobby", "Hobi"), "Traveling"]];
export const education = [
  { school: "Institut Teknologi Del", major: L("Diploma 3, Information Technology", "D3 Teknologi Informasi"), place: "Laguboti, Toba", note: L("Current student · 2024 – 2027", "Mahasiswa aktif · 2024 – 2027") },
  { school: "SMA Negeri 1 Silaen", major: L("Science Program (IPA)", "Jurusan IPA"), place: "Silaen, Toba", note: L("Graduated · 2021 – 2024", "Lulus · 2021 – 2024") },
];
export const experience = [
  { title: L("Committee Member, Bebras Challenge 2025", "Anggota Panitia Bebras Challenge 2025"), org: "Institut Teknologi Del", date: L("Nov 2025", "Nov 2025"), text: L("Helped organize the Bebras computational thinking challenge at campus.", "Membantu penyelenggaraan Bebras Challenge (tantangan berpikir komputasional) di kampus.") },
];

// [name, devicon key (logo), category]
export const skills = [
  ["HTML", "html5", "Frontend"], ["CSS", "css3", "Frontend"], ["JavaScript", "javascript", "Frontend"], ["Next.js", "nextjs", "Frontend"],
  ["PHP", "php", "Backend"], ["Laravel", "laravel", "Backend"], ["MySQL", "mysql", "Backend"],
  ["Figma", "figma", "Design"], ["Software Testing", null, "QA"],
  ["Git", "git", "Tools"], ["GitHub", "github", "Tools"], ["VS Code", "vscode", "Tools"],
];

export const projects = [
  { title: "Pardede Catering App", tag: L("Catering ordering app for web & mobile", "Aplikasi pemesanan catering web & mobile"), year: L("Final Project Year 2 · Group 5", "Proyek Akhir Tahun 2 · Kelompok 5"),
    role: L("UI/UX design, prototyping & code", "Desain UI/UX, prototype & kode"), stack: [["Laravel", "laravel"], ["MySQL", "mysql"], ["Figma", "figma"]],
    cover: "/images/pardede-booth.jpg", pos: "center 45%", team: "/images/pardede-tim.jpg", tpos: "center 100%",
    desc: L("An ordering platform that runs on the web and on phones. Customers order meals through the app while admins track orders from a dashboard.", "Platform pemesanan di web dan HP. Pelanggan memesan menu lewat aplikasi, sementara admin memantau pesanan lewat dashboard."),
    features: L(["Meal ordering on web and mobile", "Admin dashboard to track orders", "Payments and real-time chat"], ["Pemesanan menu di web dan mobile", "Dashboard admin untuk memantau pesanan", "Pembayaran dan chat real-time"]),
    repo: "https://github.com/MonicaPanjaitan07/Pardede-Catering-App" },
  { title: "Web Firman Taylor", tag: L("Online tailoring orders", "Pemesanan jahitan online"), year: L("Final Project Year 1", "Proyek Akhir Tahun 1"),
    role: L("UI/UX design, prototyping & code", "Desain UI/UX, prototype & kode"), stack: [["Laravel", "laravel"], ["PHP", "php"], ["MySQL", "mysql"], ["Figma", "figma"]],
    cover: "/images/firman-tim.jpg", pos: "center 74%", team: "/images/firman-tim2.jpg", tpos: "center 95%",
    desc: L("A website for ordering tailoring without queueing at the shop. Customers order from anywhere, and the tailor manages orders more neatly.", "Web untuk memesan jahitan tanpa antre di toko. Pelanggan memesan dari mana saja, penjahit mengelola pesanan lebih rapi."),
    features: L(["Customers place tailoring orders online", "Customers track order status", "Admin manages the order list"], ["Pelanggan membuat pesanan jahitan online", "Pelanggan memantau status pesanan", "Admin mengelola daftar pesanan"]),
    repo: "https://github.com/MonicaPanjaitan07/web-firman-taylor" },
];

export const certs = [
  { t: "Oracle AI Database Certified Foundations Associate", by: "Oracle University", d: L("Sep 17, 2026", "17 Sep 2026"), cat: L("Certification", "Sertifikasi"), img: "/certs/c3.jpg" },
  { t: L("5th Place · Pixelnoid Dev Weekend Season 2", "Juara 5 · Pixelnoid Dev Weekend Season 2"), by: "PixelNoid Digi Academy", d: L("Jul 11–12, 2026", "11–12 Jul 2026"), cat: L("Competition", "Lomba"), img: "/certs/c5.jpg" },
  { t: L("Committee Member, Bebras Challenge 2025", "Anggota Panitia Bebras Challenge 2025"), by: "Institut Teknologi Del", d: L("Nov 15, 2025", "15 Nov 2025"), cat: L("Committee", "Kepanitiaan"), img: "/certs/c4.jpg" },
  { t: "DSF 53.0 · Data Engineer", by: "Dibimbing", d: L("Jul 13–17, 2026", "13–17 Jul 2026"), cat: L("Training", "Pelatihan"), img: "/certs/c8.jpg" },
  { t: "Cyber Security Fundamentals", by: "ReWork Academy", d: L("Jul 4–5, 2026", "4–5 Jul 2026"), cat: L("Training", "Pelatihan"), img: "/certs/c1.jpg" },
  { t: "AI-Engineering Fundamentals", by: "ReWork Academy", d: L("Jul 4–5, 2026", "4–5 Jul 2026"), cat: L("Training", "Pelatihan"), img: "/certs/c2.jpg" },
  { t: "AWS Cloud Practitioner · Practice Exam", by: "AWS Training & Certification", d: L("Oct 21, 2026", "21 Okt 2026"), cat: L("Training", "Pelatihan"), img: "/certs/c6.jpg" },
  { t: "AWS AI Practitioner · Practice Exam", by: "AWS Training & Certification", d: L("Oct 20, 2026", "20 Okt 2026"), cat: L("Training", "Pelatihan"), img: "/certs/c7.jpg" },
];
