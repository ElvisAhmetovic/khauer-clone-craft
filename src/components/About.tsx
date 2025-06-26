
import { Badge } from "@/components/ui/badge";
import { Users, Award, Calendar, Target } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();
  
  const stats = [
    { icon: <Calendar className="w-8 h-8" />, number: "20+", label: t('about.stats.experience') },
    { icon: <Users className="w-8 h-8" />, number: "5000+", label: t('about.stats.customers') },
    { icon: <Award className="w-8 h-8" />, number: "100%", label: "Quality Assured" },
    { icon: <Target className="w-8 h-8" />, number: "24h", label: "Fast Response" }
  ];

  return (
    <section id="about" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="mb-4 bg-lime-400 text-black font-bold">Premium Auto House</Badge>
            <h2 className="text-4xl font-bold text-white mb-6 uppercase tracking-wide">
              Your Trusted Auto House
            </h2>
            <p className="text-lg text-gray-300 mb-6">
              KURDO Car GmbH is your premier auto house in Dietikon, Switzerland. We specialize in buying, selling, and providing comprehensive automotive services for all vehicle brands.
            </p>
            <p className="text-lg text-gray-300 mb-8">
              With over 20 years of experience in the automotive industry, we offer professional vehicle evaluations, quality pre-owned cars, and expert automotive services to meet all your vehicle needs.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center text-lime-400 mb-2">
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
            <div className="bg-gradient-to-br from-lime-400 to-lime-600 rounded-lg p-8 text-black">
              <h3 className="text-2xl font-bold mb-6 uppercase tracking-wide">Why Choose KURDO Car</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                  <span className="font-medium">Professional Vehicle Evaluation</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                  <span className="font-medium">Advanced Diagnostic Equipment</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                  <span className="font-medium">Transparent Pricing</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                  <span className="font-medium">Quality Guarantee</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                  <span className="font-medium">Fair Market Prices</span>
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
