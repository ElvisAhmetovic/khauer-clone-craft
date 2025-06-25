
import { Badge } from "@/components/ui/badge";
import { Users, Award, Calendar, Target } from "lucide-react";

const About = () => {
  const stats = [
    { icon: <Calendar className="w-8 h-8" />, number: "20+", label: "Jahre Erfahrung" },
    { icon: <Users className="w-8 h-8" />, number: "5000+", label: "Zufriedene Kunden" },
    { icon: <Award className="w-8 h-8" />, number: "100%", label: "Meisterbetrieb" },
    { icon: <Target className="w-8 h-8" />, number: "24h", label: "Express-Service" }
  ];

  return (
    <section id="about" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="mb-4 bg-lime-400 text-black font-bold">Über uns</Badge>
            <h2 className="text-4xl font-bold text-white mb-6 uppercase tracking-wide">
              Ihr zuverlässiger Partner für alle KFZ-Belange
            </h2>
            <p className="text-lg text-gray-300 mb-6">
              Seit über 20 Jahren sind wir Ihr kompetenter Ansprechpartner rund um Ihr Fahrzeug. 
              Als Meisterbetrieb garantieren wir Ihnen höchste Qualität bei fairen Preisen.
            </p>
            <p className="text-lg text-gray-300 mb-8">
              Unser erfahrenes Team arbeitet mit modernster Technik und verwendet ausschließlich 
              Originalteile oder gleichwertige Qualitätsersatzteile. Vertrauen Sie auf unsere 
              Expertise und lassen Sie sich von unserem Service überzeugen.
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
              <h3 className="text-2xl font-bold mb-6 uppercase tracking-wide">Warum KHAUER KFZ?</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                  <span className="font-medium">Meisterbetrieb mit zertifizierten Fachkräften</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                  <span className="font-medium">Modernste Diagnosetechnik für alle Marken</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                  <span className="font-medium">Transparente Kostenvoranschläge</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                  <span className="font-medium">Garantie auf alle Arbeiten</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                  <span className="font-medium">Faire Preise ohne versteckte Kosten</span>
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
