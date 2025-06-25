
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench, Settings, Car, Shield, Zap, Clock } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <Wrench className="w-12 h-12 text-blue-600" />,
      title: "Reparaturen",
      description: "Professionelle Reparaturen aller Art - von der Kleinreparatur bis zur Motorinstandsetzung."
    },
    {
      icon: <Settings className="w-12 h-12 text-blue-600" />,
      title: "Wartung & Inspektion",
      description: "Regelmäßige Wartung nach Herstellervorgaben für optimale Fahrzeugleistung."
    },
    {
      icon: <Car className="w-12 h-12 text-blue-600" />,
      title: "TÜV & AU",
      description: "Hauptuntersuchung und Abgasuntersuchung direkt vor Ort in unserer Werkstatt."
    },
    {
      icon: <Shield className="w-12 h-12 text-blue-600" />,
      title: "Karosserie & Lack",
      description: "Unfallreparaturen, Lackierarbeiten und Karosserieinstandsetzung."
    },
    {
      icon: <Zap className="w-12 h-12 text-blue-600" />,
      title: "Elektrik & Elektronik",
      description: "Diagnose und Reparatur elektronischer Systeme und Fahrzeugelektrik."
    },
    {
      icon: <Clock className="w-12 h-12 text-blue-600" />,
      title: "Express-Service",
      description: "Schnelle Reparaturen und Wartung für eilige Fälle - meist noch am selben Tag."
    }
  ];

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
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  {service.icon}
                </div>
                <CardTitle className="text-xl text-gray-900">
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
