import { adminDb } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/lib/firebase/collections";

/**
 * Validates review eligibility.
 * Used inside transaction for race-condition safety.
 */
export async function validateReviewEligibility(
  orderId: string
) {
  const orderDoc = await adminDb
    .collection(COLLECTIONS.ORDERS)
    .doc(orderId)
    .get();

  if (!orderDoc.exists) {
    throw new Error("Order not found.");
  }

  const orderData = orderDoc.data();

  if (!orderData) {
    throw new Error("Invalid order data.");
  }

  if (orderData.isDeleted) {
    throw new Error("Order no longer available.");
  }

  if (orderData.orderStatus !== "DELIVERED") {
    throw new Error(
      "Review can only be submitted after delivery."
    );
  }

  return true;
}