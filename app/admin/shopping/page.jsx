'use client';

import { useEffect, useState } from 'react';
import { Pencil, Trash2, Plus, X } from 'lucide-react';

export default function ShoppingAdmin() {
  const [shops, setShops] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [categorie, setCategorie] = useState("");
  const [editingShop, setEditingShop] = useState(null);
  const [categories, setCategories] = useState([]);

  const [addingCategory, setAddingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);

  // Chargement de tous les articles et catégories au montage
  useEffect(() => {
    fetchCategories();
    fetchShops();
  }, []);

  const fetchShops = async () => {
    try {
      const res = await fetch(`/api/shopping`);  // Sans pagination
      const data = await res.json();
      setShops(data);
    } catch (err) {
      alert("❌ Erreur lors du chargement");
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/shopping/categories");
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error("❌ Erreur fetch catégories :", error);
      setCategories([]);
    }
  };

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return alert("Veuillez saisir une catégorie valide.");

    try {
      const res = await fetch("/api/shopping/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categorie: newCategory.trim() }),
      });
      if (!res.ok) throw new Error("Erreur ajout catégorie");

      await fetchCategories();
      setCategorie(newCategory.trim());
      setNewCategory("");
      setAddingCategory(false);
      alert("✅ Catégorie ajoutée avec succès !");
    } catch (error) {
      alert("❌ Erreur ajout catégorie");
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { title, description, imageUrl, categorie };

    try {
      const res = await fetch(editingShop ? `/api/shopping/${editingShop.id}` : "/api/shopping", {
        method: editingShop ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Erreur ajout/modification");

      showMessage(editingShop ? "✅ Article modifié !" : "✅ Article ajouté !");
      setEditingShop(null);
      setTitle(""); setDescription(""); setImageUrl(""); setCategorie("");
      fetchShops();
      fetchCategories();
      setShowForm(false);
    } catch (err) {
      alert("❌ Échec de l'enregistrement");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("⚠️ Confirmer la suppression ?")) return;
    try {
      const res = await fetch(`/api/shopping/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erreur suppression");

      alert("✅ Article supprimé !");
      fetchShops();
      fetchCategories();
    } catch (err) {
      alert("❌ Échec de la suppression");
      console.error(err);
    }
  };

  const handleEdit = (shop) => {
    setEditingShop(shop);
    setTitle(shop.title);
    setDescription(shop.description);
    setImageUrl(shop.imageUrl);
    setCategorie(shop.categorie);
    setShowForm(true);
  };

  const handleCancelEdit = () => {
    setEditingShop(null);
    setTitle(""); setDescription(""); setImageUrl(""); setCategorie("");
  };

  // Nouvelle fonction toggleForm corrigée
  const toggleForm = () => {
    if (showForm) {
      // Si formulaire visible, on cache et reset le formulaire
      setShowForm(false);
      handleCancelEdit();
    } else {
      // Si formulaire caché, on affiche et reset le formulaire pour ajout
      setShowForm(true);
      handleCancelEdit();
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto font-sans">
      <h1 className="text-4xl font-extrabold mb-6 text-primary tracking-wide">
        🛍️ Admin - Shopping
      </h1>

      {message && (
        <div className="mb-6 max-w-lg mx-auto bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
          {message}
        </div>
      )}

      {/* Bouton afficher/masquer formulaire */}
      <div className="flex justify-end mb-6">
        <button
          onClick={toggleForm}
        className="flex items-center gap-2 px-6 py-3 rounded-full border border-primary 
        bg-white text-primary hover:bg-primary hover:text-white transition duration-300"
        >
          <Plus size={18} />
          {showForm ? "Fermer le formulaire" : "Ajouter un élément"}
        </button>
      </div>

  {showForm && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br bg-opacity-40 backdrop-blur-sm">
    <div className="relative w-full max-w-lg max-h-[80vh] overflow-y-auto  mx-auto rounded-xl shadow-lg p-8 bg-white from-white via-purple-100 to-pink-200">
      
      {/* Bouton de fermeture (coin supérieur) */}
      <button
        onClick={() => {
          setShowForm(false);
          setEditingShop(null); // facultatif
          setTitle("");
          setDescription("");
          setImageUrl("");
          setNewCategory("");
          setAddingCategory(false);
        }}
        className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
      >
        <X size={24} />
      </button>
       <h2 className="text-2xl font-bold mb-6 text-center text-primary">
            Ajouter un Shop
          </h2>

      <form onSubmit={handleSubmit}>
        {/* Titre */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Titre</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-full px-4 py-3 focus:ring-2 hover:border-primary focus:ring-primary"
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={3}
            className="w-full border border-gray-300 rounded-full px-4 py-3 focus:ring-2 hover:border-primary focus:ring-primary"
          />
        </div>

        {/* URL image */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">URL de l'image</label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-full px-4 py-3 focus:ring-2 hover:border-primary focus:ring-primary"
          />
        </div>

        {/* Catégorie */}
        <div className="mb-2">
          <label className="block text-gray-700 font-semibold mb-2">Catégorie</label>
          <select
            value={categorie}
            onChange={(e) => setCategorie(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-full hover:border-primary px-4 py-3"
            disabled={addingCategory}
          >
            <option value="">Sélectionnez une catégorie</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Ajouter une nouvelle catégorie */}
        {!addingCategory && (
          <button
            type="button"
            onClick={() => setAddingCategory(true)}
            className="mb-6 text-sm text-primary hover:text-primary font-semibold"
          >
            + Ajouter une nouvelle catégorie
          </button>
        )}

        {/* Formulaire ajout de catégorie */}
        {addingCategory && (
          <div className="mb-6 flex gap-2 items-center">
            <input
              type="text"
              placeholder="Nouvelle catégorie"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="flex-grow border border-gray-300 rounded-full px-4 py-3 hover:border-primary"
            />
            <button
              type="button"
              onClick={handleAddCategory}
              className="px-4 py-3 bg-primary text-white rounded-full hover:bg-white hover:text-primary border border-primary"
            >
              Ajouter
            </button>
            <button
              type="button"
              onClick={() => {
                setAddingCategory(false);
                setNewCategory("");
              }}
              className="px-4 py-3 border border-primary text-primary hover:bg-primary hover:text-white rounded-full"
            >
              Annuler
            </button>
          </div>
        )}

        {/* Boutons bas */}
        <div className="flex gap-4 justify-center mt-4">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-primary text-primary hover:bg-primary hover:text-white rounded-full"
          >
            <Plus size={18} /> {editingShop ? "Modifier" : "Ajouter"}
          </button>
          {editingShop && (
            <button
              type="button"
              onClick={() => {
                setEditingShop(null);
                setTitle("");
                setDescription("");
                setImageUrl("");
                setShowForm(false);
              }}
              className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-white rounded-full shadow-md"
            >
              <X size={18} /> Annuler
            </button>
          )}
        </div>
      </form>
    </div>
  </div>
)}

      {/* Table des éléments */}
     <table className="w-full text-sm text-left text-gray-700 shadow-md rounded-lg overflow-hidden">
      <thead className="bg-primary text-white uppercase text-xs">
        <tr>
          <th className="px-6 py-4">Image</th>
          <th className="px-6 py-4">Titre</th>
          <th className="px-6 py-4">Catégorie</th>
          <th className="px-6 py-4">Description</th>
          <th className="px-6 py-4 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {shops.map((item) => (
          <tr key={item.id} className="bg-white border-b hover:bg-gray-50 transition">
            <td className="px-6 py-4">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-24 h-14 object-cover rounded-md border"
              />
            </td>
            <td className="px-6 py-4 font-medium text-gray-900">{item.title}</td>
            <td className="px-6 py-4 italic text-gray-700">{item.categorie}</td>
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

    </div>
  );
}
