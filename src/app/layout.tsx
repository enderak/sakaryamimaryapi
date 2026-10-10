import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloating from "@/components/WhatsAppFloating";
import CookieBanner from "@/components/CookieBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Sakarya Mimar Yapı | İnşaat, Dekorasyon ve Ev Tadilatı",
  description: "Sakarya Mimar Yapı; Serdivan merkez ofisimizle anahtar teslim ev tadilatı, modern mutfak & banyo yenileme, Sapanca villa inşaatı ve 3D iç mimarlık. 2 Yıl garanti, ücretsiz keşif.",
  keywords: [
    "sakarya mimar yapı",
    "sakarya tadilat",
    "serdivan tadilat dekorasyon",
    "sakarya ev tadilatı",
    "serdivan ev yenileme",
    "adapazarı dekorasyon",
    "sapanca villa inşaatı",
    "anahtar teslim tadilat sakarya",
    "sakarya mutfak banyo yenileme",
    "asım yılmazer",
    "abdussamet gültekin"
  ],
  authors: [{ name: "Sakarya Mimar Yapı" }],
  openGraph: {
    title: "Sakarya Mimar Yapı | İnşaat, Dekorasyon ve Ev Tadilatı",
    description: "Sakarya geneli sözleşmeli, 2 yıl garantili anahtar teslim ev tadilatı ve villa inşaatı.",
    url: "https://www.sakaryamimaryapi.com",
    siteName: "Sakarya Mimar Yapı",
    locale: "tr_TR",
    type: "website"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 selection:bg-amber-100 selection:text-amber-900">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloating />
        <CookieBanner />
      </body>
    </html>
  );
}
