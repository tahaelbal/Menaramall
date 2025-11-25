"use client";
import { ParkingSquare, Utensils, ShoppingBag, Gamepad2, Store, Sparkles , TabletSmartphone, RefreshCcw  } from "lucide-react";
import Image from "next/image";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
    { icon: <ParkingSquare size={40} />, label: "Parking & Accès PMR" },
    { icon: <Utensils size={40} />, label: "Restauration" },
    { icon: <ShoppingBag size={40} />, label: "Mode & Bijoux" },
    { icon: <Gamepad2 size={40} />, label: "Kidzo" },
    { icon: <Store size={40} />, label: "Le Souk Marocain" },
    { icon: <Sparkles size={40} />, label: "BEAUTÉ & BIEN-ÊTRE" },
    { icon: <TabletSmartphone size={40} />, label: "High-Tech & Accessoires" },
    { icon: <Image src={'/icon/carrefour.svg'} width={55} height={55} alt="Carrefour" />, label: "Carrefour" },
   { icon: <RefreshCcw  size={40} />, label: "EXCHANGE" },
];

export default function SactionGrid() {
    const cardsRef = useRef([]);
    useEffect(() => {
        cardsRef.current.forEach((el, i) => {
            gsap.fromTo(el,
                { opacity: 0, y: 60 },
                {   opacity: 1, y: 0, duration: 0.7, delay: i * 0.12, ease: "power2.out", 
                    scrollTrigger: { trigger: el, start: "top 100%", toggleActions: "play none none none", }, 
                }
            );
        });
    }, []);
    return (
        <div>
            <div className="w-full flex flex-col items-center justify-center gap-8 py-20 bg-primary relative h-full">
                <div className="bg-white z-30 lg:bg-cover w-full h-10 top-0 rounded-full-css absolute"></div>
                <h2 className="uppercase text-2xl lg:text-4xl font-semibold text-center text-white">Nos Services & Activités</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
                    {services.map((service, i) => (
                        <div key={service.label} ref={el => (cardsRef.current[i] = el)} className="flex items-center gap-4 bg-white rounded-full px-6 py-3 shadow-2xl text-[#7B1623]" >
                            <span className="flex items-center justify-center">{service.icon}</span>
                            <span className="text-xl font-semibold uppercase">{service.label}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="relative w-full h-screen flex items-center justify-center">
                <img src="https://ghostwhite-goldfinch-864066.hostingersite.com/uploads/UPLODESYSTEME/images/68640dd247672_slide1-4 1.png" alt="menara mall" title="menara mall" width={1920} height={1080} className="object-cover h-full w-full absolute top-0 left-0 z-0" />
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>
                <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center gap-4 justify-center z-20">
                    <h1 className="text-center text-white text-5xl font-bold uppercase ">Spectacle de Fontaines Musicales</h1>
                    <p className="text-white text-center max-w-2xl">Venez découvrir le spectacle de fontaines musicales au Menara Mall, une expérience magique qui allie musique, lumière et eau pour émerveiller petits et grands.</p>
                    {/* <button className="px-6 py-2 bg-primary text-white hover:bg-white hover:text-primary duration-500 border-2 cursor-pointer border-primary font-medium rounded-full text-lg uppercase flex items-center gap-2">Découvrir le spectacle</button> */}
                </div>
            </div>
        </div>
    );
}