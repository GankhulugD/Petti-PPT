import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Manrope, Onest } from "next/font/google";
import "./globals.css";
import "@/components/petti/petti.css";

// Манроп нь кирилл (монгол) болон латин үсгийг хоёуланг дэмждэг.
const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

// Petti брэндийн фонт: Onest (гарчиг, текст) + IBM Plex Mono (шошго, тоо). Хоёулаа кирилл дэмждэг.
const onest = Onest({
  subsets: ["latin", "cyrillic"],
  variable: "--font-onest",
  display: "swap",
});
const plex = IBM_Plex_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["500"],
  variable: "--font-plex",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Petti — Монголын тэжээвэр амьтны экосистем",
  description:
    "Petti: амьтан бүрт дижитал паспорт ба QR ID, зургаар таних AI Lost & Found хайлт, шуурхай хүргэлттэй дэлгүүр — нэг аппд.",
  keywords: ["Petti", "тэжээвэр амьтан", "дижитал паспорт", "Lost and Found", "Улаанбаатар", "pet app", "Mongolia"],
  openGraph: {
    title: "Petti — Амьтан бүр өөрийн ID-тай, алдагдсан ч олдог",
    description: "Монголын тэжээвэр амьтны нэгдсэн экосистем: паспорт, AI хайлт, дэлгүүр.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#16181D",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mn" className="h-full">
      <body className={`${manrope.variable} ${onest.variable} ${plex.variable} h-full antialiased`}>{children}</body>
    </html>
  );
}
