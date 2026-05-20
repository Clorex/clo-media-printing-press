import { HeroSection } from "@/components/home/HeroSection";
import { TrustSection } from "@/components/home/TrustSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { DeliverySection } from "@/components/home/DeliverySection";
import { Footer } from "@/components/layout/Footer";
import { CampaignBanner } from "@/components/home/campaign/CampaignBanner";
import { CampaignService } from "@/services/campaign/campaign.service";
import { HomeGallerySection } from "@/components/home/HomeGallerySection";

export default async function HomePage() {
  const campaign =
    await CampaignService.getActiveCampaignForProduct("TEST_PRODUCT_ID");

  return (
    <>
      <HeroSection />
      <CampaignBanner campaign={campaign as any} />
      <TrustSection />
      <ServicesSection />
      <DeliverySection />

      <HomeGallerySection />

     

      <Footer />
    </>
  );
}
