"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NeigeAnimée from "./neigeAnimée";


gsap.registerPlugin(ScrollTrigger);

export default function SectionAvecRotation() {
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
    <section ref={sectionRef} className="relative py-16 sm:py-20 overflow-hidden">
      <NeigeAnimée />

      {/* Neige animée (z-index bas) */}
      <div className="snow pointer-events-none absolute inset-0 z-0" />

      <div className="mx-auto px-4 sm:px-6 lg:px-12 relative z-10 flex flex-col md:flex-row items-center gap-10">
        {/* Image principale sans l’image décorative */}
        <div className="w-full md:w-1/2 relative transform transition duration-500 hover:scale-105">
          <img
            ref={imgRef}
            src="/img/patinoire.png"
            alt="Patinoire"
            className="w-full h-auto object-cover rounded-xl"
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        {/* Texte */}
        <div
          ref={textRef}
          className="w-full md:w-1/2 text-center md:text-left text-gray-800"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 text-primary drop-shadow-md">
            Découvrez la Patinoire Magique du Menara Mall ! 
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 leading-relaxed">
            Plongez dans un univers féérique où la glace scintille sous vos patins !
            Tourbillonnez avec vos amis, partagez des éclats de rire, et vivez des instants inoubliables dans une ambiance hivernale pleine de magie.

            Que vous soyez débutant ou pro de la glisse, notre patinoire vous promet des moments de joie, de complicité et d'émerveillement.

            🎈 Prêt à vivre la magie de l’hiver ?<br />
            Enfilez vos patins et rejoignez-nous dès maintenant !
                      </p>
          {/* <button className="px-6 py-3 bg-gradient-to-r from-primary to-red-500 text-white rounded-full shadow-lg hover:scale-105 transition">
            Je veux y aller 🎈
          </button> */}
        </div>
      </div>
    </section>
  );
}
