
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, LayoutGrid } from 'lucide-react';
import { Vehicle, useVehicleFilter } from '@/contexts/VehicleFilterContext';

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  const { toggleLike, isLiked } = useVehicleFilter();
  const liked = isLiked(vehicle.id);

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

            {/* Links */}
            <div className="flex gap-4 mb-4 text-sm text-blue-600">
              <button className="hover:underline">Kreditrate berechnen</button>
              <button className="hover:underline">Versicherungen vergleichen</button>
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
