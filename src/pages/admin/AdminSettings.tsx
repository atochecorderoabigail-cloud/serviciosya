import { Bell, Globe, Moon, Shield, Database, Mail, ChevronRight } from "lucide-react";
import BackHeader from "../../components/BackHeader";

export default function AdminSettings() {
  const settings = [
    { icon: Bell, label: "Notificaciones del Sistema", desc: "Alertas globales", color: "text-orange-500 bg-orange-50" },
    { icon: Globe, label: "Idioma del Sistema", desc: "Español", color: "text-green-500 bg-green-50" },
    { icon: Moon, label: "Tema", desc: "Claro / Oscuro", color: "text-purple-500 bg-purple-50" },
    { icon: Shield, label: "Seguridad", desc: "Políticas de acceso", color: "text-red-500 bg-red-50" },
    { icon: Database, label: "Base de Datos", desc: "Respaldo y mantenimiento", color: "text-blue-500 bg-blue-50" },
    { icon: Mail, label: "Correo del Sistema", desc: "Configuración SMTP", color: "text-cyan-500 bg-cyan-50" },
  ];

  return (
    <div className="min-h-full bg-gray-50">
      <BackHeader title="Configuraciones del Sistema" />

      <div className="px-5 pt-4 space-y-2">
        {settings.map((s, i) => {
          const Icon = s.icon;
          return (
            <button
              key={i}
              className="w-full bg-white rounded-2xl shadow-sm p-4 flex items-center gap-3 active:scale-98 transition-transform"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 text-left">
                <span className="text-sm font-semibold text-gray-700 block">{s.label}</span>
                <span className="text-xs text-gray-400">{s.desc}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300" />
            </button>
          );
        })}
      </div>

      <div className="px-5 mt-6">
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <h3 className="text-sm font-bold text-gray-800 mb-3">Información del Sistema</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Versión:</span>
              <span className="font-semibold text-gray-700">2.1.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Usuarios activos:</span>
              <span className="font-semibold text-gray-700">1,248</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Técnicos activos:</span>
              <span className="font-semibold text-gray-700">342</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Servicios completados:</span>
              <span className="font-semibold text-gray-700">8,560</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
