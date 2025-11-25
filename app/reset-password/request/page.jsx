"use client";

import { useState } from "react";

export default function RequestResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/reset-password/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erreur lors de la demande.");
      } else {
        setMessage("Email envoyé ! Vérifiez votre boîte mail.");
        setEmail("");
      }
    } catch (err) {
      setError("Erreur serveur, veuillez réessayer.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center text-[#6F0E18]">
          Réinitialisation du mot de passe
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold" htmlFor="email">
              Entrez votre adresse email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#6F0E18]"
            />
          </div>

          {error && <p className="text-red-600">{error}</p>}
          {message && <p className="text-green-600">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#6F0E18] text-white py-2 rounded-md hover:bg-[#87131d] transition"
          >
            {loading ? "Chargement..." : "Envoyer le lien"}
          </button>
        </form>
      </div>
    </div>
  );
}
