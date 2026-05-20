export type OrderStatus =
  | "ORDER_RECEIVED"
  | "PAYMENT_SUBMITTED"
  | "AWAITING_CONFIRMATION"
  | "PAYMENT_CONFIRMED"
  | "PROCESSING"
  | "PRINTING"
  | "PACKAGING"
  | "READY_FOR_DELIVERY"
  | "DELIVERED"
  | "AWAITING_REVIEW"
  | "COMPLETED"
  | "CANCELLED"
  | "REJECTED";

export type PaymentStatus = "PENDING" | "CONFIRMED" | "REJECTED";

export interface OrderItem {
  productId: string;
  productName: string;
  categoryId: string;
  categoryName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  selectedVariant?: string;
  hasDesignAddon: boolean;
  designAddonPrice: number;
}

export interface Order {
  id: string;
  trackingId: string;
  trackingVisible: boolean;
  customerName: string;
  customerPhone: string;
  item: OrderItem;
  subtotal: number;
  designAddonTotal: number;
  grandTotal: number;
  paymentStatus: PaymentStatus;
  paymentScreenshotUrl: string;
  designFiles: string[];
  orderStatus: OrderStatus;
  deliveryDays: number;
  estimatedDelivery: Date;
  invoicePdfUrl?: string;
  notes?: string;
  adminNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateOrderPayload {
  customerName: string;
  customerPhone: string;
  productId: string;
  productName: string;
  categoryId: string;
  categoryName: string;
  quantity: number;
  unitPrice: number;
  selectedVariant?: string;
  hasDesignAddon: boolean;
}

export interface OrderStatusUpdatePayload {
  orderId: string;
  newStatus: OrderStatus;
  adminNotes?: string;
}

export interface PaymentConfirmPayload {
  orderId: string;
  confirmed: boolean;
  adminNotes?: string;
}