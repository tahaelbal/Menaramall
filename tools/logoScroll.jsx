"use client";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from 'embla-carousel-auto-scroll'

export default  function LogoScroll() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    AutoScroll({ stopOnInteraction: false, speed: 0.3 }),
  ]);
  const images = [
    { image: "https://ghostwhite-goldfinch-864066.hostingersite.com/uploads/UPLODESYSTEME/others/6863f64a589a6_Carrefour_Groupe (1).svg", title: "Grohe" },
    { image: "https://ghostwhite-goldfinch-864066.hostingersite.com/uploads/UPLODESYSTEME/others/6863f8e6675ed_Samsung_Logo.svg", title: "Schneider Electric" },
    { image: "https://ghostwhite-goldfinch-864066.hostingersite.com/uploads/UPLODESYSTEME/images/6863f9062a2d1_Logo_inwi.svg.png", title: "Schneider Electric" },
    { image: "https://ghostwhite-goldfinch-864066.hostingersite.com/uploads/UPLODESYSTEME/images/6863f923e9238_1683000849orange-telecom-logo.webp", title: "Schneider Electric" },
    { image: "https://ghostwhite-goldfinch-864066.hostingersite.com/uploads/UPLODESYSTEME/others/6863f97a6dc78_Logo_NIKE.svg", title: "Schneider Electric" },
    { image: "https://ghostwhite-goldfinch-864066.hostingersite.com/uploads/UPLODESYSTEME/others/6863f64a589a6_Carrefour_Groupe (1).svg", title: "Grohe" },
    { image: "https://ghostwhite-goldfinch-864066.hostingersite.com/uploads/UPLODESYSTEME/others/6863f8e6675ed_Samsung_Logo.svg", title: "Schneider Electric" },
    { image: "https://ghostwhite-goldfinch-864066.hostingersite.com/uploads/UPLODESYSTEME/images/6863f9062a2d1_Logo_inwi.svg.png", title: "Schneider Electric" },
    { image: "https://ghostwhite-goldfinch-864066.hostingersite.com/uploads/UPLODESYSTEME/images/6863f923e9238_1683000849orange-telecom-logo.webp", title: "Schneider Electric" },
    { image: "https://ghostwhite-goldfinch-864066.hostingersite.com/uploads/UPLODESYSTEME/others/6863f97a6dc78_Logo_NIKE.svg", title: "Schneider Electric" },
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