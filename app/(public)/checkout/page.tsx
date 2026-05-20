import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export default function CheckoutPage() {
  return (
    <Section>
      <Container>
        <h1 className="text-display-md mb-8">
          Checkout
        </h1>

        <CheckoutForm total={50000} />
      </Container>
    </Section>
  );
}