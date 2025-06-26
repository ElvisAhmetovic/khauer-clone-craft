
import React, { useState, useEffect } from 'react';
import { AutoScout24Service } from '@/services/AutoScout24Service';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Car, Phone, MapPin, Fuel, Calendar, Gauge, Settings, RefreshCw, Clock, ExternalLink, AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Vehicle {
  id: string;
  title: string;
  price: string;
  year: string;
  mileage: string;
  fuel: string;
  transmission: string;
  images: string[];
  description: string;
  location: string;
  phone?: string;
  features: string[];
  url?: string;
}

interface ScrapedData {
  vehicles: Vehicle[];
  lastUpdated: string;
  totalCount: number;
}

const CarListings: React.FC = () => {
  const [data, setData] = useState<ScrapedData | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadVehicles();
    
    // Set up automatic updates every 2 hours
    const interval = setInterval(() => {
      console.log('Auto-updating vehicle listings...');
      AutoScout24Service.triggerAutomaticScraping();
      // Refresh data after scraping
      setTimeout(() => loadVehicles(true), 15000); // Wait 15 seconds for scraping to complete
    }, 2 * 60 * 60 * 1000); // 2 hours

    return () => clearInterval(interval);
  }, []);

  const loadVehicles = async (silent = false) => {
    try {
      if (!silent) {
        setLoading(true);
        setError(null);
      }
      const vehicleData = await AutoScout24Service.getVehicles();
      setData(vehicleData);
      
      if (!silent && vehicleData.totalCount > 0) {
        toast({
          title: "Fahrzeuge geladen",
          description: `${vehicleData.totalCount} Fahrzeuge erfolgreich geladen`,
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Error loading vehicles:', error);
      setError('Fehler beim Laden der Fahrzeuge');
      toast({
        title: "Fehler",
        description: "Fehler beim Laden der Fahrzeuge",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleForceUpdate = async () => {
    setUpdating(true);
    setError(null);
    try {
      const freshData = await AutoScout24Service.forceUpdate();
      setData(freshData);
      toast({
        title: "Aktualisiert",
        description: `Fahrzeugdaten wurden erfolgreich aktualisiert. ${freshData.totalCount} Fahrzeuge gefunden.`,
        duration: 3000,
      });
    } catch (error) {
      console.error('Force update error:', error);
      setError('Fehler beim Aktualisieren der Daten');
      toast({
        title: "Fehler",
        description: "Fehler beim Aktualisieren der Daten. Versuchen Sie es später erneut.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setUpdating(false);
    }
  };

  const formatLastUpdated = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString('de-CH');
    } catch {
      return 'Unbekannt';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="text-center">
          <Car className="w-12 h-12 mx-auto mb-4 text-lime-400 animate-pulse" />
          <p className="text-gray-600">Lade Fahrzeuge...</p>
        </div>
      </div>
    );
  }

  if (error && (!data || data.vehicles.length === 0)) {
    return (
      <div className="text-center py-16">
        <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-400" />
        <h3 className="text-xl font-semibold mb-2 text-red-600">Fehler beim Laden</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <Button onClick={handleForceUpdate} disabled={updating}>
          <RefreshCw className={`w-4 h-4 mr-2 ${updating ? 'animate-spin' : ''}`} />
          Erneut versuchen
        </Button>
      </div>
    );
  }

  if (!data || data.vehicles.length === 0) {
    return (
      <div className="text-center py-16">
        <Car className="w-16 h-16 mx-auto mb-4 text-gray-400" />
        <h3 className="text-xl font-semibold mb-2">Keine Fahrzeuge verfügbar</h3>
        <p className="text-gray-600 mb-4">Momentan sind keine Fahrzeuge verfügbar. Versuchen Sie, die Daten zu aktualisieren.</p>
        <Button onClick={handleForceUpdate} disabled={updating}>
          <RefreshCw className={`w-4 h-4 mr-2 ${updating ? 'animate-spin' : ''}`} />
          Daten aktualisieren
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header with stats and update button */}
      <div className="flex justify-between items-center mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Car className="w-5 h-5 text-lime-600" />
            <span className="font-semibold">{data.totalCount} Fahrzeuge verfügbar</span>
          </div>
          {data.lastUpdated && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>Zuletzt aktualisiert: {formatLastUpdated(data.lastUpdated)}</span>
            </div>
          )}
        </div>
        <Button onClick={handleForceUpdate} disabled={updating} variant="outline" size="sm">
          <RefreshCw className={`w-4 h-4 mr-2 ${updating ? 'animate-spin' : ''}`} />
          Aktualisieren
        </Button>
      </div>

      {/* Error banner if there's an error but we still have data */}
      {error && data.vehicles.length > 0 && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-yellow-600" />
          <span className="text-sm text-yellow-800">{error}</span>
        </div>
      )}

      {/* Vehicle Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.vehicles.map((vehicle) => (
          <Card key={vehicle.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative">
              <img
                src={vehicle.images[0]}
                alt={vehicle.title}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder.svg';
                }}
              />
              <div className="absolute top-4 right-4">
                <Badge className="bg-lime-400 text-black font-bold">
                  {vehicle.price}
                </Badge>
              </div>
            </div>
            
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{vehicle.title}</CardTitle>
              <CardDescription className="text-sm text-gray-600">
                {vehicle.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Vehicle specs */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                {vehicle.year && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>{vehicle.year}</span>
                  </div>
                )}
                {vehicle.mileage && (
                  <div className="flex items-center gap-2">
                    <Gauge className="w-4 h-4 text-gray-500" />
                    <span>{vehicle.mileage}</span>
                  </div>
                )}
                {vehicle.fuel && (
                  <div className="flex items-center gap-2">
                    <Fuel className="w-4 h-4 text-gray-500" />
                    <span>{vehicle.fuel}</span>
                  </div>
                )}
                {vehicle.transmission && (
                  <div className="flex items-center gap-2">
                    <Settings className="w-4 h-4 text-gray-500" />
                    <span>{vehicle.transmission}</span>
                  </div>
                )}
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{vehicle.location}</span>
              </div>

              {/* Features */}
              {vehicle.features.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Ausstattung:</p>
                  <div className="flex flex-wrap gap-1">
                    {vehicle.features.slice(0, 3).map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {vehicle.features.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{vehicle.features.length - 3} weitere
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="pt-2 space-y-2">
                <Button
                  className="w-full bg-lime-400 hover:bg-lime-500 text-black font-semibold"
                  onClick={() => window.open(`tel:${vehicle.phone}`, '_self')}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Jetzt anrufen
                </Button>
                
                {vehicle.url && (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => window.open(vehicle.url, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Auf AutoScout24 ansehen
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Footer info */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg text-center text-sm text-gray-600">
        <p>
          Alle Fahrzeuge werden automatisch alle 2 Stunden von AutoScout24 aktualisiert. 
          Bei Fragen zu einem Fahrzeug kontaktieren Sie uns direkt.
        </p>
      </div>
    </div>
  );
};

export default CarListings;
