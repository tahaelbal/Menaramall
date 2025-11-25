"use client";
import CountUp from "react-countup";

export default function ChiffreDaffaire() {
  return (
    <div className="w-full flex items-center justify-center py-12 p-10">
      <div className="bg-[#7B1623] rounded-3xl lg:rounded-full w-full p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-3 items-center justify-between gap-3">
        <div className="flex flex-col items-center">
          <span className="text-white font-bold uppercase text-3xl text-center mb-2">
            BOUTIQUES & ENSEIGNES
          </span>
          <span className="text-white font-bold text-3xl md:text-5xl text-center">
            +<CountUp end={50} duration={2} separator=" " enableScrollSpy />
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-white font-bold uppercase text-3xl text-center mb-2">
            ESPACE CLIMATISÉ
          </span>
          <span className="text-white font-bold text-3xl md:text-5xl text-center">
            +<CountUp end={10000} duration={2} separator=" " enableScrollSpy /> M²
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-white font-bold uppercase text-3xl text-center mb-2">
            RESTAURANTS & CAFÉS
          </span>
          <span className="text-white font-bold text-3xl md:text-5xl text-center">
            +<CountUp end={18} duration={2} separator=" " enableScrollSpy />
          </span>
        </div>
      </div>
    </div>
  );
}