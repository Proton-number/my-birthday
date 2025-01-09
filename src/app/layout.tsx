import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Is it my birthday?",
  description:
    "A personal app made just for me to celebrate and cherish my special day. It's all about the little joys of life!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="relative bg-blue-50" style={{ zIndex: 2 }}>
          <Nav />
          {children}
        </div>
        <div className="dark:bg-neutral-900  items-center justify-center flex sticky bottom-0 z-0">
          <Footer />
        </div>
      </body>
    </html>
  );
}
