'use client';

import { useEffect, useState } from "react";
import { MapPin, Phone, Mail, Facebook, Instagram } from "lucide-react";
import Navbar from "../navbar";

export default function Contact() {


  return (
    <div className="min-h-screen bg-white">
      {/* Image d’accueil */}
    <div className="relative w-full h-[100vh] overflow-hidden">
  <div className="absolute top-0 left-0 w-full h-full bg-black opacity-55 z-10"></div>
  <img
    src="https://ghostwhite-goldfinch-864066.hostingersite.com/uploads/UPLODESYSTEME/images/68639ce2c18b9_slide1-1 1.png"
    alt="Bannière Souk"
    className="absolute top-0 left-0 w-full h-full object-cover z-0"
  />
  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 text-center">
    <h1 className="text-center text-white text-4xl sm:text-6xl md:text-8xl font-bold drop-shadow uppercase">
      Contacts
    </h1>
  </div>
</div>

      {/* Coordonnées */}
      <div className="p-6 sm:p-10 flex flex-col md:flex-row justify-center items-center gap-6 bg-primary bg-cover bg-center">
        <div className="bg-white text-primary px-6 py-4 rounded shadow-md w-full sm:w-auto text-center">
          <span className="font-semibold">Adresse :</span> Avenue Mohammed VI , Marrakech
        </div>
        <div className="bg-white text-primary px-6 py-4 rounded shadow-md w-full sm:w-auto text-center">
          <span className="font-semibold">Email :</span> info@menaramall.com
        </div>
        <div className="bg-white text-primary px-6 py-4 rounded shadow-md w-full sm:w-auto text-center">
          <span className="font-semibold">Phone :</span> +212 524 35 10 50
        </div>
      </div>

      {/* Formulaire */}
      <div className="max-w-7xl mx-auto px-4 py-16">
  <h1 className="uppercase text-2xl lg:text-4xl font-semibold text-left text-primary mb-6 px-16 lg:px-24">
  Contactez-nous
</h1>
<h3 className="mb-10 px-16 lg:px-24">
  Remplissez le formulaire ci-dessous, et nous vous répondrons dans les plus brefs délais.
</h3>


 <form
  className="space-y-6 px-16 lg:px-24"
  onSubmit={async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    });

    const data = await res.json();
    if (data.success) {
      alert('✅ Message envoyé avec succès !');
      form.reset();
    } else {
      alert('❌ Erreur lors de l’envoi du message.');
    }
  }}
>
  <div>
    <label className="block text-sm font-medium text-gray-700">Nom</label>
    <input
      type="text"
      name="name"
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
      placeholder="Votre nom"
      required
    />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700">Email</label>
    <input
      type="email"
      name="email"
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
      placeholder="exemple@mail.com"
      required
    />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700">Message</label>
    <textarea
      name="message"
      rows={4}
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
      placeholder="Votre message"
      required
    ></textarea>
  </div>
  <button
    type="submit"
    className="w-full px-16 py-2 bg-primary text-white hover:bg-white hover:text-primary duration-500 border-2 border-primary font-medium rounded-full text-lg uppercase flex items-center justify-center gap-2"
  >
    <Mail className="w-5 h-5" />
    Envoyer Message
  </button>
</form>

</div>


      {/* Map */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <h3 className="uppercase text-2xl lg:text-4xl font-semibold text-center text-primary">
          Retrouvez-nous sur Google Maps
        </h3>
        <p className="text-center">
          Localisez-nous facilement sur la carte et venez visiter notre emplacement.<br />
          Cliquez sur la carte pour ouvrir Google Maps et naviguer vers nous en toute simplicité !
        </p>
      </div>

<div
  className="relative w-full h-[100dvh] overflow-hidden shadow-lg cursor-pointer"
  onClick={() => {
    // Détection mobile
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile) {
      // Ouvrir Waze sur mobile
      window.open(
        "https://waze.com/ul?q=Menara+Mall+Marrakech",
        "_blank"
      );
    } else {
      // Ouvrir Google Maps sur ordinateur
      window.open(
        "https://www.google.com/maps?q=Menara+Mall+Marrakech",
        "_blank"
      );
    }
  }}
>
  {/* Iframe de la carte */}
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3397.555533703685!2d-8.0092535!3d31.6186366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafeef0dcc23d91%3A0x735474c845c84dbd!2sM%C3%A9nara%20Mall!5e0!3m2!1sfr!2sma!4v1751615100231!5m2!1sfr!2sma"
    width="100%"
    height="100%"
    style={{ border: 0, pointerEvents: "none" }}
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>

  {/* Message d’indication */}
  <div className="absolute bottom-3 right-3 bg-white/80 text-black text-sm px-3 py-1 rounded-lg shadow">
    📍 Cliquez pour ouvrir dans Google Maps / Waze
  </div>
</div>


    </div>
  );
}
