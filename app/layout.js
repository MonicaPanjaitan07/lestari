import "./globals.css";

const site = process.env.NEXT_PUBLIC_SITE_URL || "https://lestari-two.vercel.app";
const desc = "Portofolio Monica Putri Lestari Panjaitan — mahasiswa Teknologi Informasi Institut Teknologi Del. Full-stack developer & UI/UX enthusiast dari Toba, Sumatera Utara.";

export const metadata = {
  metadataBase: new URL(site),
  title: "Monica Putri Lestari Panjaitan | Portfolio",
  description: desc,
  openGraph: { title: "Monica Putri Lestari Panjaitan | Portfolio", description: desc, type: "website", images: ["/og.png"] },
  twitter: { card: "summary_large_image", title: "Monica Putri Lestari Panjaitan | Portfolio", description: desc, images: ["/og.png"] },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0d" },
  ],
};

// Dipasang sebelum halaman tampil supaya tema/warna tersimpan tidak "berkedip".
const init = `(function(){try{var d=document.documentElement;d.classList.add('js');var t=localStorage.getItem('theme');if(['light','dark','nature'].indexOf(t)<0){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}d.dataset.theme=t;d.dataset.layout=localStorage.getItem('layout')==='top'?'top':'side';var l=localStorage.getItem('lang');if(l)d.lang=l}catch(e){document.documentElement.dataset.theme='light'}})()`;

export default function RootLayout({ children }) {
  return (
    <html lang="id" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: init }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600;700&family=Caveat:wght@600&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
