
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-black text-white border-t-4 border-lime-400">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-lime-400">KURDO Car GmbH</h3>
            <p className="text-gray-300 mb-4">
              {t('footer.company.description')}
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 hover:text-lime-400 cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 hover:text-lime-400 cursor-pointer transition-colors" />
              <Linkedin className="w-5 h-5 hover:text-lime-400 cursor-pointer transition-colors" />
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-lime-400">{t('footer.services')}</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:text-lime-400 cursor-pointer transition-colors">{t('services.repairs')}</li>
              <li className="hover:text-lime-400 cursor-pointer transition-colors">{t('services.maintenance')}</li>
              <li className="hover:text-lime-400 cursor-pointer transition-colors">{t('services.tuv')}</li>
              <li className="hover:text-lime-400 cursor-pointer transition-colors">{t('services.bodywork')}</li>
              <li className="hover:text-lime-400 cursor-pointer transition-colors">{t('services.electronics')}</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-lime-400">{t('footer.links')}</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/" className="hover:text-lime-400 cursor-pointer transition-colors">{t('nav.home')}</Link></li>
              <li className="hover:text-lime-400 cursor-pointer transition-colors">{t('nav.about')}</li>
              <li className="hover:text-lime-400 cursor-pointer transition-colors">{t('nav.contact')}</li>
              <li className="hover:text-lime-400 cursor-pointer transition-colors">{t('footer.legal.imprint')}</li>
              <li><Link to="/privacy" className="hover:text-lime-400 cursor-pointer transition-colors">{t('footer.legal.privacy')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-lime-400">{t('footer.contact')}</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-lime-400" />
                <span>+41 76 336 77 99</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-lime-400" />
                <span>kurdocar@bluewin.ch</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 mt-1 text-lime-400" />
                <div>
                  <div>Grünaustrasse 15</div>
                  <div>8953 Dietikon, Switzerland</div>
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
              <a href="#impressum" className="hover:underline font-medium">{t('footer.legal.imprint')}</a>
              <Link to="/privacy" className="hover:underline font-medium">{t('footer.legal.privacy')}</Link>
            </div>
            <p className="text-sm">
              {t('footer.designed')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
