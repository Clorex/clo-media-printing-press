"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function ProductTable({ products }: any) {
  if (!products || products.length === 0) {
    return (
      <div className="p-10 text-center text-gray-500">
        No products found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-brand border">
      <table className="min-w-full">
        <thead className="bg-brand-gray-light text-left">
          <tr>
            <th className="p-4">Image</th>
            <th className="p-4">Name</th>
            <th className="p-4">Category</th>
            <th className="p-4">Price (100)</th>
            <th className="p-4">Active</th>
            <th className="p-4">Featured</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product: any) => {
            const thumbnail =
              product.images && product.images.length > 0
                ? product.images[0]
                : null;

            return (
              <tr key={product.id} className="border-t hover:bg-gray-50 transition">
                {/* Image */}
                <td className="p-4">
                  {thumbnail ? (
                    <div className="relative w-16 h-16 rounded overflow-hidden">
                      <Image
                        src={thumbnail}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                      No Image
                    </div>
                  )}
                </td>

                {/* Name */}
                <td className="p-4 font-medium">
                  {product.name}
                </td>

                {/* Category */}
                <td className="p-4 text-sm text-gray-600">
                  {product.categoryName || "-"}
                </td>

                {/* Price */}
                <td className="p-4 font-semibold">
                  ?{product.basePrice100?.toLocaleString()}
                </td>

                {/* Active */}
                <td className="p-4">
                  <span
                    className={
                      product.isActive
                        ? "text-green-600 font-medium"
                        : "text-red-500 font-medium"
                    }
                  >
                    {product.isActive ? "Active" : "Inactive"}
                  </span>
                </td>

                {/* Featured */}
                <td className="p-4">
                  <span
                    className={
                      product.isFeatured
                        ? "text-brand-orange font-medium"
                        : "text-gray-400"
                    }
                  >
                    {product.isFeatured ? "Featured" : "-"}
                  </span>
                </td>

                {/* Actions */}
                <td className="p-4 text-right">
                  <Link href={`/admin/products/${product.id}`}>
                    <Button variant="outline">
                      Edit
                    </Button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
