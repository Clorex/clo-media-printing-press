import type { OrderStatus } from "@/types/order.types";

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  ORDER_RECEIVED: "Order Received",
  PAYMENT_SUBMITTED: "Payment Submitted",
  AWAITING_CONFIRMATION: "Awaiting Confirmation",
  PAYMENT_CONFIRMED: "Payment Confirmed",
  PROCESSING: "Processing",
  PRINTING: "Printing",
  PACKAGING: "Packaging",
  READY_FOR_DELIVERY: "Ready for Delivery",
  DELIVERED: "Delivered",
  AWAITING_REVIEW: "Awaiting Your Review",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
  REJECTED: "Rejected",
};

export const ORDER_STATUS_DESCRIPTIONS: Record<OrderStatus, string> = {
  ORDER_RECEIVED: "We have received your order.",
  PAYMENT_SUBMITTED: "Your payment has been submitted.",
  AWAITING_CONFIRMATION: "We are verifying your payment.",
  PAYMENT_CONFIRMED: "Your payment has been confirmed.",
  PROCESSING: "Your order is being processed.",
  PRINTING: "Your order is being printed.",
  PACKAGING: "Your order is being packaged.",
  READY_FOR_DELIVERY: "Your order is ready and will be delivered soon.",
  DELIVERED: "Your order has been delivered.",
  AWAITING_REVIEW: "Please leave us a review!",
  COMPLETED: "Your order is complete. Thank you!",
  CANCELLED: "This order has been cancelled.",
  REJECTED: "Your payment was rejected.",
};

export const ORDER_STATUS_SEQUENCE: OrderStatus[] = [
  "ORDER_RECEIVED",
  "PAYMENT_SUBMITTED",
  "AWAITING_CONFIRMATION",
  "PAYMENT_CONFIRMED",
  "PROCESSING",
  "PRINTING",
  "PACKAGING",
  "READY_FOR_DELIVERY",
  "DELIVERED",
  "AWAITING_REVIEW",
  "COMPLETED",
  "CANCELLED",
  "REJECTED",
];

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  ORDER_RECEIVED: "bg-gray-100 text-gray-700",
  PAYMENT_SUBMITTED: "bg-blue-100 text-blue-700",
  AWAITING_CONFIRMATION: "bg-yellow-100 text-yellow-700",
  PAYMENT_CONFIRMED: "bg-emerald-100 text-emerald-700",
  PROCESSING: "bg-orange-100 text-orange-700",
  PRINTING: "bg-orange-100 text-orange-700",
  PACKAGING: "bg-amber-100 text-amber-700",
  READY_FOR_DELIVERY: "bg-purple-100 text-purple-700",
  DELIVERED: "bg-green-100 text-green-700",
  AWAITING_REVIEW: "bg-pink-100 text-pink-700",
  COMPLETED: "bg-green-200 text-green-800",
  CANCELLED: "bg-red-100 text-red-700",
  REJECTED: "bg-red-100 text-red-700",
};

export const ORDER_STATUS_STEP: Record<OrderStatus, number> = {
  ORDER_RECEIVED: 0,
  PAYMENT_SUBMITTED: 1,
  AWAITING_CONFIRMATION: 2,
  PAYMENT_CONFIRMED: 3,
  PROCESSING: 4,
  PRINTING: 5,
  PACKAGING: 6,
  READY_FOR_DELIVERY: 7,
  DELIVERED: 8,
  AWAITING_REVIEW: 9,
  COMPLETED: 10,
  CANCELLED: 11,
  REJECTED: 11,
};

export function getOrderStatusStep(status: OrderStatus): number {
  return ORDER_STATUS_STEP[status];
}

export function isOrderStatusAfter(
  current: OrderStatus,
  target: OrderStatus
): boolean {
  return ORDER_STATUS_STEP[current] >= ORDER_STATUS_STEP[target];
}