import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VehicleInventory from "@/components/VehicleInventory";
import { VehicleFilterProvider } from "@/contexts/VehicleFilterContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Car, Phone, Mail } from "lucide-react";

const Vehicles = () => {
  const { t } = useLanguage();

  return (
    <VehicleFilterProvider>
      <div className="min-h-screen">
        <Header />
        
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-black to-gray-900 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {t('vehicles.title').split(' ')[0]} <span className="text-lime-400">{t('vehicles.title').split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              {t('vehicles.subtitle')}
            </p>
          </div>
        </div>

        {/* Vehicle Inventory Section */}
        <div className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <VehicleInventory />
          </div>
        </div>

        {/* Features Section */}
        <div className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="bg-lime-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Car className="w-8 h-8 text-lime-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">{t('vehicles.features.quality.title')}</h3>
                <p className="text-gray-600">{t('vehicles.features.quality.desc')}</p>
              </div>
              <div className="text-center">
                <div className="bg-lime-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-lime-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">{t('vehicles.features.service.title')}</h3>
                <p className="text-gray-600">{t('vehicles.features.service.desc')}</p>
              </div>
              <div className="text-center">
                <div className="bg-lime-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-lime-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">{t('vehicles.features.contact.title')}</h3>
                <p className="text-gray-600">{t('vehicles.features.contact.desc')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="bg-black text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('vehicles.cta.title')}
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              {t('vehicles.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+41763367799"
                className="inline-flex items-center gap-2 bg-lime-400 hover:bg-lime-500 text-black font-bold py-3 px-6 rounded-lg transition-colors duration-300"
              >
                <Phone className="w-5 h-5" />
                {t('vehicles.cta.call')}
              </a>
              <a
                href="mailto:kurdocar@bluewin.ch"
                className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
              >
                <Mail className="w-5 h-5" />
                {t('vehicles.cta.email')}
              </a>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </VehicleFilterProvider>
  );
};

export default Vehicles;
