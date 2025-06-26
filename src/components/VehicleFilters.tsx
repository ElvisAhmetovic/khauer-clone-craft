
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { RotateCcw, SlidersHorizontal } from 'lucide-react';
import { useVehicleFilter } from '@/contexts/VehicleFilterContext';
import { useLanguage } from '@/contexts/LanguageContext';

const VehicleFilters: React.FC = () => {
  const { filters, updateFilter, resetFilters } = useVehicleFilter();
  const { t } = useLanguage();

  return (
    <>
      {/* Main Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-6">
        <Select value={filters.brand} onValueChange={(value) => updateFilter('brand', value)}>
          <SelectTrigger>
            <SelectValue placeholder={t('vehicles.filters.brand.placeholder')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('vehicles.filters.brand.all')}</SelectItem>
            <SelectItem value="ford">Ford</SelectItem>
            <SelectItem value="bmw">BMW</SelectItem>
            <SelectItem value="mercedes">Mercedes</SelectItem>
            <SelectItem value="audi">Audi</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.year} onValueChange={(value) => updateFilter('year', value)}>
          <SelectTrigger>
            <SelectValue placeholder={t('vehicles.filters.year.placeholder')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('vehicles.filters.year.all')}</SelectItem>
            <SelectItem value="2020">2020</SelectItem>
            <SelectItem value="2019">2019</SelectItem>
            <SelectItem value="2018">2018</SelectItem>
            <SelectItem value="2017">2017</SelectItem>
            <SelectItem value="2012">2012</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.mileage} onValueChange={(value) => updateFilter('mileage', value)}>
          <SelectTrigger>
            <SelectValue placeholder={t('vehicles.filters.mileage.placeholder')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('vehicles.filters.mileage.all')}</SelectItem>
            <SelectItem value="0-50000">0 - 50,000 km</SelectItem>
            <SelectItem value="50000-100000">50,000 - 100,000 km</SelectItem>
            <SelectItem value="100000-150000">100,000 - 150,000 km</SelectItem>
            <SelectItem value="150000+">150,000+ km</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.price} onValueChange={(value) => updateFilter('price', value)}>
          <SelectTrigger>
            <SelectValue placeholder={t('vehicles.filters.price.placeholder')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('vehicles.filters.price.all')}</SelectItem>
            <SelectItem value="0-10000">CHF 0 - 10,000</SelectItem>
            <SelectItem value="10000-20000">CHF 10,000 - 20,000</SelectItem>
            <SelectItem value="20000-30000">CHF 20,000 - 30,000</SelectItem>
            <SelectItem value="30000+">CHF 30,000+</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.bodyType} onValueChange={(value) => updateFilter('bodyType', value)}>
          <SelectTrigger>
            <SelectValue placeholder={t('vehicles.filters.bodyType.placeholder')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('vehicles.filters.bodyType.all')}</SelectItem>
            <SelectItem value="limousine">{t('vehicles.filters.bodyType.sedan')}</SelectItem>
            <SelectItem value="kombi">{t('vehicles.filters.bodyType.wagon')}</SelectItem>
            <SelectItem value="suv">SUV</SelectItem>
            <SelectItem value="cabrio">{t('vehicles.filters.bodyType.convertible')}</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.fuel} onValueChange={(value) => updateFilter('fuel', value)}>
          <SelectTrigger>
            <SelectValue placeholder={t('vehicles.filters.fuel.placeholder')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('vehicles.filters.fuel.all')}</SelectItem>
            <SelectItem value="benzin">{t('vehicles.filters.fuel.gasoline')}</SelectItem>
            <SelectItem value="diesel">{t('vehicles.filters.fuel.diesel')}</SelectItem>
            <SelectItem value="hybrid">{t('vehicles.filters.fuel.hybrid')}</SelectItem>
            <SelectItem value="elektro">{t('vehicles.filters.fuel.electric')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Additional Filters Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Select value={filters.transmission} onValueChange={(value) => updateFilter('transmission', value)}>
          <SelectTrigger>
            <SelectValue placeholder={t('vehicles.filters.transmission.placeholder')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('vehicles.filters.transmission.all')}</SelectItem>
            <SelectItem value="automat">{t('vehicles.filters.transmission.automatic')}</SelectItem>
            <SelectItem value="manuell">{t('vehicles.filters.transmission.manual')}</SelectItem>
          </SelectContent>
        </Select>

        <div className="md:col-span-2">
          <Button variant="outline" className="w-full">
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            {t('vehicles.filters.moreFilters')}
          </Button>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm">
            <RotateCcw className="w-4 h-4 mr-2" />
            {t('vehicles.filters.sortRecommended')}
          </Button>
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            <RotateCcw className="w-4 h-4 mr-2" />
            {t('vehicles.filters.resetFilters')}
          </Button>
        </div>
      </div>
    </>
  );
};

export default VehicleFilters;
