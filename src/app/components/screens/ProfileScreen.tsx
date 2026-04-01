import { useState } from "react";
import {
  FileText,
  ClipboardList,
  Download,
  Tag,
  Building2,
  Phone,
  ChevronRight,
  Star,
  Bell,
  Settings,
  LogOut,
  TrendingUp,
  Award,
  CircleUser,
  ShieldCheck,
  BarChart2,
} from "lucide-react";

const G = "#f4e9da";
const WOOD = "#d47a20";
const A = "#FC4F00";

const menuSections = [
  {
    title: "Commandes & Documents",
    items: [
      {
        id: "quotes",
        icon: FileText,
        label: "Mes Devis",
        sub: "3 devis en attente de validation",
        color: "#F59E0B",
        badge: "3",
        badgeColor: A,
      },
      {
        id: "orders",
        icon: ClipboardList,
        label: "Historique & Factures",
        sub: "Consulter et télécharger vos factures",
        color: "#F59E0B",
        badge: null,
        badgeColor: null,
        hasDownload: true,
      },
    ],
  },
  {
    title: "Tarifs & Compte",
    items: [
      {
        id: "pricelist",
        icon: Tag,
        label: "Ma Grille de prix personnalisée",
        sub: "Tarifs négociés pour votre compte",
        color: "#F59E0B",
        badge: "NEW",
        badgeColor: A,
      },
      {
        id: "company",
        icon: Building2,
        label: "Détails de la société",
        sub: "SIRET · TVA · Adresse de facturation",
        color: "#F59E0B",
        badge: null,
        badgeColor: null,
      },
    ],
  },
  {
    title: "Paramètres",
    items: [
      {
        id: "notifications",
        icon: Bell,
        label: "Notifications",
        sub: "Alertes stock & promotions",
        color: "#F59E0B",
        badge: null,
        badgeColor: null,
      },
      {
        id: "settings",
        icon: Settings,
        label: "Paramètres du compte",
        sub: "Mot de passe · Langue · 2FA",
        color: "#F59E0B",
        badge: null,
        badgeColor: null,
      },
    ],
  },
];

const stats = [
  {
    label: "Total commandes",
    value: "147",
    icon: ClipboardList,
    color: WOOD,
  },
  {
    label: "Dépenses YTD HT",
    value: "87,4K TND",
    icon: TrendingUp,
    color: WOOD,
  },
  {
    label: "Points fidélité",
    value: "2 340",
    icon: Star,
    color: "#F59E0B",
  },
];

export function ProfileScreen() {
  const [activeCard, setActiveCard] = useState<string | null>(
    null,
  );

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#FBFBFB",
      }}
    >
      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* Header */}
        <div
          style={{
            background: `linear-gradient(145deg, ${G} 0%, ${WOOD} 100%)`,
            padding: "20px 18px 22px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative */}
          <div
            style={{
              position: "absolute",
              top: "-30px",
              right: "-30px",
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.05)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-50px",
              left: "40%",
              width: "160px",
              height: "160px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.04)",
            }}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "14px",
                alignItems: "center",
              }}
            >
              {/* Avatar */}
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    background: WOOD,
                    borderRadius: "18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "22px",
                    fontWeight: 800,
                    color: "white",
                    border: "3px solid rgba(255,255,255,0.25)",
                  }}
                >
                  SS
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: "-2px",
                    right: "-2px",
                    background: "#2ED573",
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                    border: `2px solid ${G}`,
                  }}
                />
              </div>

              <div>
                <div
                  style={{
                    color: "darkslategray",
                    fontSize: "18px",
                    fontWeight: 800,
                    lineHeight: "1.2",
                  }}
                >
                  Sofiene Sellami
                </div>
                <div
                  style={{
                    color: "black",
                    fontSize: "13px",
                    marginTop: "1px",
                  }}
                >
                  MPBS Group
                </div>
                {/* Premium badge */}
                <div
                  style={{
                    marginTop: "7px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    background: `linear-gradient(120deg, ${WOOD} 0%, ${WOOD} 100%)`,
                    borderRadius: "20px",
                    padding: "4px 10px",
                  }}
                >
                  <Award size={11} color="white" />
                  <span
                    style={{
                      color: "white",
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.5px",
                    }}
                  >
                    GROUPE CLIENT PREMIUM
                  </span>
                </div>
              </div>
            </div>

            {/* Logout */}
            <button
              style={{
                background: "rgba(255,255,255,0.12)",
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
              <LogOut size={16} color="black" />
            </button>
          </div>

          {/* B2B Info pills */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              marginTop: "14px",
              position: "relative",
            }}
          >
            {[
              { label: "SIRET: 123 456 789 00012" },
              { label: "TVA: FR 12 345678900" },
            ].map((p) => (
              <div
                key={p.label}
                style={{
                  background: "rgba(255,255,255,0.12)",
                  borderRadius: "7px",
                  padding: "4px 9px",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <ShieldCheck size={10} color={WOOD} />
                <span
                  style={{
                    fontSize: "10px",
                    color: "gray",
                    fontWeight: 500,
                  }}
                >
                  {p.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            padding: "14px 14px 0",
          }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              style={{
                flex: 1,
                background: "white",
                borderRadius: "12px",
                padding: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "5px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                border: "1px solid #EAEAEA",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  background: `${s.color}15`,
                  borderRadius: "9px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <s.icon size={15} color={s.color} />
              </div>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 800,
                  color: "#1A2520",
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontSize: "9px",
                  color: "#8A9A8E",
                  fontWeight: 500,
                  textAlign: "center",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Activity chart bar */}
        <div
          style={{
            margin: "12px 14px 0",
            background: "white",
            borderRadius: "14px",
            padding: "14px",
            border: "1px solid #EAEAEA",
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "7px",
              }}
            >
              <BarChart2 size={14} color={WOOD} />
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#1A2520",
                }}
              >
                Activité d'achat — 2025
              </span>
            </div>
            <span
              style={{ fontSize: "11px", color: "#8A9A8E" }}
            >
              Mensuel HT (TND)
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: "4px",
              height: "44px",
            }}
          >
            {[
              35, 58, 42, 75, 90, 65, 80, 100, 70, 88, 95, 60,
            ].map((h, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: `${h}%`,
                  background:
                    i === 8 ? G : i > 8 ? "#F7D8C2" : `${G}4D`,
                  borderRadius: "3px 3px 0 0",
                }}
              />
            ))}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "4px",
            }}
          >
            {[
              "Jan",
              "Fév",
              "Mar",
              "Avr",
              "Mai",
              "Jun",
              "Jul",
              "Aoû",
              "Sep",
              "Oct",
              "Nov",
              "Déc",
            ].map((m, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  textAlign: "center",
                  fontSize: "9px",
                  color: "#A0B0A5",
                }}
              >
                {m}
              </div>
            ))}
          </div>
        </div>

        {/* Menu sections */}
        {menuSections.map((section) => (
          <div
            key={section.title}
            style={{ padding: "14px 14px 0" }}
          >
            <div
              style={{
                fontSize: "10px",
                fontWeight: 700,
                color: "#A0B0A5",
                letterSpacing: "1px",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}
            >
              {section.title}
            </div>
            <div
              style={{
                background: "white",
                borderRadius: "14px",
                overflow: "hidden",
                border: "1px solid #EAEAEA",
                boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
              }}
            >
              {section.items.map((item, idx) => (
                <button
                  key={item.id}
                  onMouseDown={() => setActiveCard(item.id)}
                  onMouseUp={() => setActiveCard(null)}
                  onTouchStart={() => setActiveCard(item.id)}
                  onTouchEnd={() => setActiveCard(null)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "13px 14px",
                    background:
                      activeCard === item.id
                        ? "#FEF1E4"
                        : "white",
                    border: "none",
                    borderBottom:
                      idx < section.items.length - 1
                        ? "1px solid #EAEAEA"
                        : "none",
                    cursor: "pointer",
                    textAlign: "left",
                    fontFamily: "Inter, sans-serif",
                    transition: "background 0.1s",
                  }}
                >
                  {/* Icon */}
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "11px",
                      background: `${item.color}14`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <item.icon size={17} color={item.color} />
                  </div>

                  {/* Label */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "#1A2520",
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#8A9A8E",
                        marginTop: "1px",
                      }}
                    >
                      {item.sub}
                    </div>
                  </div>

                  {/* Right side */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    {item.badge && (
                      <div
                        style={{
                          background: item.badgeColor!,
                          color: "white",
                          fontSize: "10px",
                          fontWeight: 700,
                          padding: "2px 7px",
                          borderRadius: "5px",
                        }}
                      >
                        {item.badge}
                      </div>
                    )}
                    {item.hasDownload && (
                      <Download size={14} color="#8A9A8E" />
                    )}
                    <ChevronRight size={15} color="#C0C8C0" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* ─── SALES REP CARD ─── */}
        <div style={{ padding: "14px" }}>
          <div
            style={{
              fontSize: "10px",
              fontWeight: 700,
              color: "#A0B0A5",
              letterSpacing: "1px",
              textTransform: "uppercase",
              marginBottom: "8px",
            }}
          >
            Votre Chargé de compte dédié
          </div>
          <div
            style={{
              background: "white",
              borderRadius: "16px",
              padding: "16px",
              border: "1px solid #EAEAEA",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "14px",
                alignItems: "center",
              }}
            >
              {/* Sales rep photo */}
              <div
                style={{
                  width: "58px",
                  height: "58px",
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: `2px solid ${G}30`,
                  flexShrink: 0,
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1688241320695-6ca991df8818?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200"
                  alt="Sales Rep"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: 800,
                    color: "#1A2520",
                  }}
                >
                  Pierre Lefebvre
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#7A8A7E",
                    marginTop: "2px",
                  }}
                >
                  Responsable Grands Comptes B2B
                </div>
                {/* Stars / availability */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    marginTop: "5px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "3px",
                      background: "#FEF1E4",
                      padding: "3px 8px",
                      borderRadius: "6px",
                    }}
                  >
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "#FF8848",
                      }}
                    />
                    <span
                      style={{
                        fontSize: "10px",
                        color: "gray",
                        fontWeight: 600,
                      }}
                    >
                      Disponible maintenant
                    </span>
                  </div>
                  <div style={{ display: "flex" }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={10}
                        fill={WOOD}
                        color={WOOD}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Expertise chips */}
            <div
              style={{
                display: "flex",
                gap: "6px",
                flexWrap: "wrap",
              }}
            >
              {[
                "Spécialiste MDF",
                "Grands volumes",
                "Devis sur mesure",
              ].map((chip) => (
                <div
                  key={chip}
                  style={{
                    background: "#FBFBFB",
                    border: "1px solid #EAEAEA",
                    borderRadius: "6px",
                    padding: "3px 9px",
                    fontSize: "10px",
                    color: "#1C0D0A",
                    fontWeight: 600,
                  }}
                >
                  {chip}
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "8px",
              }}
            >
              <a
                href="tel:+33123456789"
                style={{
                  background: `linear-gradient(135deg, ${WOOD} 0%, ${WOOD} 100%)`,
                  color: "white",
                  borderRadius: "12px",
                  padding: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "7px",
                  textDecoration: "none",
                  fontSize: "13px",
                  fontWeight: 700,
                  fontFamily: "Inter, sans-serif",
                  boxShadow:
                    "0 8px 22px rgba(241, 88, 8, 0.25)",
                }}
              >
                <Phone size={15} />
                Appeler
              </a>
              <button
                style={{
                  background: "#FBFBFB",
                  border: `1.5px solid ${G}40`,
                  color: WOOD,
                  borderRadius: "12px",
                  padding: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "7px",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: 700,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                <CircleUser size={15} />
                Message
              </button>
            </div>

            {/* Direct line */}
            <div
              style={{
                background: "#FEF1E4",
                border: "1px solid #F7D8C2",
                borderRadius: "10px",
                padding: "10px 12px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "10px",
                    color: "#A0907A",
                    fontWeight: 600,
                    letterSpacing: "0.5px",
                  }}
                >
                  LIGNE DIRECTE
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#1A2520",
                  }}
                >
                  +33 1 23 45 67 89
                </div>
              </div>
              <div
                style={{ fontSize: "11px", color: "#A0907A" }}
              >
                Lun–Ven · 8h–18h
              </div>
            </div>
          </div>
        </div>

        <div style={{ height: "14px" }} />
      </div>
    </div>
  );
}