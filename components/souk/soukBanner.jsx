"use client";

import Image from "next/image";

export default function SoukBanner() {
  return (
    <section className="relative w-full h-[90vh]">
      {/* ✅ Image plein écran */}
      <Image
        src="/img/fnac.png" 
        alt="Souk Menara Mall"
        fill
        className="object-cover brightness-75"
        priority
      />

      {/* ✅ Contenu centré */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 text-white">
        <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-md mb-4">
          Le Souk du Menara Mall
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mb-6 drop-shadow-sm">
          Plongez dans l’univers enchanteur du souk, entre artisanat traditionnel, senteurs orientales et tenues marocaines.
        </p>
        <button className="bg-white text-black font-semibold px-6 py-3 rounded-full hover:bg-gray-200 transition duration-300 shadow">
          Découvrir le Souk
        </button>
      </div>
    </section>
  );
}
