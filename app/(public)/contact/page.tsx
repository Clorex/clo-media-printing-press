"use client";

import ContactMap from "@/components/ContactMap";

export default function ContactPage() {
  return (
    <div className="pt-16">

      <section className="relative bg-brand-gray-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Let’s Create Something Great Together
          </h1>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 grid md:grid-cols-2 gap-10">

        <div>
          <h2 className="text-2xl font-bold mb-6">
            Professional Design. Quality Printing.
          </h2>

          <form className="space-y-4">
            <input className="w-full border p-3 rounded-lg" placeholder="Full Name" />
            <input className="w-full border p-3 rounded-lg" placeholder="Email" />
            <textarea className="w-full border p-3 rounded-lg" rows={4} placeholder="Message"></textarea>

            <button className="bg-brand-orange text-white px-6 py-3 rounded-lg">
              Send Message
            </button>
          </form>
        </div>

        <div className="bg-brand-orange text-white p-8 rounded-xl">
          <h3 className="text-xl font-bold mb-6">Contact Information</h3>

          <p className="mb-4">
            Opposite Borrow Pit Junction,<br />
            NDDC Road, Amukpe, Sapele,<br />
            Delta State
          </p>

          <a
            href="https://wa.me/2348059086041"
            className="block text-lg font-semibold underline"
          >
            08059086041
          </a>

          <a
            href="https://instagram.com/clomediaprinting.press"
            target="_blank"
            className="block mt-4 underline"
          >
            @clomediaprinting.press
          </a>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-20">
        <ContactMap />
      </section>

    </div>
  );
}
