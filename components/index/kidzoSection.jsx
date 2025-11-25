
"use client";
import Image from "next/image";
import Link from "next/link";

export default function KidzoSection() {
  return (
    <section className="flex flex-col md:flex-row w-full min-h-[500px]">
     
      <div className="relative md:w-1/2 w-full h-[300px] md:h-auto">
        <Image
          src="https://ghostwhite-goldfinch-864066.hostingersite.com/uploads/UPLODESYSTEME/images/68bef99733c12_ChatGPT Image 8 sept. 2025, 16_40_59.png" 
          alt="Kidzo Menara Mall"
          fill
          className="object-cover"
        />
      </div>

      
      <div className="bg-white text-primary flex flex-col justify-center p-10 md:w-1/2 w-full">
        <h2 className="text-xl md:text-2xl font-bold uppercase mb-4">
          Kidzo – Espace de jeux pour enfants
        </h2>
        <p className="text-sm md:text-base leading-relaxed mb-6">
          Offrez à vos enfants une aventure inoubliable dans l’univers magique de Kidzo !
          Des jeux interactifs, des espaces créatifs, des spectacles captivants et un
          environnement sécurisé pour le bonheur des petits et la tranquillité des parents.
          <br /><br />
          Que ce soit pour une sortie en famille ou une fête d’anniversaire, Kidzo est le
          lieu idéal pour les enfants de tous âges.
        </p>
        <Link href="/kidzo">
         <button className="bg-primary text-white border-2 border-primary font-semibold px-6 py-2 rounded-full w-fit
                   hover:bg-white hover:text-[#7D0E18] transition-all duration-300">
          Découvrir Kidzo
        </button>

        </Link>
      </div>
    </section>
  );
}
