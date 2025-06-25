
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white border-t-4 border-lime-400">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-lime-400">KHAUER KFZ</h3>
            <p className="text-gray-300 mb-4">
              Ihr zuverlässiger Partner für alle KFZ-Belange. 
              Meisterbetrieb mit über 20 Jahren Erfahrung.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 hover:text-lime-400 cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 hover:text-lime-400 cursor-pointer transition-colors" />
              <Linkedin className="w-5 h-5 hover:text-lime-400 cursor-pointer transition-colors" />
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-lime-400">Leistungen</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:text-lime-400 cursor-pointer transition-colors">Reparaturen</li>
              <li className="hover:text-lime-400 cursor-pointer transition-colors">Wartung & Inspektion</li>
              <li className="hover:text-lime-400 cursor-pointer transition-colors">TÜV & AU</li>
              <li className="hover:text-lime-400 cursor-pointer transition-colors">Karosserie & Lack</li>
              <li className="hover:text-lime-400 cursor-pointer transition-colors">Elektrik & Elektronik</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-lime-400">Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:text-lime-400 cursor-pointer transition-colors">Startseite</li>
              <li className="hover:text-lime-400 cursor-pointer transition-colors">Über uns</li>
              <li className="hover:text-lime-400 cursor-pointer transition-colors">Kontakt</li>
              <li className="hover:text-lime-400 cursor-pointer transition-colors">Impressum</li>
              <li className="hover:text-lime-400 cursor-pointer transition-colors">Datenschutz</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-lime-400">Kontakt</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-lime-400" />
                <span>01 51 / 12 89 24 33</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-lime-400" />
                <span>info@khauer-kfz.de</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 mt-1 text-lime-400" />
                <div>
                  <div>Auerbergstr. 16a</div>
                  <div>85283 Wolnzach</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 bg-lime-400">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-black">
            <div className="flex space-x-6 mb-2 md:mb-0">
              <a href="#impressum" className="hover:underline font-medium">Impressum</a>
              <a href="#datenschutz" className="hover:underline font-medium">Datenschutzerklärung</a>
            </div>
            <p className="text-sm">
              Designed by Marketing-Elefanten, dem Marketing-Team der eliteCloud
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
