'use client';

import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import Image from "next/image";

export default function RestaurantAdmin() {
  const [restaurants, setRestaurants] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [editingRestaurant, setEditingRestaurant] = useState(null);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);

  // Chargement initial de tous les restaurants
  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const res = await fetch("/api/restaurant");
      const data = await res.json();
      setRestaurants(data);
    } catch (err) {
      alert("Erreur lors du chargement des restaurants");
    }
  };

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { title, description, imageUrl };
    let res;

    try {
      if (editingRestaurant) {
        res = await fetch(`/api/restaurant/${editingRestaurant.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        showMessage("✅ Modifié avec succès !");
      } else {
        res = await fetch(`/api/restaurant`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        showMessage("✅ Ajouté avec succès !");
      }

      if (!res.ok) throw new Error("Erreur lors de l'enregistrement");

      setTitle("");
      setDescription("");
      setImageUrl("");
      setEditingRestaurant(null);
      setShowForm(false);
      await fetchRestaurants();
    } catch (err) {
      alert("❌ Échec");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("⚠️ Supprimer ?")) return;
    const res = await fetch(`/api/restaurant/${id}`, { method: "DELETE" });
    if (res.ok) {
      await fetchRestaurants();
      showMessage("✅ Supprimé !");
    } else {
      alert("❌ Échec de suppression");
    }
  };

  const handleEdit = (item) => {
    setEditingRestaurant(item);
    setTitle(item.title);
    setDescription(item.description);
    setImageUrl(item.imageUrl);
    setShowForm(true);
  };

  const handleCancelEdit = () => {
    setEditingRestaurant(null);
    setTitle("");
    setDescription("");
    setImageUrl("");
    setShowForm(false);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto font-sans">
      <h1 className="text-4xl font-extrabold mb-4 text-primary">🍽️ Admin - Restaurants</h1>

      {/* Message succès */}
      {message && (
        <div className="mb-6 max-w-lg mx-auto bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          {message}
        </div>
      )}

      {/* bouton afficher formulaire */}
      <div className="flex justify-end mb-6">
       <button
        onClick={() => {
          if (!showForm) {
            // formulaire fermé, on l'ouvre pour ajouter un nouvel élément
            setShowForm(true);
            setEditingRestaurant(null);
            setTitle("");
            setDescription("");
            setImageUrl("");
          } else {
            // formulaire ouvert, on le ferme
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

      {/* Formulaire */}
      {showForm && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br  bg-opacity-50  backdrop-blur-sm">
        <div className="bg-white w-full max-w-lg mx-auto rounded-xl shadow-lg p-8 relative">
          {/* Bouton de fermeture */}
          <button
            onClick={handleCancelEdit}
            className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
          >
            <X size={24} />
          </button>

          <h2 className="text-2xl font-bold mb-6 text-center text-primary">
            {editingRestaurant ? "Modifier un Restaurant" : "Ajouter un Restaurant"}
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2">Titre</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-black rounded-full hover:border-primary px-4 py-2"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full border border-black rounded-xl hover:border-primary px-4 py-2"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2">URL Image</label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full border border-black rounded-full hover:border-primary px-4 py-2"
                required
              />
            </div>

            <div className="flex justify-center gap-4">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-primary text-primary hover:bg-primary hover:text-white rounded-full"
              >
                <Plus size={18} />
                {editingRestaurant ? "Modifier" : "Ajouter"}
              </button>

              <button
                type="button"
                onClick={handleCancelEdit}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-400 text-gray-600 hover:bg-gray-100 rounded-full"
              >
                <X size={18} />
                Annuler
              </button>
            </div>
          </form>
        </div>
      </div>
    )}

      {/* Tableau */}
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
    {restaurants.map((item) => (
      <tr key={item.id} className="bg-white border-b hover:bg-gray-50 transition">
        <td className="px-6 py-4">
          <Image
            src={item.imageUrl}
            alt={item.title}
            width={1000}
            height={1000}
            className="w-24 h-14 object-cover rounded-md border"
          />
        </td>
        <td className="px-6 py-4 font-medium text-gray-900">{item.title}</td>
        <td className="px-6 py-4 text-gray-600">{item.description}</td>
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



    </div>
  );
}
