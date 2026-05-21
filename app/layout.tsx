import localFont from "next/font/local";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import { Navbar } from "@/components/layout/Navbar";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { headers } from "next/headers";

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerList = await headers();
  const pathname = headerList.get("x-matched-path") || "";

  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <html lang="en" className={`${delight.variable} h-full antialiased`}>
      <body className="min-h-screen flex flex-col bg-white text-brand-gray-dark">
        
        {!isAdminRoute && <Navbar />}

        <main className="flex-1 w-full">
          {!isAdminRoute ? (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          ) : (
            children
          )}
        </main>

        {!isAdminRoute && <WhatsAppButton />}
      </body>
    </html>
  );
}
