import { useNavigate, useLocation } from "react-router-dom";
import { Home, Search, ClipboardList, Bell, User } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { role } = useApp();

  const basePath = role === "worker" ? "/worker" : "/client";

  const items = [
    { icon: Home,          label: "Inicio",   path: basePath },
    { icon: Search,        label: "Buscar",   path: `${basePath}/search` },
    { icon: ClipboardList, label: "Historial",path: `${basePath}/history` },
    { icon: Bell,          label: "Notif",    path: `${basePath}/notifications` },
    { icon: User,          label: "Perfil",   path: `${basePath}/profile` },
  ];

  const isActive = (path: string) =>
    path === basePath ? location.pathname === basePath : location.pathname.startsWith(path);

  return (
    <div
      className="sticky bottom-0 left-0 right-0 px-2 py-1.5 flex items-center justify-around z-40"
      style={{
        background: "var(--color-nav-bg)",
        borderTop: "1px solid var(--color-nav-border)",
        boxShadow: "0 -2px 10px rgba(0,0,0,0.05)",
      }}
    >
      {items.map((item) => {
        const active = isActive(item.path);
        const Icon = item.icon;
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className="flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition-all active:scale-90"
          >
            <Icon
              className="w-5 h-5 transition-colors"
              style={{ color: active ? "var(--color-primary)" : "var(--color-subtext)" }}
              strokeWidth={active ? 2.5 : 2}
            />
            <span
              className="text-[10px] font-medium transition-colors"
              style={{ color: active ? "var(--color-primary)" : "var(--color-subtext)" }}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
