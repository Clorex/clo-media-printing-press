import { adminDb } from "@/lib/firebase/admin";
import { ProductForm } from "@/components/admin/products/ProductForm";
import { ProductService } from "@/services/product/product.service";

export default async function NewProductPage() {
  const snapshot = await adminDb
    .collection("categories")
    .where("isActive", "==", true)
    .get();

  const categories = snapshot.docs.map((doc) => {
    const data = doc.data();

    const serialized: any = {};

    for (const key in data) {
      const value = data[key];

      if (value?.toDate instanceof Function) {
        serialized[key] = value.toDate().toISOString();
      } else {
        serialized[key] = value;
      }
    }

    return {
      id: doc.id,
      ...serialized,
    };
  });

  async function handleCreate(data: any) {
    "use server";

    if (!data.categoryId) {
      throw new Error("Category is required.");
    }

    // ✅ Fetch category name automatically
    const categoryDoc = await adminDb
      .collection("categories")
      .doc(data.categoryId)
      .get();

    const categoryName = categoryDoc.data()?.name || "";

    await ProductService.createProduct({
      ...data,
      categoryName,
    });
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">
        Create Product
      </h2>

      <ProductForm
        onSubmit={handleCreate}
        categories={categories}
      />
    </div>
  );
}