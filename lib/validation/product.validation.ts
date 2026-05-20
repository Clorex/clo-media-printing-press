import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2).max(120),

  categoryId: z.string().min(1),
  categoryName: z.string().min(1),

  // ? Relaxed validation
  description: z.string().min(1),
  shortDescription: z.string().min(1).max(200),

  basePrice100: z.number().positive(),

  basePrice50: z.number().positive().optional(),

  minQuantity: z.number().int().positive(),

  hasDesignAddon: z.boolean().default(false),
  designAddonPrice: z.number().nonnegative().default(0),

  variants: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      description: z.string().optional(),
    })
  ).default([]),

  // ? Allow empty images during creation
  images: z.array(z.string().url()).default([]),

  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),

  displayOrder: z.number().int().nonnegative().default(0),
});

export type ProductInput = z.infer<typeof productSchema>;
