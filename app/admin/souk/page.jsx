'use client';

import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, X } from "lucide-react";

export default function SoukAdmin() {
  const [souks, setSouks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  // Charger tous les souks
  const fetchSouks = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/souk`);
      const data = await res.json();
      const soukArray = Array.isArray(data) ? data : [];
      setSouks(soukArray);
    } catch (error) {
      console.error("Erreur fetch souks :", error);
      setSouks([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSouks();
  }, []);

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { title, description, imageUrl };

    try {
      let res;
      if (editingId) {
        res = await fetch(`/api/souk/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      } else {
        res = await fetch("/api/souk", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      }

      if (!res.ok) {
        const errorData = await res.json();
        alert("❌ Erreur : " + (errorData.error || "Erreur inconnue"));
        return;
      }

      showMessage(editingId ? "✅ Élément modifié !" : "✅ Élément ajouté !");
      setTitle("");
      setDescription("");
      setImageUrl("");
      setEditingId(null);
      setShowForm(false);
      fetchSouks();
    } catch (err) {
      alert("❌ Erreur lors de l'enregistrement");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("⚠️ Confirmer la suppression ?")) return;
    try {
      const res = await fetch(`/api/souk/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const errorData = await res.json();
        alert("❌ Erreur suppression : " + (errorData.error || "Erreur serveur"));
        return;
      }
      alert("✅ Supprimé avec succès !");
      fetchSouks();
    } catch (err) {
      alert("❌ Erreur lors de la suppression");
      console.error(err);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setTitle(item.title);
    setDescription(item.description);
    setImageUrl(item.imageUrl);
    setShowForm(true);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setImageUrl("");
    setShowForm(false); // <-- Fermeture du formulaire ici
  };

  return (
    <div className="p-8 max-w-7xl mx-auto font-sans">
      <h1 className="text-4xl font-extrabold mb-6 text-primary tracking-wide">
        🕌 Admin - Souk
      </h1>

      {message && (
        <div className="mb-6 max-w-lg mx-auto bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
          {message}
        </div>
      )}

      <div className="flex justify-end mb-6">
        <button
          onClick={() => {
            if (!showForm) {
              setShowForm(true);
              setEditingId(null);
              setTitle("");
              setDescription("");
              setImageUrl("");
            } else {
              setShowForm(false);
            }
          }}
          className="flex items-center gap-2 px-6 py-3 rounded-full border border-primary 
          bg-white text-primary hover:bg-primary hover:text-white transition duration-300"
        >
          <Plus size={18} />
          {showForm ? "Fermer le formulaire" : "Ajouter un élément"}
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br bg-opacity-40 backdrop-blur-sm">
          <div className="relative w-full max-w-lg mx-auto rounded-xl shadow-lg p-8 bg-white">
            {/* Bouton fermeture X */}
            <button
              onClick={handleCancelEdit}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
              aria-label="Fermer le formulaire"
            >
              <X size={24} />
            </button>

            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Titre</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-full px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 hover:border-primary focus:ring-primary"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={3}
                  className="w-full border border-gray-300 rounded-full px-4 py-3 text-gray-900 focus:outline-none hover:border-primary focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">URL de l'image</label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-full px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 hover:border-primary focus:ring-primary"
                />
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-primary text-primary hover:bg-[#87131d] hover:text-white rounded-full"
                >
                  <Plus size={18} /> {editingId ? "Modifier" : "Ajouter"}
                </button>

                {editingId && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-white rounded shadow-md"
                  >
                    <X size={18} /> Annuler
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tableau des éléments */}
      {loading ? (
        <p className="text-center text-gray-500 py-6">Chargement...</p>
      ) : (
        <table className="w-full text-sm text-left text-gray-700 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-primary text-white uppercase text-xs">
            <tr>
              <th className="px-6 py-4">Image</th>
              <th className="px-6 py-4">Titre</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {souks?.map((item) => (
              <tr key={item.id} className="bg-white border-b hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-24 h-14 object-cover rounded-md border"
                  />
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">{item.title}</td>
                <td className="px-6 py-4 text-gray-800">{item.description}</td>
                <td className="px-6 py-4 flex items-center justify-center gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-600 hover:text-blue-800 hover:bg-blue-100 p-2 rounded-full"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-800 hover:bg-red-100 p-2 rounded-full"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
