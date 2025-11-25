"use client";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function VRSection() {
  const games = [
    { img: "https://ghostwhite-goldfinch-864066.hostingersite.com/uploads/UPLODESYSTEME/images/68f92e93b2eca_ELY10144.jpg", title: "Aventure Galactique" },
    { img: "https://ghostwhite-goldfinch-864066.hostingersite.com/uploads/UPLODESYSTEME/images/6903b16022a2f_ELY10231.jpg", title: "Course Cosmique" },
    { img: "https://ghostwhite-goldfinch-864066.hostingersite.com/uploads/UPLODESYSTEME/images/6903b1545aee3_ELY10152.jpg", title: "Mission Sous-Marine" },
    { img: "https://ghostwhite-goldfinch-864066.hostingersite.com/uploads/UPLODESYSTEME/images/6903b14c3a680_ELY10153.jpg", title: "Exploration des Mondes" },
    { img: "https://ghostwhite-goldfinch-864066.hostingersite.com/uploads/UPLODESYSTEME/images/6903b3f910365_ELY10216.jpg", title: "Chasse aux Trésors" },
    { img: "https://ghostwhite-goldfinch-864066.hostingersite.com/uploads/UPLODESYSTEME/images/6903b41391457_ELY10220.jpg", title: "Aventure Jungle" },
    { img: "https://ghostwhite-goldfinch-864066.hostingersite.com/uploads/UPLODESYSTEME/images/6903b41d1492a_ELY10251.jpg", title: "Combat des Robots" },
    { img: "https://ghostwhite-goldfinch-864066.hostingersite.com/uploads/UPLODESYSTEME/images/6903b442b391f_ELY10238.jpg", title: "Voyage Temporel" },
    { img: "https://ghostwhite-goldfinch-864066.hostingersite.com/uploads/UPLODESYSTEME/images/6903b449e58fb_ELY10248.jpg", title: "Escape Room VR" },
    { img: "https://ghostwhite-goldfinch-864066.hostingersite.com/uploads/UPLODESYSTEME/images/6903b4538bceb_ELY10218.jpg", title: "Aventure Spatiale" },
  ];

  return (
    <section className="w-full bg-white py-20 px-6 md:px-12 lg:px-20">
      {/* 🌟 Titre principal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
          🎮 Jeux en Réalité Virtuelle
        </h2>
        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
          Découvrez nos expériences VR amusantes et immersives, des aventures à couper le souffle pour tous les âges !
        </p>
      </motion.div>

      {/* 🎢 Slider des images */}
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        spaceBetween={30}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="max-w-6xl mx-auto"
      >
        {games.map((game, i) => (
          <SwiperSlide key={i}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-white border border-gray-100 rounded-3xl shadow-md hover:shadow-xl overflow-hidden transition-all duration-500"
            >
              <div className="overflow-hidden">
                <img
                  src={game.img}
                  alt={game.title}
                  className="w-full h-60 object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              {/* <div className="p-6 text-center">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2 group-hover:text-pink-500 transition-colors duration-300">
                  {game.title}
                </h3>
              </div> */}
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
