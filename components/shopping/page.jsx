"use client";

import { useState, useEffect } from "react";
import { Store, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

export default function Shopping() {
  const [boutiques, setBoutiques] = useState([]);
  const [categories, setCategories] = useState(["Tous"]);
  const [categorieFiltre, setCategorieFiltre] = useState("Tous");
  const [pageActuelle, setPageActuelle] = useState(1);
  const boutiquesParPage = 6;

  // ✅ Charger les boutiques
  useEffect(() => {
    fetch("/api/shopping")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setBoutiques(data);
        } else {
          setBoutiques([]);
        }
      })
      .catch((err) => console.error("Erreur fetch boutiques:", err));
  }, []);

  // ✅ Charger les catégories
  useEffect(() => {
    fetch("/api/shopping/categories")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCategories(["Tous", ...data]);
        }
      })
      .catch((err) => console.error("Erreur fetch catégories:", err));
  }, []);

  // 🔍 Filtrage
  const boutiquesFiltrees =
    categorieFiltre === "Tous"
      ? boutiques
      : boutiques.filter((b) => b.categorie === categorieFiltre);

  const indexDernier = pageActuelle * boutiquesParPage;
  const indexPremier = indexDernier - boutiquesParPage;
  const boutiquesPage = boutiquesFiltrees.slice(indexPremier, indexDernier);

  const nombreDePages = Math.ceil(boutiquesFiltrees.length / boutiquesParPage);

  const changerPage = (page) => {
    if (page >= 1 && page <= nombreDePages) {
      setPageActuelle(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const headerImages = [
    "https://ghostwhite-goldfinch-864066.hostingersite.com/uploads/UPLODESYSTEME/images/69074eaf6efc1_ELY19969.jpg",
    "https://ghostwhite-goldfinch-864066.hostingersite.com/uploads/UPLODESYSTEME/images/69074eb95ef57_ELY10039.jpg",
    "https://ghostwhite-goldfinch-864066.hostingersite.com/uploads/UPLODESYSTEME/images/69074ec10a579_ELY10113.jpg",
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* ===================== HEADER SLIDER ===================== */}
      <div className="relative w-full h-screen">
        <Swiper
          modules={[Autoplay, EffectFade, Navigation]}
          effect="fade"
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          className="w-full h-screen"
        >
          {headerImages.map((src, i) => (
            <SwiperSlide key={i}>
              <div className="relative w-full h-screen">
                <img
                  src={src}
                  alt={`Shopping ${i + 1}`}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black opacity-55 z-10" />
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center px-4">
                  <h1 className="text-white text-5xl md:text-6xl font-bold uppercase mb-6 drop-shadow-lg">
                    Shopping
                  </h1>
                  
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* --- Flèche gauche --- */}
        <div className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/30 hover:bg-white/50 text-white hover:text-primary rounded-full p-3 cursor-pointer transition duration-300 backdrop-blur-md">
          <ChevronLeft className="w-6 h-6" />
        </div>

        {/* --- Flèche droite --- */}
        <div className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/30 hover:bg-white/50 text-white hover:text-primary rounded-full p-3 cursor-pointer transition duration-300 backdrop-blur-md">
          <ChevronRight className="w-6 h-6" />
        </div>
      </div>

      {/* ===================== FILTRES ===================== */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setCategorieFiltre(cat);
                setPageActuelle(1);
              }}
              className={`px-4 py-2 rounded-full border font-semibold transition-colors duration-300 ${
                categorieFiltre === cat
                  ? "bg-[#6F0E18] text-white border-[#6F0E18]"
                  : "bg-transparent text-[#6F0E18] border-[#6F0E18] hover:bg-[#6F0E18] hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ===================== BOUTIQUES ===================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {boutiquesPage.length > 0 ? (
            boutiquesPage.map((boutique) => (
              <div
                key={boutique.id}
                className="bg-white shadow rounded overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              >
                <img
                  src={boutique.imageUrl}
                  alt={boutique.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-[#6F0E18]">
                    {boutique.title}
                  </h3>
                  <p className="text-sm text-gray-500 italic mb-1">
                    {boutique.categorie}
                  </p>
                  <p className="text-gray-700">{boutique.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              Aucune boutique trouvée.
            </p>
          )}
        </div>

        {/* ===================== PAGINATION ===================== */}
        {nombreDePages > 1 && (
          <div className="mt-10 flex justify-center items-center gap-2 flex-wrap">
            <button
              onClick={() => changerPage(pageActuelle - 1)}
              disabled={pageActuelle === 1}
              className="px-3 py-1 rounded border text-[#6F0E18] hover:bg-[#6F0E18] hover:text-white disabled:opacity-30"
            >
              Précédent
            </button>
            {[...Array(nombreDePages)].map((_, i) => (
              <button
                key={i}
                onClick={() => changerPage(i + 1)}
                className={`px-3 py-1 rounded border ${
                  pageActuelle === i + 1
                    ? "bg-[#6F0E18] text-white"
                    : "text-[#6F0E18] hover:bg-[#6F0E18] hover:text-white"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => changerPage(pageActuelle + 1)}
              disabled={pageActuelle === nombreDePages}
              className="px-3 py-1 rounded border text-[#6F0E18] hover:bg-[#6F0E18] hover:text-white disabled:opacity-30"
            >
              Suivant
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
