import { Check, X, Palette } from "lucide-react";
import { useApp, ThemeColor } from "../context/AppContext";

const THEMES: { id: ThemeColor; label: string; from: string; to: string; preview: string }[] = [
  { id: "blue",   label: "Azul",     from: "#001f6b", to: "#2563eb", preview: "#2563eb" },
  { id: "green",  label: "Verde",    from: "#0f2a0a", to: "#16a34a", preview: "#16a34a" },
  { id: "violet", label: "Violeta",  from: "#2e1065", to: "#7c3aed", preview: "#7c3aed" },
  { id: "rose",   label: "Rosa",     from: "#4c0519", to: "#e11d48", preview: "#e11d48" },
  { id: "orange", label: "Naranja",  from: "#431407", to: "#ea580c", preview: "#ea580c" },
  { id: "teal",   label: "Turquesa", from: "#042f2e", to: "#0d9488", preview: "#0d9488" },
  { id: "amber",  label: "Ámbar",    from: "#451a03", to: "#d97706", preview: "#d97706" },
  { id: "slate",  label: "Gris",     from: "#0f172a", to: "#475569", preview: "#475569" },
];

interface Props {
  onClose: () => void;
}

export default function ThemeSheet({ onClose }: Props) {
  const { themeColor, setThemeColor, darkMode, toggleDarkMode } = useApp();

  const active = THEMES.find((t) => t.id === themeColor)!;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ maxWidth: 440, left: "50%", transform: "translateX(-50%)" }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full bg-white rounded-t-3xl px-5 pt-5 pb-8 animate-[slideInUp_0.32s_cubic-bezier(0.32,0.72,0,1)]">
        <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4" />

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${active.from}, ${active.to})` }}>
              <Palette className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-gray-800">Tema de color</h3>
              <p className="text-xs text-gray-500">Activo: {active.label}</p>
            </div>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center active:scale-90">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Live preview bar */}
        <div className="h-2.5 w-full rounded-full mb-5 transition-all duration-300"
          style={{ background: `linear-gradient(90deg, ${active.from}, ${active.to})` }} />

        {/* Color grid */}
        <div className="grid grid-cols-4 gap-3 mb-5">
          {THEMES.map((t) => {
            const isActive = themeColor === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setThemeColor(t.id)}
                className="flex flex-col items-center gap-2 active:scale-90 transition-all duration-150"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md transition-all duration-200"
                  style={{
                    background: `linear-gradient(135deg, ${t.from}, ${t.to})`,
                    transform: isActive ? "scale(1.08)" : "scale(1)",
                    boxShadow: isActive
                      ? `0 6px 20px ${t.preview}55`
                      : "0 2px 8px rgba(0,0,0,0.12)",
                    outline: isActive ? `3px solid ${t.preview}` : "3px solid transparent",
                    outlineOffset: 2,
                  }}
                >
                  {isActive && <Check className="w-5 h-5 text-white" strokeWidth={3} />}
                </div>
                <span className="text-[11px] font-semibold text-gray-600">{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dark mode row */}
        <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 mb-4">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: darkMode ? "#1e293b" : "#fef3c7", color: darkMode ? "#e2e8f0" : "#d97706" }}>
            {darkMode
              ? <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
              : <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" /></svg>
            }
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-gray-800">Modo oscuro</p>
            <p className="text-xs text-gray-500">{darkMode ? "Activado" : "Desactivado"}</p>
          </div>
          <button
            onClick={toggleDarkMode}
            className="relative w-12 h-6 rounded-full transition-colors duration-200 flex-shrink-0"
            style={{ background: darkMode ? active.to : "#e5e7eb" }}
          >
            <span
              className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200"
              style={{ left: darkMode ? "26px" : "2px" }}
            />
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-2xl text-white font-extrabold text-sm active:scale-95 transition-all"
          style={{ background: `linear-gradient(135deg, ${active.from}, ${active.to})`, boxShadow: `0 6px 20px ${active.preview}44` }}
        >
          Aplicar tema
        </button>
      </div>
    </div>
  );
}
