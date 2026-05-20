"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { MobileDrawer } from "./MobileDrawer";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-brand">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">

          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="CLO Media Printing Press"
              width={32}
              height={32}
            />
            <span className="font-bold text-sm md:text-xl text-brand-orange whitespace-nowrap">
              CLO MEDIA PRINTING PRESS
            </span>
          </Link>

          <nav className="hidden md:flex gap-8 text-sm font-semibold">
            <Link href="/">Home</Link>
            <Link href="/services">Services</Link>
            <Link href="/shop">Shop</Link>
            <Link href="/track">Track Order</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          <div className="hidden md:block">
            <Button variant="primary">
              Start an Order
            </Button>
          </div>

          <div className="md:hidden">
            <MobileDrawer />
          </div>

        </div>
      </div>
    </header>
  );
}
