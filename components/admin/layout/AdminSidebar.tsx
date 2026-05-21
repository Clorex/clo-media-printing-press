"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { Menu, X } from "lucide-react";

const links = [
  { name: "Dashboard", href: "/admin" },
  { name: "Orders", href: "/admin/orders" },
  { name: "Categories", href: "/admin/categories" },
  { name: "Products", href: "/admin/products" },
  { name: "Hero Images", href: "/admin/products/hero" },
  { name: "Home Gallery", href: "/admin/products/gallery" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ✅ Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 text-white bg-brand-gray-dark p-2 rounded"
        onClick={() => setOpen(true)}
      >
        <Menu />
      </button>

      {/* ✅ Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ✅ Sidebar */}
      <aside
        className={cn(
          "fixed md:static top-0 left-0 h-full w-64 bg-brand-gray-dark text-white p-6 transform transition-transform duration-300 z-50",
          open ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0"
        )}
      >
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-xl font-bold">
            Admin Panel
          </h2>

          <button
            className="md:hidden"
            onClick={() => setOpen(false)}
          >
            <X />
          </button>
        </div>

        <nav className="space-y-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "block px-4 py-2 rounded transition",
                pathname.startsWith(link.href)
                  ? "bg-brand-orange"
                  : "hover:bg-white/10"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
