import { adminDb } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/lib/firebase/collections";
import { ReviewTable } from "@/components/admin/reviews/ReviewTable";

export default async function ReviewsPage() {
  const snapshot = await adminDb
    .collection(COLLECTIONS.REVIEWS)
    .orderBy("createdAt", "desc")
    .get();

  const reviews = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">
        Reviews
      </h2>

      <ReviewTable reviews={reviews} />
    </div>
  );
}