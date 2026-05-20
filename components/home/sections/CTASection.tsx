"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function CTASection() {
  return (
    <section className="py-section-lg bg-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center bg-brand-gray-light p-12 rounded-brand-lg">
          <h2 className="text-display-md  text-brand-gray-dark mb-6">
            Ready to Grow Your Business?
          </h2>
          <p className="text-body-lg text-brand-gray-subtle mb-8">
            Join hundreds of businesses that trust CLO MEDIA for their
            branding and printing needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop">
              <Button variant="primary" size="lg">
                Place an Order
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
