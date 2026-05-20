export interface QuantityValidationResult {
  normalizedQuantity: number;
  multiplier: number;
  tier: "50" | "100";
}

export function validateAndNormalizeQuantity(
  quantity: number,
  has50Tier: boolean
): QuantityValidationResult {

  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new Error("Quantity must be a positive integer.");
  }

  // ✅ Exact 50 logic
  if (quantity === 50 && has50Tier) {
    return {
      normalizedQuantity: 50,
      multiplier: 1,
      tier: "50",
    };
  }

  if (quantity < 100) {
    throw new Error("Minimum quantity is 100 pieces.");
  }

  // ✅ Ceil to next 100
  const multiplier = Math.ceil(quantity / 100);
  const normalizedQuantity = multiplier * 100;

  return {
    normalizedQuantity,
    multiplier,
    tier: "100",
  };
}