// ✏️ Semua isi portofolio diedit di file ini.
// Teks dua bahasa ditulis { id: "...", en: "..." }.

export const site = {
  name: "Monica Putri Lestari Panjaitan",
  short: "Lestari",
  handle: "@lestariiipjtan",
  photo: "/images/lestari.jpg",
  avatar: "/images/avatar.jpg",
  location: "Toba, Sumatera Utara",
  status: { id: "Terbuka untuk magang", en: "Open to work" },
  // Teks status yang berganti otomatis di bawah nama
  statuses: {
    en: ["Open to Internship Opportunities", "Ready to Learn & Grow", "Passionate About Technology", "Eager to Gain Experience", "Ready for New Challenges"],
    id: ["Terbuka untuk Kesempatan Magang", "Siap Belajar & Berkembang", "Bersemangat di Dunia Teknologi", "Ingin Menambah Pengalaman", "Siap Menghadapi Tantangan Baru"],
  },
  role: { id: "D3 Teknologi Informasi · IT Del", en: "D3 Information Technology · IT Del" },
  headline: "Web Developer · UI/UX Designer · Software QA",
  email: "monikaapanjaitan07@gmail.com",
  whatsapp: "6281717377269",
  chatText: "Halo Lestari, aku lihat portofoliomu dan mau ngobrol!",
  music: "/music/bye-ariana.mp3", // lagu latar, langsung diputar saat web dibuka
  cv: "/cv-monica-putri-lestari-panjaitan.pdf", // file CV di folder public (kosongkan "" untuk menyembunyikan tombol)
};

export const socials = [
  { key: "email", label: "Email", value: "monikaapanjaitan07@gmail.com", href: "mailto:monikaapanjaitan07@gmail.com" },
  { key: "whatsapp", label: "WhatsApp", value: "0817 1737 7269", href: "https://wa.me/6281717377269" },
  { key: "linkedin", label: "LinkedIn", value: "Monica Putri Lestari Panjaitan", href: "https://www.linkedin.com/in/monica-putri-lestari-panjaitan-b600b7372" },
  { key: "instagram", label: "Instagram", value: "@lestariiipjtan", href: "https://instagram.com/lestariiipjtan" },
  { key: "github", label: "GitHub", value: "MonicaPanjaitan07", href: "https://github.com/MonicaPanjaitan07" },
  { key: "tiktok", label: "TikTok", value: "@sleepybutterfly7", href: "https://www.tiktok.com/@sleepybutterfly7" },
];

export const ui = {
  id: {
    nav: { home: "Beranda", about: "Tentang", achievements: "Pencapaian", projects: "Proyek", dashboard: "Dashboard", contact: "Kontak" },
    dash: {
      sub: "Statistik pengunjung portofolio ini dan aktivitas GitHub-ku, diperbarui otomatis.",
      visitors: "Analitik Pengunjung", visitorsSub: "Siapa saja yang mampir ke portofolio ini.",
      views: "Tayangan halaman", uniq: "Pengunjung", countries: "Negara", topDevice: "Perangkat terbanyak", topSource: "Sumber terbanyak",
      device: { Desktop: "Komputer", Mobile: "HP", Tablet: "Tablet" },
      trend: "Tren kunjungan", days30: "30 hari", allTime: "Semua",
      topCountries: "Negara teratas", topCities: "Kota teratas",
      notReady: "Analitik pengunjung belum aktif",
      notReadyText: "Sambungkan Upstash Redis di Vercel (lihat README) supaya angka pengunjung mulai tercatat. Pesan ini hanya terlihat di localhost.",
      ghSub: "Aktivitas coding-ku di GitHub.", ghError: "Data GitHub belum bisa dimuat. Coba lagi nanti.",
      contribYear: "Kontribusi (1 tahun)", repos: "Repositori", stars: "Bintang", followers: "Pengikut",
      contribTitle: "Kontribusi setahun terakhir", contribs: "kontribusi", less: "Sedikit", more: "Banyak",
      languages: "Bahasa yang sering dipakai", recent: "Repositori terbaru", updated: "diperbarui",
    },
    hi: "Halo, aku Lestari",
    intro: "Mahasiswa D3 Teknologi Informasi di Institut Teknologi Del yang tertarik pada Web Development, UI/UX Design, dan Software Quality Assurance. Lewat proyek tim, pelatihan, dan kompetisi, aku memadukan desain dan kemampuan teknis untuk membuat solusi digital yang mudah dipakai. Saat ini sedang mencari kesempatan magang.",
    contactMe: "Hubungi aku",
    skills: "Keahlian", skillsSub: "Teknologi dan alat yang aku gunakan.",
    all: "Semua",
    latest: "Pencapaian terbaru", latestSub: "Sertifikat dan penghargaan yang paling baru.",
    seeAll: "Lihat semua",
    aboutSub: "Perkenalan singkat tentang aku.",
    regards: "Salam hangat,",
    education: "Pendidikan", educationSub: "Perjalanan sekolahku.",
    experience: "Pengalaman", experienceSub: "Organisasi dan kepanitiaan.",
    achSub: "Kumpulan sertifikat, penghargaan, dan pelatihan yang aku ikuti.",
    tabs: { official: "Sertifikat resmi", course: "Kursus & pelatihan" },
    tabNote: { official: "Sertifikasi, kompetisi, dan kepanitiaan.", course: "Sertifikat keikutsertaan dari mini course dan bootcamp — bukan sertifikasi resmi." },
    languages: "Bahasa", languagesSub: "Bahasa yang aku kuasai.",
    interests: "Minat lain",
    search: "Cari sertifikat...", total: "Total", empty: "Tidak ada yang cocok.",
    issued: "Diterbitkan", validUntil: "Berlaku sampai", credential: "ID kredensial", openPdf: "Buka PDF",
    projSub: "Proyek yang pernah aku kerjakan, sebagian besar bersama tim.",
    details: "Lihat detail", overview: "Tentang proyek", features: "Fitur utama", screens: "Tampilan aplikasi", team: "Anggota kelompok", role: "Peran", demo: "Demo", code: "Kode",
    contactSub: "Yuk terhubung.", findMe: "Temukan aku di",
    sendMsg: "Kirim pesan", sendMsgSub: "Tulis pesanmu, nanti langsung terkirim lewat WhatsApp atau email.",
    yourName: "Nama kamu", yourMsg: "Pesan", viaWa: "Kirim via WhatsApp", viaMail: "Kirim via Email",
    copy: "Salin", copied: "Tersalin",
    layoutLabel: "Ganti posisi navigasi", layoutTop: "Navigasi di atas", layoutSide: "Navigasi di samping",
    close: "Tutup", menu: "Menu", lang: "Bahasa", theme: { light: "Terang", dark: "Gelap", nature: "Alam" },
    music: "Musik latar", chat: "Chat lewat WhatsApp",
    rights: "Hak cipta dilindungi.",
  },
  en: {
    nav: { home: "Home", about: "About", achievements: "Achievements", projects: "Projects", dashboard: "Dashboard", contact: "Contact" },
    dash: {
      sub: "Visitor statistics for this portfolio and my GitHub activity, updated automatically.",
      visitors: "Visitor Analytics", visitorsSub: "Who's been stopping by this portfolio.",
      views: "Page views", uniq: "Visitors", countries: "Countries", topDevice: "Top device", topSource: "Top source",
      device: { Desktop: "Computer", Mobile: "Mobile", Tablet: "Tablet" },
      trend: "Traffic trend", days30: "30 days", allTime: "All time",
      topCountries: "Top countries", topCities: "Top cities",
      notReady: "Visitor analytics isn't active yet",
      notReadyText: "Connect Upstash Redis in Vercel (see README) so visits start being counted. This message only shows on localhost.",
      ghSub: "My coding activity on GitHub.", ghError: "Couldn't load GitHub data right now. Please try again later.",
      contribYear: "Contributions (1 year)", repos: "Repositories", stars: "Stars", followers: "Followers",
      contribTitle: "Contributions in the last year", contribs: "contributions", less: "Less", more: "More",
      languages: "Most used languages", recent: "Recent repositories", updated: "updated",
    },
    hi: "Hi, I'm Lestari",
    intro: "Diploma 3 Information Technology student at Del Institute of Technology with a strong interest in Web Development, UI/UX Design and Software Quality Assurance. Through team projects, training programs and competitions, I combine design and technical skills to build digital solutions that are easy to use. Currently looking for an internship.",
    contactMe: "Contact me",
    skills: "Skills", skillsSub: "Technologies and tools I work with.",
    all: "All",
    latest: "Latest achievements", latestSub: "My most recent certificates and awards.",
    seeAll: "See all",
    aboutSub: "A short introduction to who I am.",
    regards: "Best regards,",
    education: "Education", educationSub: "My school journey.",
    experience: "Experience", experienceSub: "Organizations and committees.",
    achSub: "A collection of certificates, awards and trainings I've completed.",
    tabs: { official: "Official certificates", course: "Courses & training" },
    tabNote: { official: "Certifications, competitions and committees.", course: "Participation certificates from mini courses and bootcamps — not official certifications." },
    languages: "Languages", languagesSub: "Languages I speak.",
    interests: "Other interests",
    search: "Search certificates...", total: "Total", empty: "Nothing matches.",
    issued: "Issued", validUntil: "Valid until", credential: "Credential ID", openPdf: "Open PDF",
    projSub: "Projects I've worked on, mostly as part of a team.",
    details: "View details", overview: "About the project", features: "Key features", screens: "App screens", team: "Team members", role: "Role", demo: "Demo", code: "Code",
    contactSub: "Let's get in touch.", findMe: "Find me on",
    sendMsg: "Send a message", sendMsgSub: "Write your message and send it straight through WhatsApp or email.",
    yourName: "Your name", yourMsg: "Message", viaWa: "Send via WhatsApp", viaMail: "Send via Email",
    copy: "Copy", copied: "Copied",
    layoutLabel: "Switch navigation position", layoutTop: "Navigation on top", layoutSide: "Navigation on the side",
    close: "Close", menu: "Menu", lang: "Language", theme: { light: "Light", dark: "Dark", nature: "Nature" },
    music: "Background music", chat: "Chat on WhatsApp",
    rights: "All rights reserved.",
  },
};

export const about = {
  id: [
    "Halo! Aku Monica Putri Lestari Panjaitan, biasa dipanggil Lestari. Aku berasal dari Silaen, Toba, dan sekarang kuliah D3 Teknologi Informasi di Institut Teknologi Del (2024 – 2027).",
    "Aku senang mengerjakan web dari sisi desain sampai kode. Di proyek akhir, aku merancang UI/UX dan prototipe di Figma lalu ikut membangunnya dengan Laravel dan MySQL — misalnya sistem pemesanan jahit online Web Firman Taylor dan aplikasi pemesanan Pardede Catering. Aku juga tertarik pada Software Quality Assurance, karena aplikasi yang baik bukan hanya enak dilihat tapi juga harus berjalan dengan benar.",
    "Aku tersertifikasi Oracle AI Database Certified Foundations Associate, meraih juara 5 di Pixelnoid Dev Weekend Season 2 (Machine Learning + Laravel), dan aktif ikut pelatihan seperti bootcamp Data Engineer di Dibimbing. Di luar kelas aku pernah menjadi panitia Bebras Challenge 2025.",
    "Saat ini aku sedang mencari kesempatan magang untuk terus belajar dan ikut membangun produk digital yang bermanfaat.",
  ],
  en: [
    "Hi! I'm Monica Putri Lestari Panjaitan — most people call me Lestari. I'm from Silaen, Toba, and I'm studying for a Diploma 3 in Information Technology at Del Institute of Technology (2024 – 2027).",
    "I like working on the web from design to code. In my final projects I designed the UI/UX and prototypes in Figma and helped build them with Laravel and MySQL — such as Web Firman Taylor, an online tailoring order system, and the Pardede Catering ordering app. I'm also interested in Software Quality Assurance, because a good app should not only look right but work right.",
    "I'm an Oracle AI Database Certified Foundations Associate, placed 5th at Pixelnoid Dev Weekend Season 2 (Machine Learning + Laravel), and keep learning through programs like the Dibimbing Data Engineer bootcamp. Outside class I served on the Bebras Challenge 2025 committee.",
    "I'm currently looking for an internship where I can keep learning and help build useful digital products.",
  ],
};

export const languages = [
  { name: { id: "Bahasa Indonesia", en: "Indonesian" }, level: { id: "Bahasa ibu", en: "Native" }, pct: 100 },
  { name: { id: "Bahasa Inggris", en: "English" }, level: { id: "Menengah", en: "Intermediate" }, pct: 60 },
];

// logo: taruh gambar di public/logos. years: isi tahunnya, mis. "2024 – sekarang".
export const education = [
  {
    school: "Institut Teknologi Del",
    detail: { id: "D3 Teknologi Informasi", en: "Diploma 3 in Information Technology" },
    place: "Laguboti, Toba",
    years: "2024 – 2027",
    logo: "/logos/itdel.png",
  },
  {
    school: "SMA Negeri 1 Silaen",
    detail: { id: "Jurusan IPA", en: "Science Program (IPA)" },
    place: "Silaen, Toba",
    years: "2021 – 2024",
    logo: "/logos/sman1-silaen.png",
  },
  {
    school: "SD Negeri 174556 Sitorang",
    detail: { id: "Sekolah Dasar", en: "Elementary School" },
    place: "Silaen, Toba",
    years: "", // ✏️ isi tahunnya, mis. "2015 – 2021"
    logo: "/logos/sdn-174556-sitorang.png",
  },
];

export const experience = [
  {
    title: { id: "Panitia Bebras Challenge 2025", en: "Committee Member, Bebras Challenge 2025" },
    org: "Biro Bebras · Institut Teknologi Del",
    when: { id: "Nov 2025", en: "Nov 2025" },
    logo: "/logos/itdel.png",
    text: {
      id: "Ikut menyiapkan dan menjalankan Bebras Challenge, tantangan berpikir komputasional untuk siswa sekolah.",
      en: "Helped prepare and run the Bebras Challenge, a computational-thinking challenge for school students.",
    },
  },
];

// Sertifikat: gambar & PDF di public/certificates
// kind: "official" = sertifikat resmi, "course" = mini course / bootcamp (tab terpisah)
export const achievements = [
  {
    key: "oracle", kind: "official", type: "cert",
    title: "Oracle AI Database Certified Foundations Associate",
    issuer: "Oracle University",
    code: "331698388OCI26DCFA",
    tags: ["Oracle", "Database", "AI"],
    date: { id: "17 September 2026", en: "September 17, 2026" },
    valid: { id: "17 September 2028", en: "September 17, 2028" },
    img: "/certificates/oracle.jpg", pdf: "/certificates/oracle.pdf",
  },
  {
    key: "pixelnoid", kind: "official", type: "competition",
    title: { id: "Juara 5 — Pixelnoid Dev Weekend Season 2", en: "5th Place — Pixelnoid Dev Weekend Season 2" },
    issuer: "PixelNoid Digi Academy",
    code: "Mini Competition",
    tags: ["Machine Learning", "Laravel"],
    date: { id: "11–12 Juli 2026", en: "July 11–12, 2026" },
    img: "/certificates/pixelnoid.jpg", pdf: "/certificates/pixelnoid.pdf",
  },
  {
    key: "bebras", kind: "official", type: "committee",
    title: { id: "Panitia Bebras Challenge 2025", en: "Committee Member, Bebras Challenge 2025" },
    issuer: "Bebras Indonesia × IT Del",
    code: "002/ITDEL/BC/XI/2026",
    tags: ["Bebras", "Computational Thinking"],
    date: { id: "15 November 2025", en: "November 15, 2025" },
    img: "/certificates/bebras.jpg", pdf: "/certificates/bebras.pdf",
  },
  {
    key: "dibimbing", kind: "course", type: "bootcamp",
    title: "Data Engineer Bootcamp (DSF 53.0)",
    issuer: "Dibimbing",
    code: { id: "Bootcamp 5 hari", en: "5-day bootcamp" },
    tags: ["Data Engineering"],
    date: { id: "13–17 Juli 2026", en: "July 13–17, 2026" },
    img: "/certificates/dibimbing-data-engineer.jpg", pdf: "/certificates/dibimbing-data-engineer.pdf",
  },
  {
    key: "rework-cyber", kind: "course", type: "mini",
    title: "Cyber Security Fundamentals",
    issuer: "ReWork Academy",
    code: { id: "Mini course 2 hari", en: "2-day mini course" },
    tags: ["Cyber Security"],
    date: { id: "4–5 Juli 2026", en: "July 4–5, 2026" },
    img: "/certificates/rework-cyber-security.jpg", pdf: "/certificates/rework-cyber-security.pdf",
  },
  {
    key: "rework-ai", kind: "course", type: "mini",
    title: "AI-Engineering Fundamentals",
    issuer: "ReWork Academy",
    code: { id: "Mini course 2 hari", en: "2-day mini course" },
    tags: ["AI Engineering"],
    date: { id: "4–5 Juli 2026", en: "July 4–5, 2026" },
    img: "/certificates/rework-ai-engineering.jpg", pdf: "/certificates/rework-ai-engineering.pdf",
  },
];

export const achievementTypes = {
  cert: { id: "Sertifikasi", en: "Certification" },
  competition: { id: "Kompetisi", en: "Competition" },
  committee: { id: "Kepanitiaan", en: "Committee" },
  bootcamp: { id: "Bootcamp", en: "Bootcamp" },
  mini: { id: "Mini course", en: "Mini course" },
};

// Sesuai CV. icon: nama ikon dari devicon.dev (kosongkan kalau tidak ada)
export const skillGroups = {
  web: "Web Development", data: { id: "Data & Database", en: "Data & Databases" }, design: "Design", tools: "Tools",
  soft: { id: "Soft skill", en: "Soft skills" },
};
export const skills = [
  { name: "Laravel", group: "web", icon: "laravel/laravel-original" },
  { name: "PHP", group: "web", icon: "php/php-original" },
  { name: "HTML", group: "web", icon: "html5/html5-original" },
  { name: "CSS", group: "web", icon: "css3/css3-original" },
  { name: "JavaScript", group: "web", icon: "javascript/javascript-original" },
  { name: "Next.js", group: "web", icon: "nextjs/nextjs-original" },
  { name: "MySQL", group: "data", icon: "mysql/mysql-original" },
  { name: "Database Design", group: "data", icon: "" },
  { name: { id: "Dasar Data Engineering", en: "Data Engineering fundamentals" }, group: "data", icon: "" },
  { name: "UI/UX Design", group: "design", icon: "" },
  { name: "Prototyping", group: "design", icon: "" },
  { name: "Figma", group: "design", icon: "figma/figma-original" },
  { name: "Git", group: "tools", icon: "git/git-original" },
  { name: "GitHub", group: "tools", icon: "github/github-original" },
  { name: "Visual Studio Code", group: "tools", icon: "vscode/vscode-original" },
  { name: { id: "Komunikasi", en: "Communication" }, group: "soft", icon: "" },
  { name: { id: "Kerja tim", en: "Teamwork" }, group: "soft", icon: "" },
];
export const interests = [
  { id: "Analisis Data", en: "Data Analysis" }, "Machine Learning", "Cyber Security", "Cloud (AWS)",
];

// Proyek. image = gambar sampul kartu. screens = tampilan UI (kind: "phone" atau "web"). team = foto anggota kelompok.
// Semua gambar ada di public/projects.
export const projects = [
  {
    key: "pardede",
    title: "Pardede Catering App",
    label: { id: "Proyek Akhir · 2026", en: "Final Project · 2026" },
    role: "UI/UX Designer & Developer",
    short: {
      id: "Aplikasi pemesanan katering online: aplikasi mobile untuk pelanggan dan website admin untuk mengelola semua pesanan.",
      en: "An online catering ordering system: a mobile app for customers and an admin website to manage every order.",
    },
    text: {
      id: [
        "Pardede Catering adalah sistem pemesanan katering secara online. Pelanggan tidak perlu datang atau menelepon — cukup buka aplikasi, pilih menu (nasi box, prasmanan, snack box), lalu pesan.",
        "Aplikasi mobile khusus untuk pelanggan: mereka bisa membuat akun, masuk dengan akun tersebut, melihat menu populer dan terlaris, memesan, membayar, dan mengobrol langsung dengan pihak katering lewat chat real-time.",
        "Di sisi lain, website admin dipakai pihak Pardede Catering untuk mengelola semua pesanan yang masuk — mulai dari memantau status pesanan sampai melihat ringkasan penjualan di dashboard.",
        "Peranku: merancang UI/UX dan prototipe interaktif di Figma, lalu ikut membangun aplikasinya dengan Laravel dan MySQL bersama tim. Proyek ini kami presentasikan di pameran proyek kampus IT Del.",
      ],
      en: [
        "Pardede Catering is an online catering ordering system. Customers no longer need to visit or call — they open the app, pick a menu (rice boxes, buffet, snack boxes) and order.",
        "The mobile app is for customers only: they can create an account, sign in with it, browse popular and best-selling menus, place orders, pay, and talk to the caterer through real-time chat.",
        "On the other side, the admin website lets Pardede Catering manage every incoming order — from tracking order status to viewing a sales summary on the dashboard.",
        "My role: designing the UI/UX and interactive prototypes in Figma, then helping build the app with Laravel and MySQL as part of the team. We presented it at the IT Del campus project exhibition.",
      ],
    },
    features: {
      id: ["Daftar & masuk akun pelanggan", "Katalog menu per kategori", "Pemesanan & pembayaran", "Chat real-time", "Dashboard admin untuk kelola pesanan"],
      en: ["Customer sign-up & sign-in", "Menu catalog by category", "Ordering & payment", "Real-time chat", "Admin dashboard to manage orders"],
    },
    stack: ["Laravel", "MySQL", "Figma"],
    image: "/projects/pardede-cover.jpg",
    screens: [
      { src: "/projects/pardede-app-1.png", kind: "phone", caption: { id: "Halaman pembuka", en: "Welcome screen" } },
      { src: "/projects/pardede-app-2.png", kind: "phone", caption: { id: "Daftar akun", en: "Sign up" } },
      { src: "/projects/pardede-app-3.png", kind: "phone", caption: { id: "Beranda pelanggan", en: "Customer home" } },
      { src: "/projects/pardede-admin.png", kind: "web", caption: { id: "Login admin (website)", en: "Admin login (website)" } },
    ],
    team: [
      { src: "/projects/pardede-team-1.jpg", caption: { id: "Pameran proyek kampus", en: "Campus project exhibition" } },
      { src: "/projects/pardede-team-2.jpg", caption: { id: "Tim Pardede Catering", en: "The Pardede Catering team" } },
    ],
    demo: "",
    repo: "https://github.com/MonicaPanjaitan07/Pardede-Catering-App",
  },
  {
    key: "firman-taylor",
    title: "Web Firman Taylor",
    label: { id: "Proyek Akhir · 2025", en: "Final Project · 2025" },
    role: "UI/UX Designer & Developer",
    short: {
      id: "Website pemesanan jahit online, supaya pelanggan tidak perlu capek datang dan antre di tukang jahit.",
      en: "An online tailoring order website, so customers don't have to travel and queue at the tailor.",
    },
    text: {
      id: [
        "Web Firman Taylor adalah website pemesanan jahitan secara online. Tujuannya memudahkan pelanggan: mereka bisa memesan dari rumah tanpa harus capek pergi dan mengantre di tempat tukang jahit.",
        "Pelanggan bisa membuat pesanan dan memantau status jahitannya, sementara pemilik usaha mengelola daftar pesanan lewat panel admin.",
        "Peranku: merancang tampilan dan prototipe di Figma, lalu membangun fitur pemesanan, pelacakan status pesanan, dan pengelolaan pesanan dengan Laravel, PHP, dan MySQL.",
      ],
      en: [
        "Web Firman Taylor is an online tailoring order website. It makes life easier for customers: they can order from home instead of travelling to the tailor and waiting in line.",
        "Customers place orders and track the status of their tailoring, while the owner manages the order list from an admin panel.",
        "My role: designing the interface and prototype in Figma, then building ordering, order-status tracking and order management with Laravel, PHP and MySQL.",
      ],
    },
    features: {
      id: ["Pemesanan jahit online", "Pelacakan status pesanan", "Panel admin untuk kelola pesanan"],
      en: ["Online tailoring orders", "Order status tracking", "Admin panel to manage orders"],
    },
    stack: ["Laravel", "PHP", "MySQL", "Figma"],
    image: "/projects/firman-cover.jpg",
    screens: [
      { src: "/projects/firman-beranda.png", kind: "web", caption: { id: "Beranda", en: "Home page" } },
      { src: "/projects/firman-tentang.png", kind: "web", caption: { id: "Tentang", en: "About" } },
      { src: "/projects/firman-pemesanan.png", kind: "web", caption: { id: "Halaman pemesanan", en: "Order page" } },
      { src: "/projects/firman-admin-login.png", kind: "web", caption: { id: "Login admin", en: "Admin login" } },
      { src: "/projects/firman-admin-dashboard.png", kind: "web", caption: { id: "Dashboard admin", en: "Admin dashboard" } },
      { src: "/projects/firman-admin-modifikasi.png", kind: "web", caption: { id: "Kelola pesanan (admin)", en: "Manage orders (admin)" } },
    ],
    team: [
      { src: "/projects/firman-taylor-team.jpg", caption: { id: "Tim Web Firman Taylor", en: "The Web Firman Taylor team" } },
      { src: "/projects/firman-taylor-team-2.jpg", caption: { id: "Bersama tim", en: "With the team" } },
    ],
    demo: "",
    repo: "https://github.com/MonicaPanjaitan07/web-firman-taylor",
  },
];
