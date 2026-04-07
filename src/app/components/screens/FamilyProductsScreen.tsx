import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  SlidersHorizontal,
  ShoppingCart,
  Plus,
  Check,
  Search,
} from "lucide-react";

const NAVY = "#f4e9da";
const ORANGE = "#FF6600";

/* ── Shared product catalogue ─────────────────────────────────── */
const allProducts = [
  // ─ Mélaminés ─────────────────────────────────────────────────
  {
    id: "1",
    name: "CREME 3012",
    thickness: "18mm",
    sku: "CREME-3012",
    price: "15.50",
    unit: "m²",
    category: "melamine",
    stock: true,
    image: "http://mpbs.com.tn/wp-content/uploads/2025/07/CREME-3012.jpg",
    tag: null,
  },
  {
    id: "2",
    name: "WALNUT 2322",
    thickness: "18mm",
    sku: "WALNUT-2322",
    price: "16.80",
    unit: "m²",
    category: "melamine",
    stock: true,
    image: "https://mpbs.com.tn/wp-content/uploads/2026/03/Walnut-2322-.jpg",
    tag: "Premium",
  },
  {
    id: "3",
    name: "LEON 3061",
    thickness: "18mm",
    sku: "LEON-3061",
    price: "14.20",
    unit: "m²",
    category: "melamine",
    stock: true,
    image: "https://mpbs.com.tn/wp-content/uploads/2026/02/LEON-3061-min.jpg",
    tag: null,
  },
  {
    id: "4",
    name: "BAREILLY 3062",
    thickness: "18mm",
    sku: "BAREILLY-3062",
    price: "14.90",
    unit: "m²",
    category: "melamine",
    stock: true,
    image: "https://mpbs.com.tn/wp-content/uploads/2026/02/BAREILLY-3062-min.jpg",
    tag: null,
  },
  {
    id: "5",
    name: "TRUFFLE 3033",
    thickness: "18mm",
    sku: "TRUFFLE-3033",
    price: "15.90",
    unit: "m²",
    category: "melamine",
    stock: false,
    image: "https://mpbs.com.tn/wp-content/uploads/2025/10/TRUFFLE-3033.jpg",
    tag: "Promo",
  },
  {
    id: "6",
    name: "SLATE GREY 3013",
    thickness: "18mm",
    sku: "SLATE-GREY-3013",
    price: "16.20",
    unit: "m²",
    category: "melamine",
    stock: true,
    image: "http://mpbs.com.tn/wp-content/uploads/2025/07/SLATE-GREY-3013.jpg",
    tag: null,
  },
  // ─ Plaqués ───────────────────────────────────────────────────
  {
    id: "7",
    name: "EBENE RC",
    thickness: "18mm",
    sku: "EBENE-RC",
    price: "22.50",
    unit: "m²",
    category: "plaques",
    stock: true,
    image: "http://mpbs.com.tn/wp-content/uploads/2021/04/EBENE-REC.jpg",
    tag: "Premium",
  },
  {
    id: "8",
    name: "WENGE RC",
    thickness: "18mm",
    sku: "WENGE-RC",
    price: "22.90",
    unit: "m²",
    category: "plaques",
    stock: true,
    image: "http://mpbs.com.tn/wp-content/uploads/2021/03/vingue.jpg",
    tag: null,
  },
  {
    id: "9",
    name: "MACASAR RC",
    thickness: "18mm",
    sku: "MACASAR-RC",
    price: "23.40",
    unit: "m²",
    category: "plaques",
    stock: true,
    image: "http://mpbs.com.tn/wp-content/uploads/2021/03/Makasar-rec.jpg",
    tag: null,
  },
  {
    id: "10",
    name: "CHENE FIL RC",
    thickness: "18mm",
    sku: "CHENE-FIL-RC",
    price: "21.90",
    unit: "m²",
    category: "plaques",
    stock: false,
    image: "http://mpbs.com.tn/wp-content/uploads/2021/03/Chene-FAF-Rec.jpg",
    tag: null,
  },
  {
    id: "11",
    name: "FRÊNE FIL",
    thickness: "18mm",
    sku: "FRENE-FIL",
    price: "22.10",
    unit: "m²",
    category: "plaques",
    stock: true,
    image: "http://mpbs.com.tn/wp-content/uploads/2021/03/Frene-FAF.jpg",
    tag: null,
  },
  {
    id: "12",
    name: "SAPELLI DOSSE",
    thickness: "18mm",
    sku: "SAPELLI-DOSSE",
    price: "23.10",
    unit: "m²",
    category: "plaques",
    stock: true,
    image: "http://mpbs.com.tn/wp-content/uploads/2021/03/Sapelli-Dose.jpg",
    tag: "Premium",
  },
  // ─ Acryliques ────────────────────────────────────────────────
  {
    id: "13",
    name: "SAND",
    thickness: "18mm",
    sku: "SAND-ACRY",
    price: "18.20",
    unit: "m²",
    category: "acryliques",
    stock: true,
    image: "http://mpbs.com.tn/wp-content/uploads/2025/05/sand-768x512-1.jpg",
    tag: null,
  },
  {
    id: "14",
    name: "PIGEON",
    thickness: "18mm",
    sku: "PIGEON-ACRY",
    price: "18.60",
    unit: "m²",
    category: "acryliques",
    stock: true,
    image: "http://mpbs.com.tn/wp-content/uploads/2025/05/pigeon-768x512-1.jpg",
    tag: null,
  },
  {
    id: "15",
    name: "FIR GREEN",
    thickness: "18mm",
    sku: "FIR-GREEN-ACRY",
    price: "19.10",
    unit: "m²",
    category: "acryliques",
    stock: true,
    image: "http://mpbs.com.tn/wp-content/uploads/2024/05/FIR-GREEN.jpg",
    tag: "Promo",
  },
  {
    id: "16",
    name: "OXYDE RED",
    thickness: "18mm",
    sku: "OXYDE-RED-ACRY",
    price: "19.40",
    unit: "m²",
    category: "acryliques",
    stock: false,
    image: "http://mpbs.com.tn/wp-content/uploads/2024/05/OXYDE-RED.jpg",
    tag: null,
  },
  {
    id: "17",
    name: "GRIS CHARBON MATT",
    thickness: "18mm",
    sku: "GRIS-CHARBON-MATT-ACRY",
    price: "18.90",
    unit: "m²",
    category: "acryliques",
    stock: true,
    image: "http://mpbs.com.tn/wp-content/uploads/2022/05/grey-85728-matt.jpg",
    tag: null,
  },
  {
    id: "18",
    name: "NOIR",
    thickness: "18mm",
    sku: "NOIR-ACRY",
    price: "20.00",
    unit: "m²",
    category: "acryliques",
    stock: true,
    image: "http://mpbs.com.tn/wp-content/uploads/2021/06/black-8421_Logo1.jpg",
    tag: "Premium",
  },
  // ─ High Gloss ────────────────────────────────────────────────
  {
    id: "19",
    name: "BLACK",
    thickness: "18mm",
    sku: "BLACK-HG",
    price: "24.10",
    unit: "m²",
    category: "high-gloss",
    stock: true,
    image: "http://mpbs.com.tn/wp-content/uploads/2025/07/BLACK.jpg",
    tag: "Premium",
  },
  {
    id: "20",
    name: "CASMERE",
    thickness: "18mm",
    sku: "CASMERE-HG",
    price: "23.70",
    unit: "m²",
    category: "high-gloss",
    stock: true,
    image: "http://mpbs.com.tn/wp-content/uploads/2025/07/CASMERE.jpg",
    tag: null,
  },
  {
    id: "21",
    name: "TRENDY GREY",
    thickness: "18mm",
    sku: "TRENDY-GREY-HG",
    price: "23.50",
    unit: "m²",
    category: "high-gloss",
    stock: false,
    image: "http://mpbs.com.tn/wp-content/uploads/2025/07/TRENDY_GREY.jpg",
    tag: null,
  },
  {
    id: "22",
    name: "VANILLA",
    thickness: "18mm",
    sku: "VANILLA-HG",
    price: "23.90",
    unit: "m²",
    category: "high-gloss",
    stock: true,
    image: "http://mpbs.com.tn/wp-content/uploads/2025/07/VANILLA.jpg",
    tag: null,
  },
  {
    id: "23",
    name: "WHITE",
    thickness: "18mm",
    sku: "WHITE-HG",
    price: "24.30",
    unit: "m²",
    category: "high-gloss",
    stock: true,
    image: "http://mpbs.com.tn/wp-content/uploads/2025/07/white.jpg",
    tag: null,
  },
];

/* ── Family definitions ───────────────────────────────────────── */
type SubCat = { id: string; label: string; catFilter: string | null };
type FamilyDef = {
  name: string;
  subtitle: string;
  productCategories: string[];
  subCategories: SubCat[];
};

const familiesData: Record<string, FamilyDef> = {
  portes: {
    name: "Portes",
    subtitle: "Doors",
    productCategories: ["melamine", "plaques"],
    subCategories: [
      { id: "all", label: "Tous", catFilter: null },
      { id: "melamine", label: "Mélaminé", catFilter: "melamine" },
      { id: "plaques", label: "Plaqué", catFilter: "plaques" },
    ],
  },
  cuisines: {
    name: "Cuisines",
    subtitle: "Kitchens",
    productCategories: ["acryliques", "high-gloss", "melamine"],
    subCategories: [
      { id: "all", label: "Tous", catFilter: null },
      { id: "acryliques", label: "Acrylique", catFilter: "acryliques" },
      { id: "high-gloss", label: "High Gloss", catFilter: "high-gloss" },
      { id: "melamine", label: "Mélaminé", catFilter: "melamine" },
    ],
  },
  bureau: {
    name: "Mobilier de Bureau",
    subtitle: "Office Furniture",
    productCategories: ["melamine", "plaques"],
    subCategories: [
      { id: "all", label: "Tous", catFilter: null },
      { id: "melamine", label: "Mélaminé", catFilter: "melamine" },
      { id: "plaques", label: "Plaqué", catFilter: "plaques" },
    ],
  },
  mural: {
    name: "Revêtement Mural",
    subtitle: "Wall Paneling",
    productCategories: ["melamine", "plaques", "acryliques"],
    subCategories: [
      { id: "all", label: "Tous", catFilter: null },
      { id: "melamine", label: "Mélaminé", catFilter: "melamine" },
      { id: "plaques", label: "Plaqué", catFilter: "plaques" },
      { id: "acryliques", label: "Acrylique", catFilter: "acryliques" },
    ],
  },
  placards: {
    name: "Placards & Dressings",
    subtitle: "Wardrobes",
    productCategories: ["melamine", "acryliques", "high-gloss"],
    subCategories: [
      { id: "all", label: "Tous", catFilter: null },
      { id: "melamine", label: "Mélaminé", catFilter: "melamine" },
      { id: "acryliques", label: "Acrylique", catFilter: "acryliques" },
      { id: "high-gloss", label: "High Gloss", catFilter: "high-gloss" },
    ],
  },
  rayonnage: {
    name: "Rayonnage & Étagères",
    subtitle: "Shelving",
    productCategories: ["melamine", "plaques"],
    subCategories: [
      { id: "all", label: "Tous", catFilter: null },
      { id: "melamine", label: "Mélaminé", catFilter: "melamine" },
      { id: "plaques", label: "Plaqué / Contrepl.", catFilter: "plaques" },
    ],
  },
};

/* ── Component ────────────────────────────────────────────────── */
export function FamilyProductsScreen() {
  const { familyId } = useParams<{ familyId: string }>();
  const navigate = useNavigate();
  const [activeSubCat, setActiveSubCat] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [cartItems, setCartItems] = useState<Set<string>>(new Set());

  const family = familiesData[familyId as keyof typeof familiesData];

  if (!family) {
    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "12px",
          color: "#8A9A8E",
        }}
      >
        <div style={{ fontSize: "14px" }}>Famille introuvable.</div>
        <button
          onClick={() => navigate("/app/catalog")}
          style={{
            background: NAVY,
            color: "white",
            border: "none",
            borderRadius: "10px",
            padding: "10px 20px",
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          Retour au catalogue
        </button>
      </div>
    );
  }

  /* Filtering */
  const familyProducts = allProducts.filter((p) =>
    family.productCategories.includes(p.category)
  );

  const activeChip = family.subCategories.find((sc) => sc.id === activeSubCat);
  const catFiltered =
    activeChip?.catFilter === null
      ? familyProducts
      : familyProducts.filter((p) => p.category === activeChip?.catFilter);

  const filtered = searchQuery
    ? catFiltered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.sku.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : catFiltered;

  /* Cart toggle */
  const toggleCart = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCartItems((prev) => {
      const next = new Set(prev);
      next.has(productId) ? next.delete(productId) : next.add(productId);
      return next;
    });
  };

  const cartCount = cartItems.size;

  return (
    <div
      style={{
        height: "100%",
        background: "#F0F2F5",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── Header ─────────────────────────────────────────── */}
      <div
        style={{
          background: `linear-gradient(120deg, ${NAVY} 0%, #d47a20 100%)`,
          padding: "14px 16px 0",
          flexShrink: 0,
        }}
      >
        {/* Top row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "14px",
          }}
        >
          {/* Back button */}
          <button
            onClick={() => navigate("/app/catalog")}
            style={{
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: "10px",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <ArrowLeft size={16} color="black" />
          </button>

          {/* Title */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                color: "black",
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              {family.subtitle}
            </div>
            <div
              style={{
                color: "darkslategray",
                fontSize: "15px",
                fontWeight: 700,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {family.name} — Décors
            </div>
          </div>

          {/* Cart indicator */}
          <button
            style={{
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: "10px",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              position: "relative",
              flexShrink: 0,
            }}
            onClick={() => navigate("/app/cart")}
          >
            <ShoppingCart size={16} color="black" />
            {cartCount > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: "-4px",
                  right: "-4px",
                  background: ORANGE,
                  color: "white",
                  borderRadius: "10px",
                  minWidth: "17px",
                  height: "17px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "9px",
                  fontWeight: 700,
                  padding: "0 3px",
                }}
              >
                {cartCount}
              </div>
            )}
          </button>

          {/* Filter */}
          <button
            style={{
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: "10px",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <SlidersHorizontal size={16} color="black" />
          </button>
        </div>

        {/* Search bar */}
        <div
          style={{
            background: searchFocused ? "white" : "rgba(255,255,255,0.10)",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "0 12px",
            height: "38px",
            border: searchFocused
              ? `2px solid ${ORANGE}`
              : "1.5px solid rgba(255,255,255,0.18)",
            transition: "all 0.2s",
            marginBottom: "12px",
          }}
        >
          <Search
            size={13}
            color={searchFocused ? "#8A9A8E" : "gray"}
          />
          <input
            placeholder="Rechercher décor, SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            style={{
              flex: 1,
              background: "none",
              border: "none",
              outline: "none",
              fontSize: "12px",
              color: searchFocused ? "#1A2520" : "black",
              fontFamily: "Inter, sans-serif",
            }}
          />
        </div>

        {/* Sub-category chips */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            overflowX: "auto",
            scrollbarWidth: "none",
            paddingBottom: "14px",
          }}
        >
          {family.subCategories.map((sc) => {
            const active = activeSubCat === sc.id;
            return (
              <button
                key={sc.id}
                onClick={() => setActiveSubCat(sc.id)}
                style={{
                  flexShrink: 0,
                  padding: "6px 14px",
                  borderRadius: "20px",
                  border: active
                    ? "none"
                    : "1.5px solid rgba(255,255,255,0.28)",
                  background: active ? ORANGE : "rgba(255,255,255,0.10)",
                  color: active ? "white": "#23272a",
                  fontSize: "11px",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "Inter, sans-serif",
                  whiteSpace: "nowrap",
                  boxShadow: active
                    ? "0 2px 8px rgba(255,102,0,0.35)"
                    : "white",
                }}
              >
                {sc.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Scrollable content ─────────────────────────────── */}
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 14px" }}>
        {/* Count + price note */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "12px",
          }}
        >
          <div style={{ fontSize: "11px", color: "#6B7280" }}>
            <span style={{ fontWeight: 700, color: "#1A2520" }}>
              {filtered.length}
            </span>{" "}
            décor{filtered.length > 1 ? "s" : ""} disponible
            {filtered.length > 1 ? "s" : ""}
          </div>
          <div
            style={{
              fontSize: "9px",
              color: "#8A9A8E",
              fontWeight: 500,
              background: "#E8EDF2",
              padding: "3px 8px",
              borderRadius: "6px",
            }}
          >
            Prix HT · TVA 19%
          </div>
        </div>

        {/* Product grid — 2 columns */}
        {filtered.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "40px 20px",
              color: "#9CA3AF",
              fontSize: "13px",
            }}
          >
            Aucun produit trouvé.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
            }}
          >
            {filtered.map((product) => {
              const inCart = cartItems.has(product.id);
              return (
                <div
                  key={product.id}
                  onClick={() => navigate(`/app/product/${product.id}`)}
                  style={{
                    background: "white",
                    borderRadius: "14px",
                    overflow: "hidden",
                    cursor: "pointer",
                    boxShadow: inCart
                      ? `0 0 0 2px ${ORANGE}, 0 4px 12px rgba(255,102,0,0.15)`
                      : "0 2px 10px rgba(0,0,0,0.07)",
                    border: "1.5px solid transparent",
                    transition: "box-shadow 0.2s",
                  }}
                >
                  {/* ── Square image swatch ──────────────── */}
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      paddingBottom: "100%", /* square */
                      background: "#F4F4F4",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />

                    {/* Stock badge — top left */}
                    <div
                      style={{
                        position: "absolute",
                        top: "7px",
                        left: "7px",
                        background: product.stock ? "#16A34A" : "#6B7280",
                        color: "white",
                        fontSize: "8px",
                        fontWeight: 700,
                        padding: "2px 7px",
                        borderRadius: "5px",
                        letterSpacing: "0.3px",
                        textTransform: "uppercase",
                      }}
                    >
                      {product.stock ? "En Stock" : "Sur Commande"}
                    </div>

                    {/* Tag badge — top right */}
                    {product.tag && (
                      <div
                        style={{
                          position: "absolute",
                          top: "7px",
                          right: "7px",
                          background: "#00335b",
                          color: "white",
                          fontSize: "8px",
                          fontWeight: 700,
                          padding: "2px 7px",
                          borderRadius: "5px",
                        }}
                      >
                        {product.tag.toUpperCase()}
                      </div>
                    )}

                    {/* Add to cart button — bottom right */}
                    <button
                      onClick={(e) => toggleCart(product.id, e)}
                      style={{
                        position: "absolute",
                        bottom: "8px",
                        right: "8px",
                        background: inCart ? NAVY : ORANGE,
                        border: "none",
                        borderRadius: "9px",
                        width: "30px",
                        height: "30px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        boxShadow: "0 3px 10px rgba(0,0,0,0.22)",
                        transition: "background 0.2s",
                      }}
                    >
                      {inCart ? (
                        <Check size={14} color="black" />
                      ) : (
                        <Plus size={14} color="white" />
                      )}
                    </button>
                  </div>

                  {/* ── Product info ─────────────────────── */}
                  <div style={{ padding: "8px 10px 10px" }}>
                    {/* SKU */}
                    <div
                      style={{
                        fontSize: "9px",
                        color: "#A0B0A5",
                        fontWeight: 600,
                        letterSpacing: "0.5px",
                        marginBottom: "3px",
                        fontFamily: "monospace",
                      }}
                    >
                      SKU: {product.sku}
                    </div>

                    {/* Name */}
                    <div
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        color: "#1A2520",
                        lineHeight: "1.3",
                        marginBottom: "1px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {product.name}
                    </div>

                    {/* Thickness */}
                    <div
                      style={{
                        fontSize: "10px",
                        color: "#9CA3AF",
                        marginBottom: "7px",
                      }}
                    >
                      Épaisseur {product.thickness}
                    </div>

                    {/* Price */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: "2px",
                        borderTop: "1px solid #F4F4F4",
                        paddingTop: "6px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "15px",
                          fontWeight: 800,
                          color: "#00335b",
                        }}
                      >
                        {product.price}
                      </span>
                      <span
                        style={{ fontSize: "10px", color: "#6B7280", fontWeight: 500 }}
                      >
                        TND HT/{product.unit}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div style={{ height: "16px" }} />
      </div>
    </div>
  );
}
