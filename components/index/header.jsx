"use client"

import { Store } from "lucide-react";

export default function Header() {
   

    return (
        <div className="relative ">
            <div className="relative w-full h-screen ">
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-55 z-10  "></div>
                <img src="https://ghostwhite-goldfinch-864066.hostingersite.com/uploads/UPLODESYSTEME/images/68639ce2c18b9_slide1-1 1.png" alt="menara mall" title="menara mall" width={1920} height={1080} className=" object-cover h-screen w-screen " />
                <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center z-20">
                <div className=" flex flex-col items-center gap-4">
                    <h1 className="text-center text-white text-5xl font-bold uppercase ">Bienvenue au Menara Mall Marrakech</h1>
                    <button className=" px-6 py-2 bg-primary text-white hover:bg-white hover:text-primary duration-500 border-2 cursor-pointer border-primary font-medium rounded-full text-lg uppercase flex items-center gap-2"><Store />Explorer les boutiques</button>
                </div>
                </div>
            </div>
            <div className=" bg-white z-30  lg:bg-cover w-full h-10  bottom-0 rotate-180 rounded-full-css absolute "></div>

        </div>
    );
}