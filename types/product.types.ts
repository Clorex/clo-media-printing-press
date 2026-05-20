export interface ProductVariant {
  id: string;
  name: string;
  description?: string;
  priceModifier?: number;
}

export interface QuantityTier {
  quantity: number;
  price: number;
  label?: string;
}

export interface Product {
  id: string;
  name: string;
  categoryId: string;
  categoryName: string;
  description: string;
  basePrice100: number;
  basePrice50?: number;
  quantityTiers?: QuantityTier[];
  hasDesignAddon: boolean;
  designAddonPrice: number;
  variants: ProductVariant[];
  images: string[];
  isActive: boolean;
  isFeatured: boolean;
  minQuantity: number;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  displayOrder: number;
  isActive: boolean;
  productCount?: number;
}

export interface ProductFormData {
  name: string;
  categoryId: string;
  description: string;
  basePrice100: number;
  basePrice50?: number;
  hasDesignAddon: boolean;
  designAddonPrice: number;
  variants: ProductVariant[];
  images: string[];
  isActive: boolean;
  isFeatured: boolean;
  minQuantity: number;
}