import { useNavigate } from "react-router-dom";
import { Search, Bell, Star, MapPin, Zap, Droplet, Paintbrush, Sparkles, Key, ChevronRight } from "lucide-react";
import { workers } from "../../data/mockData";
import { useApp } from "../../context/AppContext";
import BottomNav from "../../components/BottomNav";

export default function ClientHome() {
  const navigate = useNavigate();
  const { profile, favorites, hireNotifications } = useApp();
  const unreadHire = hireNotifications.filter((n) => !n.read).length;

  const categories = [
    { icon: Zap, name: "Electricista", color: "bg-yellow-100 text-yellow-600" },
    { icon: Droplet, name: "Gasfitero", color: "bg-blue-100 text-blue-600" },
    { icon: Paintbrush, name: "Pintor", color: "bg-pink-100 text-pink-600" },
    { icon: Sparkles, name: "Limpieza", color: "bg-green-100 text-green-600" },
    { icon: Key, name: "Cerrajero", color: "bg-orange-100 text-orange-600" },
  ];

  return (
    <div className="min-h-full bg-gray-50 pb-16">
      <div className="px-5 pt-12 pb-6 text-white"
        style={{ background: "linear-gradient(160deg, var(--grad-from), var(--grad-to))" }}>
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-blue-100 text-xs">Bienvenida</p>
            <h1 className="text-lg font-bold">{profile.name}</h1>
          </div>
          <button
            onClick={() => navigate("/client/notifications")}
            className="relative w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center active:scale-90 transition-transform"
          >
            <Bell className="w-5 h-5" />
            <span className={`absolute top-1 right-1 w-2 h-2 bg-red-400 rounded-full ${unreadHire > 0 ? "animate-pulse" : ""}`} />
          </button>
        </div>

        <div
          onClick={() => navigate("/client/search")}
          className="bg-white rounded-xl px-4 py-3 flex items-center gap-2 shadow-lg cursor-pointer active:scale-98 transition-transform"
        >
          <Search className="w-5 h-5 text-gray-400" />
          <span className="text-gray-400 text-sm">Buscar servicios...</span>
        </div>
      </div>

      <div className="px-5 -mt-3">
        <div className="bg-white rounded-2xl shadow-md p-4">
          <h2 className="text-sm font-bold text-gray-800 mb-3">Categorías</h2>
          <div className="grid grid-cols-5 gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.name}
                  onClick={() => navigate(`/client/search?category=${cat.name}`)}
                  className="flex flex-col items-center gap-1.5 active:scale-90 transition-transform"
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${cat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] text-gray-600 font-medium text-center leading-tight">
                    {cat.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="px-5 mt-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-gray-800">Trabajadores destacados</h2>
          <button
            onClick={() => navigate("/client/search")}
            className="text-xs text-blue-600 font-semibold"
          >
            Ver todos
          </button>
        </div>

        <div className="space-y-3">
          {workers.slice(0, 3).map((w) => (
            <div
              key={w.id}
              onClick={() => navigate(`/client/worker/${w.id}`)}
              className="bg-white rounded-2xl shadow-sm p-3 flex items-center gap-3 active:scale-98 transition-transform cursor-pointer"
            >
              <img src={w.avatar} alt={w.name} className="w-14 h-14 rounded-xl object-cover" />
              <div className="flex-1">
                <h3 className="text-sm font-bold text-gray-800">{w.name}</h3>
                <p className="text-xs text-gray-500">{w.specialty}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-0.5">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-semibold text-gray-700">{w.rating}</span>
                  </div>
                  <span className="text-xs text-gray-400">({w.reviews})</span>
                  <div className="flex items-center gap-0.5">
                    <MapPin className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-400">{w.city}</span>
                  </div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300" />
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 mt-5">
        <div
          onClick={() => navigate("/client/favorites")}
          className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-4 text-white flex items-center justify-between active:scale-98 transition-transform cursor-pointer"
        >
          <div>
            <h3 className="text-sm font-bold">Mis Favoritos</h3>
            <p className="text-xs text-blue-100">{favorites.length} trabajadores guardados</p>
          </div>
          <ChevronRight className="w-5 h-5" />
        </div>
      </div>

      <div className="px-5 mt-4">
        <div
          onClick={() => navigate("/client/pending")}
          className="bg-gradient-to-r from-orange-400 to-orange-500 rounded-2xl p-4 text-white flex items-center justify-between active:scale-98 transition-transform cursor-pointer"
        >
          <div>
            <h3 className="text-sm font-bold">Solicitudes Pendientes</h3>
            <p className="text-xs text-orange-100">Revisa el estado de tus solicitudes</p>
          </div>
          <ChevronRight className="w-5 h-5" />
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
