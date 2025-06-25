import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Zap, Car, ShoppingCart } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const Services = () => {
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

  const customServices = [
    {
      icon: <ShoppingCart className="w-16 h-16 text-lime-400" />,
      title: "Ankauf & Inzahlungnahme",
      description: "Wir sind unabhängig und spezialisiert auf den An- & Verkauf, sowie die Vermittlung von hochwertigen Fahrzeugen. Gerne nehmen wir Ihr Fahrzeug in Zahlung.",
      image: "/lovable-uploads/3ada1520-2fff-43eb-8892-d6a18ebbd85f.png"
    },
    {
      icon: <Car className="w-16 h-16 text-lime-400" />,
      title: "Verkauf & Vermittlung",
      description: "Wir bieten Ihnen eine umfangreiche Auswahl an exklusiven Luxus- und Sportwagen an. Ihr Wunschfahrzeug ist nicht in unserem Bestand? Wir helfen Ihnen bei der Vermittlung Ihres Traumautos.",
      image: "/lovable-uploads/e713e9e2-fb57-462f-893a-e749af8ce1ae.png"
    }
  ];

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
                <p className="text-lg leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Traditional Services */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-lime-400 mb-4 uppercase tracking-wide">
            Unsere Leistungen
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Von der Routinewartung bis zur komplexen Reparatur - wir bieten Ihnen 
            den kompletten Service rund um Ihr Fahrzeug.
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
            
            services.map((service) => (
              <Card key={service.id} className="hover:shadow-lg transition-shadow duration-300 bg-gray-900 border-gray-700">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <Shield className="w-12 h-12 text-lime-400" />
                  </div>
                  <CardTitle className="text-xl text-white">
                    {service.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-center mb-4">
                    {service.description}
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-400">
                    {service.estimated_duration && (
                      <span>⏱️ {Math.floor(service.estimated_duration / 60)}h {service.estimated_duration % 60}min</span>
                    )}
                    {service.base_price && (
                      <span className="font-semibold text-lime-400">
                        ab €{Number(service.base_price).toFixed(2)}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            
            <div className="col-span-full text-center text-gray-400">
              <p>Keine Dienste verfügbar.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Services;
