import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, MapPin, Calendar, Save, CheckCircle } from "lucide-react";
import { useApp } from "../../context/AppContext";
import BackHeader from "../../components/BackHeader";
import PrivacyToggle from "../../components/PrivacyToggle";

export default function EditProfile() {
  const navigate = useNavigate();
  const { profile, updateProfile } = useApp();
  const [form, setForm] = useState({
    name: profile.name,
    lastName: profile.lastName,
    email: profile.email,
    phone: profile.phone,
    address: profile.address,
    birthDate: profile.birthDate,
    city: profile.city,
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateProfile(form);
    setSaved(true);
    setTimeout(() => {
      navigate(-1);
    }, 1200);
  };

  const fields = [
    { key: "name", label: "Nombre", icon: User, type: "text" },
    { key: "lastName", label: "Apellidos", icon: User, type: "text" },
    { key: "email", label: "Correo electrónico", icon: Mail, type: "email" },
    { key: "phone", label: "Teléfono", icon: Phone, type: "tel" },
    { key: "address", label: "Dirección", icon: MapPin, type: "text" },
    { key: "birthDate", label: "Fecha de nacimiento", icon: Calendar, type: "text" },
    { key: "city", label: "Ciudad", icon: MapPin, type: "text" },
  ];

  return (
    <div className="min-h-full bg-gray-50">
      <BackHeader title="Editar Perfil" />

      <div className="px-5 pt-4">
        <div className="flex flex-col items-center mb-6">
          <img src={profile.avatar} alt={profile.name} className="w-20 h-20 rounded-full object-cover shadow-md" />
          <p className="text-xs text-gray-400 mt-2">Toca la foto para cambiarla</p>
        </div>

        <div className="space-y-4">
          {fields.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.key}>
                <label className="text-xs font-semibold text-gray-500 mb-1.5 block">{f.label}</label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={f.type}
                      value={form[f.key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-gray-200 text-sm text-gray-700 focus:outline-none focus:border-blue-500 transition-all"
                    />
                  </div>
                  <PrivacyToggle field={f.key as "name" | "lastName" | "email" | "phone" | "address" | "birthDate" | "city"} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6">
          <button
            onClick={handleSave}
            className="w-full py-3.5 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2"
          >
            {saved ? (
              <>
                <CheckCircle className="w-5 h-5" />
                ¡Guardado!
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Guardar Cambios
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
