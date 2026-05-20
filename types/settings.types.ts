export interface SiteSettings {
  id: string;
  defaultDeliveryDays: number;
  bankName: string;
  bankAccount: string;
  bankAccountName: string;
  whatsappNumber: string;
  address: string;
  designAddonPrice: number;
  isMaintenanceMode: boolean;
  maintenanceMessage?: string;
  updatedAt: Date;
}

export interface HomepageContent {
  id: string;
  heroHeadline: string;
  heroSubheadline: string;
  trustPoints: TrustPoint[];
  featuredProductIds: string[];
  updatedAt: Date;
}

export interface TrustPoint {
  id: string;
  icon: string;
  title: string;
  description: string;
}