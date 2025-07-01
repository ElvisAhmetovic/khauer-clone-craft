
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, ShoppingCart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Services = () => {
  const { t, language } = useLanguage();

  const customServices = [
    {
      icon: <ShoppingCart className="w-16 h-16 text-brand-blue" />,
      title: t('services.purchase.title'),
      description: language === 'en' ? 'Professional vehicle evaluation and quick processing.' : 'Professionelle Fahrzeugbewertung und schnelle Abwicklung.',
      image: "/lovable-uploads/519087b3-97f5-4540-aaf3-4784dda17fd3.png",
      buttonText: language === 'en' ? 'Get Quote' : 'Angebot erhalten',
      buttonAction: 'contact'
    },
    {
      icon: <Car className="w-16 h-16 text-brand-blue" />,
      title: t('services.sales.title'),
      description: language === 'en' ? 'Quality vehicles in excellent condition. All brands, fair prices.' : 'Hochwertige Fahrzeuge in ausgezeichnetem Zustand. Alle Marken, faire Preise.',
      image: "/lovable-uploads/dd836921-b71a-44c2-b8f2-504821fc168e.png",
      buttonText: language === 'en' ? 'View Our Cars' : 'Unsere Autos ansehen',
      buttonAction: 'autoscout24'
    }
  ];

  const autoHouseServices = [
    {
      title: language === 'en' ? 'Vehicle Evaluation' : 'Fahrzeugbewertung',
      description: language === 'en' ? 'Professional assessment of your vehicle\'s market value' : 'Professionelle Bewertung des Marktwerts Ihres Fahrzeugs'
    },
    {
      title: language === 'en' ? 'Quick Purchase' : 'Schneller Ankauf',
      description: language === 'en' ? 'Fast and fair vehicle purchase process' : 'Schneller und fairer Fahrzeugankauf'
    },
    {
      title: language === 'en' ? 'Quality Sales' : 'Qualitätsverkauf',
      description: language === 'en' ? 'Carefully selected pre-owned vehicles' : 'Sorgfältig ausgewählte Gebrauchtwagen'
    },
    {
      title: language === 'en' ? 'All Brands' : 'Alle Marken',
      description: language === 'en' ? 'We work with all vehicle makes and models' : 'Wir arbeiten mit allen Fahrzeugmarken und -modellen'
    },
    {
      title: language === 'en' ? 'Import & Export' : 'Import & Export',
      description: language === 'en' ? 'International vehicle trading services' : 'Internationaler Fahrzeughandel'
    },
    {
      title: language === 'en' ? 'Trade-In Services' : 'Inzahlungnahme',
      description: language === 'en' ? 'Trade your current vehicle for a new one with competitive rates' : 'Tauschen Sie Ihr aktuelles Fahrzeug gegen ein neues zu konkurrenzfähigen Konditionen'
    }
  ];

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openAutoScout24 = () => {
    window.open('https://www.autoscout24.ch/de/s/seller-68160', '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="services" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        {/* Custom Services Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {customServices.map((service, index) => (
            <div key={index} className="relative overflow-hidden rounded-lg">
              <div className="absolute inset-0">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-70"></div>
              </div>
              <div className="relative z-10 p-8 h-96 flex flex-col justify-center">
                <div className="mb-6">
                  {service.icon}
                </div>
                <h3 className="text-3xl font-bold mb-6 text-brand-blue uppercase tracking-wide">
                  {service.title}
                </h3>
                <p className="text-lg leading-relaxed mb-6">
                  {service.description}
                </p>
                {service.buttonAction === 'autoscout24' ? (
                  <Button 
                    onClick={openAutoScout24}
                    className="bg-brand-orange hover:bg-orange-600 text-black font-bold py-3 px-6 w-fit animate-shake-button"
                  >
                    {service.buttonText}
                  </Button>
                ) : service.buttonAction === 'contact' ? (
                  <Button 
                    onClick={scrollToContact}
                    className="bg-brand-orange hover:bg-orange-600 text-black font-bold py-3 px-6 w-fit"
                  >
                    {service.buttonText}
                  </Button>
                ) : (
                  <Link to="/vehicles">
                    <Button className="bg-brand-orange hover:bg-orange-600 text-black font-bold py-3 px-6 w-fit">
                      {service.buttonText}
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Auto House Services */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brand-blue mb-4 uppercase tracking-wide">
            {language === 'en' ? 'Our Auto House Services' : 'Unsere Auto House Services'}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {language === 'en' ? 'Professional car dealership specializing in buying, selling and trading quality vehicles' : 'Professionelles Autohaus spezialisiert auf Kauf, Verkauf und Handel mit hochwertigen Fahrzeugen'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {autoHouseServices.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 bg-white border-gray-200">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Car className="w-12 h-12 text-brand-orange" />
                </div>
                <CardTitle className="text-xl text-brand-blue">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
