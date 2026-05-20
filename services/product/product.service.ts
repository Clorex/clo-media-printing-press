import { adminDb } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/lib/firebase/collections";
import { slugify } from "@/lib/utils/slugify";
import { ensureUniqueSlug } from "@/lib/utils/slugUnique";
import { productSchema, ProductInput } from "@/lib/validation/product.validation";

export class ProductService {

  static async getAllProductsForAdmin() {
    const snapshot = await adminDb
      .collection(COLLECTIONS.PRODUCTS)
      .where("isDeleted", "==", false)
      .orderBy("createdAt", "desc")
      .get();

    return snapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.().toISOString() ?? null,
        updatedAt: data.updatedAt?.toDate?.().toISOString() ?? null,
      };
    });
  }

  // ✅ ADD THIS BACK
  static async getProductBySlug(slug: string) {
    const snapshot = await adminDb
      .collection(COLLECTIONS.PRODUCTS)
      .where("slug", "==", slug)
      .where("isDeleted", "==", false)
      .limit(1)
      .get();

    if (snapshot.empty) return null;

    const doc = snapshot.docs[0];
    const data = doc.data();

    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt?.toDate?.().toISOString() ?? null,
      updatedAt: data.updatedAt?.toDate?.().toISOString() ?? null,
    };
  }

  static async createProduct(data: ProductInput) {
    const parsed = productSchema.parse(data);

    const baseSlug = slugify(parsed.name);
    const slug = await ensureUniqueSlug(COLLECTIONS.PRODUCTS, baseSlug);

    const docRef = adminDb.collection(COLLECTIONS.PRODUCTS).doc();

    await docRef.set({
      ...parsed,
      slug,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return { id: docRef.id, ...parsed, slug };
  }

  static async softDeleteProduct(id: string) {
    await adminDb
      .collection(COLLECTIONS.PRODUCTS)
      .doc(id)
      .update({
        isDeleted: true,
        updatedAt: new Date(),
      });
  }
}