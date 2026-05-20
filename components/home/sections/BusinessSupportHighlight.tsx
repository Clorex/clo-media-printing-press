import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export function BusinessSupportHighlight() {
  return (
    <Section dark>
      <Container>
        <div className="text-center">
          <h2 className="text-display-sm mb-4">
            Start Your Business Legally
          </h2>
          <p className="text-body-md mb-6 opacity-90">
            We assist with CAC registration and complete
            business documentation.
          </p>
          <Button variant="secondary">
            Get Business Support
          </Button>
        </div>
      </Container>
    </Section>
  );
}
