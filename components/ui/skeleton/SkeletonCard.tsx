export function SkeletonCard() {
  return (
    <div className="rounded-brand-lg bg-brand-gray-light animate-pulse p-6 space-y-4">
      <div className="h-40 bg-brand-gray-border rounded-brand" />
      <div className="h-4 bg-brand-gray-border rounded w-3/4" />
      <div className="h-4 bg-brand-gray-border rounded w-1/2" />
    </div>
  );
}
