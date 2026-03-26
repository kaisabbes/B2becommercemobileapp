import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  Building2,
  Hash,
  FileText,
  User,
  Phone,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

const G = "#1C5C38"; // Forest Green
const WOOD = "#A97C50"; // Wood accent

function InputField({
  icon: Icon,
  label,
  type = "text",
  placeholder,
  suffix,
}: {
  icon: React.ElementType;
  label: string;
  type?: string;
  placeholder: string;
  suffix?: React.ReactNode;
}) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <div style={{ marginBottom: "14px" }}>
      <label
        style={{
          fontSize: "11px",
          fontWeight: 600,
          color: "#5A6A5E",
          letterSpacing: "0.8px",
          textTransform: "uppercase",
          display: "block",
          marginBottom: "5px",
        }}
      >
        {label}
      </label>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          background: "#F4F7F5",
          border: "1.5px solid #E0EAE3",
          borderRadius: "10px",
          padding: "0 14px",
          gap: "10px",
          height: "48px",
        }}
      >
        <Icon size={16} color="#8FAA94" />
        <input
          type={isPassword ? (show ? "text" : "password") : type}
          placeholder={placeholder}
          style={{
            flex: 1,
            background: "none",
            border: "none",
            outline: "none",
            fontSize: "14px",
            color: "#1A2520",
            fontFamily: "Inter, sans-serif",
          }}
        />
        {isPassword && (
          <button
            onClick={() => setShow(!show)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            {show ? (
              <EyeOff size={16} color="#8FAA94" />
            ) : (
              <Eye size={16} color="#8FAA94" />
            )}
          </button>
        )}
        {suffix}
      </div>
    </div>
  );
}

export function LoginScreen() {
  const [tab, setTab] = useState<"login" | "register">("login");
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "white",
        overflowY: "auto",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: `linear-gradient(145deg, ${G} 0%, #143D28 100%)`,
          padding: "32px 24px 28px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: "-40px",
            right: "-40px",
            width: "140px",
            height: "140px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-20px",
            left: "-20px",
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.04)",
          }}
        />

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              background: WOOD,
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="6" width="20" height="3" rx="1" fill="white" />
              <rect x="2" y="11" width="20" height="3" rx="1" fill="rgba(255,255,255,0.7)" />
              <rect x="2" y="16" width="20" height="3" rx="1" fill="rgba(255,255,255,0.5)" />
            </svg>
          </div>
          <div>
            <div style={{ color: "white", fontSize: "18px", fontWeight: 700, letterSpacing: "-0.3px" }}>
              PanelPro B2B
            </div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "11px", letterSpacing: "1px" }}>
              WOOD PANEL WHOLESALE
            </div>
          </div>
        </div>

        <div style={{ marginTop: "16px", color: "rgba(255,255,255,0.8)", fontSize: "13px" }}>
          Professional portal for construction pros & wholesalers
        </div>

        {/* Secure badge */}
        <div
          style={{
            marginTop: "14px",
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            background: "rgba(255,255,255,0.12)",
            borderRadius: "20px",
            padding: "4px 10px",
          }}
        >
          <ShieldCheck size={12} color="rgba(255,255,255,0.9)" />
          <span style={{ color: "rgba(255,255,255,0.9)", fontSize: "11px", fontWeight: 500 }}>
            Secure SSL Connection
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          background: "#F4F7F5",
          margin: "20px 20px 0",
          borderRadius: "12px",
          padding: "4px",
        }}
      >
        {(["login", "register"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "9px",
              border: "none",
              cursor: "pointer",
              fontFamily: "Inter, sans-serif",
              fontSize: "13px",
              fontWeight: 600,
              transition: "all 0.2s",
              background: tab === t ? "white" : "transparent",
              color: tab === t ? G : "#8A9A8E",
              boxShadow: tab === t ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
            }}
          >
            {t === "login" ? "Sign In" : "Create Account"}
          </button>
        ))}
      </div>

      {/* Form area */}
      <div style={{ padding: "20px 20px 24px", flex: 1 }}>
        {tab === "login" ? (
          <>
            <h2
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#1A2520",
                marginBottom: "4px",
              }}
            >
              Welcome back
            </h2>
            <p style={{ fontSize: "13px", color: "#7A8A7E", marginBottom: "22px" }}>
              Access your professional account
            </p>

            <InputField icon={Mail} label="Professional Email" placeholder="name@company.fr" type="email" />
            <InputField icon={Lock} label="Password" placeholder="Enter your password" type="password" />

            <div style={{ textAlign: "right", marginBottom: "22px", marginTop: "-8px" }}>
              <button
                style={{
                  background: "none",
                  border: "none",
                  color: G,
                  fontSize: "13px",
                  fontWeight: 500,
                  cursor: "pointer",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Forgot password?
              </button>
            </div>

            <button
              onClick={() => navigate("/app")}
              style={{
                width: "100%",
                background: `linear-gradient(135deg, ${G} 0%, #143D28 100%)`,
                color: "white",
                border: "none",
                borderRadius: "12px",
                padding: "15px",
                fontSize: "15px",
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "Inter, sans-serif",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                boxShadow: "0 4px 16px rgba(28,92,56,0.35)",
              }}
            >
              Sign In to Portal
              <ChevronRight size={18} />
            </button>

            {/* Divider */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                margin: "20px 0",
              }}
            >
              <div style={{ flex: 1, height: "1px", background: "#E8EDE8" }} />
              <span style={{ fontSize: "12px", color: "#A0B0A5" }}>or</span>
              <div style={{ flex: 1, height: "1px", background: "#E8EDE8" }} />
            </div>

            <button
              onClick={() => setTab("register")}
              style={{
                width: "100%",
                background: "transparent",
                color: G,
                border: `2px solid ${G}`,
                borderRadius: "12px",
                padding: "13px",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Request a Pro Account
            </button>

            {/* Info note */}
            <div
              style={{
                marginTop: "20px",
                background: "#F0F7F3",
                border: "1px solid #C8DFD0",
                borderRadius: "10px",
                padding: "12px",
                display: "flex",
                gap: "10px",
              }}
            >
              <ShieldCheck size={16} color={G} style={{ flexShrink: 0, marginTop: "1px" }} />
              <p style={{ fontSize: "12px", color: "#4A6A54", lineHeight: "1.5", margin: 0 }}>
                This portal is reserved for registered businesses. Prices shown are{" "}
                <strong>excluding VAT (HT)</strong>.
              </p>
            </div>
          </>
        ) : (
          <>
            <h2
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#1A2520",
                marginBottom: "4px",
              }}
            >
              Pro Account Request
            </h2>
            <p style={{ fontSize: "13px", color: "#7A8A7E", marginBottom: "18px" }}>
              Fill in your company details below
            </p>

            {/* Validation info banner */}
            <div
              style={{
                background: "#FFF8F0",
                border: "1px solid #F0D4A8",
                borderLeft: `4px solid ${WOOD}`,
                borderRadius: "10px",
                padding: "12px",
                marginBottom: "18px",
                display: "flex",
                gap: "10px",
              }}
            >
              <ShieldCheck size={15} color={WOOD} style={{ flexShrink: 0, marginTop: "1px" }} />
              <p style={{ fontSize: "12px", color: "#7A5A30", lineHeight: "1.5", margin: 0 }}>
                <strong>Verification required:</strong> Your pro account will be validated by our team to access wholesale prices and volume discounts.
              </p>
            </div>

            <InputField icon={Building2} label="Company Name" placeholder="Your Company SAS" />
            <InputField
              icon={Hash}
              label="SIRET Number"
              placeholder="000 000 000 00000"
              type="text"
            />
            <InputField
              icon={FileText}
              label="VAT Number (TVA)"
              placeholder="FR 00 000000000"
            />
            <InputField icon={User} label="Contact Name" placeholder="First and Last Name" />
            <InputField
              icon={Mail}
              label="Professional Email"
              placeholder="name@company.fr"
              type="email"
            />
            <InputField icon={Phone} label="Phone Number" placeholder="+33 6 00 00 00 00" />

            <button
              style={{
                width: "100%",
                background: `linear-gradient(135deg, ${G} 0%, #143D28 100%)`,
                color: "white",
                border: "none",
                borderRadius: "12px",
                padding: "15px",
                fontSize: "15px",
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "Inter, sans-serif",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                boxShadow: "0 4px 16px rgba(28,92,56,0.35)",
                marginTop: "6px",
              }}
            >
              Submit Account Request
              <ChevronRight size={18} />
            </button>

            <p
              style={{
                textAlign: "center",
                fontSize: "11px",
                color: "#A0B0A5",
                marginTop: "14px",
              }}
            >
              By submitting, you agree to our Terms of Service & Privacy Policy
            </p>
          </>
        )}
      </div>
    </div>
  );
}
