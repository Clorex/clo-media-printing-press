"use client";

import { useEffect, useState } from "react";

export default function GalleryAdminPage() {
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function loadGallery() {
      const res = await fetch("/api/admin/get-gallery");
      const data = await res.json();
      if (Array.isArray(data.images)) {
        setImages(data.images);
      }
    }
    loadGallery();
  }, []);

  async function handleUpload(e: any, index: number) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.secure_url) {
      const updated = [...images];
      updated[index] = data.secure_url;
      setImages(updated);

      await fetch("/api/admin/save-gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ images: updated }),
      });
    }

    setUploading(false);
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Home Gallery</h1>

      <div className="grid grid-cols-3 gap-6">
        {Array(6).fill("").map((_, index) => (
          <div key={index} className="space-y-3 bg-white p-4 rounded shadow">
            <div className="h-40 bg-gray-100 rounded overflow-hidden">
              {images[index] ? (
                <img
                  src={images[index]}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 text-3xl">
                  +
                </div>
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleUpload(e, index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
