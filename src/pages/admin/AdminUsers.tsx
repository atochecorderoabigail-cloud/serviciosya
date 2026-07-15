import { useState } from "react";
import { Search, Edit, Trash2, Plus, X, UserPlus } from "lucide-react";
import { adminUsers } from "../../data/mockData";
import BackHeader from "../../components/BackHeader";
import Modal from "../../components/Modal";

export default function AdminUsers() {
  const [users, setUsers] = useState(adminUsers);
  const [query, setQuery] = useState("");
  const [editUser, setEditUser] = useState<typeof adminUsers[0] | null>(null);
  const [deleteUser, setDeleteUser] = useState<typeof adminUsers[0] | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "Cliente" });

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(query.toLowerCase()) || u.email.toLowerCase().includes(query.toLowerCase())
  );

  const handleDelete = () => {
    setUsers((prev) => prev.filter((u) => u.id !== deleteUser!.id));
    setDeleteUser(null);
  };

  const handleEdit = () => {
    setUsers((prev) => prev.map((u) => (u.id === editUser!.id ? editUser! : u)));
    setEditUser(null);
  };

  const handleAdd = () => {
    if (newUser.name && newUser.email) {
      setUsers((prev) => [...prev, { ...newUser, id: Date.now(), avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100" }]);
      setNewUser({ name: "", email: "", role: "Cliente" });
      setShowAdd(false);
    }
  };

  return (
    <div className="min-h-full bg-gray-50">
      <BackHeader title="Gestión de Usuarios" />

      <div className="px-5 pt-4">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar usuarios..."
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-gray-200 text-sm text-gray-700 focus:outline-none focus:border-blue-500 transition-all shadow-sm"
          />
        </div>

        <button
          onClick={() => setShowAdd(true)}
          className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold text-sm mb-4 active:scale-95 transition-transform flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Agregar Usuario
        </button>

        <div className="space-y-3">
          {filtered.map((u) => (
            <div key={u.id} className="bg-white rounded-2xl shadow-sm p-4 flex items-center gap-3">
              <img src={u.avatar} alt={u.name} className="w-12 h-12 rounded-xl object-cover" />
              <div className="flex-1">
                <h3 className="text-sm font-bold text-gray-800">{u.name}</h3>
                <p className="text-xs text-gray-500">{u.email}</p>
                <span className="inline-block mt-1 px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full">
                  {u.role}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditUser(u)}
                  className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center active:scale-90 transition-transform"
                >
                  <Edit className="w-4 h-4 text-blue-600" />
                </button>
                <button
                  onClick={() => setDeleteUser(u)}
                  className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center active:scale-90 transition-transform"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal open={!!editUser} onClose={() => setEditUser(null)} title="Editar Usuario" onConfirm={handleEdit} confirmText="Guardar">
        {editUser && (
          <div className="space-y-3">
            <input
              type="text"
              value={editUser.name}
              onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
              placeholder="Nombre"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-blue-500"
            />
            <input
              type="email"
              value={editUser.email}
              onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
              placeholder="Email"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
        )}
      </Modal>

      <Modal open={!!deleteUser} onClose={() => setDeleteUser(null)} title="Eliminar Usuario" onConfirm={handleDelete} confirmText="Eliminar">
        <p className="text-sm text-gray-500">¿Estás seguro de que deseas eliminar a {deleteUser?.name}?</p>
      </Modal>

      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="Agregar Usuario" onConfirm={handleAdd} confirmText="Agregar">
        <div className="space-y-3">
          <input
            type="text"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            placeholder="Nombre completo"
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-blue-500"
          />
          <input
            type="email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            placeholder="Correo electrónico"
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
      </Modal>
    </div>
  );
}
