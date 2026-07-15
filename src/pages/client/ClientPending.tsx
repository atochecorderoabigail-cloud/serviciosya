import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, DollarSign, Eye, X, MessageCircle } from "lucide-react";
import { pendingRequests } from "../../data/mockData";
import { useApp } from "../../context/AppContext";
import BackHeader from "../../components/BackHeader";
import BottomNav from "../../components/BottomNav";
import Modal from "../../components/Modal";

export default function ClientPending() {
  const navigate = useNavigate();
  const { hireRequests, cancelHireRequest } = useApp();
  const [cancelId, setCancelId] = useState<number | null>(null);
  const [detailId, setDetailId] = useState<number | null>(null);
  const [localPending] = useState(pendingRequests);

  const statusColors: Record<string, string> = {
    "pendiente": "bg-yellow-100 text-yellow-700",
    "aceptada": "bg-blue-100 text-blue-700",
    "en_proceso": "bg-purple-100 text-purple-700",
    "finalizada": "bg-green-100 text-green-700",
    "Pendiente": "bg-yellow-100 text-yellow-700",
    "Aceptada": "bg-blue-100 text-blue-700",
    "En proceso": "bg-purple-100 text-purple-700",
    "Finalizada": "bg-green-100 text-green-700",
  };

  const statusLabels: Record<string, string> = {
    "pendiente": "Pendiente",
    "aceptada": "Aceptada",
    "en_proceso": "En proceso",
    "finalizada": "Finalizada",
  };

  const handleCancel = () => {
    cancelHireRequest(cancelId!);
    setCancelId(null);
  };

  const allRequests = [...hireRequests, ...localPending.map((p) => ({
    id: p.id + 10000,
    workerId: p.worker.id,
    workerName: p.worker.name,
    workerAvatar: p.worker.avatar,
    specialty: p.worker.specialty,
    date: p.date,
    cost: p.cost,
    status: p.status.toLowerCase().replace(" ", "_") as "pendiente" | "aceptada" | "en_proceso" | "finalizada",
  }))];

  const detailReq = allRequests.find((r) => r.id === detailId);

  return (
    <div className="min-h-full bg-gray-50 pb-16">
      <BackHeader title="Solicitudes Pendientes" />

      <div className="px-5 pt-4 space-y-3">
        {allRequests.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-sm text-gray-400">No tienes solicitudes pendientes</p>
          </div>
        ) : (
          allRequests.map((req) => (
            <div key={req.id} className="bg-white rounded-2xl shadow-sm p-4">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={req.workerAvatar}
                  alt={req.workerName}
                  className="w-12 h-12 rounded-xl object-cover cursor-pointer"
                  onClick={() => navigate(`/client/worker/${req.workerId}`)}
                />
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-gray-800">{req.workerName}</h3>
                  <p className="text-xs text-gray-500">{req.specialty}</p>
                </div>
                <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${statusColors[req.status] || "bg-gray-100 text-gray-600"}`}>
                  {statusLabels[req.status] || req.status}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{req.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5" />
                  <span className="font-bold text-gray-700">{req.cost}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setDetailId(req.id)}
                  className="flex-1 py-2 bg-blue-50 text-blue-600 text-xs font-semibold rounded-lg active:scale-95 transition-transform flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  Ver Detalle
                </button>
                {(req.status === "aceptada" || req.status === "en_proceso") && (
                  <button
                    onClick={() => navigate(`/client/chat/${req.id}`)}
                    className="flex-1 py-2 bg-green-50 text-green-600 text-xs font-semibold rounded-lg active:scale-95 transition-transform flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    Ir al Chat
                  </button>
                )}
                {req.status !== "finalizada" && (
                  <button
                    onClick={() => setCancelId(req.id)}
                    className="flex-1 py-2 bg-red-50 text-red-500 text-xs font-semibold rounded-lg active:scale-95 transition-transform flex items-center justify-center gap-1.5"
                  >
                    <X className="w-3.5 h-3.5" />
                    Cancelar
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <Modal
        open={cancelId !== null}
        onClose={() => setCancelId(null)}
        title="Cancelar Solicitud"
        onConfirm={handleCancel}
        confirmText="Sí, Cancelar"
      >
        <p className="text-sm text-gray-500">¿Estás seguro de que deseas cancelar esta solicitud?</p>
      </Modal>

      <Modal
        open={detailId !== null}
        onClose={() => setDetailId(null)}
        title="Detalle de Solicitud"
      >
        {detailReq && (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <img src={detailReq.workerAvatar} alt={detailReq.workerName} className="w-14 h-14 rounded-xl object-cover" />
              <div>
                <h3 className="text-sm font-bold text-gray-800">{detailReq.workerName}</h3>
                <p className="text-xs text-gray-500">{detailReq.specialty}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Fecha:</span><span className="font-semibold text-gray-700">{detailReq.date}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Costo:</span><span className="font-semibold text-gray-700">{detailReq.cost}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Estado:</span><span className="font-semibold text-gray-700">{statusLabels[detailReq.status] || detailReq.status}</span></div>
            </div>
            {(detailReq.status === "aceptada" || detailReq.status === "en_proceso") && (
              <button
                onClick={() => {
                  setDetailId(null);
                  navigate(`/client/chat/${detailReq.id}`);
                }}
                className="w-full py-2.5 rounded-xl bg-green-600 text-white font-bold text-sm active:scale-95 transition-transform flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Ir al Chat
              </button>
            )}
          </div>
        )}
      </Modal>

      <BottomNav />
    </div>
  );
}
