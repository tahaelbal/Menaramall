"use client";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from 'embla-carousel-auto-scroll'

export default  function LogoScroll() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    AutoScroll({ stopOnInteraction: false, speed: 0.3 }),
  ]);
  const images = [
    { image: "https://ghostwhite-goldfinch-864066.hostingersite.com/uploads/UPLODESYSTEME/images/68ffbb05c421d_1.png", title: "Grohe" },
    { image: "https://ghostwhite-goldfinch-864066.hostingersite.com/uploads/UPLODESYSTEME/images/68ffbb2ad7d69_2.png", title: "Schneider Electric" },
    { image: "https://ghostwhite-goldfinch-864066.hostingersite.com/uploads/UPLODESYSTEME/images/6903983ae445e_f790bf8b-229b-4078-966e-b5e7df92c2ed.jpg", title: "Schneider Electric" },
    { image: "https://ghostwhite-goldfinch-864066.hostingersite.com/uploads/UPLODESYSTEME/images/690397d2a8a28_1b93bf0b-4d85-4263-9a69-7d707c53afd8.jpg", title: "ELITE" },
    { image: "https://ghostwhite-goldfinch-864066.hostingersite.com/uploads/UPLODESYSTEME/images/68ffbb9c4876f_5.png", title: "Schneider Electric" },
    { image: "https://ghostwhite-goldfinch-864066.hostingersite.com/uploads/UPLODESYSTEME/images/68ffbba02604f_6.png", title: "Grohe" },
    { image: "https://ghostwhite-goldfinch-864066.hostingersite.com/uploads/UPLODESYSTEME/images/68ffbba597d66_7.png", title: "Defacto" },
    { image: "https://ghostwhite-goldfinch-864066.hostingersite.com/uploads/UPLODESYSTEME/images/68ffbbb1b3482_9.png", title: "Defacto" },
    { image: "https://ghostwhite-goldfinch-864066.hostingersite.com/uploads/UPLODESYSTEME/images/68ffbbb78262e_10.png", title: "Defacto" },
    { image: "https://ghostwhite-goldfinch-864066.hostingersite.com/uploads/UPLODESYSTEME/images/68ffbbab6776d_8.png", title: "Schneider Electric" },
    
  ];

  return (
    <div className=" flex flex-col items-center gap-8 py-8">
      <h2 className=" uppercase text-2xl lg:text-4xl font-semibold text-center ">Nos partenaires commerciaux</h2>
      <div className=" w-full  mx-auto  cursor-grab active:cursor-grabbing">
        <div className=" overflow-hidden" ref={emblaRef}> 
          <div className="flex flex-row flex-nowrap gap-32 pl-32 ">        
            {images.map((src, index) => ( 
              <img title={src.title} width={600} height={300} src={`${src.image}`} className=" select-none  max-w-none h-14 w-auto" alt={src.title} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
   
  );
}