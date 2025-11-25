
"use client";

import Image from "next/image";

export default function SoukSection() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-6 py-12 bg-white">
        
      {/* Image à gauche */}
      <div className="w-full md:w-1/2 mb-8 md:mb-0">
        <Image
          src="/img/soukB.png" // remplace avec ton image
          alt="Souk traditionnel"
          width={600}
          height={400}
          className="rounded-2xl  object-cover w-full h-auto"
        />
      </div>

      {/* Texte à droite */}
      <div className="w-full md:w-1/2 md:pl-10">
        <h2 className="text-3xl font-bold mb-4 text-primary">Le Souq Al Madinah du Menara Mall</h2>
        <p className="text-lg text-black mb-4">
          Plongez dans l'ambiance authentique des souks marocains. Découvrez des produits artisanaux, des épices, des tapis, des bijoux et bien plus encore dans un cadre traditionnel et accueillant.
        </p>
        <p className="text-lg text-black">
          Un lieu unique pour faire vos emplettes tout en profitant de la culture locale.
        </p>
      </div>
    </section>
  );
}
