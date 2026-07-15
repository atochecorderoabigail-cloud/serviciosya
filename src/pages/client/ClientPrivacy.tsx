import { Globe, Lock, Shield } from "lucide-react";
import { useApp } from "../../context/AppContext";
import BackHeader from "../../components/BackHeader";

export default function ClientPrivacy() {
  const { privacy, togglePrivacy } = useApp();

  const fields: { key: keyof typeof privacy; label: string; desc: string }[] = [
    { key: "name", label: "Nombre", desc: "Tu nombre visible para otros" },
    { key: "lastName", label: "Apellidos", desc: "Tus apellidos" },
    { key: "email", label: "Correo electrónico", desc: "Tu email de contacto" },
    { key: "phone", label: "Teléfono", desc: "Tu número de teléfono" },
    { key: "address", label: "Dirección", desc: "Tu dirección de residencia" },
    { key: "birthDate", label: "Fecha de nacimiento", desc: "Tu fecha de nacimiento" },
    { key: "city", label: "Ciudad", desc: "Tu ciudad de residencia" },
  ];

  return (
    <div className="min-h-full bg-gray-50">
      <BackHeader title="Privacidad" />

      <div className="px-5 pt-4">
        <div className="bg-blue-50 rounded-2xl p-4 flex items-center gap-3 mb-4">
          <Shield className="w-6 h-6 text-blue-600 flex-shrink-0" />
          <p className="text-xs text-blue-700">
            Controla quién puede ver cada uno de tus datos personales. Cambia entre Público y Privado en cualquier momento.
          </p>
        </div>

        <div className="space-y-3">
          {fields.map((f) => {
            const isPublic = privacy[f.key];
            return (
              <div key={f.key} className="bg-white rounded-2xl shadow-sm p-4 flex items-center gap-3">
                <div className="flex-1">
                  <span className="text-sm font-semibold text-gray-700 block">{f.label}</span>
                  <span className="text-xs text-gray-400">{f.desc}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-semibold ${isPublic ? "text-green-600" : "text-red-500"}`}>
                    {isPublic ? "Público" : "Privado"}
                  </span>
                  <button
                    onClick={() => togglePrivacy(f.key)}
                    className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                      isPublic ? "bg-green-500" : "bg-red-400"
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-300 flex items-center justify-center ${
                        isPublic ? "left-6" : "left-0.5"
                      }`}
                    >
                      {isPublic ? (
                        <Globe className="w-3 h-3 text-green-600" />
                      ) : (
                        <Lock className="w-3 h-3 text-red-500" />
                      )}
                    </div>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
