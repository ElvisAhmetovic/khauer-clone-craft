
import React, { useState, useEffect } from 'react';
import { useVehicleFilter, Vehicle } from '@/contexts/VehicleFilterContext';
import { useLanguage } from '@/contexts/LanguageContext';
import VehicleFilters from './VehicleFilters';
import VehicleCard from './VehicleCard';

// Sample data with enhanced filtering properties
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
    isTopOffer: true,
    brand: 'Ford',
    bodyType: 'Limousine',
    priceValue: 13900,
    mileageValue: 120000,
    yearValue: 2020
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
    isTopOffer: true,
    brand: 'BMW',
    bodyType: 'Cabrio',
    priceValue: 11900,
    mileageValue: 105000,
    yearValue: 2012
  }
];

const VehicleInventory: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'passenger' | 'commercial' | 'liked'>('passenger');
  const { filteredVehicles, setVehicles, likedVehicles } = useVehicleFilter();
  const { t } = useLanguage();

  useEffect(() => {
    setVehicles(sampleVehicles);
  }, [setVehicles]);

  const likedVehiclesList = sampleVehicles.filter(vehicle => likedVehicles.includes(vehicle.id));

  const getDisplayedVehicles = () => {
    switch (activeTab) {
      case 'liked':
        return likedVehiclesList;
      case 'commercial':
        return []; // No commercial vehicles yet
      default:
        return filteredVehicles;
    }
  };

  const displayedVehicles = getDisplayedVehicles();

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
            <span>{t('vehicles.inventory.tabs.passenger')}</span>
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
            <span>{t('vehicles.inventory.tabs.commercial')}</span>
          </div>
        </button>
        <button
          onClick={() => setActiveTab('liked')}
          className={`px-6 py-3 rounded-t-lg border-b-2 font-semibold ${
            activeTab === 'liked'
              ? 'bg-gray-800 text-white border-gray-800'
              : 'bg-gray-100 text-gray-600 border-transparent hover:bg-gray-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <span>❤️</span>
            <span>{t('vehicles.inventory.tabs.liked')} ({likedVehicles.length})</span>
          </div>
        </button>
      </div>

      {/* Vehicle Count */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {displayedVehicles.length} {
            activeTab === 'liked' 
              ? t('vehicles.inventory.count.liked')
              : activeTab === 'commercial' 
              ? t('vehicles.inventory.count.commercial')
              : t('vehicles.inventory.count.passenger')
          }
        </h2>
      </div>

      {/* Filters - only show for passenger cars */}
      {activeTab === 'passenger' && <VehicleFilters />}

      {/* Vehicle Listings */}
      <div className="space-y-4">
        {displayedVehicles.length > 0 ? (
          displayedVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {activeTab === 'liked' 
                ? t('vehicles.inventory.empty.liked')
                : activeTab === 'commercial'
                ? t('vehicles.inventory.empty.commercial')
                : t('vehicles.inventory.empty.passenger')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleInventory;
