"use client";
import Image from "next/image";
import Link from "next/link";

export default function RestauSection() {
  return (
    <section className="flex flex-col-reverse md:flex-row w-full">
      
      {/* Texte */}
      <div className="bg-[#7D0E18] text-white flex flex-col justify-center p-6 md:p-10 md:w-1/2 w-full">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold uppercase mb-4">
          Restaurants & Cafés – Détente Gourmande au Menara Mall
        </h2>
        <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-6">
          Vous ne pouvez pas être à Marrakech sans découvrir la vue exceptionnelle qu’offrent
          les terrasses du Menara Mall. Profitez de plus de 17 cafés et restaurants pour
          déjeuner, dîner, ou tout simplement déguster une glace et siroter un thé à la menthe.
          <br /><br />
          Avec une vue imprenable sur l’Atlas, la Koutoubia et les oliveraies, vivez une
          expérience culinaire inoubliable dans un cadre enchanteur.
        </p>
        <Link href="/restaurants">
          <button className="bg-white text-[#7D0E18] border-2 border-[#7D0E18] font-semibold px-6 py-2 rounded-full w-fit
                   hover:bg-[#7D0E18] hover:text-white hover:border-white transition-all duration-300">
            Voir les restaurants
          </button>
        </Link>
      </div>

      {/* Image responsive */}
      <div className="relative w-full md:w-1/2 aspect-[16/9] md:aspect-auto">
        <Image
          src="https://ghostwhite-goldfinch-864066.hostingersite.com/uploads/UPLODESYSTEME/images/6903a638df631_ELY10290.jpg" 
          alt="Restaurants Menara Mall"
          fill
          className="object-cover"
        />
      </div>
    </section>
  );
}
