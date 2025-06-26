
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface FilterState {
  brand: string;
  year: string;
  mileage: string;
  price: string;
  bodyType: string;
  fuel: string;
  transmission: string;
}

export interface Vehicle {
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
  brand: string;
  bodyType: string;
  priceValue: number;
  mileageValue: number;
  yearValue: number;
}

interface VehicleFilterContextType {
  filters: FilterState;
  updateFilter: (key: keyof FilterState, value: string) => void;
  resetFilters: () => void;
  likedVehicles: string[];
  toggleLike: (vehicleId: string) => void;
  isLiked: (vehicleId: string) => boolean;
  filteredVehicles: Vehicle[];
  setVehicles: (vehicles: Vehicle[]) => void;
}

const initialFilters: FilterState = {
  brand: 'all',
  year: 'all',
  mileage: 'all',
  price: 'all',
  bodyType: 'all',
  fuel: 'all',
  transmission: 'all'
};

const VehicleFilterContext = createContext<VehicleFilterContextType | undefined>(undefined);

export const VehicleFilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [likedVehicles, setLikedVehicles] = useState<string[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const updateFilter = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  const toggleLike = (vehicleId: string) => {
    setLikedVehicles(prev => 
      prev.includes(vehicleId) 
        ? prev.filter(id => id !== vehicleId)
        : [...prev, vehicleId]
    );
  };

  const isLiked = (vehicleId: string) => likedVehicles.includes(vehicleId);

  const filteredVehicles = vehicles.filter(vehicle => {
    if (filters.brand !== 'all' && !vehicle.brand.toLowerCase().includes(filters.brand.toLowerCase())) return false;
    if (filters.year !== 'all' && vehicle.yearValue.toString() !== filters.year) return false;
    if (filters.fuel !== 'all' && vehicle.fuel.toLowerCase() !== filters.fuel.toLowerCase()) return false;
    if (filters.transmission !== 'all' && vehicle.transmission.toLowerCase() !== filters.transmission.toLowerCase()) return false;
    if (filters.bodyType !== 'all' && vehicle.bodyType.toLowerCase() !== filters.bodyType.toLowerCase()) return false;
    
    if (filters.mileage !== 'all') {
      const [min, max] = filters.mileage.split('-').map(v => parseInt(v.replace(/\D/g, '')));
      if (max && (vehicle.mileageValue < min || vehicle.mileageValue > max)) return false;
      if (!max && vehicle.mileageValue < min) return false;
    }
    
    if (filters.price !== 'all') {
      const [min, max] = filters.price.split('-').map(v => parseInt(v.replace(/\D/g, '')));
      if (max && (vehicle.priceValue < min || vehicle.priceValue > max)) return false;
      if (!max && vehicle.priceValue < min) return false;
    }
    
    return true;
  });

  return (
    <VehicleFilterContext.Provider value={{
      filters,
      updateFilter,
      resetFilters,
      likedVehicles,
      toggleLike,
      isLiked,
      filteredVehicles,
      setVehicles
    }}>
      {children}
    </VehicleFilterContext.Provider>
  );
};

export const useVehicleFilter = () => {
  const context = useContext(VehicleFilterContext);
  if (!context) {
    throw new Error('useVehicleFilter must be used within a VehicleFilterProvider');
  }
  return context;
};
