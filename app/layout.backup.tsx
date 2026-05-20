import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Navbar } from "@/components/layout/Navbar";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CLO Media Printing Press",
  description:
    "We help your business grow through premium printing, branding, packaging and customization services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-white text-brand-gray-dark">
        {/* Navigation */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Floating WhatsApp Button */}
        <WhatsAppButton />
      </body>
    </html>
  );
}