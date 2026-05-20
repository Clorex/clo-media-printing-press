import { ServicesSection } from "@/components/home/sections/ServicesSection";

export default function ServicesPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="container-custom py-12 text-center">
        <h1 className="text-5xl font-bold text-brand-gray-dark mb-6">
          Bringing Ideas to Life..
        </h1>
        <p className="text-xl text-brand-gray-subtle">
        </p>
      </div>

      <ServicesSection />
    </div>
  );
}
