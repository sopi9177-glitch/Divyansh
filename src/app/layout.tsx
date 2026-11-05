import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Instrument_Serif, JetBrains_Mono, Manrope } from "next/font/google";
import { siteConfig } from "@/config/site";
import "./globals.css";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const sans = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-jetbrains", display: "swap" });

const title = `${siteConfig.name} — ${siteConfig.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: title, template: `%s — ${siteConfig.name}` },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    title,
    description: siteConfig.description,
    url: "/",
    siteName: siteConfig.name,
    images: [{ url: siteConfig.showreel.poster, width: 1920, height: 1080, alt: title }],
  },
  twitter: { card: "summary_large_image", title, description: siteConfig.description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#070708" },
    { media: "(prefers-color-scheme: light)", color: "#f5f2ed" },
  ],
  colorScheme: "dark light",
};

// Runs before paint so the saved (or system) theme is applied without a flash.
const themeScript = `try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="dark"}`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* Without JS, show content that would otherwise wait for scroll reveal. */}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <link rel="preconnect" href="https://videos.pexels.com" />
      </head>
      <body>{children}</body>
    </html>
  );
}
