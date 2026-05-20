import { Truck, Star, Palette, MessageCircle } from "lucide-react";

const trustItems = [
  { title: "Fast Nationwide Delivery", icon: Truck },
  { title: "Premium Quality Printing", icon: Star },
  { title: "Professional Branding", icon: Palette },
  { title: "Reliable Customer Service", icon: MessageCircle },
];

export function TrustSection() {
  return (
    <section className="pt-12 pb-16 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 rounded-brand bg-brand-gray-light hover:shadow-brand transition-all duration-300"
              >
                <Icon className="w-8 h-8 text-brand-orange mb-4" strokeWidth={1.5} />
                <p className="text-sm font-bold text-brand-gray-dark uppercase tracking-wide">
                  {item.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
