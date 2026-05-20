import localFont from "next/font/local";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import { Navbar } from "@/components/layout/Navbar";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

const delight = localFont({
  src: [
    {
      path: "../public/fonts/delight/delight-vf.ttf",
      style: "normal",
      weight: "100 900",
    },
  ],
  variable: "--font-main",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${delight.variable} h-full antialiased`}>
      <body className="min-h-screen flex flex-col bg-white text-brand-gray-dark">
        {/* Navigation */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-1 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>

        {/* Floating WhatsApp Button */}
        <WhatsAppButton />
      </body>
    </html>
  );
}