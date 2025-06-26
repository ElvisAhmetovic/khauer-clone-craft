
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, LayoutGrid, Calculator, Shield } from 'lucide-react';
import { Vehicle, useVehicleFilter } from '@/contexts/VehicleFilterContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  const { toggleLike, isLiked } = useVehicleFilter();
  const { t } = useLanguage();
  const { toast } = useToast();
  const liked = isLiked(vehicle.id);

  const handleCalculateCredit = () => {
    // Extract price number from price string (e.g., "CHF 13'900.–" -> 13900)
    const priceMatch = vehicle.price.match(/[\d']+/);
    const price = priceMatch ? parseInt(priceMatch[0].replace(/'/g, '')) : 0;
    
    // Simple credit calculation (example: 5% down, 4.5% interest, 5 years)
    const downPayment = price * 0.05;
    const loanAmount = price - downPayment;
    const monthlyRate = 0.045 / 12;
    const months = 60;
    const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);

    toast({
      title: t('vehicles.card.calculateCredit'),
      description: `${t('vehicles.credit.downPayment')}: CHF ${downPayment.toLocaleString()}\n${t('vehicles.credit.monthlyPayment')}: CHF ${Math.round(monthlyPayment).toLocaleString()}/month\n${t('vehicles.credit.duration')}: 5 years`,
    });
  };

  const handleCompareInsurance = () => {
    // Mock insurance comparison data
    const insuranceOptions = [
      { company: 'AXA', premium: 'CHF 800/year' },
      { company: 'Zurich', premium: 'CHF 750/year' },
      { company: 'Generali', premium: 'CHF 820/year' }
    ];

    const bestOption = insuranceOptions.reduce((prev, current) => 
      parseInt(prev.premium.match(/\d+/)?.[0] || '0') < parseInt(current.premium.match(/\d+/)?.[0] || '0') ? prev : current
    );

    toast({
      title: t('vehicles.card.compareInsurance'),
      description: `${t('vehicles.insurance.bestOffer')}: ${bestOption.company} - ${bestOption.premium}\n${t('vehicles.insurance.savings')}: CHF 70/year`,
    });
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          {/* Vehicle Image */}
          <div className="relative w-full md:w-80 h-64 md:h-48">
            {vehicle.isTopOffer && (
              <div className="absolute top-2 left-2 z-10">
                <Badge className="bg-orange-500 text-white font-bold">
                  TOP
                </Badge>
              </div>
            )}
            <img
              src={vehicle.image}
              alt={vehicle.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="bg-white/80 hover:bg-white"
                onClick={() => toggleLike(vehicle.id)}
              >
                <Heart 
                  className={`w-4 h-4 ${liked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
                />
              </Button>
            </div>
            {vehicle.isTopOffer && (
              <div className="absolute bottom-2 left-2">
                <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs">KURDO</span>
                </div>
              </div>
            )}
          </div>

          {/* Vehicle Details */}
          <div className="flex-1 p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{vehicle.title}</h3>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <LayoutGrid className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => toggleLike(vehicle.id)}
                >
                  <Heart 
                    className={`w-4 h-4 ${liked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
                  />
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-1 mb-4">
              {vehicle.features.map((feature, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {feature}
                </Badge>
              ))}
            </div>

            {/* Price */}
            <div className="text-2xl font-bold text-gray-900 mb-4">
              {vehicle.price}
            </div>

            {/* Functional Links */}
            <div className="flex gap-4 mb-4 text-sm">
              <button 
                onClick={handleCalculateCredit}
                className="flex items-center gap-1 text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                <Calculator className="w-4 h-4" />
                {t('vehicles.card.calculateCredit')}
              </button>
              <button 
                onClick={handleCompareInsurance}
                className="flex items-center gap-1 text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                <Shield className="w-4 h-4" />
                {t('vehicles.card.compareInsurance')}
              </button>
            </div>

            {/* Vehicle Specs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-2">
                <span>📅</span>
                <span>{vehicle.year}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>⛽</span>
                <span>{vehicle.fuel}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🏃</span>
                <span>{vehicle.mileage}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>⚡</span>
                <span>{vehicle.power}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>⚙️</span>
                <span>{vehicle.transmission}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>⛽</span>
                <span>{vehicle.consumption}</span>
              </div>
            </div>

            {/* Location */}
            <div className="text-sm text-gray-600">
              <strong>KURDO Car GmbH</strong> • {vehicle.location}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VehicleCard;
