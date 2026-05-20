"use client";

import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-display-lg mb-6">
            We Help Your Business Grow
          </h1>
          <p className="text-body-lg text-brand-gray-medium mb-8">
            Premium printing, branding and packaging solutions.
          </p>
          <div className="flex gap-4">
            <Button>Start an Order</Button>
            <Button variant="outline">Explore Services</Button>
          </div>
        </div>
        <div className="bg-brand-gray-light rounded-brand-xl h-80" />
      </div>
    </section>
  );
}
