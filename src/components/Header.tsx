
import { Phone, Mail, MapPin, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-black shadow-lg">
      {/* Top contact bar */}
      <div className="bg-gray-900 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone size={16} />
                <span>01 51 / 12 89 24 33</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} />
                <span>info@khauer-kfz.de</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin size={16} />
              <span>Auerbergstr. 16a, 85283 Wolnzach</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-lime-400 mr-2">
              Khauer-KFZ
            </div>
            <div className="w-12 h-8 relative">
              <svg viewBox="0 0 100 40" className="w-full h-full text-lime-400" fill="currentColor">
                <path d="M10,35 Q20,15 40,20 Q60,25 80,15 Q90,10 95,15 Q90,25 80,25 Q60,30 40,25 Q20,20 10,35 Z" />
                <path d="M15,25 Q25,5 45,10 Q65,15 85,5 Q95,0 100,5 Q95,15 85,15 Q65,20 45,15 Q25,10 15,25 Z" />
              </svg>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="text-white hover:text-lime-400 font-medium transition-colors">
              Startseite
            </a>
            <a href="#services" className="text-white hover:text-lime-400 font-medium transition-colors">
              Leistungen
            </a>
            <a href="#about" className="text-white hover:text-lime-400 font-medium transition-colors">
              Über uns
            </a>
            <a href="#contact" className="text-white hover:text-lime-400 font-medium transition-colors">
              Kontakt
            </a>
            <a href="#vehicles" className="text-lime-400 hover:text-lime-300 font-medium transition-colors">
              Unsere Fahrzeuge
            </a>
            <a href="#gallery" className="text-white hover:text-lime-400 font-medium transition-colors">
              Galerie
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-700 pt-4">
            <div className="flex flex-col space-y-3">
              <a href="#home" className="text-white hover:text-lime-400 font-medium">
                Startseite
              </a>
              <a href="#services" className="text-white hover:text-lime-400 font-medium">
                Leistungen
              </a>
              <a href="#about" className="text-white hover:text-lime-400 font-medium">
                Über uns
              </a>
              <a href="#contact" className="text-white hover:text-lime-400 font-medium">
                Kontakt
              </a>
              <a href="#vehicles" className="text-lime-400 hover:text-lime-300 font-medium">
                Unsere Fahrzeuge
              </a>
              <a href="#gallery" className="text-white hover:text-lime-400 font-medium">
                Galerie
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
