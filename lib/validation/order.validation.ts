import { z } from "zod";
import type { OrderStatus } from "@/types/order.types";

export const orderItemSchema = z.object({
  productId: z.string().min(1),
  productName: z.string().min(1),
  categoryId: z.string().min(1),
  categoryName: z.string().min(1),
  quantity: z.number().int().positive(),
  normalizedQuantity: z.number().int().positive(),
  unitPrice: z.number().positive(),
  subtotal: z.number().positive(),
  hasDesignAddon: z.boolean(),
  designAddonPrice: z.number().nonnegative(),
});

export const orderSchema = z.object({
  customerName: z.string().min(2).max(100),
  customerPhone: z.string().min(10).max(15),
  item: orderItemSchema,
  grandTotal: z.number().positive(),
  paymentScreenshotUrl: z.string().url(),
  designFiles: z.array(z.string().url()).optional(),
  notes: z.string().optional(),
});

export type OrderInput = z.infer<typeof orderSchema>;

// Use existing OrderStatus type from types file
export const orderStatusSchema = z.enum([
  "ORDER_RECEIVED",
  "PAYMENT_SUBMITTED",
  "AWAITING_CONFIRMATION",
  "PAYMENT_CONFIRMED",
  "PROCESSING",
  "PRINTING",
  "PACKAGING",
  "READY_FOR_DELIVERY",
  "DELIVERED",
  "AWAITING_REVIEW",
  "COMPLETED",
  "CANCELLED",
  "REJECTED",
] as const);