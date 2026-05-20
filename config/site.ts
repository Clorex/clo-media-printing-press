export const siteConfig = {
  name: "CLO Media Printing Press",
  shortName: "CLO Media",
  description:
    "We help your business grow through branding, printing, packaging, customization, and business support services.",
  url: "https://www.clomediaprintingpress.com",
  phone: "08059086041",
  whatsapp: "2348059086041",
  instagram: "Clomediaprintingpress",
  address: {
    street: "Opposite Borrow Pit Junction, NDDC Road",
    area: "Amukpe, Sapele",
    state: "Delta State",
    country: "Nigeria",
    full: "Opposite Borrow Pit Junction, NDDC Road, Amukpe, Sapele, Delta State, Nigeria",
  },
  payment: {
    bankName: "Opay",
    accountNumber: "8059086041",
    accountName: "Itabita Miracle Okiemute",
  },
  delivery: {
    defaultDays: 7,
  },
  design: {
    addonPrice: 5000,
  },
  openGraph: {
    image: "/images/og-image.jpg",
  },
  social: {
    instagramUrl: "https://www.instagram.com/Clomediaprintingpress",
    whatsappUrl: "https://wa.me/2348059086041",
  },
} as const;

export type SiteConfig = typeof siteConfig;