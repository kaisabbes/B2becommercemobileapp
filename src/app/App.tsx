import { RouterProvider } from "react-router";
import { router } from "./routes";

export default function App() {
  return (
    <div
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="min-h-screen bg-[#EAEEF0] flex items-center justify-center"
    >
      {/* Mobile phone frame */}
      <div
        className="relative bg-white overflow-hidden shadow-2xl"
        style={{
          width: "390px",
          height: "844px",
          borderRadius: "44px",
          border: "10px solid #1A2520",
          boxShadow: "0 40px 80px rgba(0,0,0,0.35), inset 0 0 0 2px #2D3A35",
        }}
      >
        {/* Status bar */}
        <div
          className="flex items-center justify-between px-6 pt-3 pb-1"
          style={{ background: "#ed793d", color: "white" }}
        >
          <span style={{ fontSize: "12px", fontWeight: 600 }}>9:41</span>
          <div
            style={{
              width: "120px",
              height: "28px",
              background: "#1A2520",
              borderRadius: "14px",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              top: "0",
            }}
          />
          <div className="flex items-center gap-1">
            <svg width="16" height="12" viewBox="0 0 16 12" fill="white">
              <rect x="0" y="4" width="3" height="8" rx="1" />
              <rect x="4.5" y="2.5" width="3" height="9.5" rx="1" />
              <rect x="9" y="1" width="3" height="11" rx="1" />
              <rect x="13.5" y="0" width="2.5" height="12" rx="1" />
            </svg>
            <svg width="16" height="12" viewBox="0 0 24 18" fill="white">
              <path d="M12 4.5C9.2 4.5 6.7 5.6 4.8 7.4L3 5.6C5.4 3.4 8.5 2 12 2s6.6 1.4 9 3.6L19.2 7.4C17.3 5.6 14.8 4.5 12 4.5z" />
              <path d="M12 9.5c-1.7 0-3.2.7-4.3 1.8L6 9.5C7.5 8.1 9.7 7.2 12 7.2s4.5.9 6 2.3l-1.7 1.8C15.2 10.2 13.7 9.5 12 9.5z" />
              <circle cx="12" cy="15" r="2" />
            </svg>
            <div className="flex items-center gap-0.5">
              <div
                style={{
                  width: "22px",
                  height: "11px",
                  border: "1.5px solid rgba(255,255,255,0.5)",
                  borderRadius: "2px",
                  padding: "1px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "70%",
                    height: "100%",
                    background: "white",
                    borderRadius: "1px",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* App content */}
        <div
          className="overflow-hidden"
          style={{ height: "calc(844px - 10px - 10px - 36px)" }}
        >
          <RouterProvider router={router} />
        </div>
      </div>
    </div>
  );
}
