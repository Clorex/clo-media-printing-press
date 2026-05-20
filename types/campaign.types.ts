export interface Campaign {
  id: string;
  title: string;
  description: string;
  productId: string;
  productName: string;
  originalPrice: number;
  overridePrice: number;
  overrideDeliveryDays: number;
  bannerImage: string;
  ctaText: string;
  badge?: string;
  startTime: Date;
  endTime: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

export interface CampaignFormData {
  title: string;
  description: string;
  productId: string;
  originalPrice: number;
  overridePrice: number;
  overrideDeliveryDays: number;
  bannerImage: string;
  ctaText: string;
  badge?: string;
  startTime: Date;
  endTime: Date;
  isActive: boolean;
}

export interface ActiveCampaign extends Campaign {
  discountPercent: number;
  savingsAmount: number;
  isExpiringSoon: boolean;
}