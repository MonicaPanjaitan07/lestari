import "./globals.css";
import { Sora, Outfit, JetBrains_Mono } from "next/font/google";

const sora = Sora({ subsets: ["latin"], variable: "--f-display", display: "swap" });
const outfit = Outfit({ subsets: ["latin"], variable: "--f-body", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--f-mono", display: "swap" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lestari-two.vercel.app";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Monica Putri Lestari Panjaitan | Portfolio",
  description: "Portfolio of Monica Putri Lestari Panjaitan: Data Analyst, UI/UX Designer, and Web Developer.",
  openGraph: {
    title: "Monica Putri Lestari Panjaitan | Portfolio",
    description: "Data Analyst, UI/UX Designer, and Web Developer.",
    url: siteUrl,
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sora.variable} ${outfit.variable} ${mono.variable}`} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
