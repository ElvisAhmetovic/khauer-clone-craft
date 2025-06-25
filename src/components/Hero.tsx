
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-20">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Ihre KFZ-Werkstatt
            <span className="block text-yellow-400">des Vertrauens</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Professionelle Autoreparaturen, Wartung und Service für alle Fahrzeugmarken. 
            Über 20 Jahre Erfahrung in der Automobilbranche.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center space-x-2">
              <CheckCircle className="text-yellow-400" size={20} />
              <span>Meisterbetrieb</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="text-yellow-400" size={20} />
              <span>TÜV/AU Partner</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="text-yellow-400" size={20} />
              <span>Alle Marken</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
              Termin vereinbaren
              <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900">
              Leistungen ansehen
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
