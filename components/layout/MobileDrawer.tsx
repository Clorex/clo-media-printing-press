"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function MobileDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        aria-label="Open Menu"
        onClick={() => setOpen(true)}
        className="md:hidden"
      >
        <Menu />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
          >
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.3 }}
              className="bg-white w-72 h-full p-6 shadow-brand-lg"
            >
              <button
                aria-label="Close Menu"
                onClick={() => setOpen(false)}
                className="mb-6"
              >
                <X />
              </button>

              <div className="flex flex-col gap-6 text-body-md">
                <Link href="/">Home</Link>
                <Link href="/services">Services</Link>
                <Link href="/shop">Shop</Link>
                <Link href="/track">Track Order</Link>
                <Link href="/contact">Contact</Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
