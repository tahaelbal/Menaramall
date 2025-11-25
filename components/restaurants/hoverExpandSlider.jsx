"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function RestaurantClient() {
  const [restaurants, setRestaurants] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [autoIndex, setAutoIndex] = useState(0);

  useEffect(() => {
    // fetch data from backend
    fetch("/api/restaurant")
      .then((res) => res.json())
      .then(setRestaurants)
      .catch(console.error);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAutoIndex((prev) => (restaurants.length ? (prev + 1) % restaurants.length : 0));
    }, 3000);
    return () => clearInterval(interval);
  }, [restaurants]);

  const currentIndex = activeIndex !== null ? activeIndex : autoIndex;

  return (
    <section className="py-16 bg-primary">
      <div className="text-center mb-10 px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">Nos Espaces</h2>
        <p className="text-white mt-2 text-sm sm:text-base max-w-3xl mx-auto">
          Impossible de séjourner à Marrakech sans profiter de la vue spectaculaire qu’offrent les deux terrasses du Menara Mall.
          Avec pas moins de 18 restaurants et cafés, l’endroit est idéal pour savourer un déjeuner, un dîner, ou simplement une glace ou un thé à la menthe.
          Admirez à la terrasse du Food Court à perte de vue les montagnes de l’Atlas, les oliveraies, et l’emblématique Koutoubia.
        </p>
      </div>

      <div
        className="flex gap-3 sm:gap-4 items-center max-w-screen overflow-x-auto px-4 scroll-smooth scrollbar-none"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {restaurants.length === 0 && (
          <p className="text-white">Chargement des restaurants...</p>
        )}

        {restaurants.map((restaurant, index) => {
          const isActive = activeIndex !== null ? activeIndex === index : autoIndex === index;

          const baseSize = isActive
            ? "w-[240px] sm:w-[320px] md:w-[380px]"
            : "w-[60px] sm:w-[80px] md:w-[100px]";

          return (
            <div
              key={restaurant.id}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              className={`relative ${baseSize} transition-all duration-500 rounded-2xl border-2 sm:border-4 border-white overflow-hidden cursor-pointer shadow-lg h-[220px] sm:h-[300px] md:h-[360px] flex-shrink-0`}
              style={{ scrollSnapAlign: "start" }}
            >
              <Image
                src={restaurant.imageUrl}
                alt={restaurant.title}
                width={500}
                height={500}
                className={`w-full h-full object-cover transition duration-300 ${
                  isActive ? "brightness-75" : ""
                }`}
              />
              <div
                className={`absolute bottom-0 left-0 right-0 bg-black/60 text-white px-2 py-1 sm:px-3 sm:py-2 text-[10px] sm:text-sm
                  transition-all duration-300
                  ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
              >
                <h3 className="font-semibold">{restaurant.title}</h3>
                <p>{restaurant.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
