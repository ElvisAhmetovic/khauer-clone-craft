
import { Phone, Mail, MapPin, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg">
      {/* Top contact bar */}
      <div className="bg-blue-900 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone size={16} />
                <span>+49 123 456 789</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} />
                <span>info@khauer-kfz.de</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin size={16} />
              <span>Musterstraße 123, 12345 Musterstadt</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-900">
            KHAUER KFZ
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="text-gray-700 hover:text-blue-900 font-medium transition-colors">
              Startseite
            </a>
            <a href="#services" className="text-gray-700 hover:text-blue-900 font-medium transition-colors">
              Leistungen
            </a>
            <a href="#about" className="text-gray-700 hover:text-blue-900 font-medium transition-colors">
              Über uns
            </a>
            <a href="#contact" className="text-gray-700 hover:text-blue-900 font-medium transition-colors">
              Kontakt
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col space-y-3">
              <a href="#home" className="text-gray-700 hover:text-blue-900 font-medium">
                Startseite
              </a>
              <a href="#services" className="text-gray-700 hover:text-blue-900 font-medium">
                Leistungen
              </a>
              <a href="#about" className="text-gray-700 hover:text-blue-900 font-medium">
                Über uns
              </a>
              <a href="#contact" className="text-gray-700 hover:text-blue-900 font-medium">
                Kontakt
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
