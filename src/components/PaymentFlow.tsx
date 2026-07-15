import { useState, useEffect } from "react";
import {
  CheckCircle, X, Shield, Smartphone, ArrowLeft,
  Copy, Check, Wifi, Share2, QrCode, Star
} from "lucide-react";

type PayStep = "select" | "pin" | "linking" | "receipt";

export interface PaymentFlowProps {
  amount: string;
  workerName: string;
  workerAvatar: string;
  specialty: string;
  requestId: number;
  onSuccess: (method: string) => void;
  onClose: () => void;
  initialMethod?: "Yape" | "Plin";
}

const YAPE = { name: "Yape", primary: "#6c19ff", secondary: "#8b35ff", light: "#f3eeff", emoji: "💜" };
const PLIN = { name: "Plin", primary: "#00b259", secondary: "#009e4f", light: "#e8f9f0", emoji: "💚" };

type Cfg = typeof YAPE;

function gradient(cfg: Cfg) {
  return `linear-gradient(135deg, ${cfg.primary}, ${cfg.secondary})`;
}

export default function PaymentFlow({
  amount, workerName, workerAvatar, specialty, onSuccess, onClose, initialMethod,
}: PaymentFlowProps) {
  const [step, setStep] = useState<PayStep>(initialMethod ? "pin" : "select");
  const [method, setMethod] = useState<"Yape" | "Plin" | null>(initialMethod ?? null);
  const [pin, setPin] = useState(["", "", "", "", "", ""]);
  const [pinError, setPinError] = useState(false);
  const [progress, setProgress] = useState(0);
  const [linkDone, setLinkDone] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [opCode] = useState(() => {
    const n = Math.floor(Math.random() * 9000000) + 1000000;
    return String(n);
  });

  const cfg: Cfg = method === "Yape" ? YAPE : PLIN;

  const now = new Date();
  const dateStr = now.toLocaleDateString("es-PE", { day: "2-digit", month: "short", year: "numeric" });
  const timeStr = now.toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" });

  // Linking animation
  useEffect(() => {
    if (step !== "linking") return;
    let p = 0;
    const iv = setInterval(() => {
      p += 2;
      setProgress(Math.min(p, 100));
      if (p >= 100) {
        clearInterval(iv);
        setTimeout(() => { setLinkDone(true); setTimeout(() => setStep("receipt"), 700); }, 350);
      }
    }, 45);
    return () => clearInterval(iv);
  }, [step]);

  const changePinDigit = (val: string, i: number) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...pin]; next[i] = val.slice(-1); setPin(next);
    if (val && i < 5) document.getElementById(`pp-${i + 1}`)?.focus();
  };
  const pinKeyDown = (e: React.KeyboardEvent, i: number) => {
    if (e.key === "Backspace" && !pin[i] && i > 0) document.getElementById(`pp-${i - 1}`)?.focus();
  };
  const confirmPin = () => {
    if (pin.some((d) => !d)) { setPinError(true); return; }
    setPinError(false); setStep("linking");
  };

  // ─── SELECT ───────────────────────────────────────────────
  if (step === "select") return (
    <div className="animate-[fadeIn_0.3s_ease]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-extrabold text-gray-800">Pagar Servicio</h3>
        <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center active:scale-90">
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* Amount hero */}
      <div className="rounded-2xl p-4 mb-5 text-center text-white relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #003087, #0057b8)" }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 80% 20%, #fff 0%, transparent 50%)" }} />
        <p className="text-xs font-semibold opacity-80 mb-1">Total a pagar</p>
        <p className="text-4xl font-black tracking-tight">{amount}</p>
        <p className="text-xs opacity-70 mt-1.5">{workerName} · {specialty}</p>
      </div>

      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Método de pago</p>

      <div className="space-y-2.5 mb-4">
        {/* Yape */}
        <button onClick={() => { setMethod("Yape"); setStep("pin"); }}
          className="w-full flex items-center gap-3 p-4 rounded-2xl border-2 border-[#e8d9ff] active:scale-98 transition-all"
          style={{ background: "#f8f2ff" }}>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-md"
            style={{ background: gradient(YAPE), boxShadow: `0 4px 14px ${YAPE.primary}50` }}>
            <span className="text-2xl">💜</span>
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-extrabold" style={{ color: YAPE.primary }}>Yape</p>
            <p className="text-xs text-gray-500">Pago con PIN de Yape</p>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>

        {/* Plin */}
        <button onClick={() => { setMethod("Plin"); setStep("pin"); }}
          className="w-full flex items-center gap-3 p-4 rounded-2xl border-2 border-[#c8f0db] active:scale-98 transition-all"
          style={{ background: "#f0fdf6" }}>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-md"
            style={{ background: gradient(PLIN), boxShadow: `0 4px 14px ${PLIN.primary}50` }}>
            <span className="text-2xl">💚</span>
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-extrabold" style={{ color: PLIN.primary }}>Plin</p>
            <p className="text-xs text-gray-500">Pago con PIN de Plin</p>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>

        {/* Tarjeta */}
        <button onClick={() => onSuccess("Tarjeta")}
          className="w-full flex items-center gap-3 p-4 rounded-2xl border-2 border-blue-100 bg-blue-50 active:scale-98 transition-all">
          <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-xl shadow-md shadow-blue-500/30">💳</div>
          <div className="flex-1 text-left">
            <p className="text-sm font-extrabold text-blue-700">Tarjeta</p>
            <p className="text-xs text-gray-500">Crédito o débito</p>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>

        {/* Efectivo */}
        <button onClick={() => onSuccess("Efectivo")}
          className="w-full flex items-center gap-3 p-4 rounded-2xl border-2 border-orange-100 bg-orange-50 active:scale-98 transition-all">
          <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center text-xl shadow-md shadow-orange-500/30">💵</div>
          <div className="flex-1 text-left">
            <p className="text-sm font-extrabold text-orange-700">Efectivo</p>
            <p className="text-xs text-gray-500">Pago al momento del servicio</p>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <p className="text-[10px] text-gray-400 text-center">Simulación · Ninguna transacción real será procesada</p>
    </div>
  );

  // ─── PIN ──────────────────────────────────────────────────
  if (step === "pin") return (
    <div className="animate-[fadeIn_0.3s_ease]">
      {/* Branded header */}
      <div className="rounded-2xl p-4 mb-4 relative overflow-hidden text-center"
        style={{ background: gradient(cfg) }}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, #fff, transparent 60%)" }} />
        <span className="text-3xl block mb-1">{cfg.emoji}</span>
        <p className="text-white font-black text-lg">{cfg.name}</p>
        <p className="text-white/70 text-[10px] font-medium">Pago seguro con Servicios Ya</p>
      </div>

      <button onClick={() => setStep("select")} className="flex items-center gap-1 text-xs text-gray-500 mb-5 active:scale-95">
        <ArrowLeft className="w-3.5 h-3.5" /> Cambiar método
      </button>

      {/* Recipient */}
      <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 mb-5">
        <img src={workerAvatar} alt={workerName} className="w-10 h-10 rounded-full object-cover" />
        <div className="flex-1">
          <p className="text-sm font-bold text-gray-800">{workerName}</p>
          <p className="text-xs text-gray-500">{specialty}</p>
        </div>
        <p className="text-base font-extrabold text-gray-800">{amount}</p>
      </div>

      <div className="flex items-center gap-2 mb-1">
        <Shield className="w-5 h-5" style={{ color: cfg.primary }} />
        <h3 className="text-sm font-extrabold text-gray-800">Clave de seguridad</h3>
      </div>
      <p className="text-xs text-gray-500 mb-4">Ingresa tu PIN de {cfg.name} para autorizar el pago</p>

      {/* PIN boxes */}
      <div className="flex justify-center gap-2.5 mb-3">
        {pin.map((d, i) => (
          <input key={i} id={`pp-${i}`} type="password" inputMode="numeric" maxLength={1} value={d}
            onChange={(e) => changePinDigit(e.target.value, i)} onKeyDown={(e) => pinKeyDown(e, i)}
            className={`w-11 h-12 rounded-xl text-center text-xl font-black border-2 bg-white focus:outline-none transition-all shadow-sm ${
              pinError ? "border-red-400" : d ? "text-gray-800" : "border-gray-200 text-gray-400"
            }`}
            style={d ? { borderColor: cfg.primary } : {}} />
        ))}
      </div>

      {pinError && <p className="text-xs text-red-500 text-center mb-3">Ingresa los 6 dígitos del PIN</p>}

      <button onClick={confirmPin}
        className="w-full py-3.5 rounded-xl text-white font-extrabold text-sm active:scale-95 transition-all mt-2"
        style={{ background: gradient(cfg), boxShadow: `0 8px 20px ${cfg.primary}40` }}>
        Autorizar Pago
      </button>
      <p className="text-[10px] text-gray-400 text-center mt-2">Tu PIN nunca es compartido con terceros</p>
    </div>
  );

  // ─── LINKING ─────────────────────────────────────────────
  if (step === "linking") return (
    <div className="flex flex-col items-center py-2 animate-[fadeIn_0.3s_ease]">
      <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mb-4"
        style={{ background: gradient(cfg), boxShadow: `0 16px 40px ${cfg.primary}40` }}>
        {cfg.emoji}
      </div>
      <h3 className="text-base font-extrabold text-gray-800 mb-1">
        {linkDone ? `¡Vinculado con ${cfg.name}!` : `Conectando con ${cfg.name}...`}
      </h3>
      <p className="text-xs text-gray-500 mb-6 text-center px-4">
        {linkDone ? "Pago procesado de forma segura" : "Verificando identidad y autorizando pago"}
      </p>

      <div className="w-full bg-gray-100 rounded-full h-2.5 mb-2 overflow-hidden">
        <div className="h-full rounded-full transition-all duration-75"
          style={{ width: `${progress}%`, background: gradient(cfg) }} />
      </div>
      <p className="text-xs font-bold mb-5" style={{ color: cfg.primary }}>{progress}%</p>

      <div className="w-full space-y-2.5 px-1">
        {[
          { label: "Verificando identidad", done: progress >= 33 },
          { label: "Autorizando transacción", done: progress >= 66 },
          { label: "Confirmando pago", done: progress >= 100 },
        ].map((s, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${s.done ? "bg-green-500" : "bg-gray-200"}`}>
              {s.done ? <Check className="w-3 h-3 text-white" /> : <Wifi className={`w-3 h-3 text-gray-400 ${progress > i * 33 && !s.done ? "animate-pulse" : ""}`} />}
            </div>
            <span className={`text-xs ${s.done ? "font-bold text-gray-700" : "text-gray-400"}`}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );

  // ─── RECEIPT ─────────────────────────────────────────────
  if (step === "receipt") return (
    <div className="animate-[scaleIn_0.4s_ease]">
      {/* Success header */}
      <div className="rounded-2xl p-5 mb-3 relative overflow-hidden text-white text-center"
        style={{ background: gradient(cfg) }}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 50% 0%, #fff, transparent 70%)" }} />
        {/* Confetti dots */}
        {["#FFD700","#FF6B6B","#4ECDC4","#FF9F43","#fff"].map((c, i) => (
          <div key={i} className="absolute w-2 h-2 rounded-full opacity-80 animate-bounce"
            style={{ background: c, top: `${10 + i * 12}%`, left: `${8 + i * 18}%`, animationDelay: `${i * 0.2}s` }} />
        ))}
        <div className="relative">
          <div className="w-14 h-14 bg-white/25 rounded-full flex items-center justify-center mx-auto mb-2">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <p className="text-lg font-extrabold">¡{cfg.emoji}asteaste el servicio!</p>
          <p className="text-3xl font-black mt-1">{amount}</p>
          <p className="text-[11px] opacity-75 mt-1">{workerName}</p>
        </div>
        {/* Share star button */}
        <button onClick={() => { setShared(true); setTimeout(() => setShared(false), 2000); }}
          className="absolute top-3 right-3 flex items-center gap-1 bg-white/20 rounded-full px-2.5 py-1 text-[10px] font-bold text-white active:scale-95">
          <Star className="w-3 h-3" /> COMPARTIR
        </button>
      </div>

      {/* Receipt card */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-3" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
        {/* Torn edge top */}
        <div className="flex items-center px-4 py-2.5 border-b border-dashed border-gray-200 bg-gray-50">
          <p className="flex-1 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">
            Constancia de Pago
          </p>
          <div className="flex items-center gap-0.5">
            {[1,2,3,4,5].map((i) => <div key={i} className="w-1 h-1 rounded-full" style={{ background: cfg.primary }} />)}
          </div>
        </div>

        <div className="px-4 py-3 space-y-2.5">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400 font-medium">Fecha</span>
            <span className="text-xs font-bold text-gray-700">{dateStr}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400 font-medium">Hora</span>
            <span className="text-xs font-bold text-gray-700">{timeStr}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400 font-medium">Servicio</span>
            <span className="text-xs font-bold text-gray-700">{specialty}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400 font-medium">Código de cliente</span>
            <span className="text-xs font-bold text-gray-700">SY{opCode.slice(0,7)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400 font-medium">Titular</span>
            <span className="text-xs font-bold text-gray-700">{workerName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400 font-medium">Método</span>
            <span className="text-xs font-bold" style={{ color: cfg.primary }}>{cfg.name}</span>
          </div>
          <div className="border-t border-gray-100 pt-2 flex justify-between items-center">
            <span className="text-xs text-gray-400 font-medium">Nro. de operación</span>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black text-gray-800">{opCode}</span>
              <button onClick={handleCopy} className="active:scale-90">
                {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5 text-gray-400" />}
              </button>
            </div>
          </div>
          <div className="border-t border-dashed border-gray-200 pt-2 flex justify-between items-center">
            <span className="text-sm font-extrabold text-gray-800">Moneda y Monto:</span>
            <span className="text-base font-black text-gray-900">{amount}</span>
          </div>
        </div>
      </div>

      {/* Send receipt button */}
      <button
        onClick={() => { setShared(true); setTimeout(() => setShared(false), 2500); }}
        className="w-full py-3 rounded-xl border-2 flex items-center justify-center gap-2 text-sm font-bold mb-3 active:scale-95 transition-all"
        style={{ borderColor: cfg.primary, color: cfg.primary, background: `${cfg.primary}0f` }}>
        {shared
          ? <><Check className="w-4 h-4" /> Constancia enviada</>
          : <><Share2 className="w-4 h-4" /> Enviar constancia de pago</>}
      </button>

      {/* Return button */}
      <button
        onClick={() => onSuccess(method!)}
        className="w-full py-3.5 rounded-xl text-white font-extrabold text-sm active:scale-95 transition-all"
        style={{ background: gradient(cfg), boxShadow: `0 8px 20px ${cfg.primary}40` }}>
        Volver a Servicios Ya
      </button>

      {/* Another service suggestion */}
      <div className="mt-4 text-center">
        <p className="text-[10px] text-gray-400 font-medium">También puedes yapear otros servicios</p>
        <div className="flex justify-center gap-2 mt-2">
          {["Electricidad","Gasfitería","Limpieza","Pintura"].map((s) => (
            <div key={s} className="px-2 py-1 rounded-full text-[9px] font-bold text-white"
              style={{ background: cfg.primary }}>
              {s}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  function handleCopy() {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return null;
}

// tiny alias used inside JSX above
function ChevronRight({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
      className={className}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
