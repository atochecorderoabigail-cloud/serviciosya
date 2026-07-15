import { useNavigate } from "react-router-dom";
import { Star, RotateCcw, Calendar } from "lucide-react";
import { clientHistory } from "../../data/mockData";
import BackHeader from "../../components/BackHeader";
import BottomNav from "../../components/BottomNav";

export default function ClientHistory() {
  const navigate = useNavigate();

  return (
    <div className="min-h-full bg-gray-50 pb-16">
      <BackHeader title="Historial de Servicios" />

      <div className="px-5 pt-4 space-y-3">
        {clientHistory.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-sm p-4 active:scale-98 transition-transform"
          >
            <div className="flex items-center gap-3 mb-3">
              <img src={item.worker.avatar} alt={item.worker.name} className="w-12 h-12 rounded-xl object-cover" />
              <div className="flex-1">
                <h3 className="text-sm font-bold text-gray-800">{item.worker.name}</h3>
                <p className="text-xs text-gray-500">{item.worker.specialty}</p>
              </div>
              <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                {item.status}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{item.date}</span>
              </div>
              <span className="font-bold text-gray-700">{item.cost}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500">Calificación:</span>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${i <= item.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}`}
                    />
                  ))}
                </div>
              </div>
              <button
                onClick={() => navigate(`/client/worker/${item.worker.id}`)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-semibold rounded-lg active:scale-95 transition-transform"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Volver a contratar
              </button>
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
