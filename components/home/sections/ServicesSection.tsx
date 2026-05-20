import { Palette, Printer, Package, Image, Gift, ClipboardList } from "lucide-react";
import Link from "next/link";

const services = [
  { title: "Graphic Design", desc: "Logos, flyers, branding", icon: Palette },
  { title: "Printing Services", desc: "Cards, banners, certificates", icon: Printer },
  { title: "Packaging Solutions", desc: "Paper bags, boxes, labels", icon: Package },
  { title: "Frames & Framing", desc: "Acrylic, canvas, premium frames", icon: Image },
  { title: "Promotional Products", desc: "Mugs, t-shirts, pillows", icon: Gift },
  { title: "Business Registration", desc: "CAC registration support", icon: ClipboardList },
];

export function ServicesSection() {
  return (
    <section className="py-24 bg-brand-gray-light">
      <div className="container-custom">
        
        {/* ? Single Clean Heading */}
        <div className="text-center mb-12">
    

          <p className="text-lg text-brand-gray-subtle max-w-3xl mx-auto leading-relaxed">
            At Clo Media Printing Press, we help businesses grow through creative design, strategic branding, premium printing, packaging, and reliable nationwide delivery. From concept to production, we combine creativity, quality, and precision to bring your brand to life and make it stand out with confidence.
          </p>
        </div>

        {/* ? Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-brand shadow-brand hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="mb-6">
                  <Icon className="w-10 h-10 text-brand-orange" strokeWidth={1.5} />
                </div>

                <h3 className="text-xl font-bold text-brand-gray-dark mb-3">
                  {service.title}
                </h3>

                <p className="text-brand-gray-subtle mb-6">
                  {service.desc}
                </p>

                <Link
                  href="/shop"
                  className="text-brand-orange font-semibold hover:underline"
                >
                  View Details ?
                </Link>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
