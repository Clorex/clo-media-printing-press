import { z } from "zod";

export const campaignSchema = z.object({
  title: z.string().min(3).max(120),
  description: z.string().min(10).max(1000),
  productId: z.string().min(1),
  productName: z.string().min(1),
  overridePrice: z.number().positive(),
  overrideDeliveryDays: z.number().int().positive(),
  bannerImage: z.string().url(),
  ctaText: z.string().min(2).max(60),
  startTime: z.date(),
  endTime: z.date(),
  isActive: z.boolean(),
}).refine(
  (data) => data.endTime > data.startTime,
  {
    message: "endTime must be after startTime",
    path: ["endTime"],
  }
);

export type CampaignInput = z.infer<typeof campaignSchema>;