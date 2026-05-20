import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(2).max(60),

  // Optional for admin create
  description: z.string().max(300).optional(),

  icon: z.string().optional(),

  displayOrder: z.number().int().nonnegative().optional(),

  isActive: z.boolean().optional(),
});

export type CategoryInput = z.infer<typeof categorySchema>;