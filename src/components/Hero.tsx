
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();

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
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight uppercase tracking-wider">
            {t('hero.title1')}
            <span className="block text-lime-400">{t('hero.title2')}</span>
          </h1>
          
          <div className="mb-12">
            <Button 
              size="lg" 
              className="bg-lime-400 hover:bg-lime-500 text-black font-bold text-lg px-8 py-4 uppercase tracking-wider"
            >
              {t('hero.button')}
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </div>

          <div className="mt-16">
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
