import { useState } from "react";
import {
  Bell, CheckCircle, Star, Zap, MessageSquare,
  ChevronRight, X, Calendar, Info, Clock, ArrowRight,
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import { workerNotifications } from "../../data/mockData";
import PageContainer from "../../components/PageContainer";
import BackHeader from "../../components/BackHeader";

type WNotif = {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type?: string;
};

const iconMap: Record<string, React.ReactNode> = {
  request: <Bell className="w-5 h-5 text-blue-500" />,
  rating: <Star className="w-5 h-5 text-yellow-500" />,
  payment: <Zap className="w-5 h-5 text-green-500" />,
  message: <MessageSquare className="w-5 h-5 text-blue-500" />,
  success: <CheckCircle className="w-5 h-5 text-green-500" />,
};
const bgMap: Record<string, string> = {
  request: "#dbeafe", rating: "#fef9c3", payment: "#dcfce7",
  message: "#eff6ff", success: "#d1fae5",
};

function DetailSheet({ notif, onClose }: { notif: WNotif; onClose: () => void }) {
  const icon = iconMap[notif.type ?? "request"] ?? <Bell className="w-5 h-5 text-blue-500" />;
  const bg = bgMap[notif.type ?? "request"] ?? "#eff6ff";
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ maxWidth: 440, left: "50%", transform: "translateX(-50%)" }}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full bg-white rounded-t-3xl px-5 pt-5 pb-8 animate-[slideIn_0.35s_ease]">
        <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4" />
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: bg }}>
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="text-base font-extrabold text-gray-800">{notif.title}</h3>
            <div className="flex items-center gap-1.5 mt-1">
              <Clock className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-400">{notif.time}</span>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center active:scale-90">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>
        <div className="h-px bg-gray-100 mb-4" />
        <div className="rounded-2xl p-4 mb-4" style={{ background: bg }}>
          <p className="text-sm text-gray-700 leading-relaxed">{notif.message}</p>
        </div>
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
        </div>
        <button onClick={onClose}
          className="w-full py-3 rounded-2xl bg-gray-100 text-gray-600 font-bold text-sm active:scale-95">
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default function WorkerNotifications() {
  const { notificationsRead, markNotificationRead } = useApp();
  const [selected, setSelected] = useState<WNotif | null>(null);

  const items: WNotif[] = workerNotifications.map((n) => ({
    id: n.id,
    title: n.title,
    message: n.message,
    time: n.time,
    read: notificationsRead[n.id] ?? false,
    type: n.type,
  }));

  const unread = items.filter((n) => !n.read).length;

  const handleOpen = (n: WNotif) => {
    if (!n.read) markNotificationRead(n.id);
    setSelected(n);
  };

  return (
    <PageContainer>
      <BackHeader title="Notificaciones" />
      <div className="px-4 py-4">
        {unread > 0 && (
          <div className="flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-2xl px-4 py-3 mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <Bell className="w-4 h-4 text-white" />
            </div>
            <p className="text-sm font-bold text-blue-700 flex-1">
              {unread} {unread === 1 ? "notificación nueva" : "notificaciones nuevas"}
            </p>
          </div>
        )}

        <div className="space-y-2">
          {items.map((n) => {
            const icon = iconMap[n.type ?? "request"] ?? <Bell className="w-4 h-4 text-blue-500" />;
            const bg = bgMap[n.type ?? "request"] ?? "#eff6ff";
            return (
              <button key={n.id} onClick={() => handleOpen(n)}
                className="w-full flex items-center gap-3 bg-white rounded-2xl px-4 py-3.5 active:scale-98 transition-all text-left shadow-sm border border-gray-100"
                style={{ opacity: n.read ? 0.7 : 1 }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: bg }}>
                  {icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-gray-800 truncate">{n.title}</p>
                    {!n.read && <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0" />}
                  </div>
                  <p className="text-xs text-gray-500 truncate mt-0.5">{n.message}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{n.time}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
              </button>
            );
          })}
        </div>

        {items.length === 0 && (
          <div className="flex flex-col items-center py-16 gap-3">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <Bell className="w-7 h-7 text-gray-400" />
            </div>
            <p className="text-sm font-bold text-gray-400">Sin notificaciones</p>
          </div>
        )}
      </div>

      {selected && <DetailSheet notif={selected} onClose={() => setSelected(null)} />}
    </PageContainer>
  );
}
