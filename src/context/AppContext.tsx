import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { workers } from "../data/mockData";

export type UserRole = "client" | "worker" | "admin" | null;
export type ThemeColor = "blue" | "green" | "violet" | "rose" | "orange" | "teal" | "slate" | "amber";

interface UserProfile {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  birthDate: string;
  city: string;
  avatar: string;
}

interface PrivacySettings {
  name: boolean;
  lastName: boolean;
  email: boolean;
  phone: boolean;
  address: boolean;
  birthDate: boolean;
  city: boolean;
}

export type HireStatus = "pendiente" | "aceptada" | "en_proceso" | "finalizada";

export interface HireRequest {
  id: number;
  workerId: number;
  workerName: string;
  workerAvatar: string;
  specialty: string;
  date: string;
  cost: string;
  status: HireStatus;
}

export interface ChatMessage {
  id: number;
  sender: "client" | "worker";
  text: string;
  time: string;
  type?: "text" | "qr_request" | "qr_code";
  qrMethod?: "Yape" | "Plin";
  qrAmount?: string;
}

export interface PaymentInfo {
  method: string | null;
  paid: boolean;
}

export interface HireNotification {
  id: number;
  requestId: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  profile: UserProfile;
  updateProfile: (data: Partial<UserProfile>) => void;
  favorites: number[];
  toggleFavorite: (id: number) => void;
  privacy: PrivacySettings;
  togglePrivacy: (field: keyof PrivacySettings) => void;
  notificationsRead: Record<number, boolean>;
  markNotificationRead: (id: number) => void;
  hireRequests: HireRequest[];
  sendHireRequest: (workerId: number) => void;
  acceptHireRequest: (id: number) => void;
  cancelHireRequest: (id: number) => void;
  chatMessages: Record<number, ChatMessage[]>;
  sendMessage: (requestId: number, sender: "client" | "worker", text: string) => void;
  payments: Record<number, PaymentInfo>;
  processPayment: (requestId: number, method: string) => void;
  hireNotifications: HireNotification[];
  markHireNotificationRead: (id: number) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  themeColor: ThemeColor;
  setThemeColor: (c: ThemeColor) => void;
  language: "es" | "en";
  setLanguage: (l: "es" | "en") => void;
  notifPrefs: { push: boolean; email: boolean; sms: boolean };
  toggleNotifPref: (k: "push" | "email" | "sms") => void;
}

const defaultProfile: UserProfile = {
  name: "María Fernanda",
  lastName: "García Quispe",
  email: "maria.garcia@email.com",
  phone: "+51 987 654 321",
  address: "Av. Arequipa 1234, Miraflores",
  birthDate: "15/03/1995",
  city: "Lima, Perú",
  avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
};

const defaultPrivacy: PrivacySettings = {
  name: true, lastName: true, email: false,
  phone: false, address: false, birthDate: false, city: true,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

let msgCounter = 1000;
let notifCounter = 2000;

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>(null);
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [privacy, setPrivacy] = useState<PrivacySettings>(defaultPrivacy);
  const [notificationsRead, setNotificationsRead] = useState<Record<number, boolean>>({});
  const [hireRequests, setHireRequests] = useState<HireRequest[]>([]);
  const [chatMessages, setChatMessages] = useState<Record<number, ChatMessage[]>>({});
  const [payments, setPayments] = useState<Record<number, PaymentInfo>>({});
  const [hireNotifications, setHireNotifications] = useState<HireNotification[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [themeColor, setThemeColorState] = useState<ThemeColor>("blue");
  const [language, setLanguage] = useState<"es" | "en">("es");
  const [notifPrefs, setNotifPrefs] = useState({ push: true, email: false, sms: false });

  // Apply theme to DOM immediately on change
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeColor);
  }, [themeColor]);

  // Apply dark mode to DOM immediately on change
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  const setThemeColor = (c: ThemeColor) => setThemeColorState(c);
  const toggleDarkMode = () => setDarkMode((p) => !p);
  const toggleNotifPref = (k: "push" | "email" | "sms") =>
    setNotifPrefs((p) => ({ ...p, [k]: !p[k] }));

  const updateProfile = (data: Partial<UserProfile>) =>
    setProfile((prev) => ({ ...prev, ...data }));

  const toggleFavorite = (id: number) =>
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [id, ...prev]));

  const togglePrivacy = (field: keyof PrivacySettings) =>
    setPrivacy((prev) => ({ ...prev, [field]: !prev[field] }));

  const markNotificationRead = (id: number) =>
    setNotificationsRead((prev) => ({ ...prev, [id]: true }));

  const sendHireRequest = (workerId: number) => {
    const worker = workers.find((w) => w.id === workerId);
    if (!worker) return;
    const reqId = Date.now();
    const newRequest: HireRequest = {
      id: reqId,
      workerId: worker.id,
      workerName: worker.name,
      workerAvatar: worker.avatar,
      specialty: worker.specialty,
      date: new Date().toLocaleDateString("es-PE", { day: "2-digit", month: "short", year: "numeric" }),
      cost: worker.price,
      status: "pendiente",
    };
    setHireRequests((prev) => [newRequest, ...prev]);
    const notifId = notifCounter++;
    setHireNotifications((prev) => [
      { id: notifId, requestId: reqId, title: "Solicitud enviada", message: `Tu solicitud a ${worker.name} fue enviada. Esperando confirmación.`, time: "Ahora", read: false },
      ...prev,
    ]);
    setTimeout(() => {
      setHireRequests((prev) => prev.map((r) => (r.id === reqId ? { ...r, status: "aceptada" } : r)));
      const acceptNotifId = notifCounter++;
      setHireNotifications((prev) => [
        { id: acceptNotifId, requestId: reqId, title: "Solicitud aceptada", message: `${worker.name} aceptó tu solicitud. Ya puedes chatear con él.`, time: "Ahora", read: false },
        ...prev,
      ]);
      setChatMessages((prev) => ({
        ...prev,
        [reqId]: [{ id: msgCounter++, sender: "worker", text: `Hola, soy ${worker.name}. Acepté tu solicitud de servicio de ${worker.specialty.toLowerCase()}. ¿En qué te puedo ayudar?`, time: new Date().toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" }) }],
      }));
    }, 3000);
  };

  const acceptHireRequest = (id: number) =>
    setHireRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: "en_proceso" } : r)));

  const cancelHireRequest = (id: number) =>
    setHireRequests((prev) => prev.filter((r) => r.id !== id));

  const sendMessage = (requestId: number, sender: "client" | "worker", text: string) => {
    const msg: ChatMessage = { id: msgCounter++, sender, text, time: new Date().toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" }) };
    setChatMessages((prev) => ({ ...prev, [requestId]: [...(prev[requestId] || []), msg] }));
    if (sender === "client") {
      setTimeout(() => {
        const replies = ["Entendido, nos vemos entonces.", "Perfecto, llego puntual.", "Claro que sí, cualquier duda me avisas.", "Está bien, llevo todo lo necesario."];
        const reply: ChatMessage = { id: msgCounter++, sender: "worker", text: replies[Math.floor(Math.random() * replies.length)], time: new Date().toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" }) };
        setChatMessages((prev) => ({ ...prev, [requestId]: [...(prev[requestId] || []), reply] }));
      }, 2000);
    }
  };

  const processPayment = (requestId: number, method: string) =>
    setPayments((prev) => ({ ...prev, [requestId]: { method, paid: true } }));

  const markHireNotificationRead = (id: number) =>
    setHireNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));

  return (
    <AppContext.Provider value={{
      role, setRole, profile, updateProfile, favorites, toggleFavorite,
      privacy, togglePrivacy, notificationsRead, markNotificationRead,
      hireRequests, sendHireRequest, acceptHireRequest, cancelHireRequest,
      chatMessages, sendMessage, payments, processPayment,
      hireNotifications, markHireNotificationRead,
      darkMode, toggleDarkMode, themeColor, setThemeColor,
      language, setLanguage, notifPrefs, toggleNotifPref,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
