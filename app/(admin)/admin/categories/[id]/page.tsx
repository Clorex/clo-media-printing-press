import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { CategoryService } from "@/services/category/category.service";

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) throw new Error("Category ID missing.");

  const category = await CategoryService.getCategoryById(id);
  if (!category) notFound();

  const products = await CategoryService.getProductsByCategoryId(id);

  async function handleUpdateCategory(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const isActive = formData.get("isActive") === "on";

    if (!name || name.trim() === "") return;

    await CategoryService.updateCategory(id, {
      name: name.trim(),
      isActive,
    });

    revalidatePath("/admin/categories");
    revalidatePath(`/admin/categories/${id}`);
  }

  async function handleDeleteCategory() {
    "use server";

    await CategoryService.deleteCategory(id);
    revalidatePath("/admin/categories");
    redirect("/admin/categories");
  }

  return (
    <div className="p-6">
      <Link
        href="/admin/categories"
        className="text-orange-600 hover:underline"
      >
        ← Back to Categories
      </Link>

      <h1 className="text-2xl font-bold mt-4 mb-6">
        {category.name}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ✅ Update Form */}
        <form
          action={handleUpdateCategory}
          className="bg-white p-6 rounded shadow space-y-4"
        >
          <h2 className="font-semibold">Edit Category</h2>

          <input
            type="text"
            name="name"
            defaultValue={category.name}
            className="w-full p-2 border rounded"
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isActive"
              defaultChecked={category.isActive}
            />
            Active
          </label>

          <div className="flex gap-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded">
              Update
            </button>
          </div>
        </form>

        {/* ✅ Delete Form (separate form, no onClick) */}
        <form
          action={handleDeleteCategory}
          className="bg-white p-6 rounded shadow"
        >
          <h2 className="font-semibold mb-4">Danger Zone</h2>

          <button className="px-4 py-2 bg-red-600 text-white rounded">
            Delete Category
          </button>
        </form>

        {/* ✅ Products List */}
        <div className="bg-white p-6 rounded shadow lg:col-span-2">
          <h2 className="font-semibold mb-4">
            Products in {category.name}
          </h2>

          {products.length === 0 ? (
            <p className="text-gray-500">
              No products in this category yet.
            </p>
          ) : (
            <div className="space-y-3">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/admin/products/${product.id}`}
                  className="block border p-3 rounded hover:bg-gray-50"
                >
                  {product.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}