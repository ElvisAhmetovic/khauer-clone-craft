import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Languages } from "lucide-react";
const LanguageToggle = () => {
  const {
    language,
    setLanguage
  } = useLanguage();
  const toggleLanguage = () => {
    setLanguage(language === 'de' ? 'en' : 'de');
  };
  return <Button onClick={toggleLanguage} variant="ghost" size="sm" className="text-white hover:text-orange-400 hover:bg-gray-800">
      <Languages className="w-4 h-4 mr-2" />
      {language === 'de' ? 'EN' : 'DE'}
    </Button>;
};
export default LanguageToggle;