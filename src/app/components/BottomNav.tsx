import { useNavigate, useLocation } from "react-router";
import { Home, BookOpen, ShoppingCart, User } from "lucide-react";

const navItems = [
  { label: "Home", icon: Home, path: "/app" },
  { label: "Catalog", icon: BookOpen, path: "/app/catalog" },
  { label: "Cart", icon: ShoppingCart, path: "/app/cart", badge: 3 },
  { label: "Profile", icon: User, path: "/app/profile" },
];

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/app" && location.pathname === "/app") return true;
    if (path !== "/app" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div
      style={{
        background: "#FFFFFF",
        borderTop: "1px solid #E8EDE8",
        height: "72px",
        display: "flex",
        alignItems: "center",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.08)",
      }}
    >
      {navItems.map((item) => {
        const active = isActive(item.path);
        const Icon = item.icon;
        return (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "3px",
              background: "none",
              border: "none",
              cursor: "pointer",
              position: "relative",
              paddingBottom: "8px",
            }}
          >
            {/* Active indicator */}
            {active && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "32px",
                  height: "3px",
                  background: "#1C5C38",
                  borderRadius: "0 0 3px 3px",
                }}
              />
            )}
            <div style={{ position: "relative" }}>
              <Icon
                size={22}
                color={active ? "#1C5C38" : "#8A9A8E"}
                strokeWidth={active ? 2.5 : 1.8}
              />
              {item.badge && (
                <div
                  style={{
                    position: "absolute",
                    top: "-6px",
                    right: "-8px",
                    background: "#C44B1B",
                    color: "white",
                    borderRadius: "10px",
                    width: "18px",
                    height: "18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "10px",
                    fontWeight: 700,
                  }}
                >
                  {item.badge}
                </div>
              )}
            </div>
            <span
              style={{
                fontSize: "10px",
                fontWeight: active ? 600 : 400,
                color: active ? "#1C5C38" : "#8A9A8E",
                letterSpacing: "0.2px",
              }}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
