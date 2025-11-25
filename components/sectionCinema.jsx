"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import RubanPellicule from "./RubanPellicule";
import VortexLumineux from "./VortexLumineux";
import { GiClapperboard } from "react-icons/gi";

gsap.registerPlugin(ScrollTrigger);

export default function SectionCinema() {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const textRef = useRef(null);

  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (!imageLoaded) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    tl.from(imgRef.current, {
      x: -100,
      opacity: 0,
      scale: 0.8,
      duration: 1,
      ease: "power3.out",
    }).from(
      textRef.current,
      {
        x: 100,
        opacity: 0,
        duration: 1,
        ease: "bounce.out",
      },
      "-=0.6"
    );
  }, [imageLoaded]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-primary from-indigo-200 via-blue-100 to-white py-20 overflow-hidden"
    >
      <RubanPellicule />
      <VortexLumineux />

      <div className="mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-12">
        <div
          ref={textRef}
          className="w-full md:w-1/2 text-center md:text-left text-gray-800"
        >
          <h2 className="text-4xl font-extrabold mb-6 text-white drop-shadow-md flex items-center gap-2">
            <GiClapperboard size={36} />
            Cinéma 7D Immersif !
          </h2>
          <p className="text-lg md:text-xl mb-6 leading-relaxed text-white">
           Découvrez une expérience cinématographique hors du commun avec le Cinéma 7D !
            Plongez dans un univers immersif où chaque scène prend vie grâce à des effets spéciaux spectaculaires (mouvements, éclaboussures, lumière, vent, etc.). Des sièges interactifs et une technologie avancée vous garantissent une aventure sensationnelle pour toute la famille. <br />

            Vivez l’adrénaline du divertissement en 7 dimensions !
          </p>
          {/* <button className="px-6 py-3 bg-white text-primary rounded-full shadow-lg hover:scale-105 transition">
            Explorer 🎥
          </button> */}
        </div>

        <div className="w-full md:w-1/2 transform transition duration-500 hover:scale-105">
          <img
            ref={imgRef}
            src="/img/cin.png"
            alt="Cinéma 7D"
            className="w-full h-auto object-cover rounded-xl"
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      </div>
    </section>
  );
}
