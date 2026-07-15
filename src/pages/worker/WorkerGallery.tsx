import { workerGalleryImages } from "../../data/mockData";
import BackHeader from "../../components/BackHeader";

export default function WorkerGallery() {
  return (
    <div className="min-h-full bg-gray-50">
      <BackHeader title="Galería de Trabajos" />

      <div className="px-5 pt-4">
        <p className="text-sm text-gray-500 mb-4">Muestra de trabajos realizados recientemente</p>

        <div className="grid grid-cols-2 gap-3">
          {workerGalleryImages.map((img, i) => (
            <div key={i} className="relative rounded-2xl overflow-hidden shadow-sm active:scale-98 transition-transform cursor-pointer">
              <img src={img} alt={`Trabajo ${i + 1}`} className="w-full h-40 object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                <p className="text-xs text-white font-semibold">Trabajo #{i + 1}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-white rounded-2xl shadow-sm p-4">
          <h3 className="text-sm font-bold text-gray-800 mb-2">Estadísticas de Galería</h3>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-lg font-bold text-blue-600">6</p>
              <p className="text-xs text-gray-400">Fotos</p>
            </div>
            <div className="border-x border-gray-100">
              <p className="text-lg font-bold text-green-600">126</p>
              <p className="text-xs text-gray-400">Trabajos</p>
            </div>
            <div>
              <p className="text-lg font-bold text-yellow-600">4.8</p>
              <p className="text-xs text-gray-400">Calificación</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
