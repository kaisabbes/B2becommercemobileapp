import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Search,
  ScanBarcode,
  SlidersHorizontal,
  ShoppingCart,
  Bell,
  ChevronRight,
  TrendingUp,
  Package,
} from "lucide-react";

const G = "#f4e9da";
const WOOD = "#F5B99D";
const A = "#FC4F00";

const categories = [
  { id: "all", label: "Nos Panneaux" },
  { id: "melamine", label: "Panneaux mélaminés" },
  { id: "plaques", label: "Panneaux plaqués" },
  { id: "acryliques", label: "Panneaux acryliques" },
  { id: "high-gloss", label: "Panneaux High Gloss" },
];

const products = [
  // Panneaux mélaminés (6)
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

  // Panneaux plaqués (6)
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

  // Panneaux acryliques (6)
  {
    id: "13",
    name: "SAND (Acrylique)",
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
    name: "PIGEON (Acrylique)",
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
    name: "FIR GREEN (Acrylique)",
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
    name: "OXYDE RED (Acrylique)",
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
    name: "GRIS CHARBON MATT (Acrylique)",
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
    name: "NOIR (Acrylique)",
    thickness: "18mm",
    sku: "NOIR-ACRY",
    price: "20.00",
    unit: "m²",
    category: "acryliques",
    stock: true,
    image: "http://mpbs.com.tn/wp-content/uploads/2021/06/black-8421_Logo1.jpg",
    tag: "Premium",
  },

  // Panneaux High Gloss (6)
  {
    id: "19",
    name: "BLACK (High Gloss)",
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
    name: "CASMERE (High Gloss)",
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
    name: "TRENDY GREY (High Gloss)",
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
    name: "VANILLA (High Gloss)",
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
    name: "WHITE (High Gloss)",
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

export function CatalogScreen() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchFocused, setSearchFocused] = useState(false);
  const navigate = useNavigate();

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div
      style={{
        height: "100%",
        background: "#FBFBFB",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: `linear-gradient(135deg, ${G} 0%, ${WOOD} 100%)`,
          padding: "14px 18px 18px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "14px",
          }}
        >
          <div>
            <div
              style={{ color: "gray", fontSize: "11px", fontWeight: 500, letterSpacing: "0.5px" }}
            >
              BONJOUR
            </div>
            <div style={{ color: "darkslategray", fontSize: "17px", fontWeight: 700 }}>
              Sofiene Sellami
            </div>
          </div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <button
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "none",
                borderRadius: "10px",
                width: "38px",
                height: "38px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                position: "relative",
              }}
            >
              <Bell size={18} color="black" />
              <div
                style={{
                  position: "absolute",
                  top: "6px",
                  right: "6px",
                  width: "8px",
                  height: "8px",
                  background: "#E85D26",
                  borderRadius: "50%",
                  border: "1.5px solid #FC4F00",
                }}
              />
            </button>
            <div
              style={{
                width: "38px",
                height: "38px",
                background: WOOD,
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                color: "ghostwhite",
                fontSize: "15px",
              }}
            >
              SS
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              flex: 1,
              background: searchFocused ? "white" : "rgba(255,255,255,0.15)",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "0 14px",
              height: "44px",
              border: searchFocused ? `2px solid ${G}` : "2px solid transparent",
              transition: "all 0.2s",
            }}
          >
            <Search size={16} color={searchFocused ? "#8A9A8E" : "gray"} />
            <input
              placeholder="Rechercher panneaux, SKU, marque..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              style={{
                flex: 1,
                background: "none",
                border: "none",
                outline: "none",
                fontSize: "14px",
                color: searchFocused ? "#1A2520" : "black",
                fontFamily: "Inter, sans-serif",
              }}
            />
            <ScanBarcode size={18} color={searchFocused ? WOOD : "gray"} />
          </div>
          <button
            style={{
              background: "rgba(255,255,255,0.15)",
              border: "none",
              borderRadius: "12px",
              width: "44px",
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <SlidersHorizontal size={18} color="black" />
          </button>
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* Promo banner */}
        <div
          style={{
            margin: "14px 14px 0",
            background: `linear-gradient(120deg, ${G} 0%, ${WOOD} 100%)`,
            borderRadius: "14px",
            padding: "14px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ color: "black", fontSize: "11px", fontWeight: 600, letterSpacing: "0.8px" }}>
              OFFRE LIMITÉE
            </div>
            <div style={{ color: "darkslategray", fontSize: "16px", fontWeight: 700, marginTop: "2px" }}>
              Panneaux OSB3 — 15% de remise
            </div>
            <div style={{ color: "black", fontSize: "12px", marginTop: "2px" }}>
              Pour commandes 50+ unités · Valable jusqu'au 31 mars
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              background: "rgba(255,255,255,0.18)",
              borderRadius: "8px",
              padding: "8px 10px",
              cursor: "pointer",
            }}
          >
            <span style={{ color: "black", fontSize: "12px", fontWeight: 600 }}>Voir</span>
            <ChevronRight size={13} color="black" />
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: "7px", margin: "12px 14px 0" }}>
            {[
              { label: "Commandes ce mois", value: "24", icon: Package, color: WOOD },
              { label: "Total dépensé HT", value: "12 450 TND", icon: TrendingUp, color: WOOD },
            ].map((s) => (
            <div
              key={s.label}
              style={{
                flex: 1,
                background: "white",
                borderRadius: "12px",
                padding: "12px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  background: `${s.color}18`,
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <s.icon size={17} color={s.color} />
              </div>
              <div>
                <div style={{ fontSize: "17px", fontWeight: 700, color: "#1A2520" }}>{s.value}</div>
                <div style={{ fontSize: "10px", color: "#8A9A8E", fontWeight: 500 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Category chips */}
        <div style={{ padding: "14px 14px 0" }}>
          <div style={{ fontSize: "13px", fontWeight: 700, color: "#1A2520", marginBottom: "10px" }}>
            Parcourir par catégorie
          </div>
          <div
            style={{
              display: "flex",
              gap: "8px",
              overflowX: "auto",
              paddingBottom: "4px",
              scrollbarWidth: "none",
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  flexShrink: 0,
                  padding: "7px 14px",
                  borderRadius: "20px",
                  border: activeCategory === cat.id ? "none" : "1.5px solid #EAEAEA",
                  background:
                    activeCategory === cat.id
                      ? WOOD
                      : "white",
                  color: activeCategory === cat.id ? "white" : "#1C0D0A",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "Inter, sans-serif",
                  whiteSpace: "nowrap",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product list */}
        <div style={{ padding: "14px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <div style={{ fontSize: "13px", fontWeight: 700, color: "#1A2520" }}>
              {filtered.length} Produit{filtered.length > 1 ? "s" : ""}
            </div>
            <div style={{ fontSize: "11px", color: "#8A9A8E" }}>Prix HT (TVA non incl.)</div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {filtered.map((product) => (
              <div
                key={product.id}
                onClick={() => navigate(`/app/product/${product.id}`)}
                style={{
                  background: "white",
                  borderRadius: "14px",
                  overflow: "hidden",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
                  cursor: "pointer",
                  border: "1px solid #EAEAEA",
                }}
              >
                {/* Product image */}
                <div style={{ position: "relative", height: "110px" }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  {/* Badges */}
                  <div
                    style={{
                      position: "absolute",
                      top: "8px",
                      left: "8px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                    }}
                  >
                    {product.stock ? (
                      <div
                        style={{
                          background: A,
                          color: "white",
                          fontSize: "9px",
                          fontWeight: 700,
                          padding: "3px 7px",
                          borderRadius: "5px",
                          letterSpacing: "0.5px",
                        }}
                      >
                        EN STOCK
                      </div>
                    ) : (
                      <div
                        style={{
                          background: "#B0453A",
                          color: "white",
                          fontSize: "9px",
                          fontWeight: 700,
                          padding: "3px 7px",
                          borderRadius: "5px",
                        }}
                      >
                        SUR COMMANDE
                      </div>
                    )}
                    {product.tag && (
                      <div
                        style={{
                          background: WOOD,
                          color: "white",
                          fontSize: "9px",
                          fontWeight: 700,
                          padding: "3px 7px",
                          borderRadius: "5px",
                        }}
                      >
                        {product.tag.toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* Add to cart button */}
                  <button
                    style={{
                      position: "absolute",
                      bottom: "8px",
                      right: "8px",
                      background: A,
                      border: "none",
                      borderRadius: "8px",
                      width: "30px",
                      height: "30px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      boxShadow: "0 6px 16px rgba(241, 88, 8, 0.28)",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <ShoppingCart size={14} color="white" />
                  </button>
                </div>

                {/* Product info */}
                <div style={{ padding: "10px" }}>
                  <div
                    style={{
                      fontSize: "9px",
                      color: "#A0B0A5",
                      fontWeight: 600,
                      letterSpacing: "0.5px",
                      marginBottom: "3px",
                    }}
                  >
                    SKU: {product.sku}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#1A2520",
                      lineHeight: "1.3",
                      marginBottom: "3px",
                    }}
                  >
                    {product.name}
                  </div>
                  <div style={{ fontSize: "11px", color: "#7A8A7E", marginBottom: "8px" }}>
                    {product.thickness}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <span
                        style={{ fontSize: "16px", fontWeight: 800, color: "gray" }}
                      >
                        {product.price} TND
                      </span>
                      <span style={{ fontSize: "10px", color: "#8A9A8E", marginLeft: "2px" }}>
                        HT/{product.unit}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ height: "14px" }} />
        </div>
      </div>
    </div>
  );
}