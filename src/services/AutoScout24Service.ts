
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
        throw new Error(`Database error: ${error.message}`);
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
      throw error;
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
        throw new Error(`Scraping failed: ${error.message}`);
      }

      console.log('Scraping completed:', data);
      
      // Wait a bit for the data to be processed
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Fetch the updated data from database
      return await this.getVehicles();
    } catch (error) {
      console.error('Error in forceUpdate:', error);
      // If the scraping fails, still try to return existing data
      try {
        const existingData = await this.getVehicles();
        // If we have existing data, return it but still throw the error
        if (existingData.vehicles.length > 0) {
          throw new Error(`Aktualisierung fehlgeschlagen, aber vorhandene Daten werden angezeigt: ${error.message}`);
        }
      } catch (getError) {
        console.error('Error getting existing data:', getError);
      }
      throw error;
    }
  }

  static async triggerAutomaticScraping(): Promise<void> {
    console.log('Triggering automatic scraping...');
    try {
      const { error } = await supabase.functions.invoke('scrape-autoscout24');
      if (error) {
        console.error('Error in automatic scraping:', error);
      }
    } catch (error) {
      console.error('Error triggering automatic scraping:', error);
    }
  }
}
