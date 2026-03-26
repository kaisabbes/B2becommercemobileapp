import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  Trash2,
  Minus,
  Plus,
  ChevronRight,
  FileText,
  Truck,
  AlertCircle,
  Tag,
  Package,
} from "lucide-react";

const G = "#1C5C38";
const WOOD = "#A97C50";

type CartItem = {
  id: string;
  name: string;
  sku: string;
  dimensions: string;
  thickness: string;
  unitPrice: number;
  qty: number;
  image: string;
};

const initCart: CartItem[] = [
  {
    id: "1",
    name: "MDF Panel Standard E1",
    sku: "MDF-18-2440",
    dimensions: "2440 × 1220 mm",
    thickness: "18mm",
    unitPrice: 14.0,
    qty: 25,
    image:
      "https://images.unsplash.com/photo-1564691848938-d0fc26235733?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
  },
  {
    id: "2",
    name: "Birch Plywood BB/BB",
    sku: "PLY-15-1220",
    dimensions: "2440 × 1220 mm",
    thickness: "15mm",
    unitPrice: 22.8,
    qty: 10,
    image:
      "https://images.unsplash.com/photo-1672656319286-03f92b44abf5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
  },
  {
    id: "3",
    name: "OSB 3 Structural Board",
    sku: "OSB-18-2500",
    dimensions: "2500 × 1250 mm",
    thickness: "18mm",
    unitPrice: 11.2,
    qty: 50,
    image:
      "https://images.unsplash.com/photo-1634397270735-1090b6c20c3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
  },
];

export function CartScreen() {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>(initCart);
  const [poRef, setPoRef] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const updateQty = (id: string, newQty: number) => {
    if (newQty < 1) return;
    setCart((c) => c.map((item) => (item.id === id ? { ...item, qty: newQty } : item)));
  };

  const removeItem = (id: string) => {
    setCart((c) => c.filter((item) => item.id !== id));
  };

  const subtotalHT = cart.reduce((acc, i) => acc + i.unitPrice * i.qty, 0);
  const discount = promoApplied ? subtotalHT * 0.05 : 0;
  const subtotalAfterDiscount = subtotalHT - discount;
  const vat = subtotalAfterDiscount * 0.2;
  const totalTTC = subtotalAfterDiscount + vat;
  const freeShipping = subtotalHT >= 500;

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#F5F7F5",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: `linear-gradient(135deg, ${G} 0%, #143D28 100%)`,
          padding: "14px 16px 18px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px" }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              background: "rgba(255,255,255,0.15)",
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
          <div>
            <h1
              style={{
                fontSize: "18px",
                fontWeight: 800,
                color: "white",
                margin: 0,
              }}
            >
              My Cart
            </h1>
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)" }}>
              {cart.length} product{cart.length !== 1 ? "s" : ""} · All prices HT (Excl. VAT)
            </div>
          </div>
        </div>

        {/* Free shipping bar */}
        <div
          style={{
            background: freeShipping ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.1)",
            borderRadius: "10px",
            padding: "10px 12px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Truck size={15} color={freeShipping ? "#A8DDB5" : "rgba(255,255,255,0.6)"} />
          {freeShipping ? (
            <span style={{ fontSize: "12px", color: "#A8DDB5", fontWeight: 600 }}>
              ✓ Free freight shipping applied on this order
            </span>
          ) : (
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)" }}>
              Add{" "}
              <strong style={{ color: "white" }}>
                {(500 - subtotalHT).toFixed(2)}€ HT
              </strong>{" "}
              more for free freight shipping
            </span>
          )}
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* Cart items */}
        <div style={{ padding: "14px 14px 0" }}>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                background: "white",
                borderRadius: "14px",
                overflow: "hidden",
                marginBottom: "10px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                border: "1px solid #EEF3EE",
              }}
            >
              <div style={{ display: "flex", gap: "12px", padding: "12px" }}>
                {/* Image */}
                <div
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "10px",
                    overflow: "hidden",
                    flexShrink: 0,
                    border: "1px solid #E8EDE8",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "10px", color: "#A0B0A5", fontWeight: 600, letterSpacing: "0.5px", marginBottom: "2px" }}>
                    SKU: {item.sku}
                  </div>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "#1A2520", lineHeight: "1.2", marginBottom: "4px" }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: "11px", color: "#7A8A7E" }}>
                    {item.dimensions} · {item.thickness}
                  </div>
                  <div style={{ fontSize: "12px", color: WOOD, fontWeight: 600, marginTop: "3px" }}>
                    {item.unitPrice.toFixed(2)}€ HT/unit
                  </div>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeItem(item.id)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "4px",
                    alignSelf: "flex-start",
                  }}
                >
                  <Trash2 size={15} color="#B0453A" />
                </button>
              </div>

              {/* Bottom bar: qty + line total */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 12px",
                  background: "#F9FBFA",
                  borderTop: "1px solid #EEF3EE",
                }}
              >
                {/* Qty stepper */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    background: "white",
                    border: "1.5px solid #D8E4D8",
                    borderRadius: "9px",
                    overflow: "hidden",
                    height: "36px",
                  }}
                >
                  <button
                    onClick={() => updateQty(item.id, item.qty - 1)}
                    style={{
                      background: "none",
                      border: "none",
                      padding: "0 10px",
                      cursor: "pointer",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Minus size={13} color={G} />
                  </button>
                  <input
                    type="number"
                    value={item.qty}
                    onChange={(e) => updateQty(item.id, parseInt(e.target.value) || 1)}
                    style={{
                      width: "44px",
                      textAlign: "center",
                      background: "white",
                      border: "none",
                      borderLeft: "1px solid #D8E4D8",
                      borderRight: "1px solid #D8E4D8",
                      outline: "none",
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "#1A2520",
                      fontFamily: "Inter, sans-serif",
                      height: "100%",
                    }}
                  />
                  <button
                    onClick={() => updateQty(item.id, item.qty + 1)}
                    style={{
                      background: "none",
                      border: "none",
                      padding: "0 10px",
                      cursor: "pointer",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Plus size={13} color={G} />
                  </button>
                </div>

                {/* Line total */}
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "16px", fontWeight: 800, color: G }}>
                    {(item.unitPrice * item.qty).toFixed(2)}€
                  </div>
                  <div style={{ fontSize: "10px", color: "#8A9A8E" }}>HT total</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Promo code */}
        <div style={{ margin: "0 14px 12px" }}>
          <div
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "12px",
              border: "1px solid #E8EDE8",
              display: "flex",
              gap: "8px",
              alignItems: "center",
            }}
          >
            <Tag size={15} color={WOOD} />
            <input
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Promo / Partner Code"
              style={{
                flex: 1,
                background: "none",
                border: "none",
                outline: "none",
                fontSize: "13px",
                color: "#1A2520",
                fontFamily: "Inter, sans-serif",
              }}
            />
            <button
              onClick={() => promoCode && setPromoApplied(true)}
              style={{
                background: promoApplied ? "#E8F5EE" : G,
                color: promoApplied ? G : "white",
                border: "none",
                borderRadius: "8px",
                padding: "7px 12px",
                fontSize: "12px",
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "Inter, sans-serif",
              }}
            >
              {promoApplied ? "✓ Applied" : "Apply"}
            </button>
          </div>
        </div>

        {/* PO Reference / Chantier */}
        <div style={{ margin: "0 14px 12px" }}>
          <div
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "14px",
              border: "1.5px solid #D4C5A9",
              boxShadow: "0 0 0 3px rgba(169,124,80,0.06)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "7px",
                marginBottom: "8px",
              }}
            >
              <FileText size={14} color={WOOD} />
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#1A2520" }}>
                Internal PO / Référence Chantier
              </span>
            </div>
            <input
              value={poRef}
              onChange={(e) => setPoRef(e.target.value)}
              placeholder="e.g. PO-2024-089 · Chantier Rue de Rivoli"
              style={{
                width: "100%",
                background: "#FBF9F6",
                border: "1.5px solid #E8DECC",
                borderRadius: "9px",
                padding: "10px 12px",
                fontSize: "13px",
                color: "#1A2520",
                fontFamily: "Inter, sans-serif",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
            <div style={{ fontSize: "11px", color: "#A0907A", marginTop: "6px" }}>
              This reference will appear on your invoice and delivery note
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div
          style={{
            margin: "0 14px 14px",
            background: "white",
            borderRadius: "14px",
            overflow: "hidden",
            border: "1px solid #E8EDE8",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          <div
            style={{
              background: G,
              padding: "12px 14px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Package size={15} color="white" />
            <span style={{ fontSize: "13px", fontWeight: 700, color: "white", letterSpacing: "0.3px" }}>
              ORDER SUMMARY
            </span>
          </div>

          <div style={{ padding: "14px" }}>
            {[
              {
                label: "Subtotal HT",
                value: `${subtotalHT.toFixed(2)} €`,
                color: "#1A2520",
                bold: false,
              },
              ...(promoApplied
                ? [{ label: "Promo — 5%", value: `−${discount.toFixed(2)} €`, color: G, bold: false }]
                : []),
              {
                label: "VAT (20%)",
                value: `${vat.toFixed(2)} €`,
                color: "#7A8A7E",
                bold: false,
              },
              {
                label: "Freight",
                value: freeShipping ? "FREE" : "On estimate",
                color: freeShipping ? G : "#7A8A7E",
                bold: false,
              },
            ].map((row, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "7px 0",
                  borderBottom: "1px solid #F0F4F0",
                }}
              >
                <span style={{ fontSize: "13px", color: "#7A8A7E" }}>{row.label}</span>
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: row.bold ? 800 : 600,
                    color: row.color,
                  }}
                >
                  {row.value}
                </span>
              </div>
            ))}

            {/* Total TTC */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: "12px",
                marginTop: "4px",
              }}
            >
              <div>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "#1A2520" }}>
                  Total TTC
                </div>
                <div style={{ fontSize: "10px", color: "#A0B0A5" }}>Inc. VAT</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "26px", fontWeight: 800, color: G }}>
                  {totalTTC.toFixed(2)} €
                </div>
                <div style={{ fontSize: "11px", color: "#8A9A8E" }}>
                  ({subtotalAfterDiscount.toFixed(2)} € HT)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Minimum order note */}
        <div
          style={{
            margin: "0 14px 14px",
            display: "flex",
            alignItems: "flex-start",
            gap: "8px",
            background: "#FFF8F0",
            border: "1px solid #F0D4A8",
            borderRadius: "10px",
            padding: "10px 12px",
          }}
        >
          <AlertCircle size={14} color={WOOD} style={{ flexShrink: 0, marginTop: "1px" }} />
          <div style={{ fontSize: "12px", color: "#7A5A30", lineHeight: "1.5" }}>
            <strong>Minimum order: 500€ HT.</strong> Free freight shipping applied automatically on orders
            above this threshold.
          </div>
        </div>

        <div style={{ height: "14px" }} />
      </div>

      {/* CTA */}
      <div
        style={{
          background: "white",
          borderTop: "1px solid #E8EDE8",
          padding: "12px 16px",
          boxShadow: "0 -4px 20px rgba(0,0,0,0.08)",
        }}
      >
        <button
          style={{
            width: "100%",
            background: subtotalHT >= 500
              ? `linear-gradient(135deg, ${G} 0%, #143D28 100%)`
              : "#C8D8C8",
            color: subtotalHT >= 500 ? "white" : "#8A9A8E",
            border: "none",
            borderRadius: "14px",
            padding: "16px",
            fontSize: "15px",
            fontWeight: 700,
            cursor: subtotalHT >= 500 ? "pointer" : "not-allowed",
            fontFamily: "Inter, sans-serif",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            boxShadow: subtotalHT >= 500 ? "0 4px 16px rgba(28,92,56,0.35)" : "none",
          }}
        >
          Proceed to Checkout
          <ChevronRight size={18} />
        </button>
        <div style={{ textAlign: "center", fontSize: "11px", color: "#A0B0A5", marginTop: "8px" }}>
          Secured by SSL · Payment on invoice · Net 30 days
        </div>
      </div>
    </div>
  );
}
