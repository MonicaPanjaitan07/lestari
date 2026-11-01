import "./globals.css";
import App from "@/components/App";

const site = process.env.NEXT_PUBLIC_SITE_URL || "https://lestari-two.vercel.app";
const title = "Monica Putri Lestari Panjaitan | Portfolio";
const desc = "Portfolio of Monica Putri Lestari Panjaitan — Information Technology student at Institut Teknologi Del: Web Developer, UI/UX Designer, Quality Assurance.";
export const metadata = {
  metadataBase: new URL(site), title, description: desc,
  openGraph: { title, description: desc, type: "website", images: ["/og.png"] },
  twitter: { card: "summary_large_image", title, description: desc, images: ["/og.png"] },
};
export const viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: 'try{var t=localStorage.getItem("theme");if(t)document.documentElement.dataset.theme=t}catch(e){}' }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap" />
      </head>
      <body><App>{children}</App></body>
    </html>
  );
}
