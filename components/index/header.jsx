"use client";
import Image from "next/image";
import { Store, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";


export default function Header() {
  const images = [
    "https://ghostwhite-goldfinch-864066.hostingersite.com/uploads/UPLODESYSTEME/images/68f927699e1da_ELY19905.jpg",
    "https://ghostwhite-goldfinch-864066.hostingersite.com/uploads/UPLODESYSTEME/images/68f928a683f84_ELY19936.jpg",
    "https://ghostwhite-goldfinch-864066.hostingersite.com/uploads/UPLODESYSTEME/images/68fe35235aad8_IMG_5369.JPEG",
  ];

  return (
    <div className="relative w-full h-screen">
      {/* --- SLIDER HEADER --- */}
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
        {images.map((src, i) => (
          <SwiperSlide key={i}>
            <div className="relative w-full h-screen">
              

              <Image
                src={src}
                alt={`Menara Mall ${i + 1}`}
                width={1000}
                height={1000}
                priority
                className="object-cover w-full h-full"
              />
              {/* Overlay sombre */}
              <div className="absolute inset-0 bg-black opacity-55 z-10" />
              {/* Texte et bouton */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center px-4">
                <h1 className="text-white text-4xl md:text-5xl font-bold uppercase mb-6">
                  Bienvenue au Menara Mall Marrakech
                </h1>
                <button className="px-6 py-2 bg-primary text-white hover:bg-white hover:text-primary duration-500 border-2 border-primary rounded-full uppercase flex items-center gap-2">
                  <Store />
                  Explorer les boutiques
                </button>
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

      {/* --- Bas arrondi --- */}
      <div className="bg-white z-30 lg:bg-cover w-full h-10 bottom-0 rotate-180 rounded-full-css absolute"></div>
    </div>
  );
}
