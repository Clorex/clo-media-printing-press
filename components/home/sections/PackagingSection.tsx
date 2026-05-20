"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function PackagingSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">

        <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-2xl shadow-xl px-8 py-14 text-center">

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Elevate Your Brand with Premium Packaging
          </h2>

          <p className="max-w-2xl mx-auto mb-8 text-white/95 text-lg">
            Custom paper bags, nylon bags, packaging boxes and labels
            that upgrade your brand image and drive customer trust.
          </p>

          <Link href="/shop">
            <Button variant="primary">
              Explore Packaging Solutions
            </Button>
          </Link>

        </div>

      </div>
    </section>
  );
}