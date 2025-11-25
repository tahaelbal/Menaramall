"use client";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

export default function Navbar() {
  const items = [
    { name: "Accueil", link: "/" },
    { name: "Restaurants et cafes", link: "/restaurants" },
    { name: "Shopping", link: "/shopping" },
     { name: "Le souq", link: "/souk" },
    { name: "Kidzo", link: "/kidzo" },
    { name: "Contact", link: "/contacts" },
  ];

  const navbarRef = useRef(null);
  const [openNav, setOpenNav] = useState(false);
  const [logoSrc, setLogoSrc] = useState("/img/logo_white.png");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
        setLogoSrc("/img/logo_red.png");
      } else {
        setScrolled(false);
        setLogoSrc("/img/logo_white.png");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (navbarRef.current) {
      navbarRef.current.style.backgroundColor = scrolled ? "white" : "transparent";
    }
  }, [scrolled]);

  return (
    <div
      ref={navbarRef}
      className="fixed top-0 left-0 right-0 z-50 transition duration-700"
      style={{ color: scrolled ? "black" : "white" }}
    >
      {/* Desktop Navbar */}
      <div className="hidden md:flex flex-col items-center gap-4 px-6 pt-6">
        <Image
          src={logoSrc}
          alt="menara mall"
          title="menara mall"
          width={500}
          height={500}
          className="w-56 object-cover"
        />
        <div className="flex gap-6 pb-4">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              onClick={() => setOpenNav(false)}
              className={clsx(
                "text-sm transition border-b-2 border-transparent hover:border-primary hover:text-primary cursor-pointer",
                scrolled ? "text-black" : "text-white"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile / Tablet Navbar */}
      <div className="flex md:hidden items-center justify-between px-4 py-3">
        <Image
          src={logoSrc}
          alt="menara mall"
          title="menara mall"
          width={220}
          height={220}
          className="object-contain w-40 sm:w-48"
        />

        <button
          onClick={() => setOpenNav(!openNav)}
          className={clsx("z-50 transition", scrolled ? "text-black" : "text-white")}
        >
          {openNav ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Menu mobile slide */}
      {openNav && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white text-black flex flex-col items-center gap-6 py-6">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              onClick={() => setOpenNav(false)}
              className="text-base hover:text-primary transition"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
