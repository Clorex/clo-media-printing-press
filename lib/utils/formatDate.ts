import { format, addDays, isToday, isTomorrow, formatDistanceToNow } from "date-fns";

/**
 * Format a date as: 25 Jun 2025
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return format(d, "dd MMM yyyy");
}

/**
 * Format a date as: 25 Jun 2025, 02:30 PM
 */
export function formatDateTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return format(d, "dd MMM yyyy, hh:mm a");
}

/**
 * Format a date as: Wednesday, 25 June 2025
 */
export function formatDateLong(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return format(d, "EEEE, dd MMMM yyyy");
}

/**
 * Returns estimated delivery date string.
 * Example: "Wednesday, 25 June 2025"
 */
export function getEstimatedDelivery(days: number): string {
  const deliveryDate = addDays(new Date(), days);
  return format(deliveryDate, "EEEE, dd MMMM yyyy");
}

/**
 * Returns relative time string.
 * Example: "2 hours ago"
 */
export function timeAgo(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return formatDistanceToNow(d, { addSuffix: true });
}

/**
 * Returns friendly date: "Today", "Tomorrow", or formatted date
 */
export function friendlyDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  if (isToday(d)) return "Today";
  if (isTomorrow(d)) return "Tomorrow";
  return format(d, "dd MMM yyyy");
}