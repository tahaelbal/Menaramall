"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import SoukSection from "@/components/souk/soukSection";

export default function SoukSlider() {
  const slides = [
    "https://ghostwhite-goldfinch-864066.hostingersite.com/uploads/UPLODESYSTEME/images/69074d10d8861_header souq 2.jpg",
    "https://ghostwhite-goldfinch-864066.hostingersite.com/uploads/UPLODESYSTEME/images/69074bb2397a4_header souk 1.jpg",
    
  ];

  return (
    <div className="bg-white">
      {/* --- HEADER SLIDER --- */}
      <div className="relative w-full h-[100vh] overflow-hidden">
        <Swiper
          modules={[Autoplay, EffectFade, Navigation]}
          effect="fade"
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          className="w-full h-full"
        >
          {slides.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-[100vh]">
                {/* Image */}
                <Image
                  src={image}
                  alt={`Slide ${index + 1}`}
                  fill
                  className="object-cover"
                  priority
                />

                {/* Overlay */}
                <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>

                {/* Texte centré */}
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 text-center">
                  <h1 className="text-white text-4xl sm:text-6xl md:text-8xl font-extrabold drop-shadow-lg uppercase">
                    Le Souq Al Madinah
                  </h1>
                  {/* <p className="mt-4 text-white text-lg md:text-2xl font-light max-w-2xl">
                    Découvrez l’artisanat marocain et les trésors uniques du Menara Mall
                  </p> */}
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

      {/* --- SECTION SOUK --- */}
      <SoukSection />
    </div>
  );
}
