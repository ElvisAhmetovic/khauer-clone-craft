
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench, Settings, Car, Shield, Zap, Clock } from "lucide-react";
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

  const getServiceIcon = (category: string) => {
    switch (category) {
      case 'maintenance':
        return <Settings className="w-12 h-12 text-blue-600" />;
      case 'repair':
        return <Wrench className="w-12 h-12 text-blue-600" />;
      case 'inspection':
        return <Shield className="w-12 h-12 text-blue-600" />;
      case 'diagnostic':
        return <Zap className="w-12 h-12 text-blue-600" />;
      case 'service':
        return <Car className="w-12 h-12 text-blue-600" />;
      default:
        return <Clock className="w-12 h-12 text-blue-600" />;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (hours === 0) {
      return `${remainingMinutes} Min.`;
    } else if (remainingMinutes === 0) {
      return `${hours} Std.`;
    } else {
      return `${hours}:${remainingMinutes.toString().padStart(2, '0')} Std.`;
    }
  };

  if (error) {
    console.error('Error loading services:', error);
  }

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Unsere Leistungen
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Von der Routinewartung bis zur komplexen Reparatur - wir bieten Ihnen 
            den kompletten Service rund um Ihr Fahrzeug.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="border-0 shadow-md">
                <CardHeader className="text-center">
                  <Skeleton className="w-12 h-12 mx-auto mb-4" />
                  <Skeleton className="h-6 w-3/4 mx-auto" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                  <div className="flex justify-between items-center mt-4">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : services && services.length > 0 ? (
            services.map((service) => (
              <Card key={service.id} className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    {getServiceIcon(service.category)}
                  </div>
                  <CardTitle className="text-xl text-gray-900">
                    {service.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center mb-4">
                    {service.description}
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    {service.estimated_duration && (
                      <span>⏱️ {formatDuration(service.estimated_duration)}</span>
                    )}
                    {service.base_price && (
                      <span className="font-semibold text-blue-600">
                        ab {formatPrice(Number(service.base_price))}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            // Fallback content if no services in database
            <div className="col-span-full text-center text-gray-500">
              <p>Keine Dienste verfügbar.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Services;
