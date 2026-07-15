import { useNavigate } from "react-router-dom";
import {
  Edit2, Settings, Clock, Heart, Moon, Sun,
  LogOut, ChevronRight, ShieldCheck, Star, MapPin,
  Phone, Mail, User, Bell,
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import PageContainer from "../../components/PageContainer";

export default function ClientProfile() {
  const navigate = useNavigate();
  const { profile, role, setRole, darkMode, toggleDarkMode, hireRequests, favorites } = useApp();

  const completedCount = hireRequests.filter((r) => r.status === "finalizada").length;

  const quickActions = [
    { icon: <Edit2 className="w-5 h-5" />, label: "Editar perfil", color: "var(--color-primary)", bg: "var(--color-primary-light)", action: () => navigate("/client/edit-profile") },,
    { icon: <Clock className="w-5 h-5" />, label: "Mi historial", color: "#0d9488", bg: "#f0fdfa", action: () => navigate("/client/history") },
    { icon: <Heart className="w-5 h-5" />, label: "Favoritos", color: "#e11d48", bg: "#fff1f2", action: () => navigate("/client/favorites") },
    { icon: <Settings className="w-5 h-5" />, label: "Configuración", color: "var(--color-primary)", bg: "var(--color-primary-light)", action: () => navigate("/client/settings") },
  ];

  const menuItems = [
    { icon: <Bell className="w-4 h-4" />, label: "Notificaciones", sub: "Gestionar alertas", color: "var(--color-primary)", action: () => navigate("/client/notifications") },,
    { icon: <ShieldCheck className="w-4 h-4" />, label: "Privacidad", sub: "Control de visibilidad", color: "#0891b2", action: () => navigate("/client/privacy") },
    { icon: <Settings className="w-4 h-4" />, label: "Configuración", sub: "Opciones avanzadas", color: "var(--color-primary)", action: () => navigate("/client/settings") },
  ];

  return (
    <PageContainer>
      {/* Header */}
      <div className="relative px-4 pt-5 pb-24"
        style={{ background: "linear-gradient(150deg, var(--grad-from) 0%, var(--color-primary) 60%, var(--color-accent) 100%)" }}>
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%)" }} />

        {/* Top actions */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-white font-black text-base tracking-tight">Mi Perfil</span>
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button onClick={toggleDarkMode}
              className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center active:scale-90 transition-transform">
              {darkMode ? <Sun className="w-4 h-4 text-yellow-300" /> : <Moon className="w-4 h-4 text-white" />}
            </button>
            {/* Settings shortcut */}
            <button onClick={() => navigate("/client/settings")}
              className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center active:scale-90 transition-transform">
              <Settings className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Avatar + info */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <img src={profile.avatar} alt={profile.name}
              className="w-20 h-20 rounded-2xl object-cover border-4 border-white/30 shadow-lg" />
            <button onClick={() => navigate("/client/edit-profile")}
              className="absolute -bottom-2 -right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md active:scale-90">
              <Edit2 className="w-3.5 h-3.5 text-blue-700" />
            </button>
          </div>
          <div className="flex-1">
            <h2 className="text-white font-extrabold text-lg leading-tight">{profile.name} {profile.lastName}</h2>
            <div className="flex items-center gap-1 mt-1">
              <User className="w-3 h-3 text-blue-200" />
              <span className="text-blue-200 text-xs font-medium">Cliente verificado</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1 bg-white/15 rounded-full px-2.5 py-1">
                <Star className="w-3 h-3 text-yellow-400" />
                <span className="text-white text-xs font-bold">4.9</span>
              </div>
              <div className="flex items-center gap-1 bg-white/15 rounded-full px-2.5 py-1">
                <Clock className="w-3 h-3 text-blue-200" />
                <span className="text-white text-xs font-bold">{completedCount} servicios</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick actions card (overlapping hero) */}
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
            { label: "Favoritos", value: favorites.length, color: "#e11d48" },
            { label: "Completados", value: completedCount, color: "#059669" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-3 text-center border border-gray-100 shadow-sm">
              <p className="text-xl font-black" style={{ color: s.color }}>{s.value}</p>
              <p className="text-[10px] text-gray-500 font-medium mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Menu */}
      <div className="px-4 mt-4">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1 mb-2">Opciones</p>
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

      {/* Dark mode row */}
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
            style={{ background: darkMode ? "var(--color-primary)" : "#e5e7eb" }}>
            <span className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200"
              style={{ left: darkMode ? "26px" : "2px" }} />
          </button>
        </div>
      </div>

      {/* Logout */}
      <div className="px-4 mt-4 mb-8">
        <button onClick={() => { setRole(null); }}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-red-600 font-bold text-sm border-2 border-red-100 bg-red-50 active:scale-95 transition-all">
          <LogOut className="w-4 h-4" />
          Cerrar sesión
        </button>
      </div>
    </PageContainer>
  );
}
