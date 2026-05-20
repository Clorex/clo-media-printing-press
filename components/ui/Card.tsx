import { cn } from "@/lib/utils/cn";
import { ReactNode } from "react";

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-brand-lg bg-white shadow-brand p-6 transition hover:shadow-brand-lg",
        className
      )}
    >
      {children}
    </div>
  );
}
