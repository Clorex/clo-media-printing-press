import { HeroSection } from "@/components/home/sections/HeroSection";
import { TrustSection } from "@/components/home/sections/TrustSection";
import { ServicesSection } from "@/components/home/sections/ServicesSection";
import { PackagingSection } from "@/components/home/sections/PackagingSection";
import { DeliverySection } from "@/components/home/sections/DeliverySection";
import { CTASection } from "@/components/home/sections/CTASection";
import { HomeGallerySection } from "@/components/home/HomeGallerySection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustSection />
      <ServicesSection />
      <DeliverySection />

      {/* ? Home Gallery Section */}
      <HomeGallerySection />

      <PackagingSection />
      <CTASection />
    </>
  );
}
