import { validateAndNormalizeQuantity } from "./quantity.engine";

interface PricingInput {
  basePrice100: number;
  basePrice50?: number;
  quantity: number;
  hasDesignAddon: boolean;
  designAddonPrice: number;
  campaignOverridePrice?: number;
}

interface PricingResult {
  normalizedQuantity: number;
  multiplier: number;
  unitPrice: number;
  subtotal: number;
  designAddon: number;
  grandTotal: number;
  campaignApplied: boolean;
  breakdown: string;
}

export function calculateFinalPrice(
  input: PricingInput
): PricingResult {

  const {
    basePrice100,
    basePrice50,
    quantity,
    hasDesignAddon,
    designAddonPrice,
    campaignOverridePrice,
  } = input;

  if (basePrice100 <= 0) {
    throw new Error("Invalid base price configuration.");
  }

  const quantityResult = validateAndNormalizeQuantity(
    quantity,
    !!basePrice50
  );

  let subtotal = 0;
  let campaignApplied = false;

  // ✅ Campaign precedence
  if (
    campaignOverridePrice !== undefined &&
    campaignOverridePrice > 0
  ) {
    subtotal = campaignOverridePrice;
    campaignApplied = true;
  } else if (
    quantityResult.tier === "50" &&
    basePrice50
  ) {
    subtotal = basePrice50;
  } else {
    subtotal = basePrice100 * quantityResult.multiplier;
  }

  if (!Number.isFinite(subtotal) || subtotal <= 0) {
    throw new Error("Invalid subtotal calculation.");
  }

  const designAddon = hasDesignAddon ? designAddonPrice : 0;

  const grandTotal = subtotal + designAddon;

  if (!Number.isFinite(grandTotal) || grandTotal <= 0) {
    throw new Error("Invalid grand total calculation.");
  }

  const unitPrice =
    subtotal / quantityResult.normalizedQuantity;

  return {
    normalizedQuantity: quantityResult.normalizedQuantity,
    multiplier: quantityResult.multiplier,
    unitPrice,
    subtotal,
    designAddon,
    grandTotal,
    campaignApplied,
    breakdown: campaignApplied
      ? "Campaign override applied"
      : quantityResult.tier === "50"
      ? "50-piece tier"
      : `100-piece multiplier × ${quantityResult.multiplier}`,
  };
}