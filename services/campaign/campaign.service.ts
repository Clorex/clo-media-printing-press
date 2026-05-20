import { adminDb } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/lib/firebase/collections";
import { campaignSchema, CampaignInput } from "@/lib/validation/campaign.validation";

export class CampaignService {

  // ✅ CREATE WITH TRANSACTION (prevents dual active campaigns)
  static async createCampaign(data: CampaignInput) {
    const parsed = campaignSchema.parse(data);

    return await adminDb.runTransaction(async (tx) => {
      const existingSnapshot = await tx.get(
        adminDb
          .collection(COLLECTIONS.CAMPAIGNS)
          .where("productId", "==", parsed.productId)
          .where("isActive", "==", true)
      );

      if (!existingSnapshot.empty) {
        throw new Error(
          "Active campaign already exists for this product."
        );
      }

      const docRef = adminDb.collection(COLLECTIONS.CAMPAIGNS).doc();

      tx.set(docRef, {
        ...parsed,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return { id: docRef.id, ...parsed };
    });
  }

  // ✅ STRICT ACTIVE CHECK
  static async getActiveCampaignForProduct(productId: string) {
    const now = new Date();

    const snapshot = await adminDb
      .collection(COLLECTIONS.CAMPAIGNS)
      .where("productId", "==", productId)
      .where("isActive", "==", true)
      .where("isDeleted", "==", false)
      .limit(1)
      .get();

    if (snapshot.empty) return null;

    const doc = snapshot.docs[0];
    const campaign = doc.data();

    const start = campaign.startTime.toDate();
    const end = campaign.endTime.toDate();

    if (start <= now && end >= now) {
      return { id: doc.id, ...campaign };
    }

    return null;
  }

  // ✅ AUTO DEACTIVATE EXPIRED
  static async deactivateExpiredCampaigns() {
    const now = new Date();

    const snapshot = await adminDb
      .collection(COLLECTIONS.CAMPAIGNS)
      .where("isActive", "==", true)
      .get();

    const batch = adminDb.batch();

    snapshot.docs.forEach((doc) => {
      const data = doc.data();
      if (data.endTime.toDate() < now) {
        batch.update(doc.ref, {
          isActive: false,
          updatedAt: new Date(),
        });
      }
    });

    await batch.commit();
  }
}