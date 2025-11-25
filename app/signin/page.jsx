"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    // fade out du loader avant la redirection ou message
    setTimeout(() => setFadeOut(true), 1000);
    setTimeout(() => {
      setLoading(false);

      if (res?.error) {
        setErrorMsg("Email ou mot de passe incorrect");
      } else if (res?.ok) {
        router.push("/admin");
      }
    }, 1500);
  };

  if (loading) {
    return (
      <div
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-white via-red-50 to-white space-y-6 transition-opacity duration-500 ${
          fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <img
          src="/img/logo_red.png"
          alt="Logo Menara Mall"
          className="h-24 w-auto animate-spin-slow"
        />
      
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 animate-fade-in duration-500">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-[#6F0E18]">
          Connexion Admin
        </h1>

        {errorMsg && (
          <div className="mb-4 text-red-600 font-semibold text-center">
            {errorMsg}
          </div>
        )}

        <label className="block mb-2 font-semibold text-gray-700">Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#6F0E18]"
          disabled={loading}
        />

        <label className="block mb-2 font-semibold text-gray-700">Mot de passe</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-[#6F0E18]"
          disabled={loading}
        />

        <button
          type="submit"
          className="w-full bg-[#6F0E18] text-white py-2 rounded hover:bg-[#87131d] transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          Se connecter
        </button>

        <p className="text-sm text-center mt-4">
          <a href="/reset-password/request" className="text-blue-600 hover:underline">
            Mot de passe oublié ?
          </a>
        </p>
      </form>
    </div>
  );
}
