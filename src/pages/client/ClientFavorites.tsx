import { useNavigate } from "react-router-dom";
import { Heart, Trash2, Star, MapPin } from "lucide-react";
import { workers } from "../../data/mockData";
import { useApp } from "../../context/AppContext";
import BackHeader from "../../components/BackHeader";
import BottomNav from "../../components/BottomNav";
import { useState } from "react";

export default function ClientFavorites() {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useApp();
  const [removed, setRemoved] = useState<number | null>(null);

  const favWorkers = workers.filter((w) => favorites.includes(w.id));

  const handleRemove = (id: number) => {
    setRemoved(id);
    setTimeout(() => {
      toggleFavorite(id);
      setRemoved(null);
    }, 300);
  };

  return (
    <div className="min-h-full bg-gray-50 pb-16">
      <BackHeader title="Mis Favoritos" />

      <div className="px-5 pt-4">
        {favWorkers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Heart className="w-12 h-12 text-gray-300 mb-3" />
            <p className="text-sm text-gray-400">No tienes favoritos aún</p>
            <button
              onClick={() => navigate("/client/search")}
              className="mt-4 px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg active:scale-95 transition-transform"
            >
              Explorar trabajadores
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {favWorkers.map((w) => (
              <div
                key={w.id}
                className={`bg-white rounded-2xl shadow-sm p-3 flex items-center gap-3 transition-all duration-300 ${
                  removed === w.id ? "opacity-0 scale-95" : "opacity-100"
                }`}
              >
                <img
                  src={w.avatar}
                  alt={w.name}
                  className="w-14 h-14 rounded-xl object-cover cursor-pointer"
                  onClick={() => navigate(`/client/worker/${w.id}`)}
                />
                <div className="flex-1" onClick={() => navigate(`/client/worker/${w.id}`)}>
                  <h3 className="text-sm font-bold text-gray-800">{w.name}</h3>
                  <p className="text-xs text-gray-500">{w.specialty}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-semibold text-gray-700">{w.rating}</span>
                    <MapPin className="w-3 h-3 text-gray-400 ml-1" />
                    <span className="text-xs text-gray-400">{w.city}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(w.id)}
                  className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center active:scale-90 transition-transform"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
