import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "Jadwal TI 4B Non Reguler - Banjarmasin — Semester Genap (4) 2025/2026",
  description:
    "Jadwal kuliah Kelas 4B Non Reguler Teknik Informatika UNISKA BJM Semester Genap 2025/2026",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${inter.className} bg-bg text-prose min-h-screen py-6 px-4 pb-16`}
      >
        {children}
      </body>
    </html>
  );
}
