/* ================================================================
   MPBS — Variant-based product catalogue
   Every (BaseProduct + Taille + Épaisseur) combo = unique SKU
   ================================================================ */

export type Variant = {
  sku: string;       // unique identifier — auto-generated per combo
  taille: string;    // panel format e.g. "2800×2070"
  epaisseur: string; // thickness e.g. "18mm"
  price: number;     // HT / m²
  stock: boolean;
};

export type BaseProduct = {
  id: string;
  name: string;        // color / design name
  category: "melamine" | "plaques" | "acryliques" | "high-gloss";
  finition: string;    // colour label used for filtering
  image: string;
  tag: string | null;
  variants: Variant[];
};

// ── Mélaminé ────────────────────────────────────────────────────
const melamine: BaseProduct[] = [
  {
    id: "mel-1", name: "CREME 3012", category: "melamine", finition: "Crème",
    image: "http://mpbs.com.tn/wp-content/uploads/2025/07/CREME-3012.jpg", tag: null,
    variants: [
      { sku: "MEL-3012-1", taille: "2800×2070", epaisseur: "16mm", price: 14.50, stock: true  },
      { sku: "MEL-3012-2", taille: "2800×2070", epaisseur: "18mm", price: 15.50, stock: true  },
      { sku: "MEL-3012-3", taille: "3050×1220", epaisseur: "18mm", price: 16.20, stock: true  },
      { sku: "MEL-3012-4", taille: "2440×1220", epaisseur: "12mm", price: 12.80, stock: false },
    ],
  },
  {
    id: "mel-2", name: "WALNUT 2322", category: "melamine", finition: "Noyer",
    image: "https://mpbs.com.tn/wp-content/uploads/2026/03/Walnut-2322-.jpg", tag: "Premium",
    variants: [
      { sku: "MEL-2322-1", taille: "2800×2070", epaisseur: "18mm", price: 16.80, stock: true  },
      { sku: "MEL-2322-2", taille: "2800×2070", epaisseur: "22mm", price: 18.20, stock: true  },
      { sku: "MEL-2322-3", taille: "3050×1220", epaisseur: "16mm", price: 15.90, stock: false },
    ],
  },
  {
    id: "mel-3", name: "LEON 3061", category: "melamine", finition: "Beige",
    image: "https://mpbs.com.tn/wp-content/uploads/2026/02/LEON-3061-min.jpg", tag: null,
    variants: [
      { sku: "MEL-3061-1", taille: "3050×1220", epaisseur: "16mm", price: 14.20, stock: true },
      { sku: "MEL-3061-2", taille: "3050×1220", epaisseur: "18mm", price: 15.00, stock: true },
      { sku: "MEL-3061-3", taille: "2440×1220", epaisseur: "12mm", price: 12.50, stock: true },
    ],
  },
  {
    id: "mel-4", name: "BAREILLY 3062", category: "melamine", finition: "Beige",
    image: "https://mpbs.com.tn/wp-content/uploads/2026/02/BAREILLY-3062-min.jpg", tag: null,
    variants: [
      { sku: "MEL-3062-1", taille: "3050×1220", epaisseur: "18mm", price: 14.90, stock: true  },
      { sku: "MEL-3062-2", taille: "2440×1220", epaisseur: "16mm", price: 14.20, stock: true  },
      { sku: "MEL-3062-3", taille: "2800×2070", epaisseur: "18mm", price: 15.60, stock: false },
    ],
  },
  {
    id: "mel-5", name: "TRUFFLE 3033", category: "melamine", finition: "Marron",
    image: "https://mpbs.com.tn/wp-content/uploads/2025/10/TRUFFLE-3033.jpg", tag: "Promo",
    variants: [
      { sku: "MEL-3033-1", taille: "2440×1220", epaisseur: "18mm", price: 15.90, stock: true  },
      { sku: "MEL-3033-2", taille: "2440×1220", epaisseur: "22mm", price: 17.90, stock: false },
      { sku: "MEL-3033-3", taille: "2800×2070", epaisseur: "25mm", price: 20.50, stock: false },
    ],
  },
  {
    id: "mel-6", name: "SLATE GREY 3013", category: "melamine", finition: "Gris",
    image: "http://mpbs.com.tn/wp-content/uploads/2025/07/SLATE-GREY-3013.jpg", tag: null,
    variants: [
      { sku: "MEL-3013-1", taille: "2440×1220", epaisseur: "16mm", price: 16.20, stock: true  },
      { sku: "MEL-3013-2", taille: "2800×2070", epaisseur: "18mm", price: 17.00, stock: true  },
      { sku: "MEL-3013-3", taille: "3050×1220", epaisseur: "12mm", price: 14.80, stock: false },
    ],
  },
];

// ── Plaqué ──────────────────────────────────────────────────────
const plaques: BaseProduct[] = [
  {
    id: "pla-1", name: "EBENE RC", category: "plaques", finition: "Noir",
    image: "http://mpbs.com.tn/wp-content/uploads/2021/04/EBENE-REC.jpg", tag: "Premium",
    variants: [
      { sku: "PLA-EBRC-1", taille: "2800×2070", epaisseur: "18mm", price: 22.50, stock: true  },
      { sku: "PLA-EBRC-2", taille: "2800×2070", epaisseur: "22mm", price: 25.00, stock: true  },
      { sku: "PLA-EBRC-3", taille: "3050×1220", epaisseur: "18mm", price: 23.20, stock: false },
    ],
  },
  {
    id: "pla-2", name: "WENGE RC", category: "plaques", finition: "Brun Foncé",
    image: "http://mpbs.com.tn/wp-content/uploads/2021/03/vingue.jpg", tag: null,
    variants: [
      { sku: "PLA-WERC-1", taille: "2800×2070", epaisseur: "22mm", price: 22.90, stock: true  },
      { sku: "PLA-WERC-2", taille: "3050×1220", epaisseur: "18mm", price: 22.00, stock: true  },
      { sku: "PLA-WERC-3", taille: "2440×1220", epaisseur: "16mm", price: 20.50, stock: false },
    ],
  },
  {
    id: "pla-3", name: "MACASAR RC", category: "plaques", finition: "Acajou",
    image: "http://mpbs.com.tn/wp-content/uploads/2021/03/Makasar-rec.jpg", tag: null,
    variants: [
      { sku: "PLA-MARC-1", taille: "3050×1220", epaisseur: "18mm", price: 23.40, stock: true },
      { sku: "PLA-MARC-2", taille: "2800×2070", epaisseur: "18mm", price: 24.10, stock: true },
      { sku: "PLA-MARC-3", taille: "2440×1220", epaisseur: "22mm", price: 25.80, stock: false},
    ],
  },
  {
    id: "pla-4", name: "CHENE FIL RC", category: "plaques", finition: "Chêne",
    image: "http://mpbs.com.tn/wp-content/uploads/2021/03/Chene-FAF-Rec.jpg", tag: null,
    variants: [
      { sku: "PLA-CHRC-1", taille: "2440×1220", epaisseur: "18mm", price: 21.90, stock: false },
      { sku: "PLA-CHRC-2", taille: "2800×2070", epaisseur: "16mm", price: 20.80, stock: true  },
      { sku: "PLA-CHRC-3", taille: "3050×1220", epaisseur: "18mm", price: 22.50, stock: true  },
    ],
  },
  {
    id: "pla-5", name: "FRÊNE FIL", category: "plaques", finition: "Chêne Clair",
    image: "http://mpbs.com.tn/wp-content/uploads/2021/03/Frene-FAF.jpg", tag: null,
    variants: [
      { sku: "PLA-FRFI-1", taille: "2440×1220", epaisseur: "16mm", price: 22.10, stock: true  },
      { sku: "PLA-FRFI-2", taille: "2800×2070", epaisseur: "18mm", price: 22.90, stock: true  },
      { sku: "PLA-FRFI-3", taille: "3050×1220", epaisseur: "12mm", price: 20.50, stock: false },
    ],
  },
  {
    id: "pla-6", name: "SAPELLI DOSSE", category: "plaques", finition: "Acajou",
    image: "http://mpbs.com.tn/wp-content/uploads/2021/03/Sapelli-Dose.jpg", tag: "Premium",
    variants: [
      { sku: "PLA-SADO-1", taille: "3050×1220", epaisseur: "22mm", price: 23.10, stock: true  },
      { sku: "PLA-SADO-2", taille: "2800×2070", epaisseur: "18mm", price: 22.40, stock: true  },
      { sku: "PLA-SADO-3", taille: "2440×1220", epaisseur: "18mm", price: 21.80, stock: false },
    ],
  },
];

// ── Acrylique ───────────────────────────────────────────────────
const acryliques: BaseProduct[] = [
  {
    id: "acr-1", name: "SAND", category: "acryliques", finition: "Beige",
    image: "http://mpbs.com.tn/wp-content/uploads/2025/05/sand-768x512-1.jpg", tag: null,
    variants: [
      { sku: "ACR-SAND-1", taille: "2800×2070", epaisseur: "18mm", price: 18.20, stock: true  },
      { sku: "ACR-SAND-2", taille: "3050×1220", epaisseur: "18mm", price: 19.00, stock: true  },
      { sku: "ACR-SAND-3", taille: "2440×1220", epaisseur: "18mm", price: 17.80, stock: false },
    ],
  },
  {
    id: "acr-2", name: "PIGEON", category: "acryliques", finition: "Gris",
    image: "http://mpbs.com.tn/wp-content/uploads/2025/05/pigeon-768x512-1.jpg", tag: null,
    variants: [
      { sku: "ACR-PIGR-1", taille: "2800×2070", epaisseur: "18mm", price: 18.60, stock: true  },
      { sku: "ACR-PIGR-2", taille: "2440×1220", epaisseur: "18mm", price: 18.00, stock: true  },
      { sku: "ACR-PIGR-3", taille: "3050×1220", epaisseur: "22mm", price: 20.50, stock: false },
    ],
  },
  {
    id: "acr-3", name: "FIR GREEN", category: "acryliques", finition: "Vert",
    image: "http://mpbs.com.tn/wp-content/uploads/2024/05/FIR-GREEN.jpg", tag: "Promo",
    variants: [
      { sku: "ACR-FGRN-1", taille: "3050×1220", epaisseur: "18mm", price: 19.10, stock: true  },
      { sku: "ACR-FGRN-2", taille: "2800×2070", epaisseur: "18mm", price: 19.80, stock: false },
      { sku: "ACR-FGRN-3", taille: "2440×1220", epaisseur: "18mm", price: 18.50, stock: true  },
    ],
  },
  {
    id: "acr-4", name: "OXYDE RED", category: "acryliques", finition: "Rouge",
    image: "http://mpbs.com.tn/wp-content/uploads/2024/05/OXYDE-RED.jpg", tag: null,
    variants: [
      { sku: "ACR-OXRD-1", taille: "2440×1220", epaisseur: "18mm", price: 19.40, stock: false },
      { sku: "ACR-OXRD-2", taille: "2800×2070", epaisseur: "18mm", price: 20.10, stock: true  },
    ],
  },
  {
    id: "acr-5", name: "GRIS CHARBON MATT", category: "acryliques", finition: "Gris",
    image: "http://mpbs.com.tn/wp-content/uploads/2022/05/grey-85728-matt.jpg", tag: null,
    variants: [
      { sku: "ACR-GRCM-1", taille: "2440×1220", epaisseur: "18mm", price: 18.90, stock: true  },
      { sku: "ACR-GRCM-2", taille: "3050×1220", epaisseur: "18mm", price: 19.60, stock: true  },
      { sku: "ACR-GRCM-3", taille: "2800×2070", epaisseur: "22mm", price: 22.00, stock: false },
    ],
  },
  {
    id: "acr-6", name: "NOIR", category: "acryliques", finition: "Noir",
    image: "http://mpbs.com.tn/wp-content/uploads/2021/06/black-8421_Logo1.jpg", tag: "Premium",
    variants: [
      { sku: "ACR-NOIR-1", taille: "3050×1220", epaisseur: "18mm", price: 20.00, stock: true  },
      { sku: "ACR-NOIR-2", taille: "2800×2070", epaisseur: "18mm", price: 20.70, stock: true  },
      { sku: "ACR-NOIR-3", taille: "2440×1220", epaisseur: "18mm", price: 19.50, stock: false },
    ],
  },
];

// ── High Gloss ──────────────────────────────────────────────────
const highGloss: BaseProduct[] = [
  {
    id: "hgl-1", name: "BLACK", category: "high-gloss", finition: "Noir",
    image: "http://mpbs.com.tn/wp-content/uploads/2025/07/BLACK.jpg", tag: "Premium",
    variants: [
      { sku: "HGL-BLCK-1", taille: "2800×2070", epaisseur: "18mm", price: 24.10, stock: true  },
      { sku: "HGL-BLCK-2", taille: "3050×1220", epaisseur: "18mm", price: 24.80, stock: false },
      { sku: "HGL-BLCK-3", taille: "2440×1220", epaisseur: "18mm", price: 23.50, stock: true  },
    ],
  },
  {
    id: "hgl-2", name: "CASMERE", category: "high-gloss", finition: "Beige",
    image: "http://mpbs.com.tn/wp-content/uploads/2025/07/CASMERE.jpg", tag: null,
    variants: [
      { sku: "HGL-CASM-1", taille: "2800×2070", epaisseur: "18mm", price: 23.70, stock: true  },
      { sku: "HGL-CASM-2", taille: "2440×1220", epaisseur: "18mm", price: 23.10, stock: true  },
      { sku: "HGL-CASM-3", taille: "3050×1220", epaisseur: "16mm", price: 22.80, stock: false },
    ],
  },
  {
    id: "hgl-3", name: "TRENDY GREY", category: "high-gloss", finition: "Gris",
    image: "http://mpbs.com.tn/wp-content/uploads/2025/07/TRENDY_GREY.jpg", tag: null,
    variants: [
      { sku: "HGL-TRGR-1", taille: "3050×1220", epaisseur: "18mm", price: 23.50, stock: false },
      { sku: "HGL-TRGR-2", taille: "2800×2070", epaisseur: "18mm", price: 24.20, stock: true  },
      { sku: "HGL-TRGR-3", taille: "2440×1220", epaisseur: "18mm", price: 23.00, stock: true  },
    ],
  },
  {
    id: "hgl-4", name: "VANILLA", category: "high-gloss", finition: "Crème",
    image: "http://mpbs.com.tn/wp-content/uploads/2025/07/VANILLA.jpg", tag: null,
    variants: [
      { sku: "HGL-VANI-1", taille: "2440×1220", epaisseur: "18mm", price: 23.90, stock: true  },
      { sku: "HGL-VANI-2", taille: "2800×2070", epaisseur: "18mm", price: 24.60, stock: false },
      { sku: "HGL-VANI-3", taille: "3050×1220", epaisseur: "18mm", price: 24.30, stock: true  },
    ],
  },
  {
    id: "hgl-5", name: "WHITE", category: "high-gloss", finition: "Blanc",
    image: "http://mpbs.com.tn/wp-content/uploads/2025/07/white.jpg", tag: null,
    variants: [
      { sku: "HGL-WHIT-1", taille: "2440×1220", epaisseur: "18mm", price: 24.30, stock: true  },
      { sku: "HGL-WHIT-2", taille: "2800×2070", epaisseur: "18mm", price: 25.00, stock: true  },
      { sku: "HGL-WHIT-3", taille: "3050×1220", epaisseur: "18mm", price: 24.80, stock: false },
    ],
  },
];

// ── Master catalogue ─────────────────────────────────────────────
export const allProducts: BaseProduct[] = [
  ...melamine,
  ...plaques,
  ...acryliques,
  ...highGloss,
];

/** Find a base product by its id */
export function getProductById(id: string): BaseProduct | undefined {
  return allProducts.find((p) => p.id === id);
}

/** Find the variant that exactly matches taille + épaisseur */
export function getVariant(
  product: BaseProduct,
  taille: string,
  epaisseur: string
): Variant | undefined {
  return product.variants.find(
    (v) => v.taille === taille && v.epaisseur === epaisseur
  );
}

/** All unique tailles available for a product */
export function getTailles(product: BaseProduct): string[] {
  return Array.from(new Set(product.variants.map((v) => v.taille))).sort();
}

/** Épaisseurs available for a given taille */
export function getEpaisseurs(product: BaseProduct, taille: string): string[] {
  return Array.from(
    new Set(
      product.variants
        .filter((v) => v.taille === taille)
        .map((v) => v.epaisseur)
    )
  ).sort();
}

/** Family-level helper: unique tailles for a whole category */
export function getCategoryTailles(category: string): string[] {
  const pool = allProducts.filter((p) => p.category === category);
  const sizes = pool.flatMap((p) => p.variants.map((v) => v.taille));
  return Array.from(new Set(sizes)).sort();
}

/** Épaisseurs available in a category for a given taille */
export function getCategoryEpaisseurs(category: string, taille: string): string[] {
  const pool = allProducts.filter((p) => p.category === category);
  const thicknesses = pool
    .flatMap((p) => p.variants.filter((v) => v.taille === taille).map((v) => v.epaisseur));
  return Array.from(new Set(thicknesses)).sort();
}

/** Finitions available in a category for given taille+épaisseur */
export function getCategoryFinitions(
  category: string,
  taille: string | null,
  epaisseur: string | null
): string[] {
  let pool = allProducts.filter((p) => p.category === category);
  if (taille)    pool = pool.filter((p) => p.variants.some((v) => v.taille === taille));
  if (epaisseur) pool = pool.filter((p) => p.variants.some((v) => v.epaisseur === epaisseur && (!taille || v.taille === taille)));
  return Array.from(new Set(pool.map((p) => p.finition))).sort();
}

/** Tiered pricing thresholds (B2B) */
export const pricingTiers = [
  { range: "1 – 9 unités",  multiplier: 1.00, label: "Prix standard" },
  { range: "10 – 49 unités", multiplier: 0.90, label: "Remise 10%"    },
  { range: "50+ unités",     multiplier: 0.80, label: "Remise 20%"    },
];

export function getTieredPrice(basePrice: number, qty: number): number {
  if (qty >= 50) return parseFloat((basePrice * 0.80).toFixed(2));
  if (qty >= 10) return parseFloat((basePrice * 0.90).toFixed(2));
  return basePrice;
}

export function getActiveTierIndex(qty: number): number {
  if (qty >= 50) return 2;
  if (qty >= 10) return 1;
  return 0;
}
