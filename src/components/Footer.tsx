
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">KHAUER KFZ</h3>
            <p className="text-blue-200 mb-4">
              Ihr zuverlässiger Partner für alle KFZ-Belange. 
              Meisterbetrieb mit über 20 Jahren Erfahrung.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 hover:text-yellow-400 cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 hover:text-yellow-400 cursor-pointer transition-colors" />
              <Linkedin className="w-5 h-5 hover:text-yellow-400 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Leistungen</h4>
            <ul className="space-y-2 text-blue-200">
              <li className="hover:text-white cursor-pointer transition-colors">Reparaturen</li>
              <li className="hover:text-white cursor-pointer transition-colors">Wartung & Inspektion</li>
              <li className="hover:text-white cursor-pointer transition-colors">TÜV & AU</li>
              <li className="hover:text-white cursor-pointer transition-colors">Karosserie & Lack</li>
              <li className="hover:text-white cursor-pointer transition-colors">Elektrik & Elektronik</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Links</h4>
            <ul className="space-y-2 text-blue-200">
              <li className="hover:text-white cursor-pointer transition-colors">Startseite</li>
              <li className="hover:text-white cursor-pointer transition-colors">Über uns</li>
              <li className="hover:text-white cursor-pointer transition-colors">Kontakt</li>
              <li className="hover:text-white cursor-pointer transition-colors">Impressum</li>
              <li className="hover:text-white cursor-pointer transition-colors">Datenschutz</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Kontakt</h4>
            <div className="space-y-3 text-blue-200">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4" />
                <span>+49 123 456 789</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4" />
                <span>info@khauer-kfz.de</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 mt-1" />
                <div>
                  <div>Musterstraße 123</div>
                  <div>12345 Musterstadt</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-blue-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-blue-200">
            <p>&copy; 2024 KHAUER KFZ. Alle Rechte vorbehalten.</p>
            <p className="mt-2 md:mt-0">
              Meisterbetrieb für Kraftfahrzeugtechnik
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
