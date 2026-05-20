"use client";

interface Props {
  onSort: (value: string) => void;
}

export function SortDropdown({ onSort }: Props) {
  return (
    <select
      onChange={(e) => onSort(e.target.value)}
      className="border border-brand-gray-border rounded-brand px-4 py-3 bg-white text-body-md"
    >
      <option value="newest">Newest</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
      <option value="featured">Featured First</option>
    </select>
  );
}
