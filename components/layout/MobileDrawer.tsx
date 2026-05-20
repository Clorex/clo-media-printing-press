"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function MobileDrawer() {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className="md:hidden">
        <Menu />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50"
            onClick={close}
          >
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.3 }}
              className="bg-white w-72 h-full p-6 shadow-brand-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={close} className="mb-6">
                <X />
              </button>

              <div className="flex flex-col gap-6 text-lg">
                <Link href="/" onClick={close}>Home</Link>
                <Link href="/services" onClick={close}>Services</Link>
                <Link href="/shop" onClick={close}>Shop</Link>
                <Link href="/track" onClick={close}>Track Order</Link>
                <Link href="/contact" onClick={close}>Contact</Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
