"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Image from "next/image";

export default function SoukExperience() {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    fetch("/api/souk")
      .then(res => res.json())
      .then(data => setExperiences(data));
  }, []);

  return (
    <section className="w-full bg-[#fffaf3]">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 4000 }}
        loop={true}
        slidesPerView={1}
        spaceBetween={0}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="w-full"
      >
        {experiences.map((exp, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-[80vh] w-full group overflow-hidden">
              <Image
                src={exp.imageUrl}
                alt={exp.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition duration-300" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
                {/* <h2 className="text-2xl md:text-3xl font-bold mb-3">{exp.title}</h2> */}
                {exp.description && (
                  <p className="text-sm md:text-base max-w-sm mb-4">{exp.description}</p>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}