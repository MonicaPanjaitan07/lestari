
// All portfolio content lives here.
// Each text has an English (en) and Indonesian (id) version.

export const L = (en, id) => ({ en, id });

// PERSONAL INFORMATION
export const site = {
  name: "Monica Putri Lestari Panjaitan",

  roles: L(
    ["Data Analyst", "UI/UX Designer", "Web Developer"],
    ["Data Analyst", "UI/UX Designer", "Web Developer"]
  ),

  whatsapp: "6281717377269",

  chatText: L(
    "Hi Monica, I saw your portfolio and would love to chat!",
    "Halo Monica, aku lihat portofoliomu dan mau ngobrol!"
  ),

  cv: "/cv-monica.pdf",
  photo: "/images/solo.jpg",
  collage: false,
};

// TECHNOLOGY LOGOS
// Laravel and Flutter are intentionally excluded from the marquee.
export const TECH = {
  MySQL: "mysql/mysql-original",
  Figma: "figma/figma-original",
  PHP: "php/php-original",
  HTML: "html5/html5-original",
  CSS: "css3/css3-original",
  JavaScript: "javascript/javascript-original",
  "Next.js": "nextjs/nextjs-original",
};

// USER INTERFACE TEXT
export const ui = {
  hi: L("Hi There,", "Halo,"),
  im: L("I'm", "Aku"),
  into: L("I Am Into", "Aku Menekuni"),

  open: L("Open to work", "Terbuka untuk kerja"),

  aboutBtn: L("About", "Tentang"),
  cvBtn: L("View CV", "Lihat CV"),
  cvDl: L("Download", "Unduh"),

  aboutT: L("About Me", "Tentang Saya"),
  eduT: L("Education", "Pendidikan"),
  skillsT: L("Skills", "Keahlian"),
  projectsT: L("Projects", "Proyek"),
  certsT: L("Certifications & Training", "Sertifikasi & Pelatihan"),
  contactT: L("Let's Connect", "Mari Terhubung"),

  contactLead: L(
    "Open to internships, freelance work, or just a chat about data, design, and the web.",
    "Terbuka untuk magang, freelance, atau sekadar ngobrol soal data, desain, dan web."
  ),

  role: L("My role", "Peranku"),
  code: L("View code", "Lihat kode"),
  team: L("Team", "Tim"),

  name: L("Name", "Nama"),
  yourName: L("Your name", "Namamu"),
  message: L("Message", "Pesan"),
  write: L("Write your message", "Tulis pesanmu"),

  send: L("Send via WhatsApp", "Kirim lewat WhatsApp"),
  hello: L("Hi Monica, I'm", "Halo Monica, aku"),

  tapZoom: L(
    "Tap an image to enlarge.",
    "Ketuk gambar untuk memperbesar."
  ),

  statProj: L("Projects", "Proyek"),
  statCert: L("Certificates", "Sertifikat"),
  statSkill: L("Skills", "Keahlian"),
};

// NAVIGATION
export const navLinks = [
  [L("Home", "Beranda"), "#home"],
  [L("About", "Tentang"), "#about"],
  [L("Education", "Pendidikan"), "#education"],
  [L("Skills", "Keahlian"), "#skills"],
  [L("Projects", "Proyek"), "#projects"],
  [L("Certifications", "Sertifikat"), "#certs"],
  [L("Contact", "Kontak"), "#contact"],
];

// ABOUT ME
export const about = [
  L(
    "I'm Monica Putri Lestari Panjaitan, an Information Technology student at Institut Teknologi Del. I work across three sides at once: data, interface design, and web development.",
    "Aku Monica Putri Lestari Panjaitan, mahasiswa Teknologi Informasi di Institut Teknologi Del. Aku bekerja di tiga sisi sekaligus: data, desain antarmuka, dan pengembangan web."
  ),

  L(
    "In team projects I own UI/UX design and prototyping, and I also write code. I'm looking for internship and freelance opportunities.",
    "Di proyek kelompok, aku memegang desain UI/UX dan prototype, sekaligus ikut menulis kode. Aku mencari kesempatan magang dan freelance."
  ),
];

// PERSONAL FACTS
export const facts = [
  [L("Campus", "Kampus"), "Institut Teknologi Del"],

  [
    L("Major", "Jurusan"),
    L("Information Technology", "Teknologi Informasi")
  ],

  [
    L("From", "Asal"),
    L("Silaen, North Sumatra", "Silaen, Sumatera Utara")
  ],

  [
    L("Hobby", "Hobi"),
    L("Traveling", "Traveling")
  ],
];

// EDUCATION
export const education = [
  {
    school: "Institut Teknologi Del",
    logo: "/logos/del.jpg",
    abbr: "DEL",
    major: L("Information Technology", "Teknologi Informasi"),
    place: L("Laguboti, North Sumatra", "Laguboti, Sumatera Utara"),
    note: L("Current student", "Mahasiswa aktif")
  },

  {
    school: "SMA Negeri 1 Silaen",
    logo: "/logos/sma.jpg",
    abbr: "SMA",
    major: L("Science (IPA)", "IPA"),
    place: L("Silaen, North Sumatra", "Silaen, Sumatera Utara"),
    note: L("Graduated", "Lulus")
  },
];

// SKILLS
export const skills = [
  [
    L("Data", "Data"),
    ["Databases", "MySQL", "Data Engineering (bootcamp)"]
  ],

  [
    L("Design", "Desain"),
    ["UI/UX Design", "Prototyping", "Figma"]
  ],

  [
    L("Web", "Web"),
    ["HTML", "CSS", "JavaScript", "PHP", "Laravel", "Next.js"]
  ],
];

// PROJECTS
export const projects = [
  {
    title: "Pardede Catering App",

    tag: L(
      "A catering ordering app for web & mobile",
      "Aplikasi pemesanan catering untuk web & mobile"
    ),

    year: L(
      "Final Project Year 2 · Group 5",
      "Proyek Akhir Tahun 2 · Kelompok 5"
    ),

    role: L(
      "UI/UX design, prototyping & code",
      "Desain UI/UX, prototype & kode"
    ),

    stack: ["Laravel", "Flutter", "MySQL", "Figma"],

    cover: "/images/pardede-booth.jpg",
    team: "/images/pardede-tim.jpg",

    desc: L(
      "An ordering platform that runs on the web and on phones. Customers order meals through the app while admins track orders from a dashboard.",
      "Platform pemesanan di web dan HP. Pelanggan memesan menu lewat aplikasi, sementara admin memantau pesanan lewat dashboard."
    ),

    features: L(
      [
        "Meal ordering on web and mobile",
        "Admin dashboard to track orders",
        "Payments and real-time chat"
      ],
      [
        "Pemesanan menu di web dan mobile",
        "Dashboard admin untuk memantau pesanan",
        "Pembayaran dan chat real-time"
      ]
    ),

    repo: "https://github.com/MonicaPanjaitan07/Pardede-Catering-App",
  },

  {
    title: "Web Firman Taylor",

    tag: L(
      "Online tailoring orders",
      "Pemesanan jahitan online"
    ),

    year: L(
      "Final Project Year 1",
      "Proyek Akhir Tahun 1"
    ),

    role: L(
      "UI/UX design, prototyping & code",
      "Desain UI/UX, prototype & kode"
    ),

    stack: ["Laravel", "PHP", "MySQL", "Figma"],

    cover: "/images/firman-tim.jpg",
    team: "/images/firman-tim2.jpg",

    desc: L(
      "A website for ordering tailoring without queueing at the shop. Customers order from anywhere, and the tailor manages orders more neatly.",
      "Web untuk memesan jahitan tanpa antre di toko. Pelanggan memesan dari mana saja, penjahit mengelola pesanan lebih rapi."
    ),

    features: L(
      [
        "Customers place tailoring orders online",
        "Customers track order status",
        "Admin manages the order list"
      ],
      [
        "Pelanggan membuat pesanan jahitan online",
        "Pelanggan memantau status pesanan",
        "Admin mengelola daftar pesanan"
      ]
    ),

    repo: "https://github.com/MonicaPanjaitan07/web-firman-taylor",
  },
];

// CERTIFICATES AND TRAINING
export const certs = [
  {
    t: "Oracle AI Database Certified Foundations Associate",
    by: "Oracle University",
    d: L("Sep 17, 2026", "17 Sep 2026"),
    cat: L("Certification", "Sertifikasi"),
    img: "/certs/c3.jpg"
  },

  {
    t: L(
      "5th Place · Pixelnoid Dev Weekend Season 2",
      "Juara 5 · Pixelnoid Dev Weekend Season 2"
    ),
    by: "PixelNoid Digi Academy · ML + Web (Laravel)",
    d: L("Jul 11–12, 2026", "11–12 Jul 2026"),
    cat: L("Competition", "Lomba"),
    img: "/certs/c5.jpg"
  },

  {
    t: L(
      "Committee Member, Bebras Challenge 2025",
      "Anggota Panitia Bebras Challenge 2025"
    ),
    by: "Institut Teknologi Del",
    d: L("Nov 15, 2025", "15 Nov 2025"),
    cat: L("Committee", "Kepanitiaan"),
    img: "/certs/c4.jpg"
  },

  {
    t: "DSF 53.0 · Data Engineer",
    by: "Dibimbing",
    d: L("Jul 13–17, 2026", "13–17 Jul 2026"),
    cat: L("Training", "Pelatihan"),
    img: "/certs/c8.jpg"
  },

  {
    t: "Cyber Security Fundamentals",
    by: "ReWork Academy",
    d: L("Jul 4–5, 2026", "4–5 Jul 2026"),
    cat: L("Training", "Pelatihan"),
    img: "/certs/c1.jpg"
  },

  {
    t: "AI-Engineering Fundamentals",
    by: "ReWork Academy",
    d: L("Jul 4–5, 2026", "4–5 Jul 2026"),
    cat: L("Training", "Pelatihan"),
    img: "/certs/c2.jpg"
  },

  {
    t: "AWS Cloud Practitioner · Practice Exam",
    by: "AWS Training & Certification",
    d: L("Oct 21, 2026", "21 Okt 2026"),
    cat: L("Training", "Pelatihan"),
    img: "/certs/c6.jpg"
  },

  {
    t: "AWS AI Practitioner · Practice Exam",
    by: "AWS Training & Certification",
    d: L("Oct 20, 2026", "20 Okt 2026"),
    cat: L("Training", "Pelatihan"),
    img: "/certs/c7.jpg"
  },
];

// CONTACT
export const contacts = [
  [
    "Instagram",
    "@lestariiipjtan",
    "https://instagram.com/lestariiipjtan"
  ],

  [
    "WhatsApp",
    "081717377269",
    "https://wa.me/6281717377269"
  ],

  [
    "Email",
    "monikaapanjaitan07@gmail.com",
    "mailto:monikaapanjaitan07@gmail.com"
  ],

  [
    "GitHub",
    "MonicaPanjaitan07",
    "https://github.com/MonicaPanjaitan07"
  ],
];
