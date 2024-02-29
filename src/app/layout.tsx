import type { Metadata } from "next";
import { Arimo } from "next/font/google";
import "./globals.css";

const arimo = Arimo({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bila Tak Carum EPF",
  description: "Kiraan caruman EPF yang akan hilang jika tidak disumbangkan.",
  icons: {
    icon: {
      url: "/favicon.ico",
      type: "icon",
    },
    shortcut: { url: "/favicon.png", type: "icon" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={arimo.className}>{children}</body>
    </html>
  );
}
