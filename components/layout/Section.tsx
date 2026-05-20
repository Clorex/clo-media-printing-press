import { ReactNode } from "react";

export function Section({
  children,
  dark = false,
}: {
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <section
      className={`${
        dark ? "bg-brand-gray-dark text-white" : "bg-white"
      } section-padding`}
    >
      {children}
    </section>
  );
}
