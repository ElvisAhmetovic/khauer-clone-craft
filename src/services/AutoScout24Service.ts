
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
}

interface ScrapedData {
  vehicles: Vehicle[];
  lastUpdated: string;
  totalCount: number;
}

export class AutoScout24Service {
  private static readonly STORAGE_KEY = 'autoscout24_vehicles';
  private static readonly LAST_UPDATE_KEY = 'autoscout24_last_update';
  private static readonly UPDATE_INTERVAL = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

  // Since we can't directly scrape due to CORS, we'll simulate with mock data
  // In a real implementation, you'd need a backend service to scrape the data
  private static async fetchVehicleData(): Promise<ScrapedData> {
    console.log('Fetching vehicle data from AutoScout24...');
    
    // Mock data that resembles real AutoScout24 listings
    const mockVehicles: Vehicle[] = [
      {
        id: '1',
        title: 'BMW 320d Touring',
        price: 'CHF 28,500',
        year: '2019',
        mileage: '85,000 km',
        fuel: 'Diesel',
        transmission: 'Automatik',
        images: [
          '/lovable-uploads/0570d214-0aa4-4f12-8cbc-15482512d8a9.png',
          '/lovable-uploads/0bbc7a22-0503-4efb-b78d-6c9f66d2fae2.png'
        ],
        description: 'Gepflegter BMW 320d Touring mit Vollausstattung. Sehr guter Zustand.',
        location: 'Zürich',
        phone: '+41 76 336 77 99',
        features: ['Navigationssystem', 'Klimaautomatik', 'Xenon-Licht', 'Ledersitze']
      },
      {
        id: '2',
        title: 'Mercedes-Benz C 220 d',
        price: 'CHF 32,900',
        year: '2020',
        mileage: '65,000 km',
        fuel: 'Diesel',
        transmission: 'Automatik',
        images: [
          '/lovable-uploads/16875711-9699-4aa0-b983-fd00a0a8790c.png',
          '/lovable-uploads/3ada1520-2fff-43eb-8892-d6a18ebbd85f.png'
        ],
        description: 'Mercedes-Benz C-Klasse in ausgezeichnetem Zustand. Scheckheftgepflegt.',
        location: 'Basel',
        phone: '+41 76 336 77 99',
        features: ['AMG-Paket', 'Panoramadach', 'Harman Kardon', 'Totwinkel-Assistent']
      },
      {
        id: '3',
        title: 'Audi A4 Avant 2.0 TDI',
        price: 'CHF 26,800',
        year: '2018',
        mileage: '95,000 km',
        fuel: 'Diesel',
        transmission: 'Schaltgetriebe',
        images: [
          '/lovable-uploads/3f89fdf5-9e11-4a18-843b-af0d4843dc31.png',
          '/lovable-uploads/40ebd35d-806b-420c-81a8-197115021660.png'
        ],
        description: 'Sportlicher Audi A4 Avant mit S-Line Ausstattung. Sehr gepflegt.',
        location: 'Bern',
        phone: '+41 76 336 77 99',
        features: ['S-Line', 'MMI Navigation', 'LED-Scheinwerfer', 'Sportfahrwerk']
      },
      {
        id: '4',
        title: 'Volkswagen Golf GTI',
        price: 'CHF 24,500',
        year: '2017',
        mileage: '78,000 km',
        fuel: 'Benzin',
        transmission: 'Schaltgetriebe',
        images: [
          '/lovable-uploads/462c6e86-b35c-4560-97a8-995ff976719a.png',
          '/lovable-uploads/519087b3-97f5-4540-aaf3-4784dda17fd3.png'
        ],
        description: 'Volkswagen Golf GTI Performance. Sportlich und zuverlässig.',
        location: 'St. Gallen',
        phone: '+41 76 336 77 99',
        features: ['Performance-Paket', 'Recaro-Sitze', 'DCC-Fahrwerk', 'Sound-System']
      },
      {
        id: '5',
        title: 'Ford Focus ST',
        price: 'CHF 22,900',
        year: '2019',
        mileage: '55,000 km',
        fuel: 'Benzin',
        transmission: 'Schaltgetriebe',
        images: [
          '/lovable-uploads/5e9b35be-db38-4ad9-adb5-d4344ad92db8.png',
          '/lovable-uploads/69067ce9-0dc8-4ff6-9188-73c41a37ba1c.png'
        ],
        description: 'Ford Focus ST mit 280 PS. Perfekt für Sportfahrer.',
        location: 'Luzern',
        phone: '+41 76 336 77 99',
        features: ['ST-Performance', 'Recaro-Sitze', 'SYNC 3', 'Brembo-Bremsen']
      },
      {
        id: '6',
        title: 'Toyota RAV4 Hybrid',
        price: 'CHF 35,500',
        year: '2021',
        mileage: '42,000 km',
        fuel: 'Hybrid',
        transmission: 'Automatik',
        images: [
          '/lovable-uploads/6c3ea015-f7e2-46a2-a192-1d1e2f16f9d2.png',
          '/lovable-uploads/82fd3310-1324-4e76-a0ad-92b0c54c4e1d.png'
        ],
        description: 'Toyota RAV4 Hybrid AWD. Sehr sparsam und umweltfreundlich.',
        location: 'Winterthur',
        phone: '+41 76 336 77 99',
        features: ['AWD', 'Toyota Safety Sense', 'JBL Premium Audio', 'Panoramadach']
      }
    ];

    return {
      vehicles: mockVehicles,
      lastUpdated: new Date().toISOString(),
      totalCount: mockVehicles.length
    };
  }

  static async getVehicles(): Promise<ScrapedData> {
    const cached = this.getCachedData();
    const lastUpdate = localStorage.getItem(this.LAST_UPDATE_KEY);
    
    // Check if we need to update
    if (cached && lastUpdate) {
      const lastUpdateTime = parseInt(lastUpdate);
      const now = Date.now();
      
      if (now - lastUpdateTime < this.UPDATE_INTERVAL) {
        console.log('Using cached vehicle data');
        return cached;
      }
    }

    // Fetch new data
    console.log('Fetching fresh vehicle data');
    const freshData = await this.fetchVehicleData();
    
    // Cache the data
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(freshData));
    localStorage.setItem(this.LAST_UPDATE_KEY, Date.now().toString());
    
    return freshData;
  }

  private static getCachedData(): ScrapedData | null {
    try {
      const cached = localStorage.getItem(this.STORAGE_KEY);
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  }

  static async forceUpdate(): Promise<ScrapedData> {
    console.log('Force updating vehicle data');
    const freshData = await this.fetchVehicleData();
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(freshData));
    localStorage.setItem(this.LAST_UPDATE_KEY, Date.now().toString());
    
    return freshData;
  }

  static getLastUpdateTime(): string | null {
    const lastUpdate = localStorage.getItem(this.LAST_UPDATE_KEY);
    if (!lastUpdate) return null;
    
    const date = new Date(parseInt(lastUpdate));
    return date.toLocaleString('de-CH');
  }
}
