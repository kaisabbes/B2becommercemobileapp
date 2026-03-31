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

const G = "gray";
const WOOD = "#f5b99d";
const A = "#FC4F00";
const Y = "#f4e9da";

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
    name: "CREME 3012",
    thickness: "18mm",
    sku: "CREME-3012",
    dimensions: "2440 × 1220 mm",
    unitPrice: 14.0,
    qty: 25,
    image: "http://mpbs.com.tn/wp-content/uploads/2025/07/CREME-3012.jpg",
  },
  
  {
    id: "2",
    name: "CHENE FIL RC",
    thickness: "18mm",
    sku: "CHENE-FIL-RC",
    dimensions: "2440 × 1220 mm",
    unitPrice: 22.8,
    qty: 10,
    image:"http://mpbs.com.tn/wp-content/uploads/2021/03/Chene-FAF-Rec.jpg",
  },
  {
    id: "3",
    name: "FIR GREEN (Acrylique)",
    thickness: "18mm",
    sku: "FIR-GREEN-ACRY",
    dimensions: "2500 × 1250 mm",
    unitPrice: 11.2,
    qty: 50,
    image:"http://mpbs.com.tn/wp-content/uploads/2024/05/FIR-GREEN.jpg",
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
        background: "#FBFBFB",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: `linear-gradient(135deg, ${Y} 0%, ${WOOD} 100%)`,
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
            <ArrowLeft size={18} color="black" />
          </button>
          <div>
            <h1
              style={{
                fontSize: "18px",
                fontWeight: 800,
                color: "darkslategray",
                margin: 0,
              }}
            >
              Mon Panier
            </h1>
            <div style={{ fontSize: "12px", color: "black" }}>
              {cart.length} produit{cart.length !== 1 ? "s" : ""} · Prix HT (TVA non incl.)
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
          <Truck size={15} color={freeShipping ? "#7A5A30" : "rgba(255,255,255,0.6)"} />
          {freeShipping ? (
            <span style={{ fontSize: "12px", color: "#7A5A30", fontWeight: 600 }}>
              ✓ Port gratuit appliqué sur cette commande
            </span>
          ) : (
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)" }}>
              Ajoutez{" "}
              <strong style={{ color: "white" }}>
                {(500 - subtotalHT).toFixed(2)} TND HT
              </strong>{" "}
              pour bénéficier du port gratuit
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
                border: "1px solid #EAEAEA",
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
                    border: "1px solid #EAEAEA",
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
                    {item.unitPrice.toFixed(2)} TND HT/unité
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
                  <Trash2 size={15} color="#CF2E2E" />
                </button>
              </div>

              {/* Bottom bar: qty + line total */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 12px",
                  background: "#FBFBFB",
                  borderTop: "1px solid #EAEAEA",
                }}
              >
                {/* Qty stepper */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    background: "white",
                    border: "1.5px solid #EAEAEA",
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
                      borderLeft: "1px solid #EAEAEA",
                      borderRight: "1px solid #EAEAEA",
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
                    {(item.unitPrice * item.qty).toFixed(2)} TND
                  </div>
                  <div style={{ fontSize: "10px", color: "#8A9A8E" }}>Total HT</div>
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
                border: "1px solid #EAEAEA",
              display: "flex",
              gap: "8px",
              alignItems: "center",
            }}
          >
            <Tag size={15} color={WOOD} />
            <input
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Code Promo / Partenaire"
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
                background: promoApplied ? "#FEF1E4" : WOOD,
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
              {promoApplied ? "✓ Appliqué" : "Appliquer"}
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
                border: "1.5px solid #F7D8C2",
                boxShadow: "0 0 0 3px rgba(241, 88, 8, 0.08)",
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
                BdC interne / Référence Chantier
              </span>
            </div>
            <input
              value={poRef}
              onChange={(e) => setPoRef(e.target.value)}
              placeholder="ex. PO-2024-089 · Chantier Rue de Rivoli"
              style={{
                width: "100%",
                background: "#FEF1E4",
                border: "1.5px solid #F7D8C2",
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
              Cette référence apparaîtra sur votre facture et bon de livraison
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
            border: "1px solid #EAEAEA",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          <div
            style={{
              background: WOOD,
              padding: "12px 14px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Package size={15} color="white" />
            <span style={{ fontSize: "13px", fontWeight: 700, color: "white", letterSpacing: "0.3px" }}>
              RÉCAPITULATIF DE COMMANDE
            </span>
          </div>

          <div style={{ padding: "14px" }}>
            {[
              {
                label: "Sous-total HT",
                value: `${subtotalHT.toFixed(2)} TND`,
                color: "#1A2520",
                bold: false,
              },
              ...(promoApplied
                ? [{ label: "Promo — 5%", value: `−${discount.toFixed(2)} TND`, color: G, bold: false }]
                : []),
              {
                label: "TVA (20%)",
                value: `${vat.toFixed(2)} TND`,
                color: "#7A8A7E",
                bold: false,
              },
              {
                label: "Livraison",
                value: freeShipping ? "GRATUIT" : "Sur devis",
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
                  borderBottom: "1px solid #EAEAEA",
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
                <div style={{ fontSize: "10px", color: "#A0B0A5" }}>TVA incluse</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "26px", fontWeight: 800, color: G }}>
                  {totalTTC.toFixed(2)} TND
                </div>
                <div style={{ fontSize: "11px", color: "#8A9A8E" }}>
                  ({subtotalAfterDiscount.toFixed(2)} TND HT)
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
            background: "#FEF1E4",
            border: "1px solid #F7D8C2",
            borderRadius: "10px",
            padding: "10px 12px",
          }}
        >
          <AlertCircle size={14} color={WOOD} style={{ flexShrink: 0, marginTop: "1px" }} />
          <div style={{ fontSize: "12px", color: "#7A5A30", lineHeight: "1.5" }}>
            <strong>Commande minimum : 500 TND HT.</strong> Port gratuit appliqué automatiquement pour les commandes dépassant ce seuil.
          </div>
        </div>

        <div style={{ height: "14px" }} />
      </div>

      {/* CTA */}
      <div
        style={{
          background: "white",
          borderTop: "1px solid #EAEAEA",
          padding: "12px 16px",
          boxShadow: "0 -4px 20px rgba(0,0,0,0.08)",
        }}
      >
        <button
          style={{
            width: "100%",
            background: subtotalHT >= 500
              ? `linear-gradient(135deg, ${WOOD} 0%, ${WOOD} 100%)`
              : "#F2F2F2",
            color: subtotalHT >= 500 ? "white" : "#757575",
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
            boxShadow: subtotalHT >= 500 ? "0 8px 22px rgba(241, 88, 8, 0.25)" : "none",
          }}
        >
          Valider la commande
          <ChevronRight size={18} />
        </button>
        <div style={{ textAlign: "center", fontSize: "11px", color: "#A0B0A5", marginTop: "8px" }}>
          Sécurisé SSL · Paiement sur facture · Net 30 jours
        </div>
      </div>
    </div>
  );
}