import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Star, MapPin, Clock, Heart, Briefcase, Award, MessageCircle, CheckCircle, Send, CreditCard, Check } from "lucide-react";
import { workers } from "../../data/mockData";
import { useApp } from "../../context/AppContext";
import BackHeader from "../../components/BackHeader";
import RatingStars from "../../components/RatingStars";
import Modal from "../../components/Modal";

export default function WorkerProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { favorites, toggleFavorite, hireRequests, sendHireRequest } = useApp();
  const [showHireModal, setShowHireModal] = useState(false);
  const [hireSent, setHireSent] = useState(false);
  const worker = workers.find((w) => w.id === Number(id));

  const existingRequest = hireRequests.find((r) => r.workerId === Number(id));

  if (!worker) {
    return (
      <div className="min-h-full bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Trabajador no encontrado</p>
      </div>
    );
  }

  const isFavorite = favorites.includes(worker.id);

  const handleHire = () => {
    sendHireRequest(worker.id);
    setHireSent(true);
    setTimeout(() => {
      setShowHireModal(false);
      setHireSent(false);
      navigate("/client/pending");
    }, 1500);
  };

  return (
    <div className="min-h-full bg-gray-50 pb-20">
      <BackHeader
        title="Perfil del Trabajador"
        rightIcon={<Heart className={`w-5 h-5 ${isFavorite ? "text-red-500 fill-red-500" : "text-gray-400"}`} />}
        onRightClick={() => toggleFavorite(worker.id)}
      />

      <div className="flex flex-col items-center pt-4 px-5">
        <img src={worker.avatar} alt={worker.name} className="w-24 h-24 rounded-full object-cover shadow-md" />
        <h2 className="text-lg font-bold text-gray-800 mt-3">{worker.name}</h2>
        <p className="text-sm text-blue-600 font-semibold">{worker.specialty}</p>
        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-bold text-gray-700">{worker.rating}</span>
            <span className="text-xs text-gray-400">({worker.reviews} reseñas)</span>
          </div>
        </div>
      </div>

      <div className="px-5 mt-4">
        <div className="bg-white rounded-2xl shadow-sm p-4 grid grid-cols-3 gap-2 text-center">
          <div>
            <Briefcase className="w-5 h-5 text-blue-500 mx-auto mb-1" />
            <p className="text-sm font-bold text-gray-800">{worker.completedJobs}</p>
            <p className="text-xs text-gray-400">Trabajos</p>
          </div>
          <div className="border-x border-gray-100">
            <Clock className="w-5 h-5 text-green-500 mx-auto mb-1" />
            <p className="text-sm font-bold text-gray-800">{worker.experience}</p>
            <p className="text-xs text-gray-400">Experiencia</p>
          </div>
          <div>
            <MapPin className="w-5 h-5 text-orange-500 mx-auto mb-1" />
            <p className="text-sm font-bold text-gray-800">{worker.city}</p>
            <p className="text-xs text-gray-400">Ciudad</p>
          </div>
        </div>
      </div>

      <div className="px-5 mt-4">
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <h3 className="text-sm font-bold text-gray-800 mb-2">Descripción Profesional</h3>
          <p className="text-xs text-gray-500 leading-relaxed">{worker.description}</p>
        </div>
      </div>

      <div className="px-5 mt-4">
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <h3 className="text-sm font-bold text-gray-800 mb-3">Servicios Ofrecidos</h3>
          <div className="space-y-2">
            {worker.services.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-xs text-gray-600">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 mt-4">
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-gray-800">Galería de Trabajos</h3>
            <span className="text-xs text-blue-600 font-semibold">{worker.gallery.length} fotos</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {worker.gallery.map((img, i) => (
              <img key={i} src={img} alt={`Trabajo ${i + 1}`} className="w-full h-24 rounded-lg object-cover" />
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 mt-4">
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Award className="w-4 h-4 text-blue-500" />
            Certificados
          </h3>
          <div className="space-y-2">
            {worker.certificates.map((c, i) => (
              <div key={i} className="flex items-center gap-2 bg-blue-50 rounded-lg p-2.5">
                <Award className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <span className="text-xs text-gray-600">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 mt-4">
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-blue-500" />
            Reseñas de Clientes
          </h3>
          <div className="space-y-4">
            {worker.comments.map((c, i) => (
              <div key={i} className="border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-gray-700">{c.author}</span>
                  <span className="text-xs text-gray-400">{c.date}</span>
                </div>
                <RatingStars rating={c.rating} />
                <p className="text-xs text-gray-500 mt-1">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[400px] px-5 py-3 bg-white border-t border-gray-100 flex gap-3 z-50">
        <button
          onClick={() => toggleFavorite(worker.id)}
          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all active:scale-95 ${
            isFavorite ? "bg-red-50 border border-red-200" : "bg-gray-100 border border-gray-200"
          }`}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? "text-red-500 fill-red-500" : "text-gray-400"}`} />
        </button>
        {existingRequest ? (
          <button
            onClick={() => navigate(`/client/chat/${existingRequest.id}`)}
            disabled={existingRequest.status === "pendiente"}
            className={`flex-1 py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2 ${
              existingRequest.status === "pendiente"
                ? "bg-gray-200 text-gray-400"
                : "bg-green-600 text-white hover:bg-green-700 active:scale-95"
            }`}
          >
            {existingRequest.status === "pendiente" ? (
              "Solicitud enviada..."
            ) : (
              <>
                <MessageCircle className="w-5 h-5" />
                Ir al Chat
              </>
            )}
          </button>
        ) : (
          <button
            onClick={() => setShowHireModal(true)}
            className="flex-1 py-3.5 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 active:scale-95 transition-all shadow-lg"
          >
            Contratar Servicio
          </button>
        )}
      </div>

      <Modal
        open={showHireModal}
        onClose={() => !hireSent && setShowHireModal(false)}
        title="Contratar Servicio"
        onConfirm={hireSent ? undefined : handleHire}
        confirmText="Enviar Solicitud"
        cancelText="Cancelar"
      >
        {hireSent ? (
          <div className="flex flex-col items-center py-4 animate-[scaleIn_0.3s_ease]">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-sm font-bold text-gray-800">¡Solicitud enviada!</p>
            <p className="text-xs text-gray-500 mt-1 text-center">
              {worker.name} recibirá tu solicitud. Te notificaremos cuando la acepte.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
              <img src={worker.avatar} alt={worker.name} className="w-12 h-12 rounded-xl object-cover" />
              <div>
                <h3 className="text-sm font-bold text-gray-800">{worker.name}</h3>
                <p className="text-xs text-gray-500">{worker.specialty}</p>
              </div>
            </div>
            <div className="flex items-center justify-between bg-blue-50 rounded-xl p-3">
              <span className="text-sm text-gray-600">Costo del servicio:</span>
              <span className="text-lg font-bold text-blue-600">{worker.price}</span>
            </div>
            <p className="text-xs text-gray-500 text-center">
              Al enviar la solicitud, el trabajador la revisará y podrá aceptarla o rechazarla. Una vez aceptada, se habilitará un chat privado.
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}
