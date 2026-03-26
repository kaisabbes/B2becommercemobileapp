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

const G = "#1C5C38";
const WOOD = "#A97C50";

const categories = [
  { id: "all", label: "All Products" },
  { id: "mdf", label: "MDF" },
  { id: "plywood", label: "Plywood" },
  { id: "melamine", label: "Melamine" },
  { id: "osb", label: "OSB" },
  { id: "hdf", label: "HDF" },
  { id: "chipboard", label: "Chipboard" },
];

const products = [
  {
    id: "1",
    name: "MDF Panel Standard",
    thickness: "18mm",
    sku: "MDF-18-2440",
    price: "15.50",
    unit: "m²",
    category: "mdf",
    stock: true,
    image: "https://images.unsplash.com/photo-1564691848938-d0fc26235733?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    tag: "Best Seller",
  },
  {
    id: "2",
    name: "Birch Plywood",
    thickness: "15mm",
    sku: "PLY-15-1220",
    price: "22.80",
    unit: "m²",
    category: "plywood",
    stock: true,
    image: "https://images.unsplash.com/photo-1672656319286-03f92b44abf5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    tag: null,
  },
  {
    id: "3",
    name: "OSB 3 Board",
    thickness: "18mm",
    sku: "OSB-18-2500",
    price: "11.20",
    unit: "m²",
    category: "osb",
    stock: true,
    image: "https://images.unsplash.com/photo-1634397270735-1090b6c20c3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    tag: "Promo",
  },
  {
    id: "4",
    name: "White Melamine Panel",
    thickness: "16mm",
    sku: "MEL-16-W-2440",
    price: "18.90",
    unit: "m²",
    category: "melamine",
    stock: false,
    image: "https://images.unsplash.com/photo-1655149588779-8c5402c968bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    tag: null,
  },
  {
    id: "5",
    name: "MDF Moisture Resistant",
    thickness: "22mm",
    sku: "MDF-22-MR",
    price: "19.40",
    unit: "m²",
    category: "mdf",
    stock: true,
    image: "https://images.unsplash.com/photo-1564691848938-d0fc26235733?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    tag: null,
  },
  {
    id: "6",
    name: "Marine Plywood",
    thickness: "12mm",
    sku: "PLY-12-MAR",
    price: "31.50",
    unit: "m²",
    category: "plywood",
    stock: true,
    image: "https://images.unsplash.com/photo-1681752972862-cc60f9126e47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    tag: "Premium",
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
        background: "#F5F7F5",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: `linear-gradient(135deg, ${G} 0%, #143D28 100%)`,
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
              style={{ color: "rgba(255,255,255,0.7)", fontSize: "11px", fontWeight: 500, letterSpacing: "0.5px" }}
            >
              GOOD MORNING
            </div>
            <div style={{ color: "white", fontSize: "17px", fontWeight: 700 }}>
              Martin Dupont
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
              <Bell size={18} color="white" />
              <div
                style={{
                  position: "absolute",
                  top: "6px",
                  right: "6px",
                  width: "8px",
                  height: "8px",
                  background: "#E85D26",
                  borderRadius: "50%",
                  border: "1.5px solid #1C5C38",
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
                color: "white",
                fontSize: "15px",
              }}
            >
              MD
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
            <Search size={16} color={searchFocused ? "#8A9A8E" : "rgba(255,255,255,0.7)"} />
            <input
              placeholder="Search panels, SKU, brand..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              style={{
                flex: 1,
                background: "none",
                border: "none",
                outline: "none",
                fontSize: "14px",
                color: searchFocused ? "#1A2520" : "rgba(255,255,255,0.9)",
                fontFamily: "Inter, sans-serif",
              }}
            />
            <ScanBarcode size={18} color={searchFocused ? "#A97C50" : "rgba(255,255,255,0.7)"} />
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
            <SlidersHorizontal size={18} color="white" />
          </button>
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* Promo banner */}
        <div
          style={{
            margin: "14px 14px 0",
            background: `linear-gradient(120deg, #2D6A4F 0%, ${WOOD} 100%)`,
            borderRadius: "14px",
            padding: "14px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.8px" }}>
              LIMITED OFFER
            </div>
            <div style={{ color: "white", fontSize: "16px", fontWeight: 700, marginTop: "2px" }}>
              OSB3 Boards — 15% off
            </div>
            <div style={{ color: "rgba(255,255,255,0.75)", fontSize: "12px", marginTop: "2px" }}>
              On orders of 50+ units · Valid until Mar 31
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
            <span style={{ color: "white", fontSize: "12px", fontWeight: 600 }}>Shop</span>
            <ChevronRight size={13} color="white" />
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: "10px", margin: "12px 14px 0" }}>
          {[
            { label: "Orders This Month", value: "24", icon: Package, color: G },
            { label: "Total Spent HT", value: "€12,450", icon: TrendingUp, color: WOOD },
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
            Browse by Category
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
                  border: activeCategory === cat.id ? "none" : "1.5px solid #D8E4D8",
                  background:
                    activeCategory === cat.id
                      ? G
                      : "white",
                  color: activeCategory === cat.id ? "white" : "#4A6A54",
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
              {filtered.length} Products
            </div>
            <div style={{ fontSize: "11px", color: "#8A9A8E" }}>Prices shown HT (Excl. VAT)</div>
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
                  border: "1px solid #EEF3EE",
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
                          background: "#1C5C38",
                          color: "white",
                          fontSize: "9px",
                          fontWeight: 700,
                          padding: "3px 7px",
                          borderRadius: "5px",
                          letterSpacing: "0.5px",
                        }}
                      >
                        IN STOCK
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
                        ON ORDER
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
                      background: G,
                      border: "none",
                      borderRadius: "8px",
                      width: "30px",
                      height: "30px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      boxShadow: "0 2px 8px rgba(28,92,56,0.4)",
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
                        style={{ fontSize: "16px", fontWeight: 800, color: G }}
                      >
                        {product.price}€
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
