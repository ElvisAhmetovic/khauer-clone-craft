
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Car, Phone, Mail, ExternalLink } from "lucide-react";
import { useEffect, useRef } from "react";
import { SEO } from "@/components/SEO";

const Vehicles = () => {
  const { t } = useLanguage();
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const scheduleNextShake = () => {
      // Random delay between 6 and 10 seconds
      const randomDelay = Math.random() * 4000 + 6000; // 6000ms to 10000ms
      
      setTimeout(() => {
        // Add shake class
        button.classList.add('animate-shake-button');
        
        // Remove shake class after animation completes
        setTimeout(() => {
          button.classList.remove('animate-shake-button');
          // Schedule next shake
          scheduleNextShake();
        }, 600); // Animation duration is 0.6s
      }, randomDelay);
    };

    // Start the shake cycle
    scheduleNextShake();

    // Cleanup function
    return () => {
      button.classList.remove('animate-shake-button');
    };
  }, []);

  return (
    <>
      <SEO
        title="Fahrzeugverkauf"
        description="KURDO Car GmbH - Professioneller Fahrzeugverkauf in Dietikon. Besuchen Sie unsere Ausstellung auf AutoScout24 für Premium-Gebrauchtwagen. Persönliche Beratung und faire Preise."
        canonicalUrl="https://yourdomain.com/vehicles"
        keywords="Fahrzeugverkauf, Auto verkaufen, Gebrauchtwagen kaufen, AutoScout24, KURDO Car, Dietikon"
      />
      <div className="min-h-screen">
        <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-black to-gray-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {t('vehicles.title').split(' ')[0]} <span className="text-brand-orange">{t('vehicles.title').split(' ').slice(1).join(' ')}</span>
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
              <Car className="w-16 h-16 mx-auto mb-4 text-brand-orange" />
              <h2 className="text-3xl font-bold mb-4 text-brand-orange">
                {t('vehicles.inventory.title')}
              </h2>
              <p className="text-gray-100 mb-6">
                {t('vehicles.inventory.subtitle')}
              </p>
            </div>
            
            {/* Simple AutoScout24 Button */}
            <div className="p-8 text-center">
              <p className="text-gray-600 mb-6">
                {t('vehicles.inventory.description')}
              </p>
              <a
                ref={buttonRef}
                href="https://www.autoscout24.ch/de/s/seller-68160"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-brand-orange hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-lg transition-colors duration-300 text-lg"
              >
                <ExternalLink className="w-6 h-6" />
                {t('vehicles.inventory.button')}
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
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="w-8 h-8 text-brand-blue" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-brand-blue">{t('vehicles.features.quality.title')}</h3>
              <p className="text-gray-600">{t('vehicles.features.quality.desc')}</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-brand-orange" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-brand-orange">{t('vehicles.features.service.title')}</h3>
              <p className="text-gray-600">{t('vehicles.features.service.desc')}</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-brand-blue" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-brand-blue">{t('vehicles.features.contact.title')}</h3>
              <p className="text-gray-600">{t('vehicles.features.contact.desc')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-black text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-brand-orange">
            {t('vehicles.cta.title')}
          </h2>
          <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
            {t('vehicles.cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+41763367799"
              className="inline-flex items-center gap-2 bg-brand-orange hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
            >
              <Phone className="w-5 h-5" />
              {t('vehicles.cta.call')}
            </a>
            <a
              href="mailto:kurdocar@bluewin.ch"
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-brand-blue font-bold py-3 px-6 rounded-lg transition-colors duration-300"
            >
              <Mail className="w-5 h-5" />
              {t('vehicles.cta.email')}
            </a>
          </div>
        </div>
      </div>

        <Footer />
      </div>
    </>
  );
};

export default Vehicles;
