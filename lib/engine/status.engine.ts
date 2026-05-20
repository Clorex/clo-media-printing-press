import type { OrderStatus } from "@/types/order.types";

const validTransitions: Record<OrderStatus, OrderStatus[]> = {
  ORDER_RECEIVED: ["PAYMENT_SUBMITTED"],
  PAYMENT_SUBMITTED: ["AWAITING_CONFIRMATION"],
  AWAITING_CONFIRMATION: ["PAYMENT_CONFIRMED", "REJECTED"],
  PAYMENT_CONFIRMED: ["PROCESSING"],
  PROCESSING: ["PRINTING", "CANCELLED"],
  PRINTING: ["PACKAGING"],
  PACKAGING: ["READY_FOR_DELIVERY"],
  READY_FOR_DELIVERY: ["DELIVERED"],
  DELIVERED: ["AWAITING_REVIEW"],
  AWAITING_REVIEW: ["COMPLETED"],
  COMPLETED: [],
  CANCELLED: [],
  REJECTED: [],
};

export function validateStatusTransition(
  current: OrderStatus,
  next: OrderStatus
): void {
  const allowed = validTransitions[current] || [];

  if (!allowed.includes(next)) {
    throw new Error(
      `Invalid status transition from ${current} to ${next}. Allowed: ${allowed.join(", ")}`
    );
  }
}

export function isTerminalStatus(status: OrderStatus): boolean {
  return (
    status === "COMPLETED" ||
    status === "CANCELLED" ||
    status === "REJECTED"
  );
}

export function canTransitionTo(
  current: OrderStatus,
  next: OrderStatus
): boolean {
  return validTransitions[current]?.includes(next) ?? false;
}