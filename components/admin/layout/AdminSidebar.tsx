"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

const links = [
  { name: "Dashboard", href: "/admin" },
  { name: "Orders", href: "/admin/orders" },
  { name: "Categories", href: "/admin/categories" },

  // Products main
  { name: "Products", href: "/admin/products" },

  // ✅ Added links
  { name: "Hero Images", href: "/admin/products/hero" },
  { name: "Home Gallery", href: "/admin/products/gallery" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-brand-gray-dark text-white p-6 hidden md:block">
      <h2 className="text-xl font-bold mb-10">
        Admin Panel
      </h2>

      <nav className="space-y-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "block px-4 py-2 rounded-brand transition",
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
  );
}