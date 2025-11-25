"use client";

import { useEffect, useRef } from "react";

export default function NeigeAnimée() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    container.innerHTML = ""; // Supprime les anciens flocons

    const totalFlocons = 200; // ❄️ Augmenté à 200 flocons

    for (let i = 0; i < totalFlocons; i++) {
      const flocon = document.createElement("div");
      flocon.className = "flocon";
      flocon.innerText = "❄️";

      // Position et style aléatoires
      flocon.style.left = Math.random() * 100 + "%";
      flocon.style.animationDuration = 4 + Math.random() * 6 + "s";
      flocon.style.animationDelay = Math.random() * 4 + "s";
      flocon.style.opacity = 0.5 + Math.random() * 0.5;
      flocon.style.fontSize = 12 + Math.random() * 20 + "px";

      container.appendChild(flocon);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-10 overflow-hidden"
    />
  );
}
