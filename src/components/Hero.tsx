import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";

const Hero = () => {
  const { t } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger the animation after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const openAutoScout24 = () => {
    window.open('https://www.autoscout24.ch/de/s/seller-68160', '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="home" className="relative bg-black text-white min-h-screen flex items-center">
      <div className="absolute inset-0">
        <img 
          src="/lovable-uploads/5e9b35be-db38-4ad9-adb5-d4344ad92db8.png" 
          alt="Luxury Sports Car" 
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          <h1 className={`text-6xl md:text-8xl font-bold mb-8 leading-tight uppercase tracking-wider transition-all duration-1000 ease-out ${
            isLoaded 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 -translate-x-12'
          }`}>
            {t('hero.title1')}
            <span className={`block text-lime-400 transition-all duration-1000 ease-out delay-300 ${
              isLoaded 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-12'
            }`}>
              {t('hero.title2')}
            </span>
          </h1>
          
          <div className={`mb-12 transition-all duration-1000 ease-out delay-500 ${
            isLoaded 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 -translate-x-12'
          }`}>
            <Button 
              size="lg" 
              className="bg-lime-400 hover:bg-lime-500 text-black font-bold text-lg px-8 py-4 uppercase tracking-wider"
              onClick={openAutoScout24}
            >
              {t('hero.button')}
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </div>

          <div className={`mt-16 transition-all duration-1000 ease-out delay-700 ${
            isLoaded 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 -translate-x-12'
          }`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 uppercase tracking-wide">
              {t('hero.subtitle')}
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold text-lime-400 mb-8 uppercase tracking-wide">
              {t('hero.brands')}
            </h3>
            <div className="flex flex-wrap gap-4 text-lg">
              <span className="text-lime-400">#ford</span>
              <span className="text-lime-400">#bmw</span>
              <span className="text-lime-400">#citroen</span>
              <span className="text-lime-400">#nissan</span>
              <span className="text-lime-400">#mercedes</span>
              <span className="text-lime-400">#landrover</span>
              <span className="text-lime-400">#bentley</span>
              <span className="text-lime-400">#porsche</span>
              <span className="text-lime-400">#jaguar</span>
              <span className="text-lime-400">#vw</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
