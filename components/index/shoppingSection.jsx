"use client";
import Image from "next/image";
import Link from "next/link";

export default function ShoppingSection() {
  return (
    <section className="flex flex-col-reverse md:flex-row w-full min-h-[500px]">
    
      {/* Texte */}
      <div className="bg-primary text-white flex flex-col justify-center p-10 md:w-1/2 w-full">
        <h2 className="text-xl md:text-2xl font-bold uppercase mb-4">
          Boutiques & Marques – Faites Votre Shopping Au Cœur de Marrakech
        </h2>
        <p className="text-sm md:text-base leading-relaxed mb-6">
          Avec plus de 90 enseignes nationales et internationales, Menara Mall Marrakech vous offre une expérience shopping unique dans un cadre moderne, climatisé et confortable.
          Que vous recherchiez des vêtements tendance, des articles de beauté, de la technologie ou des souvenirs, vous trouverez tout ce dont vous avez besoin sous un même toit.

          De grandes marques mondiales aux enseignes marocaines de qualité, notre sélection s’adapte à tous les styles, tous les budgets et toutes les envies.
        </p>
        <Link href="/shopping">
          <button className="bg-white text-[#7D0E18] border-2 border-[#7D0E18] font-semibold px-6 py-2 rounded-full w-fit
                   hover:bg-[#7D0E18] hover:text-white hover:border-white transition-all duration-300">
            Lire la suite
          </button>
        </Link>
      </div>

      {/* Image */}
      <div className="relative md:w-1/2 w-full h-[300px] md:h-auto">
        <Image
          src="https://ghostwhite-goldfinch-864066.hostingersite.com/uploads/UPLODESYSTEME/images/68befdd53614e_ChatGPT Image 8 sept. 2025, 16_59_17.png"
          alt="Boutique Menara Mall"
          fill
          className="object-cover"
         
        />
      </div>
    </section>
  );
}
