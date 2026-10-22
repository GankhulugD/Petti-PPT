import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

// Манроп нь кирилл (монгол) болон латин үсгийг хоёуланг дэмждэг.
const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
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
  themeColor: "#171010",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mn" className="h-full">
      <body className={`${manrope.variable} h-full antialiased`}>{children}</body>
    </html>
  );
}
