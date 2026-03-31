import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  Share2,
  Heart,
  ChevronDown,
  ShoppingCart,
  Package,
  Truck,
  BadgeCheck,
  Info,
  Star,
  Minus,
  Plus,
  ChevronRight,
} from "lucide-react";

const G = "#f5b99d";
const WOOD = "#f5b99d";
const A = "#FC4F00";

const images = [
  "https://mpbs.com.tn/wp-content/uploads/2025/10/Frassino-TALPA-3047.jpg",
  "https://mpbs.com.tn/wp-content/uploads/2025/10/Frassino-TALPA-3047.jpg",
  "https://mpbs.com.tn/wp-content/uploads/2025/10/Frassino-TALPA-3047.jpg",
];

const pricingTiers = [
  { range: "1 – 9 unités", price: "15.50", perUnit: "unité", highlight: false },
  { range: "10 – 49 unités", price: "14.00", perUnit: "unité", highlight: false },
  { range: "50+ unités", price: "12.50", perUnit: "unité", highlight: true },
];

const dimensions = ["2440 × 1220 mm", "2800 × 1220 mm", "3050 × 1220 mm"];
const thicknesses = ["12mm", "16mm", "18mm", "22mm", "25mm"];

const specs = [
  { label: "Matériau", value: "MDF Standard E1" },
  { label: "Densité", value: "750 kg/m³" },
  { label: "Surface", value: "Poncé deux faces" },
  { label: "Classe colle", value: "E1 / CARB P2" },
  { label: "Humidité", value: "< 8%" },
  { label: "Classement feu", value: "Class D-s2, d0" },
  { label: "Origine", value: "Certifié UE" },
  { label: "Palette", value: "50 feuilles" },
];

export function ProductDetailsScreen() {
  const navigate = useNavigate();
  const [activeImg, setActiveImg] = useState(0);
  const [wishlist, setWishlist] = useState(false);
  const [selectedDim, setSelectedDim] = useState(dimensions[2]);
  const [selectedThick, setSelectedThick] = useState(thicknesses[2]);
  const [qty, setQty] = useState(10);
  const [showSpecs, setShowSpecs] = useState(false);

  const getActiveTier = () => {
    if (qty >= 50) return 2;
    if (qty >= 10) return 1;
    return 0;
  };

  const currentPrice = parseFloat(pricingTiers[getActiveTier()].price);
  const totalPrice = (currentPrice * qty).toFixed(2);

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#FBFBFB",
        position: "relative",
      }}
    >
      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* Image slider */}
        <div style={{ position: "relative", height: "240px", background: "#F0F0EC" }}>
          <img
            src={images[activeImg]}
            alt="Product"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />

          {/* Top bar overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              padding: "14px 16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 100%)",
            }}
          >
            <button
              onClick={() => navigate(-1)}
              style={{
                background: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(8px)",
                border: "none",
                borderRadius: "10px",
                width: "36px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <ArrowLeft size={18} color="white" />
            </button>
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={() => setWishlist(!wishlist)}
                style={{
                  background: "rgba(255,255,255,0.2)",
                  backdropFilter: "blur(8px)",
                  border: "none",
                  borderRadius: "10px",
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <Heart
                  size={18}
                  color="white"
                  fill={wishlist ? "white" : "none"}
                />
              </button>
              <button
                style={{
                  background: "rgba(255,255,255,0.2)",
                  backdropFilter: "blur(8px)",
                  border: "none",
                  borderRadius: "10px",
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <Share2 size={18} color="white" />
              </button>
            </div>
          </div>

          {/* Image dots */}
          <div
            style={{
              position: "absolute",
              bottom: "12px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: "6px",
            }}
          >
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                style={{
                  width: i === activeImg ? "20px" : "7px",
                  height: "7px",
                  borderRadius: "4px",
                  background: i === activeImg ? "white" : "rgba(255,255,255,0.5)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  padding: 0,
                }}
              />
            ))}
          </div>

          {/* Thumbnail strip */}
          <div
            style={{
              position: "absolute",
              bottom: "32px",
              right: "12px",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "8px",
                  overflow: "hidden",
                  border: i === activeImg ? `2px solid white` : "2px solid transparent",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                <img
                  src={img}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product info */}
        <div style={{ padding: "16px 16px 0" }}>
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "4px",
            }}
          >
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: "10px",
                  color: "#A0B0A5",
                  fontWeight: 600,
                  letterSpacing: "0.8px",
                  marginBottom: "3px",
                }}
              >
                SKU: MDF-18-2440 · KRONOFLOORING®
              </div>
              <h1
                style={{
                  fontSize: "20px",
                  fontWeight: 800,
                  color: "#1A2520",
                  lineHeight: "1.2",
                  margin: 0,
                }}
              >
                MDF Panel Standard E1 — 18mm
              </h1>
            </div>
          </div>

          {/* Rating & stock */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginTop: "8px",
              marginBottom: "14px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={12} fill={s <= 4 ? A : "none"} color={A} />
              ))}
              <span style={{ fontSize: "12px", color: "#757575", marginLeft: "4px" }}>
                4,2 (18 avis)
              </span>
            </div>
            <div
              style={{
                background: "#FEF1E4",
                color: G,
                fontSize: "11px",
                fontWeight: 700,
                padding: "3px 8px",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: G,
                }}
              />
              IN STOCK — 450 unités
            </div>
          </div>

          {/* ─── PRICING BLOCK ─── */}
          <div
            style={{
              background: "#FBFBFB",
              borderRadius: "14px",
              padding: "14px",
              marginBottom: "14px",
              border: "1px solid #EAEAEA",
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "4px" }}>
              <span style={{ fontSize: "32px", fontWeight: 800, color: G, lineHeight: 1 }}>
                {currentPrice.toFixed(2)} TND
              </span>
              <span style={{ fontSize: "14px", color: "#5A6A5E", fontWeight: 500 }}>
                HT / unité
              </span>
            </div>
            <div style={{ fontSize: "11px", color: "#8A9A8E", marginBottom: "12px" }}>
              ≈ {(currentPrice / (2.44 * 1.22)).toFixed(2)} TND HT/m² · TVA non incluse
            </div>

            {/* Tiered pricing table */}
            <div
              style={{ fontSize: "11px", fontWeight: 700, color: "#5A6A5E", marginBottom: "7px", letterSpacing: "0.5px" }}
            >
              TARIFS DÉGRESSIFS
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {pricingTiers.map((tier, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "9px 12px",
                    borderRadius: "9px",
                    background:
                      getActiveTier() === i
                        ? `${G}15`
                        : tier.highlight
                        ? "#FEF1E4"
                        : "white",
                    border:
                      getActiveTier() === i
                        ? `1.5px solid ${G}50`
                        : tier.highlight
                        ? `1px solid ${WOOD}40`
                        : "1px solid #EAEAEA",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {getActiveTier() === i && (
                      <BadgeCheck size={14} color={G} />
                    )}
                    {tier.highlight && getActiveTier() !== i && (
                      <span style={{ fontSize: "10px", background: WOOD, color: "white", padding: "1px 5px", borderRadius: "4px", fontWeight: 700 }}>
                        MEILLEUR
                      </span>
                    )}
                    <span style={{ fontSize: "12px", color: "#2D3A35", fontWeight: 500 }}>
                      {tier.range}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 800,
                      color: getActiveTier() === i ? G : tier.highlight ? WOOD : "#2D3A35",
                    }}
                  >
                    {tier.price} TND{" "}
                    <span style={{ fontWeight: 500, fontSize: "11px", color: "#8A9A8E" }}>HT</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ─── VARIANT SELECTORS ─── */}
          <div style={{ marginBottom: "14px" }}>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "#1A2520", marginBottom: "8px" }}>
              Dimensions
            </div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {dimensions.map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDim(d)}
                  style={{
                    padding: "7px 12px",
                    borderRadius: "9px",
                    border: selectedDim === d ? `2px solid ${G}` : "1.5px solid #EAEAEA",
                    background: selectedDim === d ? `${G}12` : "white",
                    color: selectedDim === d ? G : "#1C0D0A",
                    fontSize: "12px",
                    fontWeight: selectedDim === d ? 700 : 400,
                    cursor: "pointer",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: "14px" }}>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "#1A2520", marginBottom: "8px" }}>
              Épaisseur
            </div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {thicknesses.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedThick(t)}
                  style={{
                    padding: "7px 14px",
                    borderRadius: "9px",
                    border: selectedThick === t ? `2px solid ${G}` : "1.5px solid #EAEAEA",
                    background: selectedThick === t ? `${G}12` : "white",
                    color: selectedThick === t ? G : "#1C0D0A",
                    fontSize: "12px",
                    fontWeight: selectedThick === t ? 700 : 400,
                    cursor: "pointer",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Delivery info */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              marginBottom: "14px",
            }}
          >
            {[
              { icon: Truck, text: "Port offert dès 500 TND" },
              { icon: Package, text: "Expédié sous 2–3 jours" },
            ].map((item) => (
              <div
                key={item.text}
                style={{
                  flex: 1,
                  background: "#FBFBFB",
                  borderRadius: "10px",
                  padding: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  border: "1px solid #EAEAEA",
                }}
              >
                <item.icon size={14} color={G} />
                <span style={{ fontSize: "11px", color: "#1C0D0A", fontWeight: 500 }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          {/* Technical specs accordion */}
          <button
            onClick={() => setShowSpecs(!showSpecs)}
            style={{
              width: "100%",
              background: "#FBFBFB",
              border: "1px solid #EAEAEA",
              borderRadius: "12px",
              padding: "13px 14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              marginBottom: "8px",
              fontFamily: "Inter, sans-serif",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Info size={15} color={G} />
              <span style={{ fontSize: "13px", fontWeight: 700, color: "#1A2520" }}>
                Spécifications Techniques
              </span>
            </div>
            <ChevronDown
              size={16}
              color="#8A9A8E"
              style={{ transform: showSpecs ? "rotate(180deg)" : "none", transition: "0.2s" }}
            />
          </button>

          {showSpecs && (
            <div
              style={{
                background: "#FBFBFB",
                border: "1px solid #EAEAEA",
                borderRadius: "12px",
                overflow: "hidden",
                marginBottom: "14px",
              }}
            >
              {specs.map((s, i) => (
                <div
                  key={s.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 14px",
                    borderBottom: i < specs.length - 1 ? "1px solid #EAEAEA" : "none",
                    background: i % 2 === 0 ? "white" : "#F9FBFA",
                  }}
                >
                  <span style={{ fontSize: "12px", color: "#757575" }}>{s.label}</span>
                  <span style={{ fontSize: "12px", fontWeight: 600, color: "#1A2520" }}>
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div style={{ height: "90px" }} />
        </div>
      </div>

      {/* ─── FIXED BOTTOM ACTION BAR ─── */}
      <div
        style={{
          background: "white",
          borderTop: "1px solid #EAEAEA",
          padding: "12px 16px",
          boxShadow: "0 -4px 20px rgba(0,0,0,0.08)",
        }}
      >
        {/* Line total */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
          <span style={{ fontSize: "12px", color: "#8A9A8E" }}>
            {qty} unités × {currentPrice.toFixed(2)} TND HT
          </span>
          <div style={{ display: "flex", alignItems: "baseline", gap: "3px" }}>
            <span style={{ fontSize: "18px", fontWeight: 800, color: G }}>{totalPrice} TND</span>
            <span style={{ fontSize: "11px", color: "#8A9A8E" }}>HT</span>
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {/* Qty stepper */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0",
              background: "#FBFBFB",
              borderRadius: "12px",
              border: "1.5px solid #EAEAEA",
              overflow: "hidden",
              height: "48px",
            }}
          >
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              style={{
                background: "none",
                border: "none",
                padding: "0 12px",
                cursor: "pointer",
                height: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Minus size={16} color={G} />
            </button>
            <input
              type="number"
              value={qty}
              onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
              style={{
                width: "46px",
                textAlign: "center",
                background: "white",
                border: "none",
                outline: "none",
                fontSize: "15px",
                fontWeight: 700,
                color: "#1A2520",
                fontFamily: "Inter, sans-serif",
                height: "100%",
                borderLeft: "1px solid #EAEAEA",
                borderRight: "1px solid #EAEAEA",
              }}
            />
            <button
              onClick={() => setQty(qty + 1)}
              style={{
                background: "none",
                border: "none",
                padding: "0 12px",
                cursor: "pointer",
                height: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Plus size={16} color={G} />
            </button>
          </div>

          {/* Add to cart CTA */}
          <button
            style={{
              flex: 1,
              background: `linear-gradient(135deg, ${G} 0%, ${WOOD} 100%)`,
              color: "white",
              border: "none",
              borderRadius: "12px",
              height: "48px",
              fontSize: "14px",
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "Inter, sans-serif",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              boxShadow: "0 8px 22px rgba(241, 88, 8, 0.25)",
            }}
          >
            <ShoppingCart size={17} />
            Ajouter au panier
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}