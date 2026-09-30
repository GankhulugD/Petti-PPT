import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Petti — Монголын тэжээвэр амьтдын нэгдсэн экосистем",
  description:
    "Petti is an all-in-one pet ecosystem for Ulaanbaatar — marketplace, digital passport, vet booking, and pet insurance in one app.",
  keywords: ["Petti", "pet app", "Mongolia", "Ulaanbaatar", "digital passport", "pet ecosystem"],
  openGraph: {
    title: "Petti — All-in-One Pet Ecosystem",
    description: "The unified pet platform for Ulaanbaatar, Mongolia",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f2f2f2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mn" className="h-full">
      <body className={`${inter.variable} h-full font-sans antialiased`}>{children}</body>
    </html>
  );
}
