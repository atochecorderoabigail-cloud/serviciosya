import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Send, CreditCard, CheckCircle, Phone, Video, MoreVertical, QrCode, Scan, X } from "lucide-react";
import { useApp } from "../../context/AppContext";
import BackHeader from "../../components/BackHeader";
import PaymentFlow from "../../components/PaymentFlow";

// Tiny inline QR visualisation (purely decorative grid)
function FakeQR({ size = 120, color = "#6c19ff" }: { size?: number; color?: string }) {
  const grid = [
    [1,1,1,1,1,1,1,0,1,0,0,1,0,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,0,1,0,0,1,0,1,0,0,0,0,0,1],
    [1,0,1,1,1,0,1,0,1,0,1,1,0,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,0,0,1,0,1,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,1,1,0,1,0,0,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1,0,0,1,1,0,1,0,1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,0,0,0],
    [1,0,1,1,0,1,1,0,0,0,1,1,0,1,0,1,1,0,1,0,1],
    [0,1,0,1,1,0,0,1,0,1,1,0,1,0,1,1,0,1,0,1,0],
    [1,1,0,0,1,1,1,0,1,0,0,1,1,0,1,0,1,1,0,0,1],
    [0,1,1,0,0,0,0,1,1,0,1,0,1,1,0,0,1,0,1,1,0],
    [1,0,1,1,1,0,1,0,0,1,0,1,0,0,1,1,0,0,0,1,1],
    [0,0,0,0,0,0,0,0,1,0,1,1,0,1,0,0,0,1,1,0,0],
    [1,1,1,1,1,1,1,0,0,1,1,0,1,0,1,0,1,1,0,1,1],
    [1,0,0,0,0,0,1,0,1,1,0,1,0,1,0,1,0,0,1,0,1],
    [1,0,1,1,1,0,1,0,0,0,1,0,1,0,1,1,0,1,0,1,1],
    [1,0,1,1,1,0,1,0,1,0,1,1,0,1,0,0,1,1,0,0,1],
    [1,0,1,1,1,0,1,0,0,1,0,1,1,0,1,0,0,0,1,0,0],
    [1,0,0,0,0,0,1,0,1,1,1,0,0,1,0,1,1,0,1,1,0],
    [1,1,1,1,1,1,1,0,0,0,1,1,0,0,1,0,0,1,1,0,1],
  ];
  const cell = size / 21;
  return (
    <div style={{ width: size, height: size, display: "grid", gridTemplateColumns: `repeat(21, ${cell}px)`, background: "#fff", padding: 4, borderRadius: 8 }}>
      {grid.flat().map((v, i) => (
        <div key={i} style={{ width: cell, height: cell, background: v ? color : "transparent" }} />
      ))}
    </div>
  );
}

export default function ClientChat() {
  const { requestId } = useParams();
  const { hireRequests, chatMessages, sendMessage, payments, processPayment } = useApp();
  const [input, setInput] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [showQROptions, setShowQROptions] = useState(false);
  const [pendingQRMethod, setPendingQRMethod] = useState<"Yape" | "Plin" | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const req = hireRequests.find((r) => r.id === Number(requestId));
  const messages = requestId ? chatMessages[Number(requestId)] || [] : [];
  const payment = requestId ? payments[Number(requestId)] : undefined;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, showPayment]);

  if (!req) {
    return (
      <div className="min-h-full bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Solicitud no encontrada</p>
      </div>
    );
  }

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(Number(requestId), "client", input.trim());
    setInput("");
  };

  const handlePaymentSuccess = (method: string) => {
    processPayment(Number(requestId), method);
    setShowPayment(false);
  };

  // Client requests QR from worker
  const handleRequestQR = (method: "Yape" | "Plin") => {
    setShowQROptions(false);
    setPendingQRMethod(method);
    sendMessage(Number(requestId), "client", `Hola, ¿puedes enviarme tu código QR de ${method} para realizar el pago?`);
    // Simulate worker generating QR after 2s
    setTimeout(() => {
      sendMessage(Number(requestId), "worker", `__QR__${method}__${req.cost}`);
    }, 2000);
  };

  const renderMessage = (msg: (typeof messages)[0]) => {
    // QR code message from worker
    if (msg.text.startsWith("__QR__")) {
      const [, method, amount] = msg.text.split("__");
      const isYape = method === "Yape";
      const color = isYape ? "#6c19ff" : "#00b259";
      return (
        <div key={msg.id} className="flex justify-start animate-[slideUp_0.3s_ease]">
          <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-white shadow-sm p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-lg" style={{ background: color + "20" }}>
                {isYape ? "💜" : "💚"}
              </div>
              <div>
                <p className="text-xs font-extrabold" style={{ color }}>QR de pago · {method}</p>
                <p className="text-[10px] text-gray-400">Escanea para pagar</p>
              </div>
            </div>

            {/* QR visual */}
            <div className="flex flex-col items-center rounded-xl p-3 mb-3" style={{ background: color + "12" }}>
              <FakeQR size={110} color={color} />
              <p className="text-xs font-black mt-2" style={{ color }}>{req.workerName}</p>
              <p className="text-base font-black text-gray-900 mt-0.5">{amount}</p>
              <p className="text-[9px] text-gray-400 mt-0.5">Servicios Ya · {method}</p>
            </div>

            <button
              onClick={() => setShowPayment(true)}
              className="w-full py-2 rounded-xl text-white font-bold text-xs active:scale-95 transition-all"
              style={{ background: `linear-gradient(135deg, ${color}, ${isYape ? "#8b35ff" : "#009e4f"})` }}>
              Pagar con {method}
            </button>
            <p className={`text-[10px] mt-1 text-gray-400`}>{msg.time}</p>
          </div>
        </div>
      );
    }

    // Normal message
    return (
      <div key={msg.id}
        className={`flex ${msg.sender === "client" ? "justify-end" : "justify-start"} animate-[slideUp_0.3s_ease]`}>
        <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
          msg.sender === "client"
            ? "bg-blue-600 text-white rounded-br-md"
            : "bg-white text-gray-700 shadow-sm rounded-bl-md"
        }`}>
          <p className="text-sm leading-relaxed">{msg.text}</p>
          <p className={`text-[10px] mt-1 ${msg.sender === "client" ? "text-blue-200" : "text-gray-400"}`}>
            {msg.time}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-full bg-gray-50 flex flex-col">
      <BackHeader title={req.workerName} rightIcon={<MoreVertical className="w-5 h-5 text-gray-500" />} />

      {/* Worker info bar */}
      <div className="bg-white border-b border-gray-100 px-4 py-2.5 flex items-center gap-3">
        <img src={req.workerAvatar} alt={req.workerName} className="w-10 h-10 rounded-full object-cover" />
        <div className="flex-1">
          <p className="text-sm font-bold text-gray-800">{req.workerName}</p>
          <p className="text-xs text-gray-500">{req.specialty} · {req.cost}</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center active:scale-90 transition-transform">
            <Phone className="w-4 h-4 text-gray-600" />
          </button>
          <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center active:scale-90 transition-transform">
            <Video className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 custom-scrollbar">
        {req.status === "pendiente" && (
          <div className="flex justify-center">
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-2 text-xs text-yellow-700 text-center">
              Solicitud enviada. Esperando que el trabajador acepte...
            </div>
          </div>
        )}

        {messages.map(renderMessage)}

        {payment?.paid && (
          <div className="flex justify-center animate-[fadeIn_0.4s_ease]">
            <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-xs font-bold text-green-700">Pago completado</p>
                <p className="text-[10px] text-green-600">Método: {payment.method} · {req.cost}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action buttons row */}
      {!payment?.paid && req.status !== "pendiente" && (
        <div className="px-4 py-2 flex gap-2">
          <button onClick={() => setShowQROptions(true)}
            className="flex-1 py-2.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-700 font-semibold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-transform">
            <QrCode className="w-4 h-4" /> Pedir QR
          </button>
          <button onClick={() => setShowPayment(true)}
            className="flex-1 py-2.5 rounded-xl bg-green-50 border border-green-200 text-green-700 font-semibold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-transform">
            <CreditCard className="w-4 h-4" /> Pagar ({req.cost})
          </button>
        </div>
      )}

      {/* Input bar */}
      <div className="bg-white border-t border-gray-100 px-4 py-3 flex items-center gap-2">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Escribe un mensaje..."
          className="flex-1 px-4 py-2.5 rounded-full bg-gray-100 border border-gray-200 text-sm text-gray-700 focus:outline-none focus:border-blue-500 transition-all" />
        <button onClick={handleSend} disabled={!input.trim()}
          className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center active:scale-90 transition-transform disabled:opacity-40">
          <Send className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* QR Options sheet */}
      {showQROptions && (
        <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ maxWidth: 440, left: "50%", transform: "translateX(-50%)" }}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowQROptions(false)} />
          <div className="relative w-full bg-white rounded-t-3xl px-5 pt-4 pb-8 animate-[slideIn_0.35s_ease]">
            <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Scan className="w-5 h-5 text-gray-700" />
                <h3 className="text-sm font-extrabold text-gray-800">Solicitar código QR</h3>
              </div>
              <button onClick={() => setShowQROptions(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mb-4">
              El trabajador generará su QR de pago y lo enviará al chat de forma automática.
            </p>
            <div className="space-y-3">
              <button onClick={() => handleRequestQR("Yape")}
                className="w-full flex items-center gap-3 p-4 rounded-2xl border-2 border-purple-200 active:scale-98 transition-all"
                style={{ background: "#f8f2ff" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-md"
                  style={{ background: "linear-gradient(135deg,#6c19ff,#8b35ff)", boxShadow: "0 4px 14px #6c19ff50" }}>
                  💜
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-extrabold text-purple-800">QR de Yape</p>
                  <p className="text-xs text-purple-600">Solicitar código QR de Yape</p>
                </div>
              </button>
              <button onClick={() => handleRequestQR("Plin")}
                className="w-full flex items-center gap-3 p-4 rounded-2xl border-2 border-green-200 active:scale-98 transition-all"
                style={{ background: "#f0fdf6" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-md"
                  style={{ background: "linear-gradient(135deg,#00b259,#009e4f)", boxShadow: "0 4px 14px #00b25950" }}>
                  💚
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-extrabold text-green-800">QR de Plin</p>
                  <p className="text-xs text-green-600">Solicitar código QR de Plin</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment flow overlay */}
      {showPayment && (
        <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ maxWidth: 440, left: "50%", transform: "translateX(-50%)" }}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowPayment(false)} />
          <div className="relative w-full bg-white rounded-t-3xl px-5 pt-4 pb-8 max-h-[92%] overflow-y-auto animate-[slideIn_0.4s_ease] custom-scrollbar">
            <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
            <PaymentFlow
              amount={req.cost}
              workerName={req.workerName}
              workerAvatar={req.workerAvatar}
              specialty={req.specialty}
              requestId={req.id}
              onSuccess={handlePaymentSuccess}
              onClose={() => setShowPayment(false)}
              initialMethod={pendingQRMethod ?? undefined}
            />
          </div>
        </div>
      )}
    </div>
  );
}
