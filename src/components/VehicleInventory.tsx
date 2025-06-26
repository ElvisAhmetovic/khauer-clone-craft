
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Heart, LayoutGrid, Search, RotateCcw, SlidersHorizontal } from 'lucide-react';

interface Vehicle {
  id: string;
  title: string;
  price: string;
  year: string;
  mileage: string;
  fuel: string;
  transmission: string;
  power: string;
  consumption: string;
  image: string;
  features: string[];
  location: string;
  isTopOffer?: boolean;
}

// Sample data - you'll replace this with your actual vehicles
const sampleVehicles: Vehicle[] = [
  {
    id: '1',
    title: 'FORD Mondeo 2.0 TDCi Titanium Automatik',
    price: 'CHF 13\'900.–',
    year: '05.2020',
    mileage: '120\'000 km',
    fuel: 'Diesel',
    transmission: 'Automat',
    power: '150 PS (110 kW)',
    consumption: '6.3 l/100 km',
    image: '/placeholder.svg',
    features: ['TOP ANGEBOT', 'TOP ZUSTAND', 'AUTOMAT', 'KEYLESS', 'KAMERA', 'FRISCH AB MFK', 'NEUE PNEU', 'NEUE BREMSEN', '12-M GARANTIE', '350 CHF'],
    location: '8953 Dietikon',
    isTopOffer: true
  },
  {
    id: '2',
    title: 'BMW 120i Cabrio Steptronic',
    price: 'CHF 11\'900.–',
    year: '02.2012',
    mileage: '105\'000 km',
    fuel: 'Benzin',
    transmission: 'Automat',
    power: '170 PS (125 kW)',
    consumption: '7 l/100 km',
    image: '/placeholder.svg',
    features: ['TOP ANGEBOT', 'AUTOMAT', 'M-SPORTPAKET', 'FRISCH AB SERVICE & MFK', '8-FACHBEREIFT', '12-MONATE GARANTIE', '350 CHF'],
    location: '8953 Dietikon',
    isTopOffer: true
  }
];

const VehicleInventory: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'passenger' | 'commercial'>('passenger');
  const [sortBy, setSortBy] = useState('recommended');
  const [vehicles] = useState<Vehicle[]>(sampleVehicles);

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      {/* Header with Logo */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">KURDO</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">KURDO Car GmbH</h1>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('passenger')}
          className={`px-6 py-3 rounded-t-lg border-b-2 font-semibold ${
            activeTab === 'passenger'
              ? 'bg-gray-800 text-white border-gray-800'
              : 'bg-gray-100 text-gray-600 border-transparent hover:bg-gray-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <span>🚗</span>
            <span>Personenwagen</span>
          </div>
        </button>
        <button
          onClick={() => setActiveTab('commercial')}
          className={`px-6 py-3 rounded-t-lg border-b-2 font-semibold ${
            activeTab === 'commercial'
              ? 'bg-gray-800 text-white border-gray-800'
              : 'bg-gray-100 text-gray-600 border-transparent hover:bg-gray-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <span>🚛</span>
            <span>Nutzfahrzeug</span>
          </div>
        </button>
      </div>

      {/* Vehicle Count */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {vehicles.length} Personenwagen
        </h2>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-6">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Marke & Modell" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ford">Ford</SelectItem>
            <SelectItem value="bmw">BMW</SelectItem>
            <SelectItem value="mercedes">Mercedes</SelectItem>
            <SelectItem value="audi">Audi</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Jahr" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2020">2020</SelectItem>
            <SelectItem value="2019">2019</SelectItem>
            <SelectItem value="2018">2018</SelectItem>
            <SelectItem value="2017">2017</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Kilometerstand" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0-50000">0 - 50,000 km</SelectItem>
            <SelectItem value="50000-100000">50,000 - 100,000 km</SelectItem>
            <SelectItem value="100000-150000">100,000 - 150,000 km</SelectItem>
            <SelectItem value="150000+">150,000+ km</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Preis" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0-10000">CHF 0 - 10,000</SelectItem>
            <SelectItem value="10000-20000">CHF 10,000 - 20,000</SelectItem>
            <SelectItem value="20000-30000">CHF 20,000 - 30,000</SelectItem>
            <SelectItem value="30000+">CHF 30,000+</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Aufbauart" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="limousine">Limousine</SelectItem>
            <SelectItem value="kombi">Kombi</SelectItem>
            <SelectItem value="suv">SUV</SelectItem>
            <SelectItem value="cabrio">Cabrio</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Treibstoff" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="benzin">Benzin</SelectItem>
            <SelectItem value="diesel">Diesel</SelectItem>
            <SelectItem value="hybrid">Hybrid</SelectItem>
            <SelectItem value="elektro">Elektro</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Additional Filters Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Getriebe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="automat">Automat</SelectItem>
            <SelectItem value="manuell">Manuell</SelectItem>
          </SelectContent>
        </Select>

        <div className="md:col-span-2">
          <Button variant="outline" className="w-full">
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Mehr Filter
          </Button>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm">
            <RotateCcw className="w-4 h-4 mr-2" />
            Sortierung Empfohlen
          </Button>
          <Button variant="ghost" size="sm">
            <RotateCcw className="w-4 h-4 mr-2" />
            Filter zurücksetzen
          </Button>
          <Button variant="ghost" size="sm">
            <Search className="w-4 h-4 mr-2" />
            Suche speichern
          </Button>
        </div>
        <Button variant="ghost" size="sm">
          <LayoutGrid className="w-4 h-4 mr-2" />
          Erweiterte Suche
        </Button>
      </div>

      {/* Vehicle Listings */}
      <div className="space-y-4">
        {vehicles.map((vehicle) => (
          <Card key={vehicle.id} className="overflow-hidden hover:shadow-lg transition-shadow">
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
                    <Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white">
                      <Heart className="w-4 h-4" />
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
                      <Button variant="ghost" size="sm">
                        <Heart className="w-4 h-4" />
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
        ))}
      </div>
    </div>
  );
};

export default VehicleInventory;
