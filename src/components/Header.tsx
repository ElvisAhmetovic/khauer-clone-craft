
import { Phone, Mail, MapPin, Menu, X } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageToggle from "./LanguageToggle";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <header className="bg-black shadow-lg">
      {/* Top contact bar */}
      <div className="bg-gray-900 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone size={16} />
                <span>076 336 77 99</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} />
                <span>info@khauer-kfz.de</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <MapPin size={16} />
                <span>Grünaustrasse 21, Wolnzach</span>
              </div>
              <LanguageToggle />
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
              {t('nav.home')}
            </a>
            <a href="#services" className="text-white hover:text-lime-400 font-medium transition-colors">
              {t('nav.services')}
            </a>
            <a href="#about" className="text-white hover:text-lime-400 font-medium transition-colors">
              {t('nav.about')}
            </a>
            <a href="#contact" className="text-white hover:text-lime-400 font-medium transition-colors">
              {t('nav.contact')}
            </a>
            <a href="#vehicles" className="text-lime-400 hover:text-lime-300 font-medium transition-colors">
              {t('nav.vehicles')}
            </a>
            <a href="#gallery" className="text-white hover:text-lime-400 font-medium transition-colors">
              {t('nav.gallery')}
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
                {t('nav.home')}
              </a>
              <a href="#services" className="text-white hover:text-lime-400 font-medium">
                {t('nav.services')}
              </a>
              <a href="#about" className="text-white hover:text-lime-400 font-medium">
                {t('nav.about')}
              </a>
              <a href="#contact" className="text-white hover:text-lime-400 font-medium">
                {t('nav.contact')}
              </a>
              <a href="#vehicles" className="text-lime-400 hover:text-lime-300 font-medium">
                {t('nav.vehicles')}
              </a>
              <a href="#gallery" className="text-white hover:text-lime-400 font-medium">
                {t('nav.gallery')}
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
