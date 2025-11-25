"use client";

import { useState, useEffect } from "react";

import ChiffreDaffaire from "@/components/index/chiffreDaffaire";
import Header from "@/components/index/header";
import SactionGrid from "@/components/index/sactionGrid";
import LogoScroll from "@/tools/logoScroll";
import ShoppingSection from "@/components/index/ShoppingSection";
import KidzoSection from "@/components/index/kidzoSection"; 
import RestauSection from "@/components/index/RestauSection";
import MapSection from "@/components/index/MapSection";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setLoading(false), 500);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-white via-red-50 to-white space-y-6 transition-opacity duration-500 ${
          fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <img
          src="/img/logo_red.png"
          alt="Logo Menara Mall"
          className="h-24 w-auto animate-spin-slow"
        />
       
      </div>
    );
  }

  return (
    <main className="animate-fade-in duration-500">
      <Navbar />
      <Header />
      <LogoScroll />
      <ChiffreDaffaire />
      <SactionGrid />
      <ShoppingSection />
      <KidzoSection />
      <RestauSection />
      <MapSection />
      <Footer />
    </main>
  );
}
