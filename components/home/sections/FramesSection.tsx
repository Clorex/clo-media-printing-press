"use client";

export function FramesSection() {
  return (
    <section className="py-28 bg-white">
      <div className="container-custom text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">
          Premium Frames Collection
        </h2>
        <p className="text-brand-gray-subtle">
          Acrylic, canvas and elegant custom picture framing.
        </p>
      </div>

      <div className="container-custom grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-brand-gray-light p-8 rounded-brand shadow-brand text-center">
          <h3 className="font-bold mb-2">Acrylic Frames</h3>
          <p className="text-brand-gray-subtle">
            Modern glossy premium finish.
          </p>
        </div>

        <div className="bg-brand-gray-light p-8 rounded-brand shadow-brand text-center">
          <h3 className="font-bold mb-2">Canvas Frames</h3>
          <p className="text-brand-gray-subtle">
            Artistic textured framing.
          </p>
        </div>

        <div className="bg-brand-gray-light p-8 rounded-brand shadow-brand text-center">
          <h3 className="font-bold mb-2">Custom Sizes</h3>
          <p className="text-brand-gray-subtle">
            Tailored to your dimensions.
          </p>
        </div>
      </div>
    </section>
  );
}
