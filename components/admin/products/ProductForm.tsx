"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function ProductForm({
  onSubmit,
  defaultValues,
  categories = [],
}: any) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      hasDesignAddon: false,
      designAddonPrice: 0,
      variants: [],
      isActive: true,
      isFeatured: false,
      displayOrder: 0,
      ...defaultValues,
    },
  });

  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  // ✅ Automatic Cloudinary Upload
  async function handleImageUpload(e: any) {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setUploading(true);

    for (const file of files as File[]) {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.secure_url) {
        setImages((prev) => {
          const updated = [...prev, data.secure_url];
          setValue("images", updated);
          return updated;
        });
      }
    }

    setUploading(false);
  }

  function removeImage(index: number) {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
    setValue("images", updated);
  }

  return (
    <form
      onSubmit={handleSubmit((data) =>
        onSubmit({
          ...data,
          images,
          variants: [],
          hasDesignAddon: data.hasDesignAddon ?? false,
          designAddonPrice: data.designAddonPrice ?? 0,
          isActive: data.isActive ?? true,
          isFeatured: data.isFeatured ?? false,
          displayOrder: data.displayOrder ?? 0,
        })
      )}
      className="space-y-6"
    >
      <Input
        placeholder="Product Name"
        {...register("name", { required: true })}
      />

      <Input
        type="number"
        placeholder="Base Price (100)"
        {...register("basePrice100", {
          required: true,
          valueAsNumber: true,
        })}
      />

      <Input
        placeholder="Short Description"
        {...register("shortDescription")}
      />

      <Input
        placeholder="Full Description"
        {...register("description")}
      />

      <Input
        type="number"
        placeholder="Minimum Quantity"
        {...register("minQuantity", {
          valueAsNumber: true,
        })}
      />

      {/* ✅ Category Select */}
      <div>
        <label className="block mb-2 font-medium">
          Select Category
        </label>
        <select
          {...register("categoryId", { required: true })}
          className="w-full border p-3 rounded"
        >
          <option value="">Select Existing Category</option>
          {categories.map((cat: any) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* ✅ Image Upload */}
      <div>
        <label className="block mb-2 font-medium">
          Product Images
        </label>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
        />

        {uploading && (
          <p className="text-sm text-gray-500 mt-2">
            Uploading...
          </p>
        )}

        <div className="grid grid-cols-3 gap-4 mt-4">
          {images.map((img, index) => (
            <div key={index} className="relative">
              <img
                src={img}
                alt="Product"
                className="w-full h-24 object-cover rounded"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded"
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>

      <Button disabled={isSubmitting || uploading} fullWidth>
        {isSubmitting ? "Saving..." : "Save Product"}
      </Button>
    </form>
  );
}