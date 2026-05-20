import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";

export function FramesShowcase() {
  return (
    <Section>
      <Container>
        <h2 className="text-display-sm mb-10 text-center">
          Custom Frames
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-brand-lg overflow-hidden shadow-brand hover:shadow-brand-lg transition"
            >
              <Image
                src="/images/placeholders/frame.jpg"
                alt="Frame Sample"
                width={400}
                height={300}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
