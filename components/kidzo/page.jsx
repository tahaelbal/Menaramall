"use client";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SectionAvecRotation from "../SectionAvecRotation";
import SectionCinema from "../sectionCinema";
import HeroSlider from "./heroSlider";
import VRSection from "@/components/kidzo/VRSection";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const headerSlides = [
  {
    src: "https://ghostwhite-goldfinch-864066.hostingersite.com/uploads/UPLODESYSTEME/images/68f92df1049d4_ELY10130.jpg",
    title: "Bienvenue dans Kidzo !",
  },
  {
    src: "https://ghostwhite-goldfinch-864066.hostingersite.com/uploads/UPLODESYSTEME/images/68f92e72b49e5_ELY10155.jpg",
    title: "Des aventures incroyables vous attendent !",
  },
];

export default function Kidzo() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">

      {/* 🔹 Header Slider */}
      <div className="relative w-full h-[100vh]">
        <Swiper
          modules={[Navigation, Autoplay]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          navigation={{
            prevEl: ".swiper-button-prev-custom",
            nextEl: ".swiper-button-next-custom",
          }}
          className="w-full h-full"
        >
          {headerSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <Image
                  src={slide.src}
                  alt={slide.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50 z-10"></div>
                <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-4">
                  <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg animate-bounce">
                    {slide.title}
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

      <SectionAvecRotation />
      <SectionCinema />
      <HeroSlider />

      {/* 🌸 Section Petite Crèche */}
      <section className="w-full bg-gradient-to-b from-sky-100 via-white to-sky-50 py-16 px-6 md:px-20 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-sky-600 mb-4">
            Petite Crèche 👶
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            Un espace sûr et chaleureux pour vos petits trésors, pendant que vous profitez de votre visite au Menara Mall.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* 🔹 Slider d'images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="rounded-3xl overflow-hidden shadow-xl"
          >
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              loop={true}
              className="w-full h-[350px] md:h-[450px]"
            >
              <SwiperSlide>
                <img
                  src="https://ghostwhite-goldfinch-864066.hostingersite.com/uploads/UPLODESYSTEME/images/68f92cfd81f27_ELY10139.jpg"
                  alt="Petite Crèche 1"
                  className="object-cover w-full h-full"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://ghostwhite-goldfinch-864066.hostingersite.com/uploads/UPLODESYSTEME/images/6903b303ca57d_ELY10164.jpg"
                  alt="Petite Crèche 2"
                  className="object-cover w-full h-full"
                />
              </SwiperSlide>
            </Swiper>
          </motion.div>

          {/* 🔹 Contenu texte */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-sky-600">
              Un espace magique pour les tout-petits 🌟
            </h3>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              La Petite Crèche de Kidzo accueille vos enfants de 1 à 4 ans dans un environnement amusant et sécurisé.
              Encadrés par une équipe professionnelle, les petits s’amusent à travers des jeux éducatifs,
              activités créatives et moments de détente.
            </p>

            <ul className="grid grid-cols-2 gap-4 text-gray-800 font-medium">
              <li>👩‍🏫 Encadrement professionnel</li>
              <li>🧩 Jeux éducatifs et ludiques</li>
              <li>🍎 Espace détente et goûter</li>
              <li>🍼 Sécurité et surveillance continue</li>
            </ul>
          </motion.div>
        </div>

        {/* Décorations */}
        <div className="absolute top-10 left-10 w-10 h-10 bg-sky-200 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-yellow-100 rounded-full blur-3xl animate-bounce"></div>
      </section>

      <VRSection />
    </div>
  );
}
