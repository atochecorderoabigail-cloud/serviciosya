import { useNavigate } from "react-router-dom";
import {
  Edit2, Settings, Clock, Star, Moon, Sun,
  LogOut, ChevronRight, ShieldCheck, MapPin,
  Phone, Mail, Briefcase, Bell, Image, Award,
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import { workers } from "../../data/mockData";
import PageContainer from "../../components/PageContainer";

export default function WorkerProfile() {
  const navigate = useNavigate();
  const { profile, setRole, darkMode, toggleDarkMode, hireRequests } = useApp();
  const worker = workers[0];

  const completedCount = hireRequests.filter((r) => r.status === "finalizada").length;

  const quickActions = [
    { icon: <Edit2 className="w-5 h-5" />, label: "Editar perfil", color: "#0044cc", bg: "#eff6ff", action: () => navigate("/worker/edit-profile") },
    { icon: <Clock className="w-5 h-5" />, label: "Historial", color: "#0d9488", bg: "#f0fdfa", action: () => navigate("/worker/history") },
    { icon: <Image className="w-5 h-5" />, label: "Galería", color: "#7c3aed", bg: "#f5f3ff", action: () => navigate("/worker/gallery") },
    { icon: <Settings className="w-5 h-5" />, label: "Config.", color: "#ea580c", bg: "#fff7ed", action: () => navigate("/worker/settings") },
  ];

  const menuItems = [
    { icon: <Bell className="w-4 h-4" />, label: "Notificaciones", sub: "Ver alertas recientes", color: "#2563eb", action: () => navigate("/worker/notifications") },
    { icon: <Award className="w-4 h-4" />, label: "Certificados", sub: "Mis certificaciones", color: "#0891b2", action: () => navigate("/worker/certificates") },
    { icon: <ShieldCheck className="w-4 h-4" />, label: "Privacidad", sub: "Control de visibilidad", color: "#059669", action: () => navigate("/worker/privacy") },
    { icon: <Settings className="w-4 h-4" />, label: "Configuración", sub: "Opciones avanzadas", color: "#7c3aed", action: () => navigate("/worker/settings") },
  ];

  return (
    <PageContainer>
      {/* Hero */}
      <div className="relative px-4 pt-5 pb-24"
        style={{ background: "linear-gradient(150deg, var(--grad-from) 0%, var(--color-primary) 55%, var(--color-accent) 100%)" }}>
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%)" }} />

        <div className="flex justify-between items-center mb-6">
          <span className="text-white font-black text-base">Mi Perfil</span>
          <div className="flex items-center gap-2">
            <button onClick={toggleDarkMode}
              className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center active:scale-90 transition-transform">
              {darkMode ? <Sun className="w-4 h-4 text-yellow-300" /> : <Moon className="w-4 h-4 text-white" />}
            </button>
            <button onClick={() => navigate("/worker/settings")}
              className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center active:scale-90 transition-transform">
              <Settings className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <img src={worker.avatar} alt={worker.name}
              className="w-20 h-20 rounded-2xl object-cover border-4 border-white/30 shadow-lg" />
            <button onClick={() => navigate("/worker/edit-profile")}
              className="absolute -bottom-2 -right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md active:scale-90">
              <Edit2 className="w-3.5 h-3.5 text-green-700" />
            </button>
          </div>
          <div className="flex-1">
            <h2 className="text-white font-extrabold text-lg leading-tight">{profile.name} {profile.lastName}</h2>
            <div className="flex items-center gap-1 mt-1">
              <Briefcase className="w-3 h-3 text-green-200" />
              <span className="text-green-200 text-xs font-medium">{worker.specialty}</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1 bg-white/15 rounded-full px-2.5 py-1">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                <span className="text-white text-xs font-bold">{worker.rating}</span>
                <span className="text-green-200 text-[10px]">({worker.reviews})</span>
              </div>
              <div className="bg-white/15 rounded-full px-2.5 py-1">
                <span className="text-white text-xs font-bold">{worker.experience} exp.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="px-4 -mt-14">
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
          <div className="grid grid-cols-4 gap-1">
            {quickActions.map((a) => (
              <button key={a.label} onClick={a.action}
                className="flex flex-col items-center gap-1.5 p-2 rounded-xl active:scale-95 transition-all">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: a.bg, color: a.color }}>
                  {a.icon}
                </div>
                <span className="text-[10px] font-semibold text-gray-600 text-center leading-tight">{a.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Contact info */}
      <div className="px-4 mt-4">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1 mb-2">Información personal</p>
        <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
          {[
            { icon: <Mail className="w-4 h-4 text-gray-400" />, value: profile.email },
            { icon: <Phone className="w-4 h-4 text-gray-400" />, value: profile.phone },
            { icon: <MapPin className="w-4 h-4 text-gray-400" />, value: profile.city },
          ].map((row, i) => (
            <div key={i} className={`flex items-center gap-3 px-4 py-3 ${i < 2 ? "border-b border-gray-100" : ""}`}>
              {row.icon}
              <span className="text-sm text-gray-600">{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 mt-4">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Solicitudes", value: hireRequests.length, color: "#0044cc" },
            { label: "Completados", value: worker.completedJobs, color: "#059669" },
            { label: "Reseñas", value: worker.reviews, color: "#d97706" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-3 text-center border border-gray-100 shadow-sm">
              <p className="text-xl font-black" style={{ color: s.color }}>{s.value}</p>
              <p className="text-[10px] text-gray-500 font-medium mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Services list */}
      <div className="px-4 mt-4">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1 mb-2">Servicios ofrecidos</p>
        <div className="flex flex-wrap gap-2">
          {worker.services.map((s) => (
            <span key={s} className="px-3 py-1.5 rounded-full text-xs font-semibold text-green-700 bg-green-50 border border-green-100">
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Menu */}
      <div className="px-4 mt-4">
        <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
          {menuItems.map((item, i) => (
            <button key={i} onClick={item.action}
              className={`w-full flex items-center gap-3 px-4 py-3.5 active:bg-gray-50 transition-colors ${i < menuItems.length - 1 ? "border-b border-gray-100" : ""}`}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: item.color + "15", color: item.color }}>
                {item.icon}
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-bold text-gray-800">{item.label}</p>
                <p className="text-xs text-gray-500">{item.sub}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300" />
            </button>
          ))}
        </div>
      </div>

      {/* Dark mode */}
      <div className="px-4 mt-3">
        <div className="bg-white rounded-2xl px-4 py-3.5 flex items-center gap-3 border border-gray-100 shadow-sm">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#fef3c7", color: "#d97706" }}>
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-gray-800">Tema {darkMode ? "claro" : "oscuro"}</p>
            <p className="text-xs text-gray-500">{darkMode ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}</p>
          </div>
          <button onClick={toggleDarkMode}
            className="relative w-12 h-6 rounded-full transition-colors duration-200"
            style={{ background: darkMode ? "#166534" : "#e5e7eb" }}>
            <span className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200"
              style={{ left: darkMode ? "26px" : "2px" }} />
          </button>
        </div>
      </div>

      {/* Logout */}
      <div className="px-4 mt-4 mb-8">
        <button onClick={() => setRole(null)}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-red-600 font-bold text-sm border-2 border-red-100 bg-red-50 active:scale-95 transition-all">
          <LogOut className="w-4 h-4" />
          Cerrar sesión
        </button>
      </div>
    </PageContainer>
  );
}
