import "./globals.css";

const site = process.env.NEXT_PUBLIC_SITE_URL || "https://lestari-portfolio.vercel.app";
const desc = "Portofolio Monica Putri Lestari Panjaitan — mahasiswa Teknologi Informasi Institut Teknologi Del, full-stack developer & UI/UX enthusiast.";

export const metadata = {
  metadataBase: new URL(site),
  title: "Monica Putri Lestari Panjaitan | Portfolio",
  description: desc,
  openGraph: { title: "Monica Putri Lestari Panjaitan | Portfolio", description: desc, type: "website", images: ["/og.png"] },
  twitter: { card: "summary_large_image", title: "Monica Putri Lestari Panjaitan | Portfolio", description: desc, images: ["/og.png"] },
};

export const viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#e3ecd3" };

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
