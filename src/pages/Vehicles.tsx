
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CarListings from "@/components/CarListings";
import AutoScout24Widget from "@/components/AutoScout24Widget";
import { useLanguage } from "@/contexts/LanguageContext";
import { Car, Phone, Mail, ExternalLink } from "lucide-react";
import { useState } from "react";

const Vehicles = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'widget' | 'iframe' | 'scraped'>('widget');

  return (
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
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-7xl mx-auto">
            <div className="p-8 bg-black text-white text-center">
              <Car className="w-16 h-16 mx-auto mb-4 text-lime-400" />
              <h2 className="text-3xl font-bold mb-4">
                {t('vehicles.inventory.title')}
              </h2>
              <p className="text-gray-300 mb-6">
                Unsere aktuellen Fahrzeuge - live von AutoScout24
              </p>
              
              {/* Tab Navigation */}
              <div className="flex justify-center gap-4 mt-6 flex-wrap">
                <button
                  onClick={() => setActiveTab('widget')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    activeTab === 'widget'
                      ? 'bg-lime-400 text-black'
                      : 'bg-gray-700 text-white hover:bg-gray-600'
                  }`}
                >
                  AutoScout24 Widget
                </button>
                <button
                  onClick={() => setActiveTab('iframe')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    activeTab === 'iframe'
                      ? 'bg-lime-400 text-black'
                      : 'bg-gray-700 text-white hover:bg-gray-600'
                  }`}
                >
                  AutoScout24 Direkt
                </button>
                <button
                  onClick={() => setActiveTab('scraped')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    activeTab === 'scraped'
                      ? 'bg-lime-400 text-black'
                      : 'bg-gray-700 text-white hover:bg-gray-600'
                  }`}
                >
                  Unsere Übersicht
                </button>
              </div>
            </div>
            
            {/* Content based on active tab */}
            <div className="p-8">
              {activeTab === 'widget' && (
                <div>
                  <div className="mb-6 text-center">
                    <p className="text-gray-600 mb-4">
                      Live-Ansicht unserer Fahrzeuge über das AutoScout24 Widget
                    </p>
                  </div>
                  <AutoScout24Widget 
                    dealerId="68160" 
                    language="de"
                    width="100%"
                    height="1000px"
                  />
                </div>
              )}
              
              {activeTab === 'iframe' && (
                <div>
                  <div className="mb-6 text-center">
                    <p className="text-gray-600 mb-4">
                      Direkte Einbettung unserer AutoScout24-Seite
                    </p>
                  </div>
                  <div className="w-full" style={{ height: '1000px' }}>
                    <iframe
                      src="https://www.autoscout24.ch/de/s/seller-68160"
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      title="AutoScout24 Fahrzeuge"
                      className="rounded-lg"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation"
                    />
                  </div>
                </div>
              )}
              
              {activeTab === 'scraped' && (
                <div>
                  <div className="mb-6 text-center">
                    <p className="text-gray-600 mb-4">
                      Unsere Fahrzeuge-Übersicht mit detaillierten Informationen
                    </p>
                  </div>
                  <CarListings />
                </div>
              )}
            </div>
            
            {/* AutoScout24 Backup Link */}
            <div className="p-6 text-center bg-gray-50 border-t">
              <p className="text-gray-600 mb-4">
                Sie können auch direkt auf unserer AutoScout24-Seite stöbern:
              </p>
              <a
                href="https://www.autoscout24.ch/de/s/seller-68160"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-lime-400 hover:bg-lime-500 text-black font-bold py-3 px-6 rounded-lg transition-colors duration-300"
              >
                <ExternalLink className="w-5 h-5" />
                AutoScout24 besuchen
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
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
  );
};

export default Vehicles;
