import { useState } from "react";
import { useNavigate } from "react-router";
import { Search, ScanBarcode, Bell, Layers, ChevronRight } from "lucide-react";

const NAVY = "#f4e9da";
const ORANGE = "#FF6600";

const families = [
  {
    id: "portes",
    name: "Portes",
    subtitle: "Doors",
    decorCount: 48,
    image:
      "https://images.unsplash.com/photo-1759262151165-3330c14fd982?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b29kZW4lMjBpbnRlcmlvciUyMGRvb3IlMjBkZXNpZ258ZW58MXx8fHwxNzc1NDYwNjczfDA&ixlib=rb-4.1.0&q=80&w=600",
  },
  {
    id: "cuisines",
    name: "Cuisines",
    subtitle: "Kitchens",
    decorCount: 62,
    image:
      "https://images.unsplash.com/photo-1758565810954-7c97ad680715?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBraXRjaGVuJTIwY2FiaW5ldCUyMHdvb2QlMjBmdXJuaXR1cmV8ZW58MXx8fHwxNzc1NDYwNjc0fDA&ixlib=rb-4.1.0&q=80&w=600",
  },
  {
    id: "bureau",
    name: "Mobilier de Bureau",
    subtitle: "Office Furniture",
    decorCount: 35,
    image:
      "https://images.unsplash.com/photo-1773022768285-decb147b7b34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBmdXJuaXR1cmUlMjBkZXNrJTIwd29vZHxlbnwxfHx8fDE3NzU0NjA2NzR8MA&ixlib=rb-4.1.0&q=80&w=600",
  },
  {
    id: "mural",
    name: "Revêtement Mural",
    subtitle: "Wall Paneling",
    decorCount: 41,
    image:
      "https://images.unsplash.com/photo-1768320837734-02390d59dfea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kJTIwd2FsbCUyMHBhbmVsaW5nJTIwaW50ZXJpb3IlMjBkZXNpZ258ZW58MXx8fHwxNzc1NDYwNjc1fDA&ixlib=rb-4.1.0&q=80&w=600",
  },
  {
    id: "placards",
    name: "Placards & Dressings",
    subtitle: "Wardrobes",
    decorCount: 56,
    image:
      "https://images.unsplash.com/photo-1765277789187-17428ac17008?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBiZWRyb29tJTIwd2FyZHJvYmUlMjBjbG9zZXQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzU0NjA2NzV8MA&ixlib=rb-4.1.0&q=80&w=600",
  },
  {
    id: "rayonnage",
    name: "Rayonnage & Étagères",
    subtitle: "Shelving",
    decorCount: 29,
    image:
      "https://images.unsplash.com/photo-1763888537845-8fcf31cb0570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRhaWwlMjBzdG9yZSUyMHdvb2RlbiUyMHNoZWxmJTIwZGlzcGxheXxlbnwxfHx8fDE3NzU0NjA2NzV8MA&ixlib=rb-4.1.0&q=80&w=600",
  },
];

export function FamilyCatalogScreen() {
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filtered = searchQuery
    ? families.filter(
        (f) =>
          f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          f.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : families;

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
          padding: "14px 18px 20px",
          flexShrink: 0,
        }}
      >
        {/* Top row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "16px",
          }}
        >
          <div>
            <div
              style={{
                color: "black",
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "1.2px",
                textTransform: "uppercase",
                marginBottom: "2px",
              }}
            >
              Catalogue MPBS
            </div>
            <div
              style={{
                color: "darkslategray",
                fontSize: "18px",
                fontWeight: 700,
                lineHeight: "1.2",
              }}
            >
              Familles de Produits
            </div>
          </div>

          <button
            style={{
              background: "rgba(255,255,255,0.10)",
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: "10px",
              width: "38px",
              height: "38px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              position: "relative",
              flexShrink: 0,
            }}
          >
            <Bell size={17} color="black" />
            <div
              style={{
                position: "absolute",
                top: "9px",
                right: "9px",
                width: "7px",
                height: "7px",
                background: ORANGE,
                borderRadius: "50%",
                border: `1.5px solid ${NAVY}`,
              }}
            />
          </button>
        </div>

        {/* Search bar */}
        <div
          style={{
            background: searchFocused ? "white" : "rgba(255,255,255,0.10)",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "0 14px",
            height: "44px",
            border: searchFocused
              ? `2px solid ${ORANGE}`
              : "2px solid rgba(255,255,255,0.18)",
            transition: "all 0.2s",
          }}
        >
          <Search
            size={15}
            color={
              searchFocused ? "#8A9A8E" : "gray"
            }
          />
          <input
            placeholder="Rechercher une famille de produits..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            style={{
              flex: 1,
              background: "none",
              border: "none",
              outline: "none",
              fontSize: "13px",
              color: searchFocused ? "#1A2520" : "black",
              fontFamily: "Inter, sans-serif",
            }}
          />
          <ScanBarcode
            size={17}
            color={searchFocused ? ORANGE : "black"}
          />
        </div>
      </div>

      {/* ── Scrollable content ─────────────────────────────── */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 14px" }}>

        {/* Section header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "14px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
            <div
              style={{
                width: "26px",
                height: "26px",
                background: `${NAVY}15`,
                borderRadius: "7px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Layers size={13} color={ORANGE} />
            </div>
            <div>
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#1A2520",
                  letterSpacing: "0.2px",
                }}
              >
                Applications &amp; Usages
              </div>
              <div style={{ fontSize: "10px", color: "#8A9A8E" }}>
                {filtered.length} familles disponibles
              </div>
            </div>
          </div>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "3px",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0",
            }}
          >
            <span
              style={{ fontSize: "11px", color: ORANGE, fontWeight: 600 }}
            >
              Voir tout
            </span>
            <ChevronRight size={12} color={ORANGE} />
          </button>
        </div>

        {/* 2-column family cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
          }}
        >
          {filtered.map((family) => (
            <div
              key={family.id}
              onClick={() => navigate(`/app/catalog/${family.id}`)}
              style={{
                borderRadius: "18px",
                overflow: "hidden",
                cursor: "pointer",
                position: "relative",
                height: "188px",
                boxShadow: "0 6px 24px rgba(0,0,0,0.14)",
                flexShrink: 0,
              }}
            >
              {/* Background image */}
              <img
                src={family.image}
                alt={family.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />

              {/* Gradient overlay — dark from bottom */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0) 100%)",
                }}
              />

              {/* Decor count badge — top right */}
              <div
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  background: ORANGE,
                  color: "white",
                  fontSize: "9px",
                  fontWeight: 700,
                  padding: "3px 9px",
                  borderRadius: "20px",
                  letterSpacing: "0.3px",
                  boxShadow: "0 2px 6px rgba(255,102,0,0.35)",
                }}
              >
                {family.decorCount} Décors
              </div>

              {/* Text overlay — bottom */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "10px 12px 14px",
                }}
              >
                <div
                  style={{
                    color: "rgba(255,255,255,0.60)",
                    fontSize: "9px",
                    fontWeight: 600,
                    letterSpacing: "0.9px",
                    textTransform: "uppercase",
                    marginBottom: "3px",
                  }}
                >
                  {family.subtitle}
                </div>
                <div
                  style={{
                    color: "white",
                    fontSize: "14px",
                    fontWeight: 700,
                    lineHeight: "1.25",
                  }}
                >
                  {family.name}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom promo strip */}
        <div
          style={{
            marginTop: "16px",
            background: `linear-gradient(120deg, ${NAVY} 0%, #d47a20 100%)`,
            borderRadius: "14px",
            padding: "14px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                color: ORANGE,
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.8px",
                textTransform: "uppercase",
                marginBottom: "3px",
              }}
            >
              OFFRE B2B LIMITÉE
            </div>
            <div
              style={{
                color: "#00335b",
                fontSize: "13px",
                fontWeight: 700,
                marginBottom: "2px",
              }}
            >
              Panneaux OSB3 — 15% de remise
            </div>
            <div style={{ color: "black", fontSize: "10px" }}>
              Pour commandes +50 unités · Valable jusqu'au 30 avril
            </div>
          </div>
          <div
            style={{
              background: ORANGE,
              borderRadius: "10px",
              padding: "8px 10px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "3px",
              flexShrink: 0,
            }}
          >
            <span
              style={{ color: "white", fontSize: "11px", fontWeight: 700 }}
            >
              Voir
            </span>
            <ChevronRight size={12} color="white" />
          </div>
        </div>

        <div style={{ height: "16px" }} />
      </div>
    </div>
  );
}
