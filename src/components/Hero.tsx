
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="relative bg-black text-white min-h-screen flex items-center">
      <div className="absolute inset-0">
        <img 
          src="/lovable-uploads/a3143357-a611-4263-9cf6-24f14e2c6a1b.png" 
          alt="Luxury Sports Car" 
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight uppercase tracking-wider">
            Sportwagen &
            <span className="block text-lime-400">exklusive Automobile</span>
          </h1>
          
          <div className="mb-12">
            <Button 
              size="lg" 
              className="bg-lime-400 hover:bg-lime-500 text-black font-bold text-lg px-8 py-4 uppercase tracking-wider"
            >
              Aktuelle Fahrzeuge
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </div>

          <div className="mt-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 uppercase tracking-wide">
              Wir erfüllen Ihren Autotraum!
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold text-lime-400 mb-8 uppercase tracking-wide">
              Unsere Marken
            </h3>
            <div className="flex flex-wrap gap-4 text-lg">
              <span className="text-lime-400">#porsche</span>
              <span className="text-lime-400">#maserati</span>
              <span className="text-lime-400">#mclaren</span>
              <span className="text-lime-400">#lamborghini</span>
              <span className="text-lime-400">#astonmartin</span>
              <span className="text-lime-400">#mercedes</span>
              <span className="text-lime-400">#bmw</span>
              <span className="text-lime-400">#audi</span>
              <span className="text-lime-400">#ferrari</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
