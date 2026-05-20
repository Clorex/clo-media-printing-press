export interface CategoryConstant {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  displayOrder: number;
}

export const PRODUCT_CATEGORIES: CategoryConstant[] = [
  {
    id: "graphic-design",
    name: "Graphic Design",
    slug: "graphic-design",
    description: "Professional logo, flyer, and branding design services",
    icon: "Palette",
    displayOrder: 1,
  },
  {
    id: "printing",
    name: "Printing",
    slug: "printing",
    description: "High-quality flyers, banners, and business card printing",
    icon: "Printer",
    displayOrder: 2,
  },
  {
    id: "packaging",
    name: "Packaging",
    slug: "packaging",
    description: "Custom paper bags, boxes, and branded packaging",
    icon: "Package",
    displayOrder: 3,
  },
  {
    id: "frames",
    name: "Frames",
    slug: "frames",
    description: "Acrylic, canvas, and regular picture frames",
    icon: "Image",
    displayOrder: 4,
  },
  {
    id: "business-support",
    name: "Business Support",
    slug: "business-support",
    description: "CAC registration and business documentation",
    icon: "Briefcase",
    displayOrder: 5,
  },
];

export const CATEGORY_MAP: Record<string, CategoryConstant> =
  PRODUCT_CATEGORIES.reduce(
    (acc, cat) => {
      acc[cat.id] = cat;
      return acc;
    },
    {} as Record<string, CategoryConstant>
  );

export function getCategoryBySlug(
  slug: string
): CategoryConstant | undefined {
  return PRODUCT_CATEGORIES.find((cat) => cat.slug === slug);
}

export function getCategoryById(id: string): CategoryConstant | undefined {
  return CATEGORY_MAP[id];
}