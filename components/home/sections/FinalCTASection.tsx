import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export function FinalCTASection() {
  return (
    <Section>
      <Container>
        <div className="text-center bg-gradient-to-r from-brand-orange to-brand-orangeDark text-white p-10 rounded-brand-xl shadow-brand-lg">
          <h2 className="text-display-sm mb-4">
            Ready to Grow Your Brand?
          </h2>
          <p className="mb-6 opacity-90">
            Let’s help you stand out with premium printing
            and branding solutions.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button>Start an Order</Button>
            <Button variant="outline">
              Contact Us
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
