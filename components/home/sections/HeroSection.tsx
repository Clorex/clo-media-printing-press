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
    <section className="pt-20 pb-10 bg-white text-center">
      <div className="container-custom">

        <h1 className="text-5xl md:text-6xl font-bold text-brand-gray-dark mb-6">
          Elevate Your Brand Through
          <br />
          <span className="text-brand-orange">
            Creative Design & Premium Printing
          </span>
        </h1>

        <p className="text-lg text-brand-gray-subtle max-w-2xl mx-auto mb-16">
          Strategic branding, professional design, high-quality printing,
          packaging, and visual solutions built to grow your business and make
          your brand impossible to ignore.
        </p>

        <div className="hero-grid mt-8">
          {images.map((img: string, index: number) => (
            <div key={index} className={`hero-item hero-${index + 1}`}>
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
