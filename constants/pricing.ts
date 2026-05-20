export const DESIGN_ADDON_PRICE = 5000;

export const RIBBON_HANDLE_EXTRA = 5000;

export const MIN_ORDER_QUANTITY = 50;

export const QUANTITY_OPTIONS_50_AND_100: number[] = [50, 100];

export const QUANTITY_OPTIONS_100_MULTIPLES: number[] = [
  100, 200, 300, 400, 500, 600, 700, 800, 900, 1000,
];

export const QUANTITY_OPTIONS_WITH_50: number[] = [
  50, 100, 200, 300, 400, 500,
];

export const BOOKLET_QUANTITY_TIERS = [
  { min: 3, max: 1, label: "3 Booklets (flat)", priceEach: 6000 },
  { min: 1, max: 9, label: "1–9 Booklets", priceEach: 5500 },
  { min: 10, max: 20, label: "10–20 Booklets", priceEach: 5000 },
  { min: 21, max: 50, label: "21–50 Booklets", priceEach: 4500 },
] as const;

export const SERVICE_PRICES = {
  graphicDesign: {
    businessLogo: 8000,
    businessFlyer: 5500,
    invitationCard: 7000,
    businessCards: 8000,
    videoAdverts: 22000,
    instagramRemodeling: 17000,
    tiktokRemodeling: 17000,
    instagramAdsSetup: 12000,
    tiktokAdsSetup: 12000,
    facebookAdsSetup: 12000,
    snapchatAdsSetup: 12000,
    brandWebsiteDesignMin: 90000,
    brandWebsiteDesignMax: 170000,
  },
  flyerPrinting: {
    medium50: 10000,
    medium100: 16000,
    big50: 16000,
    big100: 20000,
    extraLarge50: 20000,
    extraLarge100: 25000,
  },
  businessCards: {
    glossyLaminated100: 18000,
    starLaminated100: 20000,
    glitterLaminated100: 35000,
  },
  invoiceReceipts: {
    threeBooklets: 18000,
    per1to9: 5500,
    per10to20: 5000,
    per21to50: 4500,
  },
  paperTags: {
    tagWithRope100: 17000,
    deliverySticker100: 14000,
    deliveryCard100: 10000,
  },
  paperBagsRope: {
    a5_50: 30000,
    a5_100: 40000,
    a4_50: 75000,
    a4_100: 80000,
    a3_50: 85000,
    a3_100: 110000,
    a2_50: 140000,
    a2_100: 160000,
  },
  paperBagsPlastic: {
    a5_50: 40000,
    a5_100: 55000,
    a4_50: 85000,
    a4_100: 90000,
    a3_50: 95000,
    a3_100: 125000,
    a2_50: 150000,
    a2_100: 175000,
  },
  jotters: {
    hardCoverBig50: 150000,
    hardCoverBig100: 175000,
    normalCoverBig50: 90000,
    normalCoverBig100: 110000,
    hardCoverMedium50: 100000,
    hardCoverMedium100: 130000,
    normalCoverMedium50: 65000,
    normalCoverMedium100: 80000,
    exerciseBooks100: 70000,
  },
  acrylicFrames: {
    "12x16": 25000,
    "16x20": 30000,
    "20x24": 38000,
    "24x30": 45000,
  },
  regularFrames: {
    "8x10": 12000,
    "10x12": 13000,
    "12x16": 16000,
    "16x20": 25000,
    "20x24": 30000,
    "24x30": 35000,
  },
  canvasFrames: {
    "12x16": 23000,
    "16x20": 28000,
    "20x24": 35000,
    "24x30": 40000,
  },
} as const;