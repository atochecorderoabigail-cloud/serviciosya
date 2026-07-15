import { useNavigate } from "react-router-dom";
import { Users, Wrench, Settings, ChevronRight, Shield } from "lucide-react";
import BackHeader from "../../components/BackHeader";

export default function AdminPanel() {
  const navigate = useNavigate();

  const modules = [
    { icon: Users, label: "Usuarios", desc: "Gestión de clientes", path: "/admin/users", color: "text-blue-600 bg-blue-50" },
    { icon: Wrench, label: "Técnicos", desc: "Gestión de trabajadores", path: "/admin/technicians", color: "text-green-600 bg-green-50" },
    { icon: Settings, label: "Configuraciones", desc: "Ajustes del sistema", path: "/admin/settings", color: "text-purple-600 bg-purple-50" },
  ];

  return (
    <div className="min-h-full bg-gray-50">
      <BackHeader title="Panel de Administración" />

      <div className="px-5 pt-4">
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-5 text-white mb-5">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8" />
            <div>
              <h2 className="text-lg font-bold">Administrador</h2>
              <p className="text-xs text-blue-100">Gestión completa del sistema</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <button
                key={m.path}
                onClick={() => navigate(m.path)}
                className="w-full bg-white rounded-2xl shadow-sm p-4 flex items-center gap-3 active:scale-98 transition-transform"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${m.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 text-left">
                  <span className="text-sm font-bold text-gray-800 block">{m.label}</span>
                  <span className="text-xs text-gray-400">{m.desc}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
