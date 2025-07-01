
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";

const Hero = () => {
  const { t } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Array of car images
  const carImages = [
    "/lovable-uploads/5e9b35be-db38-4ad9-adb5-d4344ad92db8.png", // Original hero image
    "/lovable-uploads/46982f8f-cda6-4917-8ac8-9d1791c715b5.png", // Black Lamborghini
    "/lovable-uploads/2fe3bdb5-3f29-4d79-ad32-1fe8197312e5.png", // Gray Lamborghini
    "/lovable-uploads/e135609b-0204-4463-beb6-e14330b2d378.png", // Blue Alpine
    "/lovable-uploads/2522c56a-e0b4-4675-89c9-947d04e01ad0.png", // Red sports car
    "/lovable-uploads/166d4052-7642-41e7-b983-c16e4183026c.png", // Car lineup
    "/lovable-uploads/c3ee3c5a-099f-43b7-8c23-5a9a0efedb6d.png", // Gray Lamborghini top view
    "/lovable-uploads/a1603ca7-f9f3-4d1b-9abe-2931330e0963.png", // Mercedes G-Wagon
    "/lovable-uploads/9a40b191-2cc0-4a53-9d1c-132e79a97ed7.png"  // White Rolls Royce
  ];

  useEffect(() => {
    // Trigger the animation after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Image rotation effect - every 15 seconds
  useEffect(() => {
    const imageRotationInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % carImages.length
      );
    }, 15000); // 15 seconds

    return () => clearInterval(imageRotationInterval);
  }, [carImages.length]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    // Random shake animation function following exact specifications
    const startRandomShake = () => {
      // Generate random delay between 6-10 seconds (6000-10000ms)
      const randomDelay = Math.random() * 4000 + 6000;
      
      timeoutId = setTimeout(() => {
        // Start shake animation
        setIsShaking(true);
        
        // Remove shake after 800ms (animation duration)
        setTimeout(() => {
          setIsShaking(false);
          // Recursively call for next shake cycle
          startRandomShake();
        }, 800);
      }, randomDelay);
    };

    // Start the random shake cycle after initial load
    const initialTimer = setTimeout(() => {
      startRandomShake();
    }, 3000); // Wait 3 seconds before first shake

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(timeoutId);
    };
  }, []);

  const openAutoScout24 = () => {
    window.open('https://www.autoscout24.ch/de/s/seller-68160', '_blank', 'noopener,noreferrer');
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative bg-black text-white min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        {carImages.map((image, index) => (
          <img 
            key={index}
            src={image} 
            alt="Luxury Sports Car" 
            className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-70' : 'opacity-0'
            }`}
          />
        ))}
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
              className={`animated-shake-button bg-lime-400 hover:bg-lime-500 text-black font-bold text-lg px-8 py-4 uppercase tracking-wider transition-all duration-300 ${
                isShaking ? 'animate-subtle-shake' : ''
              }`}
              onClick={scrollToContact}
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
