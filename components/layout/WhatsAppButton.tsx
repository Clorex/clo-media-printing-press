"use client";

import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/2348059086041"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 bg-brand-orange text-white p-4 rounded-full shadow-brand-lg hover:bg-brand-orangeDark transition z-50"
    >
      <MessageCircle size={20} />
    </a>
  );
}
