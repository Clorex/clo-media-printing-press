import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export function PackagingHighlight() {
  return (
    <Section>
      <Container>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-display-sm mb-4">
              Premium Branded Packaging
            </h2>
            <p className="text-body-md mb-6">
              Elevate your business with custom-designed
              paper bags and packaging that reflect your
              brand’s quality.
            </p>

            <Link href="/shop?category=packaging">
              <Button>Explore Packaging</Button>
            </Link>
          </div>

          <div className="bg-brand-gray-light rounded-brand-xl h-72" />
        </div>
      </Container>
    </Section>
  );
}
