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
import mpbsLogo from "../images/mpbs.png";

const THEME = {
  primary: "#f4e9da", // MPBS orange (seen on mpbs.com.tn)
  primary2: "#d47a20",
  ink: "#1C0D0A",
  muted: "#757575",
  surface: "#FFFFFF",
  surface2: "#FBFBFB",
  border: "#EAEAEA",
  soft: "#FEF1E4",
};

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
          color: THEME.muted,
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
          background: THEME.surface,
          border: `1.5px solid ${THEME.border}`,
          borderRadius: "10px",
          padding: "0 14px",
          gap: "10px",
          height: "48px",
        }}
      >
        <Icon size={16} color={THEME.muted} />
        <input
          type={isPassword ? (show ? "text" : "password") : type}
          placeholder={placeholder}
          style={{
            flex: 1,
            background: "none",
            border: "none",
            outline: "none",
            fontSize: "14px",
            color: THEME.ink,
            fontFamily: "Inter, sans-serif",
          }}
        />
        {isPassword && (
          <button
            onClick={() => setShow(!show)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            {show ? (
              <EyeOff size={16} color={THEME.muted} />
            ) : (
              <Eye size={16} color={THEME.muted} />
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
        background: THEME.surface2,
        overflowY: "auto",
      }}
    >
      {/* Header */}
      <div
        style={{
          flexShrink: 0,
          background: `linear-gradient(145deg, ${THEME.primary} 0%, ${THEME.primary2} 100%)`,
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
              width: "45px",
              height: "36px",
              background: "white",
              border: "1px solid rgba(255,255,255,0.25)",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img 
              src={mpbsLogo}
              alt="MPBS Logo" 
              style={{ 
                width: "100%", 
                height: "100%", 
                objectFit: "contain"
              }} 
            />
          </div>
          <div>
            <div style={{ color: "darkslategray", fontSize: "18px", fontWeight: 700, letterSpacing: "-0.3px" }}>
              MPBS B2B
            </div>
            <div style={{ color: "black", fontSize: "11px", letterSpacing: "1px" }}>
              PANNEAUX & SOLUTIONS INTÉRIEUR
            </div>
          </div>
        </div>

        <div style={{ marginTop: "16px", color: "black", fontSize: "13px" }}>
          Portail professionnel pour partenaires & revendeurs
        </div>
        
      </div>

      {/* Tabs */}
      <div
        style={{
          flexShrink:0,
          display: "flex",
          background: THEME.surface,
          margin: "20px 20px 0",
          borderRadius: "12px",
          padding: "4px",
          border: `1px solid ${THEME.border}`,
        }}
      >
        {([["login", "Connexion"], ["register", "Créer un compte"]] as const).map(([t, lbl]) => (
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
              background: tab === t ? THEME.soft : "transparent",
              color: tab === t ? THEME.ink : THEME.muted,
              boxShadow: tab === t ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
            }}
          >
            {lbl}
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
                color: THEME.ink,
                marginBottom: "4px",
              }}
            >
              Bon retour
            </h2>
            <p style={{ fontSize: "13px", color: THEME.muted, marginBottom: "22px" }}>
              Accédez à votre compte professionnel
            </p>

            <InputField icon={Mail} label="E-mail Professionnel" placeholder="nom@societe.fr" type="email" />
            <InputField icon={Lock} label="Mot de passe" placeholder="Saisissez votre mot de passe" type="password" />

            <div style={{ textAlign: "right", marginBottom: "22px", marginTop: "-8px" }}>
              <button
                style={{
                  background: "none",
                  border: "none",
                  color: THEME.primary2,
                  fontSize: "13px",
                  fontWeight: 500,
                  cursor: "pointer",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Mot de passe oublié ?
              </button>
            </div>

            <button
              onClick={() => navigate("/app")}
              style={{
                width: "100%",
                background: `linear-gradient(135deg, ${THEME.primary2} 0%, ${THEME.primary2} 100%)`,
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
                boxShadow: "0 8px 22px rgba(241, 88, 8, 0.25)",
              }}
            >
              Se connecter au portail
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
              <div style={{ flex: 1, height: "1px", background: THEME.border }} />
              <span style={{ fontSize: "12px", color: THEME.muted }}>ou</span>
              <div style={{ flex: 1, height: "1px", background: THEME.border }} />
            </div>

            <button
              onClick={() => setTab("register")}
              style={{
                width: "100%",
                background: "transparent",
                color: THEME.ink,
                border: `2px solid ${THEME.border}`,
                borderRadius: "12px",
                padding: "13px",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Demander un compte Pro
            </button>

            {/* Info note */}
            <div
              style={{
                marginTop: "20px",
                background: THEME.soft,
                border: `1px solid ${THEME.border}`,
                borderRadius: "10px",
                padding: "12px",
                display: "flex",
                gap: "10px",
              }}
            >
              <ShieldCheck size={16} color={THEME.primary2} style={{ flexShrink: 0, marginTop: "1px" }} />
              <p style={{ fontSize: "12px", color: THEME.ink, lineHeight: "1.5", margin: 0 }}>
                Ce portail est réservé aux entreprises enregistrées. Les prix affichés sont{" "}
                <strong>hors TVA (HT)</strong>.
              </p>
            </div>
          </>
        ) : (
          <>
            <h2
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: THEME.ink,
                marginBottom: "4px",
              }}
            >
              Demande de compte Pro
            </h2>
            <p style={{ fontSize: "13px", color: THEME.muted, marginBottom: "18px" }}>
              Remplissez les informations de votre société ci-dessous
            </p>

            {/* Validation info banner */}
            <div
              style={{
                background: THEME.soft,
                border: `1px solid ${THEME.border}`,
                borderLeft: `4px solid ${THEME.primary}`,
                borderRadius: "10px",
                padding: "12px",
                marginBottom: "18px",
                display: "flex",
                gap: "10px",
              }}
            >
              <ShieldCheck size={15} color={THEME.primary2} style={{ flexShrink: 0, marginTop: "1px" }} />
              <p style={{ fontSize: "12px", color: THEME.ink, lineHeight: "1.5", margin: 0 }}>
                <strong>Vérification requise :</strong> Votre compte pro sera validé par notre équipe pour accéder aux prix grossiste et remises sur volume.
              </p>
            </div>

            <InputField icon={Building2} label="Nom de la société" placeholder="Votre Société SAS" />
            <InputField
              icon={Hash}
              label="Numéro SIRET"
              placeholder="000 000 000 00000"
              type="text"
            />
            <InputField
              icon={FileText}
              label="Numéro TVA"
              placeholder="FR 00 000000000"
            />
            <InputField icon={User} label="Nom du contact" placeholder="Prénom et Nom" />
            <InputField
              icon={Mail}
              label="E-mail Professionnel"
              placeholder="nom@societe.fr"
              type="email"
            />
            <InputField icon={Phone} label="Numéro de téléphone" placeholder="+33 6 00 00 00 00" />

            <button
              style={{
                width: "100%",
                background: `linear-gradient(135deg, ${THEME.primary2} 0%, ${THEME.primary2} 100%)`,
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
                boxShadow: "0 8px 22px rgba(241, 88, 8, 0.25)",
                marginTop: "6px",
              }}
            >
              Soumettre la demande de compte
              <ChevronRight size={18} />
            </button>

            <p
              style={{
                textAlign: "center",
                fontSize: "11px",
                color: THEME.muted,
                marginTop: "14px",
              }}
            >
              En soumettant, vous acceptez nos Conditions Générales & Politique de confidentialité
            </p>
          </>
        )}
      </div>
    </div>
  );
}