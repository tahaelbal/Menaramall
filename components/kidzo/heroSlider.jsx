"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

export default function HeroSlider() {
  const [kidzos, setKidzos] = useState([]);
  const [activeIndex, setActiveIndex] = useState(2);

  // Charger depuis API Prisma
  useEffect(() => {
    const fetchKidzos = async () => {
      try {
        const res = await fetch("/api/kidzo");
        const data = await res.json();
        setKidzos(data);
      } catch (error) {
        console.error("Erreur fetch Kidzo:", error);
      }
    };
    fetchKidzos();
  }, []);

  return (
    <div className="py-12">
      <div className="px-4 sm:px-6 md:px-8 lg:px-0">
        <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold text-primary text-center mb-4 animate-bounce">
          L’univers magique de Kidzo ! 🎉
        </h2>

        {/* <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed md:leading-loose text-gray-700 text-center max-w-full sm:max-w-xl md:max-w-2xl mx-auto">
          Découvrez nos jeux amusants et éducatifs pour petits et grands, adaptés à tous les âges.
        </p> */}
        
    </div>




      <br />

      <Swiper
        slidesPerView={4}
        centeredSlides={true}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
        }}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className="w-full max-w-6xl mx-auto"
      >
        {kidzos.map((item, index) => (
          <SwiperSlide key={item.id} className="flex justify-center">
            <div
              className={`transition-all duration-300 rounded-xl p-2 ${
                index === activeIndex ? "scale-110" : "scale-90 opacity-60"
              }`}
            >
              <div className="w-[250px] h-[350px] relative">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="rounded-lg object-contain"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      

      {/* ✅ Pagination personnalisée */}
      <div className="custom-pagination mt-6 flex justify-center gap-2" />
    </div>
  );
}
