import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search, Star, MapPin, X } from "lucide-react";
import { workers } from "../../data/mockData";
import BackHeader from "../../components/BackHeader";
import BottomNav from "../../components/BottomNav";

export default function ClientSearch() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "";
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const categories = ["Todos", "Electricista", "Gasfitero", "Pintor", "Limpieza", "Cerrajero"];

  const filtered = workers.filter((w) => {
    const matchQuery = w.name.toLowerCase().includes(query.toLowerCase()) ||
      w.specialty.toLowerCase().includes(query.toLowerCase());
    const matchCategory = activeCategory === "Todos" || !activeCategory || w.category === activeCategory;
    return matchQuery && matchCategory;
  });

  return (
    <div className="min-h-full bg-gray-50 pb-16">
      <BackHeader title="Buscar Servicios" />

      <div className="px-5 pt-4">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nombre o servicio..."
            className="w-full pl-10 pr-10 py-3 rounded-xl bg-white border border-gray-200 text-sm text-gray-700 focus:outline-none focus:border-blue-500 transition-all shadow-sm"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat === "Todos" ? "" : cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all active:scale-95 ${
                (activeCategory === cat) || (cat === "Todos" && !activeCategory)
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-gray-500 border border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 mt-4 space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-sm text-gray-400">No se encontraron resultados</p>
          </div>
        ) : (
          filtered.map((w) => (
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
                  <span className="text-xs text-gray-400">({w.reviews} reseñas)</span>
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-400">{w.city}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-blue-600">{w.price}</p>
                <span className={`text-xs ${w.available ? "text-green-500" : "text-gray-400"}`}>
                  {w.available ? "Disponible" : "Ocupado"}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      <BottomNav />
    </div>
  );
}
