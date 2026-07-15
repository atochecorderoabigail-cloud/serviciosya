import { useState } from "react";
import { Search, Edit, Trash2, Plus, Star } from "lucide-react";
import { adminTechnicians } from "../../data/mockData";
import BackHeader from "../../components/BackHeader";
import Modal from "../../components/Modal";

export default function AdminTechnicians() {
  const [techs, setTechs] = useState(adminTechnicians);
  const [query, setQuery] = useState("");
  const [editTech, setEditTech] = useState<typeof adminTechnicians[0] | null>(null);
  const [deleteTech, setDeleteTech] = useState<typeof adminTechnicians[0] | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newTech, setNewTech] = useState({ name: "", email: "", specialty: "", status: "Activo" });

  const filtered = techs.filter((t) =>
    t.name.toLowerCase().includes(query.toLowerCase()) || t.specialty.toLowerCase().includes(query.toLowerCase())
  );

  const handleDelete = () => {
    setTechs((prev) => prev.filter((t) => t.id !== deleteTech!.id));
    setDeleteTech(null);
  };

  const handleEdit = () => {
    setTechs((prev) => prev.map((t) => (t.id === editTech!.id ? editTech! : t)));
    setEditTech(null);
  };

  const handleAdd = () => {
    if (newTech.name && newTech.email) {
      setTechs((prev) => [...prev, { ...newTech, id: Date.now(), avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100" }]);
      setNewTech({ name: "", email: "", specialty: "", status: "Activo" });
      setShowAdd(false);
    }
  };

  return (
    <div className="min-h-full bg-gray-50">
      <BackHeader title="Gestión de Técnicos" />

      <div className="px-5 pt-4">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar técnicos..."
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-gray-200 text-sm text-gray-700 focus:outline-none focus:border-blue-500 transition-all shadow-sm"
          />
        </div>

        <button
          onClick={() => setShowAdd(true)}
          className="w-full py-3 rounded-xl bg-green-600 text-white font-bold text-sm mb-4 active:scale-95 transition-transform flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Agregar Técnico
        </button>

        <div className="space-y-3">
          {filtered.map((t) => (
            <div key={t.id} className="bg-white rounded-2xl shadow-sm p-4 flex items-center gap-3">
              <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-xl object-cover" />
              <div className="flex-1">
                <h3 className="text-sm font-bold text-gray-800">{t.name}</h3>
                <p className="text-xs text-gray-500">{t.email}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 bg-green-50 text-green-600 text-xs font-semibold rounded-full">
                    {t.specialty}
                  </span>
                  <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                    t.status === "Activo" ? "bg-blue-50 text-blue-600" : "bg-gray-100 text-gray-500"
                  }`}>
                    {t.status}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditTech(t)}
                  className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center active:scale-90 transition-transform"
                >
                  <Edit className="w-4 h-4 text-blue-600" />
                </button>
                <button
                  onClick={() => setDeleteTech(t)}
                  className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center active:scale-90 transition-transform"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal open={!!editTech} onClose={() => setEditTech(null)} title="Editar Técnico" onConfirm={handleEdit} confirmText="Guardar">
        {editTech && (
          <div className="space-y-3">
            <input
              type="text"
              value={editTech.name}
              onChange={(e) => setEditTech({ ...editTech, name: e.target.value })}
              placeholder="Nombre"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-blue-500"
            />
            <input
              type="email"
              value={editTech.email}
              onChange={(e) => setEditTech({ ...editTech, email: e.target.value })}
              placeholder="Email"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              value={editTech.specialty}
              onChange={(e) => setEditTech({ ...editTech, specialty: e.target.value })}
              placeholder="Especialidad"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
        )}
      </Modal>

      <Modal open={!!deleteTech} onClose={() => setDeleteTech(null)} title="Eliminar Técnico" onConfirm={handleDelete} confirmText="Eliminar">
        <p className="text-sm text-gray-500">¿Estás seguro de que deseas eliminar a {deleteTech?.name}?</p>
      </Modal>

      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="Agregar Técnico" onConfirm={handleAdd} confirmText="Agregar">
        <div className="space-y-3">
          <input
            type="text"
            value={newTech.name}
            onChange={(e) => setNewTech({ ...newTech, name: e.target.value })}
            placeholder="Nombre completo"
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-blue-500"
          />
          <input
            type="email"
            value={newTech.email}
            onChange={(e) => setNewTech({ ...newTech, email: e.target.value })}
            placeholder="Correo electrónico"
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-blue-500"
          />
          <input
            type="text"
            value={newTech.specialty}
            onChange={(e) => setNewTech({ ...newTech, specialty: e.target.value })}
            placeholder="Especialidad"
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
      </Modal>
    </div>
  );
}
