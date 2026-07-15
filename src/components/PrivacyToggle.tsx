import { Globe, Lock } from "lucide-react";
import { useApp } from "../context/AppContext";

interface PrivacyToggleProps {
  field: "name" | "lastName" | "email" | "phone" | "address" | "birthDate" | "city";
}

export default function PrivacyToggle({ field }: PrivacyToggleProps) {
  const { privacy, togglePrivacy } = useApp();
  const isPublic = privacy[field];

  return (
    <div className="relative group">
      <button
        onClick={() => togglePrivacy(field)}
        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 active:scale-90 ${
          isPublic
            ? "bg-green-50 hover:bg-green-100"
            : "bg-red-50 hover:bg-red-100"
        }`}
      >
        {isPublic ? (
          <Globe className="w-4 h-4 text-green-600 transition-transform duration-300" />
        ) : (
          <Lock className="w-4 h-4 text-red-500 transition-transform duration-300" />
        )}
      </button>
      <div className="absolute right-0 top-full mt-1 px-3 py-1.5 bg-gray-800 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-50 shadow-lg">
        {isPublic ? "Este dato será visible para otros usuarios" : "Solo tú podrás ver este dato"}
      </div>
    </div>
  );
}
