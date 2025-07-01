import { Phone, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
const Footer = () => {
  const {
    t
  } = useLanguage();
  return <footer className="bg-black text-white border-t-4 border-brand-orange">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-brand-orange">KURDO Car GmbH</h3>
            <p className="text-gray-300 mb-4">
              {t('footer.company.description')}
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-brand-blue text-[#ff8c00]">{t('footer.services')}</h4>
            <ul className="space-y-2 text-gray-300">
              <li>{t('footer.services.sales')}</li>
              <li>{t('footer.services.evaluation')}</li>
              <li>{t('footer.services.assessment')}</li>
              <li>{t('footer.services.preowned')}</li>
              <li>{t('footer.services.import')}</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-brand-orange ">{t('footer.contact')}</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-brand-orange" />
                <span>+41 76 336 77 99</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-brand-orange" />
                <span>kurdocar@bluewin.ch</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 mt-1 text-brand-orange" />
                <div>
                  <div>Grünaustrasse 15</div>
                  <div>8953 Dietikon, Switzerland</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 bg-brand-orange">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-black">
            <div className="flex space-x-6 mb-2 md:mb-0">
              <Link to="/privacy" className="hover:underline font-medium">{t('footer.legal.privacy')}</Link>
            </div>
            <p className="text-sm">
              {t('footer.designed')}
            </p>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;