
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Zap, Car, ShoppingCart } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Services = () => {
  const { t, language } = useLanguage();
  
  const { data: services, isLoading, error } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('active', true)
        .order('category', { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  // Translation mapping for database services
  const serviceTranslations = {
    'Motordiagnose': {
      en: { name: 'Engine Diagnostics', description: 'Computer-assisted vehicle diagnostics' }
    },
    'TÜV/AU': {
      en: { name: 'TÜV/AU', description: 'Main inspection and emissions testing' }
    },
    'Bremsenservice': {
      en: { name: 'Brake Service', description: 'Inspection and maintenance of brake system' }
    },
    'Klimaservice': {
      en: { name: 'Climate Service', description: 'Maintenance and refilling of air conditioning' }
    },
    'Ölwechsel': {
      en: { name: 'Oil Change', description: 'Complete oil change with filter replacement' }
    },
    'Inspektion': {
      en: { name: 'Inspection', description: 'Large inspection according to manufacturer specifications' }
    },
    'Zahnriemenwechsel': {
      en: { name: 'Timing Belt Change', description: 'Replacement of timing belt' }
    },
    'Reifenwechsel': {
      en: { name: 'Tire Change', description: 'Seasonal tire change with storage' }
    }
  };

  const getTranslatedService = (service: any) => {
    if (language === 'en' && serviceTranslations[service.name as keyof typeof serviceTranslations]) {
      const translation = serviceTranslations[service.name as keyof typeof serviceTranslations].en;
      return {
        ...service,
        name: translation.name,
        description: translation.description
      };
    }
    return service;
  };

  const customServices = [
    {
      icon: <ShoppingCart className="w-16 h-16 text-lime-400" />,
      title: t('services.purchase.title'),
      description: language === 'en' ? 'Professional vehicle evaluation and quick processing.' : 'Professionelle Fahrzeugbewertung und schnelle Abwicklung.',
      image: "/lovable-uploads/519087b3-97f5-4540-aaf3-4784dda17fd3.png",
      buttonText: language === 'en' ? 'Get Quote' : 'Angebot erhalten',
      buttonAction: 'contact'
    },
    {
      icon: <Car className="w-16 h-16 text-lime-400" />,
      title: t('services.sales.title'),
      description: language === 'en' ? 'Quality vehicles in excellent condition. All brands, fair prices.' : 'Hochwertige Fahrzeuge in ausgezeichnetem Zustand. Alle Marken, faire Preise.',
      image: "/lovable-uploads/dd836921-b71a-44c2-b8f2-504821fc168e.png",
      buttonText: language === 'en' ? 'View Inventory' : 'Fahrzeuge ansehen',
      buttonAction: 'vehicles'
    }
  ];

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (error) {
    console.error('Error loading services:', error);
  }

  return (
    <section id="services" className="py-20 bg-black text-white">
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
                <h3 className="text-3xl font-bold mb-6 text-lime-400 uppercase tracking-wide">
                  {service.title}
                </h3>
                <p className="text-lg leading-relaxed mb-6">
                  {service.description}
                </p>
                {service.buttonAction === 'contact' ? (
                  <Button 
                    onClick={scrollToContact}
                    className="bg-lime-400 hover:bg-lime-500 text-black font-bold py-3 px-6 w-fit"
                  >
                    {service.buttonText}
                  </Button>
                ) : (
                  <Link to="/vehicles">
                    <Button className="bg-lime-400 hover:bg-lime-500 text-black font-bold py-3 px-6 w-fit">
                      {service.buttonText}
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Professional Services */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-lime-400 mb-4 uppercase tracking-wide">
            Professional Services
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive automotive services for all your vehicle needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="bg-gray-900 border-gray-700">
                <CardHeader className="text-center">
                  <Skeleton className="w-12 h-12 mx-auto mb-4 bg-gray-700" />
                  <Skeleton className="h-6 w-3/4 mx-auto bg-gray-700" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2 bg-gray-700" />
                  <Skeleton className="h-4 w-2/3 bg-gray-700" />
                </CardContent>
              </Card>
            ))
          ) : services && services.length > 0 ? (
            services.map((service) => {
              const translatedService = getTranslatedService(service);
              return (
                <Card key={service.id} className="hover:shadow-lg transition-shadow duration-300 bg-gray-900 border-gray-700">
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                      <Shield className="w-12 h-12 text-lime-400" />
                    </div>
                    <CardTitle className="text-xl text-white">
                      {translatedService.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 text-center">
                      {translatedService.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <div className="col-span-full text-center text-gray-400">
              <p>No services available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Services;
