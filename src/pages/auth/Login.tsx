import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Eye, EyeOff, Mail, Lock, User, Wrench,
  ChevronRight, AlertCircle, ShieldCheck,
} from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function Login() {
  const navigate = useNavigate();
  const { setRole } = useApp();

  const [tab, setTab] = useState<"client" | "worker">("client");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validate = () => {
    if (!email.trim()) { setError("Ingresa tu correo electrónico."); return false; }
    if (!/\S+@\S+\.\S+/.test(email)) { setError("El correo no es válido."); return false; }
    if (!password.trim()) { setError("Ingresa tu contraseña."); return false; }
    if (password.length < 4) { setError("La contraseña es demasiado corta."); return false; }
    return true;
  };

  const handleLogin = () => {
    if (!validate()) return;
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setRole(tab);
      navigate(tab === "client" ? "/client" : "/worker");
    }, 1200);
  };

  return (
    <div className="min-h-full flex flex-col overflow-hidden" style={{ background: "#f0f4fa" }}>

      {/* ── HERO ─────────────────────────────────────────── */}
      <div
        className="relative flex flex-col items-center justify-center overflow-hidden"
        style={{
          background: "linear-gradient(150deg, var(--grad-from) 0%, var(--color-primary) 45%, var(--color-accent) 80%, #1a6edb 100%)",
          paddingTop: 52,
          paddingBottom: 60,
        }}
      >
        {/* Big ambient circles */}
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%)" }} />
        <div className="absolute -bottom-10 -left-10 w-52 h-52 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(255,200,0,0.08) 0%, transparent 70%)" }} />
        {/* Speed lines left */}
        <div className="absolute left-5 top-1/2 -translate-y-1/2 flex flex-col gap-2 opacity-25">
          {[40, 28, 18].map((w, i) => (
            <div key={i} className="rounded-full" style={{ width: w, height: 2.5, background: "#4d9fff" }} />
          ))}
        </div>
        {/* Speed lines right */}
        <div className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col items-end gap-2 opacity-25">
          {[40, 28, 18].map((w, i) => (
            <div key={i} className="rounded-full" style={{ width: w, height: 2.5, background: "#ffd000" }} />
          ))}
        </div>

        {/* Logo block */}
        <div
          className="animate-[fadeIn_0.7s_ease] flex flex-col items-center"
          style={{ transform: "translateZ(0)" }}
        >
          {/* Logo image on white rounded card */}
          <div
            style={{
              background: "#ffffff",
              borderRadius: 24,
              padding: "14px 24px 10px",
              boxShadow:
                "0 20px 60px rgba(0,0,0,0.30), 0 4px 16px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.9)",
            }}
          >
            <img
              src="/assets/images/Gemini_Generated_Image_5253405253405253.png"
              alt="Servicios Ya!"
              draggable={false}
              style={{
                display: "block",
                width: 192,
                height: "auto",
                objectFit: "contain",
              }}
            />
          </div>

          {/* Trust badges row */}
          <div className="flex items-center gap-4 mt-5">
            {[
              { icon: "⚡", label: "Rápido" },
              { icon: "🔒", label: "Seguro" },
              { icon: "⭐", label: "Confiable" },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-1">
                <span className="text-sm">{icon}</span>
                <span
                  className="font-semibold"
                  style={{ fontSize: 11, color: "rgba(210,230,255,0.85)", letterSpacing: "0.04em" }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FORM CARD ────────────────────────────────────── */}
      <div
        className="flex-1 animate-[slideIn_0.55s_ease]"
        style={{
          background: "#ffffff",
          marginTop: -20,
          borderRadius: "28px 28px 0 0",
          boxShadow: "0 -4px 20px rgba(0,0,0,0.07)",
          padding: "28px 24px 36px",
        }}
      >
        {/* Role selector */}
        <div
          className="flex mb-6"
          style={{ background: "#eef2fa", borderRadius: 18, padding: 4 }}
        >
          {(["client", "worker"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setTab(r)}
              className="flex-1 flex items-center justify-center gap-1.5 font-bold text-sm transition-all duration-200 active:scale-95"
              style={{
                padding: "10px 0",
                borderRadius: 14,
                ...(tab === r
                  ? {
                      background: "#ffffff",
                      color: "#0044cc",
                      boxShadow: "0 2px 10px rgba(0,68,204,0.12)",
                    }
                  : { color: "var(--color-subtext)" }),
              }}
            >
              {r === "client"
                ? <><User style={{ width: 15, height: 15 }} /> Cliente</>
                : <><Wrench style={{ width: 15, height: 15 }} /> Trabajador</>}
            </button>
          ))}
        </div>

        {/* Greeting */}
        <div className="mb-5">
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0d1a3a", lineHeight: 1.2 }}>
            Bienvenido de nuevo
          </h2>
          <p style={{ fontSize: 13, color: "#7a8fa8", marginTop: 4 }}>
            Inicia sesión para acceder a tu cuenta
          </p>
        </div>

        {/* Email field */}
        <div className="mb-4">
          <label
            style={{ fontSize: 11, fontWeight: 700, color: "#8fa0c0", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 6 }}
          >
            Correo electrónico
          </label>
          <div
            className="flex items-center gap-3 transition-all duration-200"
            style={{
              background: "#f5f8ff",
              border: "2px solid #e0e9ff",
              borderRadius: 14,
              padding: "0 16px",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#0044cc")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#e0e9ff")}
          >
            <Mail style={{ width: 16, height: 16, color: "#a0b4d0", flexShrink: 0 }} />
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              placeholder="tucorreo@ejemplo.com"
              style={{
                flex: 1, padding: "14px 0", background: "transparent",
                fontSize: 14, color: "#1a2a4a", border: "none", outline: "none",
              }}
            />
          </div>
        </div>

        {/* Password field */}
        <div className="mb-2">
          <label
            style={{ fontSize: 11, fontWeight: 700, color: "#8fa0c0", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 6 }}
          >
            Contraseña
          </label>
          <div
            className="flex items-center gap-3 transition-all duration-200"
            style={{
              background: "#f5f8ff",
              border: "2px solid #e0e9ff",
              borderRadius: 14,
              padding: "0 16px",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#0044cc")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#e0e9ff")}
          >
            <Lock style={{ width: 16, height: 16, color: "#a0b4d0", flexShrink: 0 }} />
            <input
              type={showPw ? "text" : "password"}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="••••••••"
              style={{
                flex: 1, padding: "14px 0", background: "transparent",
                fontSize: 14, color: "#1a2a4a", border: "none", outline: "none",
              }}
            />
            <button
              onClick={() => setShowPw(!showPw)}
              style={{ color: "#a0b4d0", display: "flex", alignItems: "center" }}
            >
              {showPw ? <EyeOff style={{ width: 16, height: 16 }} /> : <Eye style={{ width: 16, height: 16 }} />}
            </button>
          </div>
        </div>

        {/* Forgot password */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}>
          <button
            onClick={() => navigate("/forgot-password")}
            style={{ fontSize: 12, fontWeight: 700, color: "#0044cc" }}
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        {/* Error */}
        {error && (
          <div
            className="animate-[fadeIn_0.25s_ease] flex items-center gap-2 mb-4"
            style={{
              background: "#fff0f0",
              border: "1px solid #ffc9c9",
              borderRadius: 12,
              padding: "10px 14px",
            }}
          >
            <AlertCircle style={{ width: 15, height: 15, color: "#e03131", flexShrink: 0 }} />
            <p style={{ fontSize: 12, color: "#c92a2a", fontWeight: 500 }}>{error}</p>
          </div>
        )}

        {/* Primary CTA */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 active:scale-95 transition-all duration-150"
          style={{
            padding: "15px 0",
            borderRadius: 16,
            background: loading
              ? "var(--color-accent)"
              : "linear-gradient(135deg, var(--grad-from) 0%, var(--color-primary) 55%, var(--color-accent) 100%)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.22), 0 2px 6px rgba(0,0,0,0.12)",
            color: "#fff",
            fontSize: 15,
            fontWeight: 800,
            letterSpacing: "0.01em",
            border: "none",
            cursor: loading ? "wait" : "pointer",
          }}
        >
          {loading ? (
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="animate-bounce rounded-full bg-white"
                  style={{ width: 8, height: 8, animationDelay: `${i * 0.14}s` }}
                />
              ))}
            </div>
          ) : (
            <>
              Iniciar Sesión
              <ChevronRight style={{ width: 18, height: 18 }} />
            </>
          )}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3" style={{ margin: "20px 0" }}>
          <div style={{ flex: 1, height: 1, background: "#e8eef8" }} />
          <span style={{ fontSize: 11, color: "#b0bdd4", fontWeight: 600 }}>o</span>
          <div style={{ flex: 1, height: 1, background: "#e8eef8" }} />
        </div>

        {/* Register CTA */}
        <button
          onClick={() => navigate("/register")}
          className="w-full active:scale-95 transition-all duration-150"
          style={{
            padding: "14px 0",
            borderRadius: 16,
            background: "#ffffff",
            border: "2px solid #d0dcf5",
            color: "#0044cc",
            fontSize: 14,
            fontWeight: 700,
          }}
        >
          Crear una cuenta nueva
        </button>

        {/* Security note */}
        <div className="flex items-center justify-center gap-1.5" style={{ marginTop: 18 }}>
          <ShieldCheck style={{ width: 13, height: 13, color: "#b0bdd4" }} />
          <span style={{ fontSize: 11, color: "#b0bdd4", fontWeight: 500 }}>
            Conexión segura · Datos protegidos
          </span>
        </div>

        {/* Admin access */}
        <div className="text-center" style={{ marginTop: 14 }}>
          <button
            onClick={() => { setRole("admin"); navigate("/admin"); }}
            style={{ fontSize: 12, color: "#a0b0cc", fontWeight: 500 }}
          >
            ¿Administrador?{" "}
            <span style={{ color: "#0044cc", fontWeight: 700 }}>Acceder al panel</span>
          </button>
        </div>
      </div>
    </div>
  );
}
