"use client";

export default function MapSection() {
  return (
    <section className="w-full">
     

      {/* Carte cliquable */}
      <div
        className="relative w-full h-[100dvh] overflow-hidden shadow-lg cursor-pointer"
        onClick={() => {
          const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

          if (isMobile) {
            // Ouvrir Waze sur mobile
            window.open("https://waze.com/ul?q=Menara+Mall+Marrakech", "_blank");
          } else {
            // Ouvrir Google Maps sur ordinateur
            window.open("https://www.google.com/maps?q=Menara+Mall+Marrakech", "_blank");
          }
        }}
      >
        {/* Iframe de la carte */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3397.555533703685!2d-8.0092535!3d31.6186366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafeef0dcc23d91%3A0x735474c845c84dbd!2sM%C3%A9nara%20Mall!5e0!3m2!1sfr!2sma!4v1751615100231!5m2!1sfr!2sma"
          width="100%"
          height="100%"
          style={{ border: 0, pointerEvents: "none" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

        {/* Message d’indication */}
        <div className="absolute bottom-4 right-4 bg-white/80 text-black text-sm px-3 py-1 rounded-lg shadow">
          📍 Cliquez pour ouvrir dans Google Maps / Waze
        </div>
      </div>
    </section>
  );
}
