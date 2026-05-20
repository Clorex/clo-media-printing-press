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
    <section className="py-24 bg-white">
      <div className="container-custom">

        <div className="gallery-grid">
          {images.map((img: string, index: number) => (
            <div key={index} className={`gallery-item gallery-${index + 1}`}>
              {img ? (
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              ) : (
                <div className="placeholder">
                  <span>+</span>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
