import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import MobileFrame from "./components/MobileFrame";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyCode from "./pages/auth/VerifyCode";
import ResetPassword from "./pages/auth/ResetPassword";

import ClientHome from "./pages/client/ClientHome";
import ClientSearch from "./pages/client/ClientSearch";
import ClientHistory from "./pages/client/ClientHistory";
import ClientNotifications from "./pages/client/ClientNotifications";
import ClientProfile from "./pages/client/ClientProfile";
import ClientFavorites from "./pages/client/ClientFavorites";
import ClientPending from "./pages/client/ClientPending";
import WorkerProfile from "./pages/client/WorkerProfile";
import EditProfile from "./pages/client/EditProfile";
import ClientSettings from "./pages/client/ClientSettings";
import ClientPrivacy from "./pages/client/ClientPrivacy";
import ClientChat from "./pages/client/ClientChat";

import WorkerHome from "./pages/worker/WorkerHome";
import WorkerSearch from "./pages/worker/WorkerSearch";
import WorkerHistory from "./pages/worker/WorkerHistory";
import WorkerNotifications from "./pages/worker/WorkerNotifications";
import WorkerProfilePage from "./pages/worker/WorkerProfile";
import WorkerEditProfile from "./pages/worker/WorkerEditProfile";
import WorkerGallery from "./pages/worker/WorkerGallery";
import WorkerCertificates from "./pages/worker/WorkerCertificates";
import WorkerSettings from "./pages/worker/WorkerSettings";
import WorkerPrivacy from "./pages/worker/WorkerPrivacy";

import AdminPanel from "./pages/admin/AdminPanel";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminTechnicians from "./pages/admin/AdminTechnicians";
import AdminSettings from "./pages/admin/AdminSettings";

export default function App() {
  return (
    <AppProvider>
      <MobileFrame>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-code" element={<VerifyCode />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            <Route path="/client" element={<ClientHome />} />
            <Route path="/client/search" element={<ClientSearch />} />
            <Route path="/client/history" element={<ClientHistory />} />
            <Route path="/client/notifications" element={<ClientNotifications />} />
            <Route path="/client/profile" element={<ClientProfile />} />
            <Route path="/client/favorites" element={<ClientFavorites />} />
            <Route path="/client/pending" element={<ClientPending />} />
            <Route path="/client/worker/:id" element={<WorkerProfile />} />
            <Route path="/client/edit-profile" element={<EditProfile />} />
            <Route path="/client/settings" element={<ClientSettings />} />
            <Route path="/client/privacy" element={<ClientPrivacy />} />
            <Route path="/client/chat/:requestId" element={<ClientChat />} />

            <Route path="/worker" element={<WorkerHome />} />
            <Route path="/worker/search" element={<WorkerSearch />} />
            <Route path="/worker/history" element={<WorkerHistory />} />
            <Route path="/worker/notifications" element={<WorkerNotifications />} />
            <Route path="/worker/profile" element={<WorkerProfilePage />} />
            <Route path="/worker/edit-profile" element={<WorkerEditProfile />} />
            <Route path="/worker/gallery" element={<WorkerGallery />} />
            <Route path="/worker/certificates" element={<WorkerCertificates />} />
            <Route path="/worker/settings" element={<WorkerSettings />} />
            <Route path="/worker/privacy" element={<WorkerPrivacy />} />

            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/technicians" element={<AdminTechnicians />} />
            <Route path="/admin/settings" element={<AdminSettings />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </MobileFrame>
    </AppProvider>
  );
}
