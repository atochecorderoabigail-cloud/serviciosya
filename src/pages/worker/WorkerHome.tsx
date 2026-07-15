import { useNavigate } from "react-router-dom";
import { Bell, TrendingUp, DollarSign, Briefcase, Star, Clock } from "lucide-react";
import { workerServicesData } from "../../data/mockData";
import { useApp } from "../../context/AppContext";
import BottomNav from "../../components/BottomNav";

export default function WorkerHome() {
  const navigate = useNavigate();
  const { profile } = useApp();

  const stats = [
    { icon: Briefcase, label: "Trabajos", value: "126", color: "text-blue-600 bg-blue-50" },
    { icon: Star, label: "Calificación", value: "4.8", color: "text-yellow-600 bg-yellow-50" },
    { icon: DollarSign, label: "Ingresos", value: "S/ 3,240", color: "text-green-600 bg-green-50" },
    { icon: Clock, label: "Disponible", value: "Sí", color: "text-purple-600 bg-purple-50" },
  ];

  return (
    <div className="min-h-full bg-gray-50 pb-16">
      <div className="px-5 pt-12 pb-6 text-white" style={{ background: "linear-gradient(160deg, var(--grad-from), var(--grad-to))" }}>
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-blue-100 text-xs">Bienvenido</p>
            <h1 className="text-lg font-bold">{profile.name}</h1>
            <p className="text-xs text-blue-100">Electricista certificado</p>
          </div>
          <button
            onClick={() => navigate("/worker/notifications")}
            className="relative w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center active:scale-90 transition-transform"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-400 rounded-full" />
          </button>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="bg-white/15 backdrop-blur rounded-xl p-2.5 text-center">
                <Icon className="w-4 h-4 mx-auto mb-1" />
                <p className="text-sm font-bold">{s.value}</p>
                <p className="text-[10px] text-blue-100">{s.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="px-5 -mt-3">
        <div className="bg-white rounded-2xl shadow-md p-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-bold text-gray-800">Resumen de actividad</h2>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Solicitudes nuevas</span>
              <span className="text-sm font-bold text-blue-600">3</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Servicios en proceso</span>
              <span className="text-sm font-bold text-purple-600">2</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Servicios completados</span>
              <span className="text-sm font-bold text-green-600">126</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 mt-5">
        <h2 className="text-sm font-bold text-gray-800 mb-3">Servicios recientes</h2>
        <div className="space-y-3">
          {workerServicesData.slice(0, 3).map((s) => (
            <div key={s.id} className="bg-white rounded-2xl shadow-sm p-3 flex items-center gap-3">
              <img src={s.avatar} alt={s.client} className="w-12 h-12 rounded-xl object-cover" />
              <div className="flex-1">
                <h3 className="text-sm font-bold text-gray-800">{s.client}</h3>
                <p className="text-xs text-gray-500">{s.date}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-blue-600">{s.cost}</p>
                <span className="text-xs text-green-500">{s.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 mt-4">
        <div
          onClick={() => navigate("/worker/search")}
          className="rounded-2xl p-4 text-white flex items-center justify-between active:scale-98 transition-transform cursor-pointer"
            style={{ background: "linear-gradient(135deg, var(--grad-from), var(--grad-to))" }}
        >
          <div>
            <h3 className="text-sm font-bold">Buscar Servicios</h3>
            <p className="text-xs text-blue-100">Explora oportunidades de trabajo</p>
          </div>
          <TrendingUp className="w-5 h-5" />
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
