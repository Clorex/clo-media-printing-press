import { adminDb } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/lib/firebase/collections";
import { ProductForm } from "@/components/admin/products/ProductForm";

export default async function EditProductPage({
  params,
}: any) {
  const doc = await adminDb
    .collection(COLLECTIONS.PRODUCTS)
    .doc(params.id)
    .get();

  if (!doc.exists) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">
        Edit Product
      </h2>
      <ProductForm defaultValues={doc.data()} />
    </div>
  );
}