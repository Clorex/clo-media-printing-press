import { adminDb } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/lib/firebase/collections";
import { reviewSchema, ReviewInput } from "@/lib/validation/review.validation";
import { validateReviewEligibility } from "@/lib/engine/reviewEligibility.engine";

export class ReviewService {

  // ✅ SUBMIT REVIEW (Transaction-safe, duplicate-proof)
  static async submitReview(data: ReviewInput) {
    const parsed = reviewSchema.parse(data);

    return await adminDb.runTransaction(async (tx) => {
      const orderRef = adminDb
        .collection(COLLECTIONS.ORDERS)
        .doc(parsed.orderId);

      const orderDoc = await tx.get(orderRef);

      if (!orderDoc.exists) {
        throw new Error("Order not found.");
      }

      const orderData = orderDoc.data();

      if (!orderData || orderData.isDeleted) {
        throw new Error("Order invalid.");
      }

      if (orderData.orderStatus !== "DELIVERED") {
        throw new Error(
          "Review allowed only after delivery."
        );
      }

      // ✅ Prevent duplicate review race condition
      const existingSnapshot = await tx.get(
        adminDb
          .collection(COLLECTIONS.REVIEWS)
          .where("orderId", "==", parsed.orderId)
          .limit(1)
      );

      if (!existingSnapshot.empty) {
        throw new Error(
          "This order has already been reviewed."
        );
      }

      const reviewRef = adminDb
        .collection(COLLECTIONS.REVIEWS)
        .doc();

      tx.set(reviewRef, {
        ...parsed,
        isApproved: false,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return {
        id: reviewRef.id,
        message:
          "Review submitted and awaiting admin approval.",
      };
    });
  }

  // ✅ APPROVE REVIEW (Admin-only)
  static async approveReview(reviewId: string) {
    const reviewRef = adminDb
      .collection(COLLECTIONS.REVIEWS)
      .doc(reviewId);

    const doc = await reviewRef.get();

    if (!doc.exists) {
      throw new Error("Review not found.");
    }

    await reviewRef.update({
      isApproved: true,
      updatedAt: new Date(),
    });
  }

  // ✅ REJECT / SOFT DELETE
  static async softDeleteReview(reviewId: string) {
    await adminDb
      .collection(COLLECTIONS.REVIEWS)
      .doc(reviewId)
      .update({
        isDeleted: true,
        updatedAt: new Date(),
      });
  }

  // ✅ PUBLIC APPROVED REVIEWS
  static async getApprovedReviews(limitCount = 10) {
    const snapshot = await adminDb
      .collection(COLLECTIONS.REVIEWS)
      .where("isApproved", "==", true)
      .where("isDeleted", "==", false)
      .orderBy("createdAt", "desc")
      .limit(limitCount)
      .get();

    return snapshot.docs.map((doc) => {
  const data = doc.data();

  return {
    id: doc.id,
    ...data,
    createdAt: data.createdAt?.toDate().toISOString() ?? null,
  };
});
  }

  // ✅ PRODUCT REVIEWS
  static async getReviewsByProduct(productId: string) {
    const snapshot = await adminDb
      .collection(COLLECTIONS.REVIEWS)
      .where("productId", "==", productId)
      .where("isApproved", "==", true)
      .where("isDeleted", "==", false)
      .get();

    return snapshot.docs.map((doc) => {
  const data = doc.data();

  return {
    id: doc.id,
    ...data,
    createdAt: data.createdAt?.toDate().toISOString() ?? null,
  };
});
  }

  // ✅ GET REVIEW STATS
  static async getReviewStats(productId: string) {
    const snapshot = await adminDb
      .collection(COLLECTIONS.REVIEWS)
      .where("productId", "==", productId)
      .where("isApproved", "==", true)
      .where("isDeleted", "==", false)
      .get();

    const reviews = snapshot.docs.map((d) => d.data());

    if (reviews.length === 0) {
      return {
        averageRating: 0,
        totalReviews: 0,
      };
    }

    const total = reviews.reduce(
      (sum, r) => sum + r.rating,
      0
    );

    return {
      averageRating: Number(
        (total / reviews.length).toFixed(2)
      ),
      totalReviews: reviews.length,
    };
  }
}