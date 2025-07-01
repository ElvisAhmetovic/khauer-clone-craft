
import { Badge } from "@/components/ui/badge";
import { Users, Award, Calendar, Target } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t, language } = useLanguage();
  
  const stats = [
    { icon: <Calendar className="w-8 h-8" />, number: "20+", label: t('about.stats.experience') },
    { icon: <Users className="w-8 h-8" />, number: "5000+", label: t('about.stats.customers') },
    { icon: <Award className="w-8 h-8" />, number: "100%", label: t('about.stats.quality') },
    { icon: <Target className="w-8 h-8" />, number: "24h", label: t('about.stats.response') }
  ];

  return (
    <section id="about" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="mb-4 bg-orange-500 text-white font-bold">{t('about.badge')}</Badge>
            <h2 className="text-4xl font-bold text-white mb-6 uppercase tracking-wide">
              {t('about.title')}
            </h2>
            <p className="text-lg text-gray-300 mb-6">
              {language === 'en' 
                ? 'KURDO Car GmbH is your premier auto house in Dietikon, Switzerland. We specialize in buying, selling, and vehicle trading services for all vehicle brands.'
                : 'KURDO Car GmbH ist Ihr erstklassiges Autohaus in Dietikon, Schweiz. Wir sind spezialisiert auf Ankauf, Verkauf und Fahrzeughandel für alle Fahrzeugmarken.'
              }
            </p>
            <p className="text-lg text-gray-300 mb-8">
              {language === 'en'
                ? 'With over 20 years of experience in the automotive industry, we offer professional vehicle evaluations, quality pre-owned cars, and comprehensive dealership services to meet all your vehicle buying and selling needs.'
                : 'Mit über 20 Jahren Erfahrung in der Automobilbranche bieten wir professionelle Fahrzeugbewertungen, hochwertige Gebrauchtwagen und umfassende Autohaus-Dienstleistungen, um alle Ihre Fahrzeugkauf- und Verkaufsbedürfnisse zu erfüllen.'
              }
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className={`flex justify-center mb-2 ${index % 2 === 0 ? 'text-orange-500' : 'text-blue-500'}`}>
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">
                    {stat.number}
                  </div>
                  <div className="text-gray-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-orange-500 to-blue-500 rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-6 uppercase tracking-wide">{t('about.why.title')}</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                  <span className="font-medium">{t('about.why.evaluation')}</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                  <span className="font-medium">{t('about.why.equipment')}</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                  <span className="font-medium">{t('about.why.transparent')}</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                  <span className="font-medium">{t('about.why.guarantee')}</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                  <span className="font-medium">{t('about.why.fair')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
