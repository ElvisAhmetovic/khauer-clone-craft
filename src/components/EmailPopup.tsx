
import { useState, useEffect } from "react";
import { Mail, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const EmailPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (isDismissed) return;

      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const threshold = documentHeight - 100; // Show when 100px from bottom

      if (scrollPosition >= threshold) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:kurdocar@bluewin.ch';
  };

  if (!isVisible || isDismissed) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 animate-slide-in-left">
      <Card className="bg-gray-900 border-lime-400 border-2 shadow-xl max-w-sm">
        <CardContent className="p-6 relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 text-gray-400 hover:text-white"
            onClick={handleDismiss}
          >
            <X size={16} />
          </Button>
          
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-lime-400 p-2 rounded-full">
              <Mail className="w-6 h-6 text-black" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">
                {language === 'en' ? 'Send us an email!' : 'Schreiben Sie uns!'}
              </h3>
              <p className="text-gray-300 text-sm">
                {language === 'en' ? 'We\'d love to hear from you' : 'Wir freuen uns auf Ihre Nachricht'}
              </p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="text-gray-300">
              <p className="font-medium text-lime-400">kurdocar@bluewin.ch</p>
            </div>
            
            <Button 
              onClick={handleEmailClick}
              className="w-full bg-lime-400 hover:bg-lime-500 text-black font-bold"
            >
              {language === 'en' ? 'Send Email' : 'E-Mail senden'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailPopup;
