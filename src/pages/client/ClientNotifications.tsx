import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell, CheckCircle, Clock, Star, MessageSquare,
  ChevronRight, ChevronDown, X, Calendar, Briefcase,
  Info, AlertTriangle, Zap, ArrowRight,
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import { notifications } from "../../data/mockData";
import PageContainer from "../../components/PageContainer";
import BackHeader from "../../components/BackHeader";

type AnyNotif = {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type?: string;
  requestId?: number;
};

const typeIcon: Record<string, React.ReactNode> = {
  success: <CheckCircle className="w-5 h-5 text-green-500" />,
  accepted: <CheckCircle className="w-5 h-5 text-green-500" />,
  info: <Info className="w-5 h-5 text-blue-500" />,
  warning: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
  rating: <Star className="w-5 h-5 text-yellow-500" />,
  message: <MessageSquare className="w-5 h-5 text-blue-500" />,
  chat: <MessageSquare className="w-5 h-5 text-blue-500" />,
  payment: <Zap className="w-5 h-5 text-green-500" />,
  hire: <Briefcase className="w-5 h-5 text-blue-600" />,
  arrival: <Zap className="w-5 h-5 text-purple-500" />,
};

function typeColor(type?: string) {
  const map: Record<string, string> = {
    success: "#d1fae5", accepted: "#d1fae5", info: "#dbeafe", warning: "#fef3c7",
    rating: "#fef9c3", message: "#eff6ff", chat: "#eff6ff",
    payment: "#dcfce7", hire: "#eff6ff", arrival: "#f3e8ff",
  };
  return map[type ?? "info"] ?? "#f0f4ff";
}

function DetailModal({ notif, onClose, onCTA }: { notif: AnyNotif; onClose: () => void; onCTA?: () => void }) {
  const icon = typeIcon[notif.type ?? "info"] ?? <Bell className="w-5 h-5 text-blue-500" />;
  const bg = typeColor(notif.type);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ maxWidth: 440, left: "50%", transform: "translateX(-50%)" }}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full bg-white rounded-t-3xl px-5 pt-5 pb-8 animate-[slideIn_0.35s_ease]">
        <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4" />

        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: bg }}>
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="text-base font-extrabold text-gray-800 leading-tight">{notif.title}</h3>
            <div className="flex items-center gap-1.5 mt-1">
              <Clock className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-400">{notif.time}</span>
            </div>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center active:scale-90">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 mb-4" />

        {/* Body */}
        <div className="rounded-2xl p-4 mb-4" style={{ background: bg }}>
          <p className="text-sm text-gray-700 leading-relaxed">{notif.message}</p>
        </div>

        {/* Extra detail rows */}
        <div className="space-y-2 mb-5">
          <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-2.5">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-500 flex-1">Fecha y hora</span>
            <span className="text-xs font-bold text-gray-700">{notif.time}</span>
          </div>
          <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-2.5">
            <Info className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-500 flex-1">Estado</span>
            <span className="text-xs font-bold text-green-600">Procesada</span>
          </div>
          {notif.requestId && (
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-2.5">
              <Briefcase className="w-4 h-4 text-gray-400" />
              <span className="text-xs text-gray-500 flex-1">ID de solicitud</span>
              <span className="text-xs font-bold text-gray-700">#{notif.requestId}</span>
            </div>
          )}
        </div>

        {onCTA && (
          <button onClick={onCTA}
            className="w-full py-3.5 rounded-2xl text-white font-extrabold text-sm flex items-center justify-center gap-2 active:scale-95 transition-all"
            style={{ background: "linear-gradient(135deg, #001f6b, #0044cc)", boxShadow: "0 6px 20px rgba(0,68,204,0.3)" }}>
            Ir al chat <ArrowRight className="w-4 h-4" />
          </button>
        )}
        <button onClick={onClose}
          className="w-full py-3 rounded-2xl text-gray-500 font-bold text-sm mt-2 bg-gray-100 active:scale-95">
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default function ClientNotifications() {
  const navigate = useNavigate();
  const { hireNotifications, markHireNotificationRead, notificationsRead, markNotificationRead } = useApp();
  const [selected, setSelected] = useState<AnyNotif | null>(null);

  const allHire: AnyNotif[] = hireNotifications.map((n) => ({
    id: n.id, title: n.title, message: n.message, time: n.time,
    read: n.read, type: n.title.includes("aceptada") ? "success" : "hire", requestId: n.requestId,
  }));

  const allStatic: AnyNotif[] = notifications.map((n) => ({
    id: n.id, title: n.title, message: n.message, time: n.time,
    read: notificationsRead[n.id] ?? false, type: n.type,
  }));

  const total = [...allHire, ...allStatic];
  const unread = total.filter((n) => !n.read).length;

  const handleOpen = (n: AnyNotif) => {
    setSelected(n);
    if (!n.read) {
      if (allHire.find((h) => h.id === n.id)) markHireNotificationRead(n.id);
      else markNotificationRead(n.id);
    }
  };

  const handleCTA = (n: AnyNotif) => {
    if (n.requestId) { setSelected(null); navigate(`/client/chat/${n.requestId}`); }
  };

  return (
    <PageContainer>
      <BackHeader title="Notificaciones" />

      <div className="px-4 py-4">
        {/* Badge summary */}
        {unread > 0 && (
          <div className="flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-2xl px-4 py-3 mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <Bell className="w-4 h-4 text-white" />
            </div>
            <p className="text-sm font-bold text-blue-700 flex-1">
              Tienes <span className="text-blue-900">{unread}</span> {unread === 1 ? "notificación sin leer" : "notificaciones sin leer"}
            </p>
          </div>
        )}

        {/* Hire notifications */}
        {allHire.length > 0 && (
          <section className="mb-5">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1 mb-2">
              Solicitudes de servicio
            </p>
            <div className="space-y-2">
              {allHire.map((n) => (
                <NotifCard key={n.id} notif={n} onOpen={handleOpen} />
              ))}
            </div>
          </section>
        )}

        {/* Static notifications */}
        <section>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1 mb-2">
            Actividad reciente
          </p>
          <div className="space-y-2">
            {allStatic.map((n) => (
              <NotifCard key={n.id} notif={n} onOpen={handleOpen} />
            ))}
          </div>
        </section>

        {total.length === 0 && (
          <div className="flex flex-col items-center py-16 gap-3">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <Bell className="w-7 h-7 text-gray-400" />
            </div>
            <p className="text-sm font-bold text-gray-400">Sin notificaciones</p>
            <p className="text-xs text-gray-400 text-center">Tus alertas aparecerán aquí</p>
          </div>
        )}
      </div>

      {selected && (
        <DetailModal
          notif={selected}
          onClose={() => setSelected(null)}
          onCTA={selected.requestId ? () => handleCTA(selected) : undefined}
        />
      )}
    </PageContainer>
  );
}

function NotifCard({ notif, onOpen }: { notif: AnyNotif; onOpen: (n: AnyNotif) => void }) {
  const icon = typeIcon[notif.type ?? "info"] ?? <Bell className="w-4 h-4 text-blue-500" />;
  const bg = typeColor(notif.type);

  return (
    <button onClick={() => onOpen(notif)}
      className="w-full flex items-center gap-3 bg-white rounded-2xl px-4 py-3.5 active:scale-98 transition-all text-left shadow-sm border border-gray-100"
      style={{ opacity: notif.read ? 0.7 : 1 }}>
      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: bg }}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-bold text-gray-800 truncate">{notif.title}</p>
          {!notif.read && <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0" />}
        </div>
        <p className="text-xs text-gray-500 truncate mt-0.5">{notif.message}</p>
        <p className="text-[10px] text-gray-400 mt-0.5">{notif.time}</p>
      </div>
      <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
    </button>
  );
}
