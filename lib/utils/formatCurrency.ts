/**
 * Formats a number as Nigerian Naira currency.
 * Example: 18000 → ₦18,000
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Formats large currency values in short form.
 * Example: 1500000 → ₦1.5M | 18000 → ₦18k
 */
export function formatCurrencyShort(amount: number): string {
  if (amount >= 1_000_000) {
    return `₦${(amount / 1_000_000).toFixed(1)}M`;
  }
  if (amount >= 1_000) {
    return `₦${(amount / 1_000).toFixed(0)}k`;
  }
  return `₦${amount.toLocaleString()}`;
}

/**
 * Parses a Naira string back to number.
 * Example: "₦18,000" → 18000
 */
export function parseCurrency(value: string): number {
  return Number(value.replace(/[₦,\s]/g, ""));
}

/**
 * Calculates discount percentage between two prices.
 */
export function calculateDiscountPercent(
  originalPrice: number,
  salePrice: number
): number {
  if (originalPrice <= 0) return 0;
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
}