"use client";

import { useState, useMemo } from "react";
import { ProductCard } from "@/components/shop/ProductCard";
import { SearchBar } from "@/components/shop/filters/SearchBar";
import { FilterPanel } from "@/components/shop/filters/FilterPanel";
import { SortDropdown } from "@/components/shop/filters/SortDropdown";

interface Props {
  initialProducts: any[];
  categories: any[];
}

export function ShopContent({
  initialProducts,
  categories,
}: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [sortBy, setSortBy] = useState("newest");

  const filtered = useMemo(() => {
    let result = [...initialProducts];

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter((p) =>
        p.name?.toLowerCase().includes(term)
      );
    }

    if (categoryId) {
      result = result.filter(
        (p) => p.categoryId === categoryId
      );
    }

    if (featuredOnly) {
      result = result.filter((p) => p.isFeatured);
    }

    switch (sortBy) {
      case "price-asc":
        result.sort(
          (a, b) => (a.basePrice100 || 0) - (b.basePrice100 || 0)
        );
        break;
      case "price-desc":
        result.sort(
          (a, b) => (b.basePrice100 || 0) - (a.basePrice100 || 0)
        );
        break;
      case "featured":
        result.sort(
          (a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0)
        );
        break;
      default:
        result.sort(
          (a, b) =>
            (b.createdAt?.seconds || 0) -
            (a.createdAt?.seconds || 0)
        );
    }

    return result;
  }, [initialProducts, searchTerm, categoryId, featuredOnly, sortBy]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <SearchBar onSearch={setSearchTerm} />
        </div>
        <SortDropdown onSort={setSortBy} />
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <FilterPanel
            categories={categories}
            onCategoryChange={setCategoryId}
            onFeaturedChange={setFeaturedOnly}
          />
        </div>

        <div className="md:col-span-3">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-brand-gray-medium bg-brand-gray-light rounded-brand-lg">
              <p className="text-body-lg mb-2">
                No products found.
              </p>
              <p className="text-body-sm">
                Try adjusting your search or filters.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
