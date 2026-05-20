import { adminDb } from "@/lib/firebase/admin";

async function getHeroImages() {
  const doc = await adminDb
    .collection("homepageHero")
    .doc("hero")
    .get();

  return doc.data()?.images || [];
}

export async function HeroSection() {
  const images = await getHeroImages();

  return (
    <section className="pt-16 md:pt-20 pb-12 bg-white text-center">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        <h1 className="text-3xl md:text-6xl font-bold text-brand-gray-dark mb-6 leading-tight">
          Elevate Your Brand Through
          <br />
          <span className="text-brand-orange">
            Creative Design & Premium Printing
          </span>
        </h1>

        <p className="text-base md:text-lg text-brand-gray-subtle max-w-2xl mx-auto mb-12">
          Strategic branding, professional design, high-quality printing,
          packaging, and visual solutions built to grow your business.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {images.map((img: string, index: number) => (
            <div key={index} className="w-24 md:w-40 h-40 md:h-72 rounded-xl overflow-hidden">
              {img && (
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
