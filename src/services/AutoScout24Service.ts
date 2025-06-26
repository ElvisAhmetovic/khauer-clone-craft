
import { supabase } from '@/integrations/supabase/client';

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

export class AutoScout24Service {
  private static readonly UPDATE_INTERVAL = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

  static async getVehicles(): Promise<ScrapedData> {
    console.log('Fetching vehicles from database...');
    
    try {
      // Fetch vehicles from Supabase
      const { data: vehiclesData, error } = await supabase
        .from('scraped_vehicles')
        .select('*')
        .order('scraped_at', { ascending: false });

      if (error) {
        console.error('Error fetching vehicles:', error);
        throw error;
      }

      // Transform database data to match our interface
      const vehicles: Vehicle[] = (vehiclesData || []).map(vehicle => ({
        id: vehicle.id,
        title: vehicle.title,
        price: vehicle.price,
        year: vehicle.year || 'N/A',
        mileage: vehicle.mileage || 'N/A',
        fuel: vehicle.fuel || 'N/A',
        transmission: vehicle.transmission || 'N/A',
        images: vehicle.images || ['/placeholder.svg'],
        description: vehicle.description || '',
        location: vehicle.location || 'Schweiz',
        phone: vehicle.phone || '+41 76 336 77 99',
        features: vehicle.features || [],
        url: vehicle.url
      }));

      // Get the most recent scrape time
      const lastUpdated = vehiclesData && vehiclesData.length > 0 
        ? vehiclesData[0].scraped_at 
        : new Date().toISOString();

      return {
        vehicles,
        lastUpdated,
        totalCount: vehicles.length
      };
    } catch (error) {
      console.error('Error in getVehicles:', error);
      // Return empty data on error
      return {
        vehicles: [],
        lastUpdated: new Date().toISOString(),
        totalCount: 0
      };
    }
  }

  static async forceUpdate(): Promise<ScrapedData> {
    console.log('Force updating vehicle data via Edge Function...');
    
    try {
      // Call the scraping Edge Function
      const { data, error } = await supabase.functions.invoke('scrape-autoscout24', {
        body: { force: true }
      });

      if (error) {
        console.error('Error calling scrape function:', error);
        throw error;
      }

      console.log('Scraping completed:', data);
      
      // Fetch the updated data from database
      return await this.getVehicles();
    } catch (error) {
      console.error('Error in forceUpdate:', error);
      throw error;
    }
  }

  static getLastUpdateTime(): string | null {
    // This will be handled by the component using the lastUpdated from getVehicles
    return null;
  }

  static async triggerAutomaticScraping(): Promise<void> {
    console.log('Triggering automatic scraping...');
    try {
      await supabase.functions.invoke('scrape-autoscout24');
    } catch (error) {
      console.error('Error triggering automatic scraping:', error);
    }
  }
}
