"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  displayOrder: number;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string | null;
  updatedAt: string | null;
}

export function CategoriesList({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {categories.map((category) => (
            <tr key={category.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                {editingId === category.id ? (
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="p-1 border rounded"
                    autoFocus
                  />
                ) : (
                  <div>
                    <Link
                      href={`/admin/categories/${category.id}`}
                      className="text-orange-600 hover:text-orange-800 font-medium"
                    >
                      {category.name}
                    </Link>

                    {category.description && (
                      <p className="text-sm text-gray-500 mt-1">
                        {category.description.substring(0, 50)}
                        {category.description.length > 50 ? "..." : ""}
                      </p>
                    )}
                  </div>
                )}
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    category.isActive
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {category.isActive ? "Active" : "Inactive"}
                </span>
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {category.createdAt
                  ? new Date(category.createdAt).toLocaleDateString()
                  : "N/A"}
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                  {editingId === category.id ? (
                    <>
                      <button
                        onClick={async () => {
                          const response = await fetch(
                            `/api/categories/${category.id}`,
                            {
                              method: "PATCH",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({ name: editName }),
                            }
                          );

                          if (response.ok) {
                            setEditingId(null);
                            router.refresh();
                          }
                        }}
                        className="text-green-600 hover:text-green-900"
                      >
                        Save
                      </button>

                      <button
                        onClick={() => setEditingId(null)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setEditingId(category.id);
                          setEditName(category.name);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button>

                      <Link
                        href={`/admin/categories/${category.id}`}
                        className="text-orange-600 hover:text-orange-900"
                      >
                        View Products
                      </Link>

                      <button
                        onClick={async () => {
                          if (
                            confirm(
                              `Are you sure you want to delete "${category.name}"?`
                            )
                          ) {
                            const response = await fetch(
                              `/api/categories/${category.id}`,
                              {
                                method: "DELETE",
                              }
                            );

                            if (response.ok) {
                              router.refresh();
                            }
                          }
                        }}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {categories.length === 0 && (
        <div className="p-6 text-center text-gray-500">
          No categories found. Create your first category above.
        </div>
      )}
    </div>
  );
}