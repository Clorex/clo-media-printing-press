import { ReviewService } from "@/services/review/review.service";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

export async function TestimonialsSection() {
  const reviews =
    await ReviewService.getApprovedReviews(6);

  return (
    <Section dark>
      <Container>
        <SectionHeader
          title="What Our Clients Say"
          subtitle="Real reviews from satisfied customers."
        />

        {reviews.length === 0 ? (
          <div className="text-center opacity-70">
            No testimonials yet.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {reviews.map((review: any) => (
              <div
                key={review.id}
                className="bg-white text-brand-gray-dark p-6 rounded-brand-lg shadow-brand"
              >
                <div className="mb-3 text-brand-orange">
                  {"★".repeat(review.rating)}
                </div>
                <p className="mb-4 text-body-md">
                  "{review.reviewText}"
                </p>
                <div className="text-sm font-semibold">
                  {review.customerName}
                </div>
                <div className="text-xs opacity-60">
                  {review.productName}
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
