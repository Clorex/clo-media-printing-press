import { z } from "zod";

export const reviewSchema = z.object({
  orderId: z.string().min(1),
  trackingId: z.string().min(1),
  customerName: z.string().min(2).max(100),
  productId: z.string().min(1),
  productName: z.string().min(1),
  categoryName: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  reviewText: z
    .string()
    .max(1000)
    .optional()
    .transform((val) => val?.trim()),
});

export type ReviewInput = z.infer<typeof reviewSchema>;