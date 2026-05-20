"use client";

import ContactMap from "@/components/ContactMap";

export default function ContactPage() {
  return (
    <div className="pt-20">

      {/* HERO SECTION */}
      <section className="relative bg-brand-gray-dark text-white py-24">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative container-custom text-center">
          <h1 className="text-5xl font-bold mb-4">
            Let’s Create Something Great Together
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Every strong brand starts with the right design. Whether you need creative graphic design,
            branding support, or quality printing, we are here to guide you from idea to finished product.
          </p>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="container-custom py-20 grid md:grid-cols-2 gap-12">

        {/* LEFT SIDE — FORM */}
        <div>
          <p className="text-brand-orange font-semibold mb-2 uppercase text-sm">
            Start a Conversation
          </p>

          <h2 className="text-3xl font-bold text-brand-gray-dark mb-6">
            Professional Design. Quality Printing. Real Results.
          </h2>

          <p className="text-brand-gray-subtle mb-8">
            We begin with strong graphic design, then move into premium printing and branded packaging.
            From business cards and banners to custom frames and packaging solutions,
            we help your brand look professional and stand out confidently.
          </p>

          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border border-brand-gray-border p-3 rounded-brand"
              />
              <input
                type="text"
                placeholder="Company"
                className="w-full border border-brand-gray-border p-3 rounded-brand"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="tel"
                placeholder="Phone"
                className="w-full border border-brand-gray-border p-3 rounded-brand"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full border border-brand-gray-border p-3 rounded-brand"
              />
            </div>

            <input
              type="text"
              placeholder="Subject"
              className="w-full border border-brand-gray-border p-3 rounded-brand"
            />

            <textarea
              placeholder="Message"
              rows={5}
              className="w-full border border-brand-gray-border p-3 rounded-brand"
            ></textarea>

            <button
              type="submit"
              className="bg-brand-orange text-white px-6 py-3 rounded-brand hover:opacity-90 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* RIGHT SIDE — INFO CARD */}
        <div className="bg-gradient-to-br from-brand-orange to-orange-600 text-white p-10 rounded-brand shadow-brand">
          <h3 className="text-2xl font-bold mb-6">
            Contact Information
          </h3>

          <div className="space-y-6 text-lg">

            <div>
              <p className="font-semibold">Our Office</p>
              <p>
                Opposite Borrow Pit Junction,<br />
                NDDC Road, Amukpe, Sapele,<br />
                Delta State
              </p>
            </div>

            <div>
              <p className="font-semibold">Call or WhatsApp Us</p>
              <p className="font-mono text-xl">
                08059086041
              </p>
            </div>

            <div>
              <p className="font-semibold">Business Hours</p>
              <p>
                Monday – Saturday | 8:00 AM – 8:00 PM
              </p>
            </div>

            <div className="pt-6 border-t border-white/30">
              <p className="font-semibold mb-3">Connect With Us</p>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-full"></div>
                <div className="w-10 h-10 bg-white/20 rounded-full"></div>
                <div className="w-10 h-10 bg-white/20 rounded-full"></div>
                <div className="w-10 h-10 bg-white/20 rounded-full"></div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* MAP SECTION — ORANGE BOX */}
      <section className="container-custom pb-24">
        <div className="bg-brand-orange p-6 rounded-brand shadow-brand">
          <ContactMap />
        </div>
      </section>

    </div>
  );
}
