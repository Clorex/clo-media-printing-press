"use client";

import { motion } from "framer-motion";
import { CountdownTimer } from "./CountdownTimer";
import { Button } from "@/components/ui/Button";
import { fadeUp } from "@/lib/animations/presets";

interface Campaign {
  id: string;
  title: string;
  description: string;
  overridePrice: number;
  overrideDeliveryDays: number;
  bannerImage: string;
  ctaText: string;
  endTime: any;
}

interface Props {
  campaign: Campaign | null;
}

export function CampaignBanner({ campaign }: Props) {
  if (!campaign) return null;

  const endTime = new Date(campaign.endTime);

  return (
    <section className="section-padding bg-brand-orange text-white">
      <div className="container-custom">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          className="grid md:grid-cols-2 gap-10 items-center"
        >
          <div>
            <h2 className="text-display-sm mb-4">
              {campaign.title}
            </h2>

            <p className="mb-4 opacity-90">
              {campaign.description}
            </p>

            <p className="text-lg font-semibold mb-2">
              Special Offer Price: ₦
              {campaign.overridePrice.toLocaleString()}
            </p>

            <p className="mb-6">
              Delivery within {campaign.overrideDeliveryDays} days
            </p>

            <Button variant="secondary">
              {campaign.ctaText || "Book Now"}
            </Button>
          </div>

          <CountdownTimer endTime={endTime} />
        </motion.div>
      </div>
    </section>
  );
}
