"use client";

interface Category {
  id: string;
  name: string;
}

interface Props {
  categories: Category[];
  onCategoryChange: (id: string) => void;
  onFeaturedChange: (checked: boolean) => void;
}

export function FilterPanel({
  categories,
  onCategoryChange,
  onFeaturedChange,
}: Props) {
  return (
    <div className="space-y-5">
      <div>
        <label className="text-sm font-semibold mb-2 block">
          Category
        </label>
        <select
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full border border-brand-gray-border rounded-brand px-4 py-3 bg-white"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          onChange={(e) => onFeaturedChange(e.target.checked)}
          className="w-5 h-5 accent-brand-orange"
        />
        <span className="text-body-md">Featured Only</span>
      </label>
    </div>
  );
}
