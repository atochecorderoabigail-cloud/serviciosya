import { Star, Calendar, DollarSign } from "lucide-react";
import { workerServicesData } from "../../data/mockData";
import BackHeader from "../../components/BackHeader";
import BottomNav from "../../components/BottomNav";

export default function WorkerHistory() {
  return (
    <div className="min-h-full bg-gray-50 pb-16">
      <BackHeader title="Servicios Realizados" />

      <div className="px-5 pt-4 space-y-3">
        {workerServicesData.map((s) => (
          <div key={s.id} className="bg-white rounded-2xl shadow-sm p-4">
            <div className="flex items-center gap-3 mb-3">
              <img src={s.avatar} alt={s.client} className="w-12 h-12 rounded-xl object-cover" />
              <div className="flex-1">
                <h3 className="text-sm font-bold text-gray-800">{s.client}</h3>
                <p className="text-xs text-gray-500">Cliente</p>
              </div>
              <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                {s.status}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{s.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5" />
                <span className="font-bold text-gray-700">{s.cost}</span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <span className="text-xs text-gray-500">Calificación del cliente:</span>
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${i <= Math.round(s.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-gray-700 ml-1">{s.rating}</span>
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
