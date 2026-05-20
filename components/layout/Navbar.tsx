"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { MobileDrawer } from "./MobileDrawer";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-brand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="CLO Media Printing Press"
              width={40}
              height={40}
            />
            <span className="font-bold text-xl text-brand-orange whitespace-nowrap">
              CLO MEDIA PRINTING PRESS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 text-sm font-semibold">
            <Link href="/">Home</Link>
            <Link href="/services">Services</Link>
            <Link href="/shop">Shop</Link>
            <Link href="/track">Track Order</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button variant="primary">
              Start an Order
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <MobileDrawer />
          </div>

        </div>
      </div>
    </header>
  );
}