"use client";

import { useEffect, useState } from "react";

const demoReviews = [
  { name: "Tosin A.", text: "Amazing quality and fast delivery!", rating: 5 },
  { name: "Kelvin O.", text: "My packaging looked very premium.", rating: 5 },
  { name: "Amaka E.", text: "Professional and reliable service.", rating: 4 },
  { name: "James U.", text: "Will definitely order again.", rating: 5 },
];

export function TestimonialsSection() {
  const [reviews, setReviews] = useState(demoReviews);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch("/api/reviews");
        const data = await res.json();
        if (data.length > 0) {
          setReviews(data);
        }
      } catch {}
    }

    fetchReviews();
  }, []);

  return (
    <section className="py-28 bg-brand-gray-light">
      <div className="container-custom text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">
          What Our Clients Say
        </h2>
      </div>

      <div className="container-custom grid md:grid-cols-4 gap-6">
        {reviews.slice(0, 4).map((r, i) => (
          <div key={i} className="bg-white p-6 rounded-brand shadow-brand">
            <p className="text-brand-gray-subtle mb-4">
              "{r.text}"
            </p>
            <p className="font-bold">{r.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
