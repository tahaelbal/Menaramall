'use client';
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    const items = [
        { name: "Accueil", link: "#" },
        { name: "Kidzo", link: "#" },
        { name: "Le souk", link: "#" },
        { name: "Shopping", link: "#" },
        { name: "Restaurants et cafes", link: "#" },
        { name: "Evenements", link: "#" },
        { name: "Contact", link: "#" },
    ];

    const navbarRef = useRef(null);
    const menuPanelRef = useRef(null);
    const closeButtonRef = useRef(null);
    const [openNav, setOpenNav] = useState(false);
    const [logoSrc, setLogoSrc] = useState('/img/logo_white.png');

    useEffect(() => {
        const navbar = navbarRef.current;
        const handleScroll = () => {
            if (window.scrollY > 50) {
                gsap.to(navbar, { backgroundColor: "white", duration: 0.7, color: "black" });
                setLogoSrc('/img/logo_red.png');
            } else {
                gsap.to(navbar, { backgroundColor: "transparent", duration: 0.7 , color: "white" });
                setLogoSrc('/img/logo_white.png');
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

   

    return (
        <div>
            {/* Navbar */}
            <div ref={navbarRef} className="fixed right-0 left-0 text-white z-50 flex flex-col justify-between items-center gap-3 p-6 px-20" >
                <Image src={logoSrc} alt="menara mall" title="menara mall" width={500} height={500} className="object-cover w-56" />
                <div className="flex items-center justify-center gap-6 ">
                    {items.map((item, index) => (
                        <Link key={index} href={item.link} className="hover:text-primary hover:border-b hover:duration-500 cursor-pointer text-sm">
                            {item.name}
                        </Link>
                    ))}
                    
                </div>
            </div>
        </div>
    );
}