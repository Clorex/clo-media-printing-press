"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-brand font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-orange min-h-[44px]";

  const variants = {
    primary:
      "bg-brand-orange !text-white hover:bg-brand-orangeDark shadow-brand-orange",
    secondary:
      "bg-brand-gray-dark !text-white hover:bg-black",
    outline:
      "border border-brand-orange text-brand-orange hover:bg-brand-orange hover:!text-white",
    ghost:
      "text-brand-gray-dark hover:bg-brand-gray-light",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-body-md",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={cn(
        base,
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}