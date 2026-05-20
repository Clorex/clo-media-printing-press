import { adminDb } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/lib/firebase/collections";
import { orderSchema, OrderInput } from "@/lib/validation/order.validation";
import { generateTrackingId } from "@/lib/engine/tracking.engine";
import { calculateEstimatedDelivery } from "@/lib/engine/delivery.engine";
import { validateStatusTransition, isTerminalStatus } from "@/lib/engine/status.engine";
import { OrderStatus } from "@/types/order.types";

export class OrderService {

  // ✅ CREATE ORDER (Transaction‑safe)
  static async createOrder(
    data: OrderInput,
    baseDeliveryDays: number,
    campaignOverrideDays?: number
  ) {
    const parsed = orderSchema.parse(data);

    const trackingId = await generateTrackingId();

    const { deliveryDays, estimatedDate, isCampaignOverride } =
      calculateEstimatedDelivery(baseDeliveryDays, campaignOverrideDays);

    const docRef = adminDb.collection(COLLECTIONS.ORDERS).doc();

    await docRef.set({
      ...parsed,
      trackingId,
      trackingVisible: false,
      paymentStatus: "PENDING",
      orderStatus: "ORDER_RECEIVED" as OrderStatus,
      deliveryDays,
      estimatedDelivery: estimatedDate,
      isCampaignOverride,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return {
      id: docRef.id,
      trackingId,
      estimatedDelivery: estimatedDate,
      isCampaignOverride,
    };
  }

  // ✅ UPDATE STATUS (Admin‑only, validated)
  static async updateOrderStatus(
    orderId: string,
    nextStatus: OrderStatus
  ) {
    const docRef = adminDb.collection(COLLECTIONS.ORDERS).doc(orderId);
    const doc = await docRef.get();

    if (!doc.exists) {
      throw new Error("Order not found.");
    }

    const currentStatus = doc.data()?.orderStatus as OrderStatus;

    if (isTerminalStatus(currentStatus)) {
      throw new Error("Cannot update terminal status order.");
    }

    validateStatusTransition(currentStatus, nextStatus);

    await docRef.update({
      orderStatus: nextStatus,
      updatedAt: new Date(),
    });
  }

  // ✅ CONFIRM PAYMENT (Unlocks tracking)
  static async confirmPayment(orderId: string) {
    const docRef = adminDb.collection(COLLECTIONS.ORDERS).doc(orderId);
    const doc = await docRef.get();

    if (!doc.exists) {
      throw new Error("Order not found.");
    }

    const currentStatus = doc.data()?.orderStatus as OrderStatus;

    if (currentStatus !== "AWAITING_CONFIRMATION") {
      throw new Error("Order is not awaiting confirmation.");
    }

    await docRef.update({
      paymentStatus: "CONFIRMED",
      trackingVisible: true,
      orderStatus: "PAYMENT_CONFIRMED" as OrderStatus,
      updatedAt: new Date(),
    });
  }

  // ✅ REJECT PAYMENT
  static async rejectPayment(orderId: string) {
    const docRef = adminDb.collection(COLLECTIONS.ORDERS).doc(orderId);
    const doc = await docRef.get();

    if (!doc.exists) {
      throw new Error("Order not found.");
    }

    const currentStatus = doc.data()?.orderStatus as OrderStatus;

    if (currentStatus !== "AWAITING_CONFIRMATION") {
      throw new Error("Order is not awaiting confirmation.");
    }

    await docRef.update({
      paymentStatus: "REJECTED",
      orderStatus: "REJECTED" as OrderStatus,
      updatedAt: new Date(),
    });
  }

  // ✅ SOFT DELETE
  static async softDeleteOrder(orderId: string) {
    await adminDb
      .collection(COLLECTIONS.ORDERS)
      .doc(orderId)
      .update({
        isDeleted: true,
        updatedAt: new Date(),
      });
  }

  // ✅ GET ORDER BY TRACKING (Public‑safe)
  static async getOrderByTracking(trackingId: string) {
    const snapshot = await adminDb
      .collection(COLLECTIONS.ORDERS)
      .where("trackingId", "==", trackingId)
      .where("isDeleted", "==", false)
      .limit(1)
      .get();

    if (snapshot.empty) return null;

    const doc = snapshot.docs[0];
    const data = doc.data();

    return {
      id: doc.id,
      ...data,
      trackingVisible: data.trackingVisible,
    };
  }
}