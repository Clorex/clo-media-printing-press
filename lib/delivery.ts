import { addDays, format, isWeekend, addBusinessDays } from "date-fns";

/**
 * Calculates estimated delivery date from today + days.
 */
export function calculateDeliveryDate(days: number): Date {
  return addDays(new Date(), days);
}

/**
 * Calculates delivery date excluding weekends (business days only).
 */
export function calculateBusinessDeliveryDate(days: number): Date {
  return addBusinessDays(new Date(), days);
}

/**
 * Formats a delivery date for display.
 * Example: "Wednesday, 25 June 2025"
 */
export function formatDeliveryDate(date: Date): string {
  return format(date, "EEEE, dd MMMM yyyy");
}

/**
 * Returns a human-friendly delivery message.
 * Example: "Estimated delivery by Wednesday, 25 June 2025"
 */
export function getDeliveryMessage(days: number): string {
  const date = calculateDeliveryDate(days);
  return `Estimated delivery by ${formatDeliveryDate(date)}`;
}

/**
 * Returns a short delivery label.
 * Example: "7 Business Days"
 */
export function getDeliveryLabel(days: number): string {
  return `${days} Business Day${days !== 1 ? "s" : ""}`;
}

/**
 * Checks if a delivery date falls on a weekend.
 * Used to warn customers.
 */
export function isDeliveryOnWeekend(days: number): boolean {
  const date = calculateDeliveryDate(days);
  return isWeekend(date);
}