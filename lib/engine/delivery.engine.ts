export interface DeliveryCalculation {
  deliveryDays: number;
  estimatedDate: Date;
  isCampaignOverride: boolean;
}

/**
 * Calculate estimated delivery date
 * Supports campaign override
 */
export function calculateEstimatedDelivery(
  baseDays: number,
  campaignOverrideDays?: number
): DeliveryCalculation {
  const days = campaignOverrideDays ?? baseDays;

  if (!Number.isInteger(days) || days <= 0) {
    throw new Error("Delivery days must be a positive integer.");
  }

  if (days > 365) {
    throw new Error("Delivery days cannot exceed 365.");
  }

  const estimated = new Date();
  estimated.setDate(estimated.getDate() + days);

  // ✅ Normalize to midnight
  estimated.setHours(0, 0, 0, 0);

  return {
    deliveryDays: days,
    estimatedDate: estimated,
    isCampaignOverride: campaignOverrideDays !== undefined,
  };
}

/**
 * Format delivery date for display
 */
export function formatDeliveryDate(date: Date): string {
  return new Date(date).toLocaleDateString("en-NG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}