import { Facebook, Instagram, MapPin, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 mt-0">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Bloc 1 - Logo + description */}
        <div>
          <img
            src="/img/logo_red.png"
            alt="Menara Mall"
            className="w-52 sm:w-60 h-auto object-contain mb-4"
          />
          <p className="text-sm leading-relaxed">
            Bienvenue à Menara Mall, situé sur les hauteurs de l’avenue Mohammed VI. 
            Ce tout nouvel espace dédié au shopping et aux loisirs vous ouvre ses portes 
            pour une expérience conviviale en famille ou entre amis.
          </p>
        </div>

        {/* Bloc 2 - Liens utiles */}
        <div>
          <h3 className="font-semibold text-lg mb-4 text-primary">Liens rapides</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-primary">Accueil</a></li>
            <li><a href="/kidzo" className="hover:text-primary">Kidzo</a></li>
            <li><a href="/souk" className="hover:text-primary">Le souq</a></li>
            <li><a href="/shopping" className="hover:text-primary">Shopping</a></li>
            <li><a href="/restaurants" className="hover:text-primary">Restaurants et cafés</a></li>
            
            <li><a href="/contacts" className="hover:text-primary">Contact</a></li>
          </ul>
        </div>

        {/* Bloc 3 – Horaires */}
        <div>
          <h3 className="font-semibold text-lg mb-4 text-primary">Horaires</h3>
          <ul className="text-sm space-y-3">
            <li>
              <strong>Magasins :</strong><br />
              🕘 10h00 à 22h00 — tous les jours
            </li>
            <li>
              <strong>Food Court & Kidzo :</strong><br />
              🕘 10h00 à 00h00 — du dimanche au jeudi<br />
              🕘 10h00 à 01h00 — le vendredi et le samedi
            </li>
            <li>
              <strong>Carrefour Market :</strong><br />
              🕘 09h00 à 23h00 — tous les jours
            </li>
          </ul>
        </div>

        {/* Bloc 4 - Contact + Réseaux */}
        <div>
          <h3 className="font-semibold text-lg mb-4 text-primary">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#6F0E18]" />
              Avenue Mohamed VI, Marrakech
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-[#6F0E18]" />
              <a href="tel:+212524351050">+212 5 24 35 10 50</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#6F0E18]" />
              <a href="mailto:info@menaramall.com">info@menaramall.com</a>
            </li>
          </ul>

          <div className="flex gap-4 mt-6">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <Facebook className="w-6 h-6 hover:scale-110 transition text-[#6F0E18]" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <Instagram className="w-6 h-6 hover:scale-110 transition text-[#6F0E18]" />
            </a>
          </div>
        </div>
      </div>

      {/* Bas de page */}
      <div className="bg-[#6F0E18] text-white text-center py-4 text-sm">
        © {new Date().getFullYear()} Menara Mall Marrakech. Tous droits réservés.
        
        Made by{" "}
        <a
          href="https://www.linkedin.com/in/taha-el-bal-247005293/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gray-300"
        >
          Taha El Bal
        </a>
      </div>

    </footer>
  );
}
