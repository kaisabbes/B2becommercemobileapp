import { useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
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
  Scan,
  Layers,
  Ruler,
  Check,
} from "lucide-react";
import {
  getProductById,
  getVariant,
  getTailles,
  getEpaisseurs,
  getActiveTierIndex,
  getTieredPrice,
  pricingTiers,
} from "../../data/products";
import { useCart } from "../../context/CartContext";

const G    = "#d47a20";
const WOOD = "#FC4F00";
const NAVY = "#003366";
const ORANGE = "#FF6600";

const specs = [
  { label: "Matériau",         value: "MDF Standard E1"     },
  { label: "Densité",          value: "750 kg/m³"           },
  { label: "Surface",          value: "Poncé deux faces"    },
  { label: "Classe colle",     value: "E1 / CARB P2"       },
  { label: "Humidité",         value: "< 8%"               },
  { label: "Classement feu",   value: "Class D-s2, d0"     },
  { label: "Origine",          value: "Certifié UE"         },
  { label: "Palette",          value: "50 feuilles"         },
];

export function ProductDetailsScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, cart } = useCart();

  const product = getProductById(id ?? "");

  /* ── Variant selection state ─────────────────────────────────── */
  const tailles = useMemo(() => (product ? getTailles(product) : []), [product]);
  const [selectedTaille, setSelectedTaille] = useState<string>(tailles[0] ?? "");

  const epaisseurs = useMemo(
    () => (product && selectedTaille ? getEpaisseurs(product, selectedTaille) : []),
    [product, selectedTaille]
  );
  const [selectedEpaisseur, setSelectedEpaisseur] = useState<string>(epaisseurs[0] ?? "");

  /* When taille changes, reset épaisseur to first available */
  const handleTailleChange = (t: string) => {
    setSelectedTaille(t);
    const newEps = product ? getEpaisseurs(product, t) : [];
    setSelectedEpaisseur(newEps[0] ?? "");
  };

  /* ── Derived variant + SKU ───────────────────────────────────── */
  const activeVariant = useMemo(
    () =>
      product && selectedTaille && selectedEpaisseur
        ? getVariant(product, selectedTaille, selectedEpaisseur)
        : undefined,
    [product, selectedTaille, selectedEpaisseur]
  );

  const computedSKU = activeVariant?.sku ?? "—";
  const basePrice   = activeVariant?.price ?? 0;
  const isInStock   = activeVariant?.stock ?? false;

  /* ── Quantity + tiered pricing ───────────────────────────────── */
  const [qty, setQty]           = useState(10);
  const [wishlist, setWishlist] = useState(false);
  const [showSpecs, setShowSpecs] = useState(false);
  const [addedFlash, setAddedFlash] = useState(false);

  const tierIndex    = getActiveTierIndex(qty);
  const currentPrice = getTieredPrice(basePrice, qty);
  const totalPrice   = (currentPrice * qty).toFixed(2);

  /* Is this SKU already in cart? */
  const alreadyInCart = cart.some((c) => c.sku === computedSKU);

  /* ── Add to cart ─────────────────────────────────────────────── */
  const handleAddToCart = () => {
    if (!product || !activeVariant) return;
    addToCart({
      sku:       activeVariant.sku,
      productId: product.id,
      name:      product.name,
      category:  product.category,
      finition:  product.finition,
      taille:    selectedTaille,
      epaisseur: selectedEpaisseur,
      unitPrice: currentPrice,
      image:     product.image,
      qty,
    });
    setAddedFlash(true);
    setTimeout(() => setAddedFlash(false), 1800);
  };

  /* ── Not found ───────────────────────────────────────────────── */
  if (!product) {
    return (
      <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "12px" }}>
        <div style={{ fontSize: "28px" }}>📦</div>
        <div style={{ fontSize: "14px", color: "#6B7280" }}>Produit introuvable</div>
        <button onClick={() => navigate(-1)} style={{ background: ORANGE, color: "white", border: "none", borderRadius: "10px", padding: "10px 20px", fontSize: "13px", cursor: "pointer" }}>
          Retour
        </button>
      </div>
    );
  }

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#FBFBFB", position: "relative" }}>

      {/* ════ Scrollable body ════ */}
      <div style={{ flex: 1, overflowY: "auto" }}>

        {/* ── Image ─────────────────────────────────────────── */}
        <div style={{ position: "relative", height: "220px", background: "#F0F0EC" }}>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />

          {/* Overlay actions */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 100%)" }}>
            <button onClick={() => navigate(-1)} style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)", border: "none", borderRadius: "10px", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <ArrowLeft size={18} color="white" />
            </button>
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={() => setWishlist(!wishlist)} style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)", border: "none", borderRadius: "10px", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <Heart size={18} color="white" fill={wishlist ? "white" : "none"} />
              </button>
              <button style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)", border: "none", borderRadius: "10px", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <Share2 size={18} color="white" />
              </button>
            </div>
          </div>

          {/* Category tag */}
          {product.tag && (
            <div style={{ position: "absolute", bottom: "12px", left: "12px", background: NAVY, color: "white", fontSize: "10px", fontWeight: 700, padding: "3px 10px", borderRadius: "20px" }}>
              {product.tag.toUpperCase()}
            </div>
          )}
        </div>

        {/* ── Product info ───────────────────────────────────── */}
        <div style={{ padding: "14px 16px 0" }}>

          {/* ── AUTO-COMPUTED SKU BADGE ────────────────────── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: activeVariant ? `${NAVY}0D` : "#F3F4F6",
              border: `1.5px solid ${activeVariant ? NAVY + "30" : "#E5E7EB"}`,
              borderRadius: "10px",
              padding: "8px 12px",
              marginBottom: "10px",
            }}
          >
            <Scan size={14} color={activeVariant ? NAVY : "#9CA3AF"} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "9px", fontWeight: 600, color: "#9CA3AF", letterSpacing: "0.8px", textTransform: "uppercase" }}>
                SKU — Calculé automatiquement
              </div>
              <div style={{ fontSize: "15px", fontWeight: 800, color: activeVariant ? NAVY : "#9CA3AF", letterSpacing: "1px", fontFamily: "monospace" }}>
                {computedSKU}
              </div>
            </div>
            {activeVariant && (
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: isInStock ? "#16A34A" : "#6B7280", flexShrink: 0 }} />
            )}
          </div>

          {/* Name + finition */}
          <div style={{ marginBottom: "8px" }}>
            <div style={{ fontSize: "9px", color: "#A0B0A5", fontWeight: 600, letterSpacing: "0.8px", marginBottom: "2px" }}>
              {product.category.toUpperCase()} · {product.finition.toUpperCase()}
            </div>
            <h1 style={{ fontSize: "20px", fontWeight: 800, color: "#1A2520", lineHeight: "1.2", margin: 0 }}>
              {product.name}
            </h1>
          </div>

          {/* Rating + stock */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={12} fill={s <= 4 ? WOOD : "none"} color={WOOD} />
              ))}
              <span style={{ fontSize: "11px", color: "#757575", marginLeft: "4px" }}>4,2 (18 avis)</span>
            </div>
            <div style={{ background: isInStock ? "#DCFCE7" : "#F3F4F6", color: isInStock ? "#16A34A" : "#6B7280", fontSize: "11px", fontWeight: 700, padding: "3px 9px", borderRadius: "6px", display: "flex", alignItems: "center", gap: "4px" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: isInStock ? "#16A34A" : "#6B7280" }} />
              {isInStock ? "EN STOCK" : "SUR COMMANDE"}
            </div>
          </div>

          {/* ── PRICING BLOCK ──────────────────────────────── */}
          <div style={{ background: "#FBFBFB", borderRadius: "14px", padding: "14px", marginBottom: "14px", border: "1px solid #EAEAEA" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "4px" }}>
              <span style={{ fontSize: "32px", fontWeight: 800, color: G, lineHeight: 1 }}>
                {currentPrice.toFixed(2)} TND
              </span>
              <span style={{ fontSize: "14px", color: "#5A6A5E", fontWeight: 500 }}>HT / unité</span>
            </div>
            <div style={{ fontSize: "11px", color: "#8A9A8E", marginBottom: "12px" }}>
              SKU actif : <span style={{ fontFamily: "monospace", fontWeight: 700, color: NAVY }}>{computedSKU}</span>
            </div>

            {/* Tiered pricing */}
            <div style={{ fontSize: "11px", fontWeight: 700, color: "#5A6A5E", marginBottom: "7px", letterSpacing: "0.5px" }}>
              TARIFS DÉGRESSIFS
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {pricingTiers.map((tier, i) => {
                const tierPrice = getTieredPrice(basePrice, i === 0 ? 1 : i === 1 ? 10 : 50);
                const active = tierIndex === i;
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      padding: "9px 12px", borderRadius: "9px",
                      background: active ? `${G}15` : i === 2 ? "#FEF1E4" : "white",
                      border: active ? `1.5px solid ${G}50` : i === 2 ? `1px solid ${WOOD}40` : "1px solid #EAEAEA",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      {active && <BadgeCheck size={14} color={G} />}
                      {i === 2 && !active && (
                        <span style={{ fontSize: "9px", background: WOOD, color: "white", padding: "1px 5px", borderRadius: "4px", fontWeight: 700 }}>MEILLEUR</span>
                      )}
                      <span style={{ fontSize: "12px", color: "#2D3A35", fontWeight: 500 }}>{tier.range}</span>
                      <span style={{ fontSize: "10px", color: "#A0B0A5" }}>{tier.label}</span>
                    </div>
                    <span style={{ fontSize: "14px", fontWeight: 800, color: active ? G : i === 2 ? WOOD : "#2D3A35" }}>
                      {tierPrice.toFixed(2)} TND <span style={{ fontWeight: 500, fontSize: "11px", color: "#8A9A8E" }}>HT</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── VARIANT SELECTORS ──────────────────────────── */}

          {/* Taille */}
          <div style={{ marginBottom: "14px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
              <Ruler size={13} color={NAVY} />
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#1A2520" }}>Taille (Format)</span>
            </div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {tailles.map((t) => (
                <button
                  key={t}
                  onClick={() => handleTailleChange(t)}
                  style={{
                    padding: "7px 12px", borderRadius: "9px",
                    border: selectedTaille === t ? `2px solid ${NAVY}` : "1.5px solid #EAEAEA",
                    background: selectedTaille === t ? `${NAVY}10` : "white",
                    color: selectedTaille === t ? NAVY : "#1C0D0A",
                    fontSize: "12px", fontWeight: selectedTaille === t ? 700 : 400,
                    cursor: "pointer", fontFamily: "Inter, sans-serif",
                    transition: "all 0.15s",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Épaisseur */}
          <div style={{ marginBottom: "14px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
              <Layers size={13} color={NAVY} />
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#1A2520" }}>Épaisseur</span>
            </div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {epaisseurs.map((e) => (
                <button
                  key={e}
                  onClick={() => setSelectedEpaisseur(e)}
                  style={{
                    padding: "7px 14px", borderRadius: "9px",
                    border: selectedEpaisseur === e ? `2px solid ${NAVY}` : "1.5px solid #EAEAEA",
                    background: selectedEpaisseur === e ? `${NAVY}10` : "white",
                    color: selectedEpaisseur === e ? NAVY : "#1C0D0A",
                    fontSize: "12px", fontWeight: selectedEpaisseur === e ? 700 : 400,
                    cursor: "pointer", fontFamily: "Inter, sans-serif",
                    transition: "all 0.15s",
                  }}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          {/* Active SKU summary strip */}
          {activeVariant && (
            <div
              style={{
                background: `linear-gradient(120deg, ${NAVY} 0%, #004a99 100%)`,
                borderRadius: "12px",
                padding: "10px 14px",
                marginBottom: "14px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.55)", fontWeight: 600, letterSpacing: "0.8px", textTransform: "uppercase" }}>
                  Référence sélectionnée
                </div>
                <div style={{ fontSize: "16px", fontWeight: 800, color: "white", fontFamily: "monospace", letterSpacing: "1px" }}>
                  {computedSKU}
                </div>
                <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.65)", marginTop: "2px" }}>
                  {selectedTaille} · {selectedEpaisseur} · {product.finition}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "18px", fontWeight: 800, color: ORANGE }}>{currentPrice.toFixed(2)}</div>
                <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.55)" }}>TND HT/m²</div>
              </div>
            </div>
          )}

          {/* Delivery info */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px" }}>
            {[
              { icon: Truck,   text: "Port offert dès 500 TND" },
              { icon: Package, text: "Expédié sous 2–3 jours"  },
            ].map((item) => (
              <div key={item.text} style={{ flex: 1, background: "#FBFBFB", borderRadius: "10px", padding: "10px", display: "flex", alignItems: "center", gap: "8px", border: "1px solid #EAEAEA" }}>
                <item.icon size={14} color={G} />
                <span style={{ fontSize: "11px", color: "#1C0D0A", fontWeight: 500 }}>{item.text}</span>
              </div>
            ))}
          </div>

          {/* Technical specs accordion */}
          <button
            onClick={() => setShowSpecs(!showSpecs)}
            style={{ width: "100%", background: "#FBFBFB", border: "1px solid #EAEAEA", borderRadius: "12px", padding: "13px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", marginBottom: "8px", fontFamily: "Inter, sans-serif" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Info size={15} color={G} />
              <span style={{ fontSize: "13px", fontWeight: 700, color: "#1A2520" }}>Spécifications Techniques</span>
            </div>
            <ChevronDown size={16} color="#8A9A8E" style={{ transform: showSpecs ? "rotate(180deg)" : "none", transition: "0.2s" }} />
          </button>

          {showSpecs && (
            <div style={{ background: "#FBFBFB", border: "1px solid #EAEAEA", borderRadius: "12px", overflow: "hidden", marginBottom: "14px" }}>
              {specs.map((s, i) => (
                <div key={s.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", borderBottom: i < specs.length - 1 ? "1px solid #EAEAEA" : "none", background: i % 2 === 0 ? "white" : "#F9FBFA" }}>
                  <span style={{ fontSize: "12px", color: "#757575" }}>{s.label}</span>
                  <span style={{ fontSize: "12px", fontWeight: 600, color: "#1A2520" }}>{s.value}</span>
                </div>
              ))}
            </div>
          )}

          <div style={{ height: "100px" }} />
        </div>
      </div>

      {/* ════ Fixed bottom action bar ════ */}
      <div style={{ background: "white", borderTop: "1px solid #EAEAEA", padding: "12px 16px", boxShadow: "0 -4px 20px rgba(0,0,0,0.08)" }}>

        {/* Line total */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
          <div>
            <span style={{ fontSize: "11px", color: "#8A9A8E" }}>
              {qty} unité{qty > 1 ? "s" : ""} × {currentPrice.toFixed(2)} TND HT
            </span>
            {activeVariant && (
              <div style={{ fontSize: "10px", color: NAVY, fontWeight: 600, fontFamily: "monospace" }}>
                → {computedSKU}
              </div>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "3px" }}>
            <span style={{ fontSize: "20px", fontWeight: 800, color: G }}>{totalPrice} TND</span>
            <span style={{ fontSize: "11px", color: "#8A9A8E" }}>HT</span>
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {/* Qty stepper */}
          <div style={{ display: "flex", alignItems: "center", background: "#FBFBFB", borderRadius: "12px", border: "1.5px solid #EAEAEA", overflow: "hidden", height: "48px" }}>
            <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ background: "none", border: "none", padding: "0 12px", cursor: "pointer", height: "100%", display: "flex", alignItems: "center" }}>
              <Minus size={16} color={G} />
            </button>
            <input
              type="number"
              value={qty}
              onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
              style={{ width: "46px", textAlign: "center", background: "white", border: "none", outline: "none", fontSize: "15px", fontWeight: 700, color: "#1A2520", fontFamily: "Inter, sans-serif", height: "100%", borderLeft: "1px solid #EAEAEA", borderRight: "1px solid #EAEAEA" }}
            />
            <button onClick={() => setQty(qty + 1)} style={{ background: "none", border: "none", padding: "0 12px", cursor: "pointer", height: "100%", display: "flex", alignItems: "center" }}>
              <Plus size={16} color={G} />
            </button>
          </div>

          {/* Add to cart CTA */}
          <button
            onClick={handleAddToCart}
            disabled={!activeVariant || !isInStock}
            style={{
              flex: 1,
              background: addedFlash
                ? "#16A34A"
                : !activeVariant || !isInStock
                ? "#E5E7EB"
                : `linear-gradient(135deg, ${G} 0%, ${G} 100%)`,
              color: !activeVariant || !isInStock ? "#9CA3AF" : "white",
              border: "none",
              borderRadius: "12px",
              height: "48px",
              fontSize: "14px",
              fontWeight: 700,
              cursor: !activeVariant || !isInStock ? "not-allowed" : "pointer",
              fontFamily: "Inter, sans-serif",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              boxShadow: activeVariant && isInStock ? "0 8px 22px rgba(212,122,32,0.28)" : "none",
              transition: "all 0.2s",
            }}
          >
            {addedFlash ? (
              <><Check size={17} /> Ajouté — {computedSKU}</>
            ) : alreadyInCart ? (
              <><ShoppingCart size={17} /> Déjà au panier <ChevronRight size={14} /></>
            ) : !isInStock ? (
              "Sur commande uniquement"
            ) : (
              <><ShoppingCart size={17} /> Ajouter au panier <ChevronRight size={14} /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
