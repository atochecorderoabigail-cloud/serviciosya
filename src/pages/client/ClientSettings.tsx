import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell, ShieldCheck, Moon, Sun, Globe, Lock, HelpCircle,
  ChevronRight, X, Eye, EyeOff, Check,
  MessageSquare, Mail, Smartphone, Volume2, Palette,
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import PageContainer from "../../components/PageContainer";
import BackHeader from "../../components/BackHeader";
import ThemeSheet from "../../components/ThemeSheet";

type Sheet = "password" | "notifications" | "language" | "theme" | null;

// ── Password sheet ────────────────────────────────────────────────────────────
function PasswordSheet({ onClose }: { onClose: () => void }) {
  const [cur, setCur] = useState(""); const [showCur, setShowCur] = useState(false);
  const [nw, setNw] = useState(""); const [showNw, setShowNw] = useState(false);
  const [conf, setConf] = useState(""); const [showConf, setShowConf] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const handleSave = () => {
    if (!cur || cur.length < 4) { setError("Ingresa tu contraseña actual."); return; }
    if (nw.length < 6) { setError("La nueva contraseña debe tener al menos 6 caracteres."); return; }
    if (nw !== conf) { setError("Las contraseñas no coinciden."); return; }
    setError(""); setSaved(true);
    setTimeout(onClose, 1500);
  };

  const Field = ({ label, val, setVal, show, setShow }: any) => (
    <div className="mb-3">
      <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1.5">{label}</label>
      <div className="flex items-center gap-2 bg-gray-50 border-2 border-gray-100 rounded-xl px-3 focus-within:border-blue-500 focus-within:bg-white transition-all">
        <input type={show ? "text" : "password"} value={val}
          onChange={(e) => { setVal(e.target.value); setError(""); }}
          className="flex-1 py-3 bg-transparent text-sm text-gray-800 focus:outline-none"
          placeholder="••••••" />
        <button type="button" onClick={() => setShow(!show)} className="text-gray-400">
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );

  return (
    <SheetWrapper title="Modificar contraseña" icon={<Lock className="w-5 h-5 text-blue-600" />} onClose={onClose}>
      <Field label="Contraseña actual" val={cur} setVal={setCur} show={showCur} setShow={setShowCur} />
      <Field label="Nueva contraseña" val={nw} setVal={setNw} show={showNw} setShow={setShowNw} />
      <Field label="Confirmar contraseña" val={conf} setVal={setConf} show={showConf} setShow={setShowConf} />
      {error && <p className="text-xs text-red-500 mb-3 px-1">{error}</p>}
      {saved && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-3 py-2.5 mb-3">
          <Check className="w-4 h-4 text-green-600" />
          <p className="text-xs font-bold text-green-700">Contraseña actualizada correctamente</p>
        </div>
      )}
      <button onClick={handleSave}
        className="w-full py-3.5 rounded-xl text-white font-extrabold text-sm mt-1 active:scale-95 transition-all"
        style={{ background: "linear-gradient(135deg, #001f6b, #0044cc)", boxShadow: "0 6px 18px rgba(0,68,204,0.3)" }}>
        Guardar contraseña
      </button>
    </SheetWrapper>
  );
}

// ── Notifications sheet ───────────────────────────────────────────────────────
function NotificationsSheet({ onClose }: { onClose: () => void }) {
  const { notifPrefs, toggleNotifPref } = useApp();
  const items = [
    { key: "push" as const, icon: <Smartphone className="w-4 h-4" />, label: "Notificaciones push", sub: "Alertas en tiempo real" },
    { key: "email" as const, icon: <Mail className="w-4 h-4" />, label: "Correo electrónico", sub: "Notificaciones por email" },
    { key: "sms" as const, icon: <MessageSquare className="w-4 h-4" />, label: "Mensajes SMS", sub: "Alertas por mensaje de texto" },
  ];
  return (
    <SheetWrapper title="Alertas y notificaciones" icon={<Bell className="w-5 h-5 text-blue-600" />} onClose={onClose}>
      <div className="space-y-3 mb-4">
        {items.map((item) => (
          <div key={item.key} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              {item.icon}
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-800">{item.label}</p>
              <p className="text-xs text-gray-500">{item.sub}</p>
            </div>
            <Toggle on={notifPrefs[item.key]} onToggle={() => toggleNotifPref(item.key)} color="#0044cc" />
          </div>
        ))}
      </div>
      <div className="bg-blue-50 rounded-xl px-4 py-3">
        <div className="flex items-center gap-2 mb-1">
          <Volume2 className="w-4 h-4 text-blue-600" />
          <p className="text-xs font-bold text-blue-800">Sonido de notificaciones</p>
        </div>
        <p className="text-xs text-blue-600">Activado · Sonido por defecto</p>
      </div>
    </SheetWrapper>
  );
}

// ── Language sheet ────────────────────────────────────────────────────────────
function LanguageSheet({ onClose }: { onClose: () => void }) {
  const { language, setLanguage } = useApp();
  const langs = [
    { code: "es" as const, name: "Español", flag: "🇵🇪", region: "Latinoamérica" },
    { code: "en" as const, name: "English", flag: "🇺🇸", region: "United States" },
  ];
  return (
    <SheetWrapper title="Cambiar idioma" icon={<Globe className="w-5 h-5 text-blue-600" />} onClose={onClose}>
      <div className="space-y-2">
        {langs.map((l) => (
          <button key={l.code} onClick={() => { setLanguage(l.code); setTimeout(onClose, 400); }}
            className="w-full flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 active:scale-98 transition-all">
            <span className="text-2xl">{l.flag}</span>
            <div className="flex-1 text-left">
              <p className="text-sm font-bold text-gray-800">{l.name}</p>
              <p className="text-xs text-gray-500">{l.region}</p>
            </div>
            {language === l.code && (
              <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                <Check className="w-3.5 h-3.5 text-white" />
              </div>
            )}
          </button>
        ))}
      </div>
    </SheetWrapper>
  );
}

// ── Generic sheet wrapper ─────────────────────────────────────────────────────
function SheetWrapper({ title, icon, onClose, children }: {
  title: string; icon: React.ReactNode; onClose: () => void; children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ maxWidth: 440, left: "50%", transform: "translateX(-50%)" }}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full bg-white rounded-t-3xl px-5 pt-5 pb-8 max-h-[85vh] overflow-y-auto animate-[slideIn_0.35s_ease]">
        <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4" />
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">{icon}</div>
            <h3 className="text-base font-extrabold text-gray-800">{title}</h3>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center active:scale-90">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Toggle({ on, onToggle, color = "#0044cc" }: { on: boolean; onToggle: () => void; color?: string }) {
  return (
    <button onClick={onToggle}
      className="relative w-12 h-6 rounded-full transition-colors duration-200 flex-shrink-0"
      style={{ background: on ? color : "#e5e7eb" }}>
      <span className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200"
        style={{ left: on ? "26px" : "2px" }} />
    </button>
  );
}

// ── Main settings page ────────────────────────────────────────────────────────
export default function ClientSettings() {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useApp();
  const [sheet, setSheet] = useState<Sheet>(null);

  const sections = [
    {
      title: "Cuenta y seguridad",
      items: [
        {
          icon: <Lock className="w-4 h-4" />, label: "Modificar contraseña",
          sub: "Cambia tu contraseña de acceso", color: "#dc2626",
          action: () => setSheet("password"),
        },
        {
          icon: <ShieldCheck className="w-4 h-4" />, label: "Privacidad",
          sub: "Controla tu información visible", color: "#0891b2",
          action: () => navigate("/client/privacy"),
        },
      ],
    },
    {
      title: "Preferencias",
      items: [
        {
          icon: <Bell className="w-4 h-4" />, label: "Alertas y notificaciones",
          sub: "Push, email y SMS", color: "#2563eb",
          action: () => setSheet("notifications"),
        },
        {
          icon: <Palette className="w-4 h-4" />,
          label: "Color del tema",
          sub: "Personaliza los colores de la app",
          color: "var(--color-primary)",
          action: () => setSheet("theme"),
        },
        {
          icon: darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />,
          label: "Modo oscuro",
          sub: darkMode ? "Actualmente: Oscuro" : "Actualmente: Claro",
          color: "#d97706",
          action: toggleDarkMode,
          toggle: true,
        },
        {
          icon: <Globe className="w-4 h-4" />, label: "Idioma",
          sub: "Español (Latinoamérica)", color: "#7c3aed",
          action: () => setSheet("language"),
        },
      ],
    },
    {
      title: "Soporte",
      items: [
        {
          icon: <HelpCircle className="w-4 h-4" />, label: "Centro de ayuda",
          sub: "Preguntas frecuentes y soporte", color: "#059669",
          action: () => {},
        },
        {
          icon: <MessageSquare className="w-4 h-4" />, label: "Contactar soporte",
          sub: "Escríbenos por chat", color: "#0284c7",
          action: () => {},
        },
      ],
    },
  ];

  return (
    <PageContainer>
      <BackHeader title="Configuración" />

      <div className="px-4 py-4 space-y-5">
        {sections.map((sec) => (
          <section key={sec.title}>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1 mb-2">
              {sec.title}
            </p>
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              {sec.items.map((item, i) => (
                <button key={i} onClick={item.action}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 active:bg-gray-50 transition-colors ${i < sec.items.length - 1 ? "border-b border-gray-100" : ""}`}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: item.color + "18", color: item.color }}>
                    {item.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-bold text-gray-800">{item.label}</p>
                    <p className="text-xs text-gray-500">{item.sub}</p>
                  </div>
                  {(item as any).toggle
                    ? <Toggle on={darkMode} onToggle={toggleDarkMode} color="#d97706" />
                    : <ChevronRight className="w-4 h-4 text-gray-300" />}
                </button>
              ))}
            </div>
          </section>
        ))}

        {/* App info */}
        <div className="text-center py-4">
          <p className="text-xs font-bold text-gray-400">Servicios Ya! · v1.0.0</p>
          <p className="text-[10px] text-gray-300 mt-0.5">© 2026 Todos los derechos reservados</p>
        </div>
      </div>

      {sheet === "password" && <PasswordSheet onClose={() => setSheet(null)} />}
      {sheet === "notifications" && <NotificationsSheet onClose={() => setSheet(null)} />}
      {sheet === "language" && <LanguageSheet onClose={() => setSheet(null)} />}
      {sheet === "theme" && <ThemeSheet onClose={() => setSheet(null)} />}
    </PageContainer>
  );
}
