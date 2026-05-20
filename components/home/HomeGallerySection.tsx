import { adminDb } from "@/lib/firebase/admin";

async function getGallery() {
  const doc = await adminDb
    .collection("homepageGallery")
    .doc("gallery")
    .get();

  return doc.data()?.images || [];
}

export async function HomeGallerySection() {
  const images = await getGallery();

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((img: string, index: number) => (
            <div key={index} className="rounded-xl overflow-hidden">
              {img && (
                <img
                  src={img}
                  alt=""
                  className="w-full h-48 md:h-72 object-cover"
                />
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
