import type { OrderStatus, PaymentStatus } from "@/types/order.types";

/**
 * Determines if the tracking ID should be visible to the customer.
 * Tracking ID is only shown after admin confirms payment.
 */
export function isTrackingVisible(
  paymentStatus: PaymentStatus,
  trackingVisible: boolean
): boolean {
  return paymentStatus === "CONFIRMED" && trackingVisible;
}

/**
 * Masks tracking ID for pre-confirmation display.
 * Shows "CLO-••••••" until payment is confirmed.
 */
export function maskTrackingId(trackingId: string): string {
  const prefix = trackingId.split("-")[0];
  return `${prefix}-••••••`;
}

/**
 * Returns the message shown to customer based on tracking visibility.
 */
export function getTrackingMessage(
  paymentStatus: PaymentStatus,
  trackingVisible: boolean
): string {
  if (paymentStatus === "REJECTED") {
    return "Your payment was rejected. Please contact us on WhatsApp.";
  }
  if (!trackingVisible || paymentStatus !== "CONFIRMED") {
    return "Your tracking ID will be visible once payment is confirmed.";
  }
  return "Your order is being tracked. Copy your tracking ID below.";
}

/**
 * Determines if an order can be reviewed.
 */
export function canLeaveReview(status: OrderStatus): boolean {
  return status === "AWAITING_REVIEW" || status === "DELIVERED";
}

/**
 * Returns the progress percentage for a tracking progress bar.
 * Returns 0–100 based on order status.
 */
export function getOrderProgressPercent(status: OrderStatus): number {
  const progressMap: Record<OrderStatus, number> = {
    ORDER_RECEIVED: 5,
    PAYMENT_SUBMITTED: 15,
    AWAITING_CONFIRMATION: 25,
    PAYMENT_CONFIRMED: 35,
    PROCESSING: 50,
    PRINTING: 60,
    PACKAGING: 75,
    READY_FOR_DELIVERY: 85,
    DELIVERED: 95,
    AWAITING_REVIEW: 98,
    COMPLETED: 100,
    CANCELLED: 0,
    REJECTED: 0,
  };
  return progressMap[status] ?? 0;
}