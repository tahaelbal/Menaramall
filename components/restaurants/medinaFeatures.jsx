"use client";

import {
  Landmark,
  Pizza,
  ShoppingBag,
} from "lucide-react";

export default function MedinaFeatures() {
  const features = [
    {
      icon: <Landmark className="text-primary w-7 h-7 mr-3" />,
      title: "Terrasses Panoramiques",
    },
    {
      icon: <Pizza className="text-primary w-7 h-7 mr-3" />,
      title: "Fast Food",
    },
    {
      icon: <ShoppingBag className="text-primary w-7 h-7 mr-3" />,
      title: "Food Court",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((item, index) => (
          <div
            key={index}
            className="bg-white/90 border border-primary shadow-md rounded-xl p-5 flex items-center hover:shadow-xl transition duration-300"
          >
            {item.icon}
            <h3 className="text-base md:text-lg font-semibold text-black">
              {item.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}
