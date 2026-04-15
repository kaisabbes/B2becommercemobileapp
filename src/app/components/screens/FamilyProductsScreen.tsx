import { useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  SlidersHorizontal,
  ShoppingCart,
  Search,
  X,
  ChevronDown,
  ChevronUp,
  Ruler,
  Layers,
  Palette,
  Scan,
  ArrowRight,
} from "lucide-react";
import {
  allProducts,
  getCategoryTailles,
  getCategoryEpaisseurs,
  getCategoryFinitions,
  type BaseProduct,
} from "../../data/products";
import { useCart } from "../../context/CartContext";

const NAVY_BG = "#f4e9da";
const NAVY    = "#003366";
const ORANGE  = "#FF6600";

/* ── Family metadata ────────────────────────────────────────────── */
const familyMeta: Record<string, { name: string; subtitle: string }> = {
  melamine:    { name: "Mélaminé",   subtitle: "Melamine Panels"  },
  plaques:     { name: "Plaqué",     subtitle: "Veneered Panels"  },
  acryliques:  { name: "Acrylique",  subtitle: "Acrylic Panels"   },
  "high-gloss":{ name: "High Gloss", subtitle: "Ultra Gloss"      },
};

/* ── Applied filter tag ─────────────────────────────────────────── */
function FilterTag({ label, value, onRemove }: { label: string; value: string; onRemove: () => void }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "5px", background: `${NAVY}12`, border: `1.5px solid ${NAVY}30`, borderRadius: "20px", padding: "4px 10px", flexShrink: 0 }}>
      <span style={{ fontSize: "9px", color: "#6B7280", fontWeight: 600, textTransform: "uppercase" }}>{label}</span>
      <span style={{ fontSize: "11px", color: NAVY, fontWeight: 700 }}>{value}</span>
      <button onClick={onRemove} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: 0 }}>
        <X size={11} color="#6B7280" />
      </button>
    </div>
  );
}

/* ── Component ──────────────────────────────────────────────────── */
export function FamilyProductsScreen() {
  const { familyId } = useParams<{ familyId: string }>();
  const navigate     = useNavigate();
  const { cart }     = useCart();

  const meta = familyMeta[familyId as string];

  // Filter state
  const [selectedTaille,    setSelectedTaille]    = useState<string | null>(null);
  const [selectedEpaisseur, setSelectedEpaisseur] = useState<string | null>(null);
  const [selectedFinition,  setSelectedFinition]  = useState<string | null>(null);

  type Step = "taille" | "epaisseur" | "finition" | null;
  const [openStep, setOpenStep] = useState<Step>(null);

  const [searchQuery,   setSearchQuery]   = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  /* ── Cart badge count ──────────────────────────────────────── */
  const cartCount = cart.length;

  /* ── Available filter options ──────────────────────────────── */
  const category = familyId ?? "";

  const availableTailles = useMemo(() => getCategoryTailles(category), [category]);

  const availableEpaisseurs = useMemo(
    () => (selectedTaille ? getCategoryEpaisseurs(category, selectedTaille) : []),
    [category, selectedTaille]
  );

  const availableFinitions = useMemo(
    () => getCategoryFinitions(category, selectedTaille, selectedEpaisseur),
    [category, selectedTaille, selectedEpaisseur]
  );

  /* ── Filtered products ─────────────────────────────────────── */
  const filtered = useMemo((): BaseProduct[] => {
    let pool = allProducts.filter((p) => p.category === category);

    if (selectedTaille) {
      pool = pool.filter((p) => p.variants.some((v) => v.taille === selectedTaille));
    }
    if (selectedEpaisseur) {
      pool = pool.filter((p) =>
        p.variants.some(
          (v) =>
            v.epaisseur === selectedEpaisseur &&
            (!selectedTaille || v.taille === selectedTaille)
        )
      );
    }
    if (selectedFinition) {
      pool = pool.filter((p) => p.finition === selectedFinition);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      pool = pool.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.finition.toLowerCase().includes(q) ||
          p.variants.some((v) => v.sku.toLowerCase().includes(q))
      );
    }
    return pool;
  }, [category, selectedTaille, selectedEpaisseur, selectedFinition, searchQuery]);

  /* ── Helpers ───────────────────────────────────────────────── */
  const removeTaille    = () => { setSelectedTaille(null); setSelectedEpaisseur(null); setSelectedFinition(null); setOpenStep(null); };
  const removeEpaisseur = () => { setSelectedEpaisseur(null); setSelectedFinition(null); setOpenStep(null); };
  const removeFinition  = () => { setSelectedFinition(null); setOpenStep(null); };

  const selectTaille = (v: string) => {
    if (selectedTaille === v) { removeTaille(); return; }
    setSelectedTaille(v);
    setSelectedEpaisseur(null);
    setSelectedFinition(null);
    setOpenStep("epaisseur");
  };

  const selectEpaisseur = (v: string) => {
    if (selectedEpaisseur === v) { removeEpaisseur(); return; }
    setSelectedEpaisseur(v);
    setSelectedFinition(null);
    setOpenStep("finition");
  };

  const selectFinition = (v: string) => {
    if (selectedFinition === v) { removeFinition(); return; }
    setSelectedFinition(v);
    setOpenStep(null);
  };

  const toggleStep = (step: Step) => setOpenStep((prev) => (prev === step ? null : step));

  const hasFilters = !!(selectedTaille || selectedEpaisseur || selectedFinition);

  /* ── SKU count for a product matching current filters ────────── */
  const matchingVariantCount = (product: BaseProduct): number => {
    let vs = product.variants;
    if (selectedTaille)    vs = vs.filter((v) => v.taille === selectedTaille);
    if (selectedEpaisseur) vs = vs.filter((v) => v.epaisseur === selectedEpaisseur);
    return vs.length;
  };

  /* ── Best (cheapest in-stock) variant price for a product ────── */
  const bestPrice = (product: BaseProduct): { price: number; sku: string } | null => {
    let vs = product.variants.filter((v) => v.stock);
    if (selectedTaille)    vs = vs.filter((v) => v.taille === selectedTaille);
    if (selectedEpaisseur) vs = vs.filter((v) => v.epaisseur === selectedEpaisseur);
    if (vs.length === 0) {
      // fallback: any variant
      let all = product.variants;
      if (selectedTaille)    all = all.filter((v) => v.taille === selectedTaille);
      if (selectedEpaisseur) all = all.filter((v) => v.epaisseur === selectedEpaisseur);
      if (all.length === 0) return null;
      return { price: all[0].price, sku: all[0].sku };
    }
    const cheapest = vs.reduce((a, b) => (a.price < b.price ? a : b));
    return { price: cheapest.price, sku: cheapest.sku };
  };

  /* ── Any variant in stock? ───────────────────────────────────── */
  const hasStock = (product: BaseProduct): boolean => {
    let vs = product.variants;
    if (selectedTaille)    vs = vs.filter((v) => v.taille === selectedTaille);
    if (selectedEpaisseur) vs = vs.filter((v) => v.epaisseur === selectedEpaisseur);
    return vs.some((v) => v.stock);
  };

  /* ── Is any variant of this product in the cart? ────────────── */
  const isInCart = (product: BaseProduct): boolean =>
    cart.some((c) => c.productId === product.id);

  if (!meta) {
    return (
      <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "12px", color: "#8A9A8E" }}>
        <div style={{ fontSize: "14px" }}>Famille introuvable.</div>
        <button onClick={() => navigate("/app/catalog")} style={{ background: NAVY, color: "white", border: "none", borderRadius: "10px", padding: "10px 20px", fontSize: "13px", cursor: "pointer" }}>
          Retour au catalogue
        </button>
      </div>
    );
  }

  /* ── Option button shared style ─────────────────────────────── */
  const optionBtn = (active: boolean) => ({
    padding: "6px 14px",
    borderRadius: "10px",
    border: active ? "none" : "1.5px solid #E5E7EB",
    background: active ? ORANGE : "#F9FAFB",
    color: active ? "white" : "#1A2520",
    fontSize: "12px",
    fontWeight: 600,
    cursor: "pointer" as const,
    fontFamily: "Inter, sans-serif",
    boxShadow: active ? "0 2px 8px rgba(255,102,0,0.3)" : "none",
    transition: "all 0.15s",
  });

  return (
    <div style={{ height: "100%", background: "#F0F2F5", display: "flex", flexDirection: "column" }}>

      {/* ══ HEADER ══════════════════════════════════════════════ */}
      <div style={{ background: `linear-gradient(120deg, ${NAVY_BG} 0%, #d47a20 100%)`, padding: "14px 16px 0", flexShrink: 0 }}>

        {/* Top row */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
          <button
            onClick={() => navigate("/app/catalog")}
            style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: "10px", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}
          >
            <ArrowLeft size={16} color="black" />
          </button>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ color: "black", fontSize: "10px", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase" }}>
              {meta.subtitle}
            </div>
            <div style={{ color: "darkslategray", fontSize: "15px", fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {meta.name} — Sélection Décors
            </div>
          </div>

          {/* Cart */}
          <button
            onClick={() => navigate("/app/cart")}
            style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: "10px", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative", flexShrink: 0 }}
          >
            <ShoppingCart size={16} color="black" />
            {cartCount > 0 && (
              <div style={{ position: "absolute", top: "-4px", right: "-4px", background: ORANGE, color: "white", borderRadius: "10px", minWidth: "17px", height: "17px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", fontWeight: 700, padding: "0 3px" }}>
                {cartCount}
              </div>
            )}
          </button>

          {/* Filter icon */}
          <button
            onClick={() => toggleStep(openStep ? null : "taille")}
            style={{ background: hasFilters ? ORANGE : "rgba(255,255,255,0.12)", border: hasFilters ? "none" : "1px solid rgba(255,255,255,0.18)", borderRadius: "10px", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, boxShadow: hasFilters ? "0 2px 8px rgba(255,102,0,0.35)" : "none" }}
          >
            <SlidersHorizontal size={16} color={hasFilters ? "white" : "black"} />
          </button>
        </div>

        {/* Search */}
        <div style={{ background: searchFocused ? "white" : "rgba(255,255,255,0.10)", borderRadius: "10px", display: "flex", alignItems: "center", gap: "8px", padding: "0 12px", height: "38px", border: searchFocused ? `2px solid ${ORANGE}` : "1.5px solid rgba(255,255,255,0.18)", transition: "all 0.2s", marginBottom: "10px" }}>
          <Search size={13} color={searchFocused ? "#8A9A8E" : "gray"} />
          <input
            placeholder="Rechercher décor, finition, SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            style={{ flex: 1, background: "none", border: "none", outline: "none", fontSize: "12px", color: searchFocused ? "#1A2520" : "black", fontFamily: "Inter, sans-serif" }}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", padding: 0 }}>
              <X size={13} color="gray" />
            </button>
          )}
        </div>

        {/* ── 3-STEP FILTER BAR ──────────────────────────────── */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "10px", overflowX: "auto", scrollbarWidth: "none" }}>

          {/* Step 1 – Taille */}
          <button
            onClick={() => toggleStep("taille")}
            style={{
              flexShrink: 0, display: "flex", alignItems: "center", gap: "5px",
              padding: "6px 12px", borderRadius: "20px",
              border: selectedTaille ? "none" : openStep === "taille" ? `1.5px solid ${ORANGE}` : "1.5px solid rgba(255,255,255,0.28)",
              background: selectedTaille ? ORANGE : openStep === "taille" ? "rgba(255,102,0,0.12)" : "rgba(255,255,255,0.10)",
              color: selectedTaille ? "white" : openStep === "taille" ? ORANGE : "#23272a",
              fontSize: "11px", fontWeight: 600, cursor: "pointer", fontFamily: "Inter, sans-serif",
              boxShadow: selectedTaille ? "0 2px 8px rgba(255,102,0,0.35)" : "none", transition: "all 0.15s",
            }}
          >
            <Ruler size={11} color={selectedTaille ? "white" : openStep === "taille" ? ORANGE : "#23272a"} />
            {selectedTaille ? (
              <>{selectedTaille}<span onClick={(e) => { e.stopPropagation(); removeTaille(); }} style={{ display: "flex", alignItems: "center", cursor: "pointer" }}><X size={10} color="white" /></span></>
            ) : "Taille"}
            {!selectedTaille && (openStep === "taille" ? <ChevronUp size={10} /> : <ChevronDown size={10} />)}
          </button>

          {/* Step 2 – Épaisseur */}
          <button
            onClick={() => selectedTaille && toggleStep("epaisseur")}
            style={{
              flexShrink: 0, display: "flex", alignItems: "center", gap: "5px",
              padding: "6px 12px", borderRadius: "20px",
              border: selectedEpaisseur ? "none" : openStep === "epaisseur" ? `1.5px solid ${ORANGE}` : !selectedTaille ? "1.5px solid rgba(255,255,255,0.12)" : "1.5px solid rgba(255,255,255,0.28)",
              background: selectedEpaisseur ? ORANGE : openStep === "epaisseur" ? "rgba(255,102,0,0.12)" : !selectedTaille ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.10)",
              color: selectedEpaisseur ? "white" : openStep === "epaisseur" ? ORANGE : !selectedTaille ? "rgba(255,255,255,0.3)" : "#23272a",
              fontSize: "11px", fontWeight: 600, cursor: selectedTaille ? "pointer" : "not-allowed",
              fontFamily: "Inter, sans-serif", opacity: !selectedTaille ? 0.5 : 1,
              boxShadow: selectedEpaisseur ? "0 2px 8px rgba(255,102,0,0.35)" : "none", transition: "all 0.15s",
            }}
          >
            <Layers size={11} color={selectedEpaisseur ? "white" : openStep === "epaisseur" ? ORANGE : !selectedTaille ? "rgba(255,255,255,0.3)" : "#23272a"} />
            {selectedEpaisseur ? (
              <>{selectedEpaisseur}<span onClick={(e) => { e.stopPropagation(); removeEpaisseur(); }} style={{ display: "flex", alignItems: "center", cursor: "pointer" }}><X size={10} color="white" /></span></>
            ) : "Épaisseur"}
            {!selectedEpaisseur && selectedTaille && (openStep === "epaisseur" ? <ChevronUp size={10} /> : <ChevronDown size={10} />)}
          </button>

          {/* Step 3 – Finition */}
          <button
            onClick={() => selectedEpaisseur && toggleStep("finition")}
            style={{
              flexShrink: 0, display: "flex", alignItems: "center", gap: "5px",
              padding: "6px 12px", borderRadius: "20px",
              border: selectedFinition ? "none" : openStep === "finition" ? `1.5px solid ${ORANGE}` : !selectedEpaisseur ? "1.5px solid rgba(255,255,255,0.12)" : "1.5px solid rgba(255,255,255,0.28)",
              background: selectedFinition ? ORANGE : openStep === "finition" ? "rgba(255,102,0,0.12)" : !selectedEpaisseur ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.10)",
              color: selectedFinition ? "white" : openStep === "finition" ? ORANGE : !selectedEpaisseur ? "rgba(255,255,255,0.3)" : "#23272a",
              fontSize: "11px", fontWeight: 600, cursor: selectedEpaisseur ? "pointer" : "not-allowed",
              fontFamily: "Inter, sans-serif", opacity: !selectedEpaisseur ? 0.5 : 1,
              boxShadow: selectedFinition ? "0 2px 8px rgba(255,102,0,0.35)" : "none", transition: "all 0.15s",
            }}
          >
            <Palette size={11} color={selectedFinition ? "white" : openStep === "finition" ? ORANGE : !selectedEpaisseur ? "rgba(255,255,255,0.3)" : "#23272a"} />
            {selectedFinition ? (
              <>{selectedFinition}<span onClick={(e) => { e.stopPropagation(); removeFinition(); }} style={{ display: "flex", alignItems: "center", cursor: "pointer" }}><X size={10} color="white" /></span></>
            ) : "Finition"}
            {!selectedFinition && selectedEpaisseur && (openStep === "finition" ? <ChevronUp size={10} /> : <ChevronDown size={10} />)}
          </button>
        </div>

        {/* ── Dropdown options panel ──────────────────────────── */}
        {openStep && (
          <div style={{ background: "white", borderRadius: "12px", padding: "10px 12px", marginBottom: "12px", boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }}>
            {openStep === "taille" && (
              <>
                <div style={{ fontSize: "9px", fontWeight: 700, color: "#9CA3AF", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: "8px", display: "flex", alignItems: "center", gap: "4px" }}>
                  <Ruler size={10} color="#9CA3AF" /> Format panneau
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {availableTailles.map((t) => (
                    <button key={t} onClick={() => selectTaille(t)} style={optionBtn(selectedTaille === t)}>{t}</button>
                  ))}
                </div>
              </>
            )}
            {openStep === "epaisseur" && (
              <>
                <div style={{ fontSize: "9px", fontWeight: 700, color: "#9CA3AF", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: "8px", display: "flex", alignItems: "center", gap: "4px" }}>
                  <Layers size={10} color="#9CA3AF" /> Épaisseur disponible pour {selectedTaille}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {availableEpaisseurs.map((e) => (
                    <button key={e} onClick={() => selectEpaisseur(e)} style={optionBtn(selectedEpaisseur === e)}>{e}</button>
                  ))}
                </div>
              </>
            )}
            {openStep === "finition" && (
              <>
                <div style={{ fontSize: "9px", fontWeight: 700, color: "#9CA3AF", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: "8px", display: "flex", alignItems: "center", gap: "4px" }}>
                  <Palette size={10} color="#9CA3AF" /> Finition / Couleur
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {availableFinitions.map((f) => (
                    <button key={f} onClick={() => selectFinition(f)} style={optionBtn(selectedFinition === f)}>{f}</button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        <div style={{ paddingBottom: "2px" }} />
      </div>

      {/* ══ SCROLLABLE CONTENT ══════════════════════════════════ */}
      <div style={{ flex: 1, overflowY: "auto", padding: "10px 14px" }}>

        {/* Applied filter chips */}
        {hasFilters && (
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "10px" }}>
            {selectedTaille    && <FilterTag label="Taille"    value={selectedTaille}    onRemove={removeTaille}    />}
            {selectedEpaisseur && <FilterTag label="Épaisseur" value={selectedEpaisseur} onRemove={removeEpaisseur} />}
            {selectedFinition  && <FilterTag label="Finition"  value={selectedFinition}  onRemove={removeFinition}  />}
            <button
              onClick={removeTaille}
              style={{ display: "inline-flex", alignItems: "center", gap: "4px", background: "none", border: "1.5px solid #E5E7EB", borderRadius: "20px", padding: "4px 10px", fontSize: "10px", color: "#6B7280", fontWeight: 600, cursor: "pointer" }}
            >
              <X size={10} /> Réinitialiser
            </button>
          </div>
        )}

        {/* Count row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
          <div style={{ fontSize: "11px", color: "#6B7280" }}>
            <span style={{ fontWeight: 700, color: "#1A2520" }}>{filtered.length}</span>{" "}
            décor{filtered.length > 1 ? "s" : ""} {hasFilters ? "filtrés" : "disponibles"}
          </div>
          <div style={{ fontSize: "9px", color: "#8A9A8E", fontWeight: 500, background: "#E8EDF2", padding: "3px 8px", borderRadius: "6px" }}>
            Prix HT · TVA 19%
          </div>
        </div>

        {/* Guided hint */}
        {!hasFilters && !searchQuery && (
          <div style={{ background: `${NAVY}08`, border: `1px dashed ${NAVY}30`, borderRadius: "12px", padding: "10px 14px", marginBottom: "12px", display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ fontSize: "18px" }}>🔍</div>
            <div>
              <div style={{ fontSize: "11px", fontWeight: 700, color: NAVY, marginBottom: "2px" }}>
                Sélection guidée — SKU auto-calculé
              </div>
              <div style={{ fontSize: "10px", color: "#6B7280" }}>
                Taille → Épaisseur → Finition → SKU unique identifié
              </div>
            </div>
          </div>
        )}

        {/* Product grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 20px" }}>
            <div style={{ fontSize: "28px", marginBottom: "8px" }}>📦</div>
            <div style={{ fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "4px" }}>Aucun décor trouvé</div>
            <div style={{ fontSize: "11px", color: "#9CA3AF" }}>Essayez de modifier vos filtres</div>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {filtered.map((product) => {
              const bp      = bestPrice(product);
              const inStock = hasStock(product);
              const inCart  = isInCart(product);
              const skuCount = matchingVariantCount(product);

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
                    transition: "box-shadow 0.2s",
                  }}
                >
                  {/* Square image */}
                  <div style={{ position: "relative", width: "100%", paddingBottom: "100%", background: "#F4F4F4", overflow: "hidden" }}>
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                    />

                    {/* Stock badge */}
                    <div style={{ position: "absolute", top: "7px", left: "7px", background: inStock ? "#16A34A" : "#6B7280", color: "white", fontSize: "8px", fontWeight: 700, padding: "2px 7px", borderRadius: "5px", letterSpacing: "0.3px", textTransform: "uppercase" }}>
                      {inStock ? "En Stock" : "Sur Commande"}
                    </div>

                    {/* Tag */}
                    {product.tag && (
                      <div style={{ position: "absolute", top: "7px", right: "7px", background: "#00335b", color: "white", fontSize: "8px", fontWeight: 700, padding: "2px 7px", borderRadius: "5px" }}>
                        {product.tag.toUpperCase()}
                      </div>
                    )}

                    {/* SKU count badge (bottom left) */}
                    <div style={{ position: "absolute", bottom: "8px", left: "8px", display: "flex", alignItems: "center", gap: "3px", background: "rgba(0,0,0,0.55)", borderRadius: "6px", padding: "3px 7px" }}>
                      <Scan size={9} color="white" />
                      <span style={{ fontSize: "9px", color: "white", fontWeight: 700 }}>
                        {skuCount} SKU{skuCount > 1 ? "s" : ""}
                      </span>
                    </div>

                    {/* Navigate arrow (bottom right) */}
                    <div style={{ position: "absolute", bottom: "8px", right: "8px", background: inCart ? NAVY : ORANGE, border: "none", borderRadius: "9px", width: "30px", height: "30px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 3px 10px rgba(0,0,0,0.22)" }}>
                      <ArrowRight size={14} color="white" />
                    </div>
                  </div>

                  {/* Product info */}
                  <div style={{ padding: "8px 10px 10px" }}>
                    {/* Finition label */}
                    <div style={{ fontSize: "9px", color: "#A0B0A5", fontWeight: 600, letterSpacing: "0.5px", marginBottom: "2px" }}>
                      {product.finition.toUpperCase()}
                    </div>

                    {/* Name */}
                    <div style={{ fontSize: "11px", fontWeight: 700, color: "#1A2520", lineHeight: "1.3", marginBottom: "5px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {product.name}
                    </div>

                    {/* Spec pills */}
                    <div style={{ display: "flex", gap: "4px", marginBottom: "7px", flexWrap: "wrap" }}>
                      {selectedTaille && (
                        <div style={{ display: "flex", alignItems: "center", gap: "3px", background: `${ORANGE}18`, borderRadius: "5px", padding: "2px 6px" }}>
                          <Ruler size={8} color={ORANGE} />
                          <span style={{ fontSize: "9px", color: ORANGE, fontWeight: 700 }}>{selectedTaille}</span>
                        </div>
                      )}
                      {selectedEpaisseur && (
                        <div style={{ display: "flex", alignItems: "center", gap: "3px", background: `${ORANGE}18`, borderRadius: "5px", padding: "2px 6px" }}>
                          <Layers size={8} color={ORANGE} />
                          <span style={{ fontSize: "9px", color: ORANGE, fontWeight: 700 }}>{selectedEpaisseur}</span>
                        </div>
                      )}
                      {!selectedTaille && !selectedEpaisseur && (
                        <div style={{ display: "flex", alignItems: "center", gap: "3px", background: "#F3F4F6", borderRadius: "5px", padding: "2px 6px" }}>
                          <span style={{ fontSize: "9px", color: "#6B7280", fontWeight: 600 }}>{product.variants.length} variantes</span>
                        </div>
                      )}
                    </div>

                    {/* Price */}
                    <div style={{ display: "flex", alignItems: "baseline", gap: "2px", borderTop: "1px solid #F4F4F4", paddingTop: "6px" }}>
                      {bp ? (
                        <>
                          <span style={{ fontSize: "9px", color: "#9CA3AF", fontWeight: 500 }}>dès </span>
                          <span style={{ fontSize: "15px", fontWeight: 800, color: "#00335b" }}>{bp.price.toFixed(2)}</span>
                          <span style={{ fontSize: "10px", color: "#6B7280", fontWeight: 500 }}>TND HT/m²</span>
                        </>
                      ) : (
                        <span style={{ fontSize: "11px", color: "#9CA3AF" }}>Prix sur devis</span>
                      )}
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
