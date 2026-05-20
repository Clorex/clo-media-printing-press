import { DESIGN_ADDON_PRICE } from "@/constants/pricing";

export interface PriceCalculationInput {
  basePrice100: number;
  basePrice50?: number;
  quantity: number;
  hasDesignAddon: boolean;
  campaignOverridePrice?: number;
}

export interface PriceCalculationResult {
  unitPrice: number;
  subtotal: number;
  designAddon: number;
  grandTotal: number;
  priceBreakdown: string;
  multiplier: number;
  isCampaignPrice: boolean;
}

/**
 * Calculates the full price for a product order.
 *
 * Logic:
 * - Campaign price overrides everything
 * - 50 pieces: use basePrice50 if available
 * - 100+ pieces: basePrice100 × (quantity / 100)
 * - Design addon: flat ₦5,000 addition
 */
export function calculatePrice(
  input: PriceCalculationInput
): PriceCalculationResult {
  const {
    basePrice100,
    basePrice50,
    quantity,
    hasDesignAddon,
    campaignOverridePrice,
  } = input;

  let unitPrice = 0;
  let subtotal = 0;
  let multiplier = 1;
  let isCampaignPrice = false;
  let priceBreakdown = "";

  if (campaignOverridePrice !== undefined && campaignOverridePrice > 0) {
    // Campaign override takes full priority
    subtotal = campaignOverridePrice;
    unitPrice = campaignOverridePrice / quantity;
    isCampaignPrice = true;
    priceBreakdown = `Campaign price: ₦${subtotal.toLocaleString()}`;
  } else if (quantity === 50 && basePrice50 !== undefined) {
    // Exact 50 piece tier
    subtotal = basePrice50;
    unitPrice = basePrice50 / 50;
    multiplier = 1;
    priceBreakdown = `₦${subtotal.toLocaleString()} for 50 pieces`;
  } else {
    // 100 piece multiplier (rounds up)
    multiplier = Math.ceil(quantity / 100);
    subtotal = basePrice100 * multiplier;
    unitPrice = basePrice100 / 100;
    priceBreakdown =
      multiplier === 1
        ? `₦${basePrice100.toLocaleString()} for 100 pieces`
        : `₦${basePrice100.toLocaleString()} × ${multiplier} = ₦${subtotal.toLocaleString()}`;
  }

  const designAddon = hasDesignAddon ? DESIGN_ADDON_PRICE : 0;
  const grandTotal = subtotal + designAddon;

  return {
    unitPrice,
    subtotal,
    designAddon,
    grandTotal,
    priceBreakdown,
    multiplier,
    isCampaignPrice,
  };
}

/**
 * Calculates price for invoice/booklet orders with tier-based pricing.
 */
export function calculateBookletPrice(quantity: number): number {
  if (quantity === 3) return 18000;
  if (quantity >= 1 && quantity <= 9) return quantity * 5500;
  if (quantity >= 10 && quantity <= 20) return quantity * 5000;
  if (quantity >= 21 && quantity <= 50) return quantity * 4500;
  return quantity * 4500;
}

/**
 * Gets the quantity label for display.
 */
export function getQuantityLabel(quantity: number): string {
  if (quantity === 1) return "1 piece";
  return `${quantity} pieces`;
}