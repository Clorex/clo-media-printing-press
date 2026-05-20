import { adminDb } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/lib/firebase/collections";
import { slugify } from "@/lib/utils/slugify";
import { ensureUniqueSlug } from "@/lib/utils/slugUnique";
import { categorySchema, CategoryInput } from "@/lib/validation/category.validation";

export class CategoryService {
    // ? ADMIN CREATE
  static async createCategory(data: CategoryInput) {
    const parsed = categorySchema.parse(data);

    const baseSlug = slugify(parsed.name);
    const slug = await ensureUniqueSlug(COLLECTIONS.CATEGORIES, baseSlug);

    const docRef = adminDb.collection(COLLECTIONS.CATEGORIES).doc();

    await docRef.set({
      name: parsed.name,
      description: parsed.description ?? "",
      icon: parsed.icon ?? "",
      displayOrder: parsed.displayOrder ?? 0,
      isActive: parsed.isActive ?? true,
      slug,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return { id: docRef.id, name: parsed.name, slug };
  }

  // ? ADMIN READ ALL (including inactive for admin)
  static async getAllCategoriesForAdmin() {
    const snapshot = await adminDb
      .collection(COLLECTIONS.CATEGORIES)
      .where("isDeleted", "==", false)
      .orderBy("displayOrder", "asc")
      .get();

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        slug: data.slug,
        description: data.description || "",
        icon: data.icon || "",
        displayOrder: data.displayOrder || 0,
        isActive: data.isActive ?? true,
        isDeleted: data.isDeleted || false,
        createdAt: data.createdAt?.toDate?.().toISOString() ?? null,
        updatedAt: data.updatedAt?.toDate?.().toISOString() ?? null,
      };
    });
  }

  // ? PUBLIC READ (active only)
  static async getAllActiveCategories() {
    const snapshot = await adminDb
      .collection(COLLECTIONS.CATEGORIES)
      .where("isActive", "==", true)
      .where("isDeleted", "==", false)
      .orderBy("displayOrder", "asc")
      .get();

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        slug: data.slug,
        description: data.description || "",
        icon: data.icon || "",
        displayOrder: data.displayOrder || 0,
        isActive: data.isActive ?? true,
        isDeleted: data.isDeleted || false,
        createdAt: data.createdAt?.toDate?.().toISOString() ?? null,
        updatedAt: data.updatedAt?.toDate?.().toISOString() ?? null,
      };
    });
  }

  // ? GET CATEGORY BY ID
  static async getCategoryById(id: string) {
    const doc = await adminDb.collection(COLLECTIONS.CATEGORIES).doc(id).get();
    if (!doc.exists) return null;
    
    const data = doc.data()!;
    return {
      id: doc.id,
      name: data.name,
      slug: data.slug,
      description: data.description || "",
      icon: data.icon || "",
      displayOrder: data.displayOrder || 0,
      isActive: data.isActive ?? true,
      isDeleted: data.isDeleted || false,
      createdAt: data.createdAt?.toDate?.().toISOString() ?? null,
      updatedAt: data.updatedAt?.toDate?.().toISOString() ?? null,
    };
  }

  // ? ADMIN UPDATE
  static async updateCategory(id: string, data: Partial<{ name: string; isActive: boolean; description: string }>) {
    await adminDb
      .collection(COLLECTIONS.CATEGORIES)
      .doc(id)
      .update({
        ...data,
        updatedAt: new Date(),
      });
  }

  // ? ADMIN SOFT DELETE
  static async deleteCategory(id: string) {
    await adminDb
      .collection(COLLECTIONS.CATEGORIES)
      .doc(id)
      .update({
        isDeleted: true,
        updatedAt: new Date(),
      });
  }

  // ? GET PRODUCTS BY CATEGORY ID
  static async getProductsByCategoryId(categoryId: string) {
    const snapshot = await adminDb
      .collection(COLLECTIONS.PRODUCTS)
      .where("categoryId", "==", categoryId)
      .where("isDeleted", "==", false)
      .orderBy("createdAt", "desc")
      .get();

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        categoryId: data.categoryId,
        categoryName: data.categoryName,
        description: data.description,
        basePrice100: data.basePrice100,
        basePrice50: data.basePrice50,
        hasDesignAddon: data.hasDesignAddon,
        designAddonPrice: data.designAddonPrice,
        variants: data.variants || [],
        images: data.images || [],
        isActive: data.isActive,
        isFeatured: data.isFeatured,
        minQuantity: data.minQuantity,
        tags: data.tags || [],
        createdAt: data.createdAt?.toDate?.().toISOString() ?? null,
        updatedAt: data.updatedAt?.toDate?.().toISOString() ?? null,
      };
    });
  }
}

