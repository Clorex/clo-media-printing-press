import {
  Truck,
  Star,
  Palette,
  Printer,
  Package,
  Image,
  Gift,
  ClipboardList,
  MessageCircle,
  Award,
} from "lucide-react";

interface IconProps {
  name: string;
  className?: string;
}

export function Icon({ name, className = "w-10 h-10 text-orange-600" }: IconProps) {
  const icons: Record<string, any> = {
    delivery: Truck,
    quality: Award,
    branding: Palette,
    printing: Printer,
    packaging: Package,
    framing: Image,
    promo: Gift,
    registration: ClipboardList,
    support: MessageCircle,
    star: Star,
  };

  const LucideIcon = icons[name];

  if (!LucideIcon) return null;

  return <LucideIcon className={className} strokeWidth={1.5} />;
}
