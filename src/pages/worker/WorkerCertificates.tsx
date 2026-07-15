import { Award, Download, CheckCircle } from "lucide-react";
import BackHeader from "../../components/BackHeader";

export default function WorkerCertificates() {
  const certificates = [
    { title: "Certificado Técnico Electricista", entity: "SENATI", year: "2016", verified: true },
    { title: "Seguridad Eléctrica Industrial", entity: "Instituto Técnico", year: "2019", verified: true },
    { title: "Instalaciones Eléctricas Residenciales", entity: "Cámara de Comercio", year: "2020", verified: true },
    { title: "Sistemas de Puesta a Tierra", entity: "Universidad Nacional", year: "2021", verified: false },
    { title: "Eficiencia Energética", entity: "MINEM", year: "2022", verified: true },
  ];

  return (
    <div className="min-h-full bg-gray-50">
      <BackHeader title="Certificados" />

      <div className="px-5 pt-4">
        <p className="text-sm text-gray-500 mb-4">Tus certificaciones y credenciales profesionales</p>

        <div className="space-y-3">
          {certificates.map((c, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm p-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-yellow-50 flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-yellow-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-gray-800">{c.title}</h3>
                  <p className="text-xs text-gray-500">{c.entity} - {c.year}</p>
                  {c.verified ? (
                    <div className="flex items-center gap-1 mt-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                      <span className="text-xs text-green-600 font-semibold">Verificado</span>
                    </div>
                  ) : (
                    <span className="text-xs text-orange-500 font-semibold mt-1.5 block">En revisión</span>
                  )}
                </div>
                <button className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center active:scale-90 transition-transform">
                  <Download className="w-4 h-4 text-blue-600" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <button className="w-full py-3 rounded-xl border-2 border-dashed border-blue-300 text-blue-600 font-semibold text-sm active:scale-95 transition-transform">
            + Agregar Certificado
          </button>
        </div>
      </div>
    </div>
  );
}
