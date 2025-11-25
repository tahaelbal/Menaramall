'use client';
import { useState } from 'react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const res = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage('Un lien de réinitialisation a été envoyé par email.');
    } else {
      setMessage(data.error || 'Une erreur est survenue.');
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Mot de passe oublié</h1>
      <form onSubmit={handleSubmit} className="max-w-md bg-white p-4 shadow rounded">
        <input
          type="email"
          className="w-full p-2 border rounded mb-3"
          placeholder="Adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="w-full bg-primary text-white py-2 rounded" type="submit">
          Envoyer le lien
        </button>
        {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
      </form>
    </div>
  );
}
