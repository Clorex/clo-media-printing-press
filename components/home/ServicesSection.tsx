export function ServicesSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom text-center">
        <h2 className="text-display-md mb-8">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white shadow-brand rounded-brand p-6">
            Graphic Design
          </div>
          <div className="bg-white shadow-brand rounded-brand p-6">
            Printing
          </div>
          <div className="bg-white shadow-brand rounded-brand p-6">
            Packaging
          </div>
        </div>
      </div>
    </section>
  );
}
