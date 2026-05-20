import { cn } from "@/lib/utils/cn";
import { InputHTMLAttributes } from "react";

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-brand border border-brand-gray-border px-4 py-3 text-body-md focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange min-h-[44px]",
        className
      )}
      {...props}
    />
  );
}
