import Link from "next/link";
import { revalidatePath } from "next/cache";
import { CategoryService } from "@/services/category/category.service";

export default async function CategoriesPage() {
  const categories = await CategoryService.getAllCategoriesForAdmin();

  async function handleCreateCategory(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;

    if (!name || name.trim() === "") return;

    await CategoryService.createCategory({
      name: name.trim(),
      description: "",
      icon: "",
      displayOrder: categories.length,
      isActive: true,
    });

    revalidatePath("/admin/categories");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Categories</h1>

      {/* ✅ Create Category Form */}
      <div className="bg-white p-4 rounded shadow mb-8">
        <form action={handleCreateCategory} className="flex gap-3">
          <input
            type="text"
            name="name"
            placeholder="New category name"
            className="flex-1 p-2 border rounded"
          />

          <button className="px-4 py-2 bg-orange-600 text-white rounded">
            Add
          </button>
        </form>
      </div>

      {/* ✅ Categories List */}
      {categories.length === 0 ? (
        <p className="text-gray-500">No categories created yet.</p>
      ) : (
        <div className="space-y-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/admin/categories/${category.id}`}
              className="block p-4 bg-white rounded shadow hover:bg-gray-50"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="font-semibold text-lg">
                    {category.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {category.isActive ? "Active" : "Inactive"}
                  </p>
                </div>

                <span className="text-orange-600 font-medium">
                  View →
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}