import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextProps {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

interface LanguageProviderProps {
  children: React.ReactNode;
}

const translations = {
  de: {
    vehicles: {
      title: 'Unsere Fahrzeuge',
      subtitle: 'Entdecken Sie unsere vielfältige Auswahl an hochwertigen Gebrauchtwagen',
      inventory: {
        tabs: {
          passenger: 'Personenwagen',
          commercial: 'Nutzfahrzeuge',
          liked: 'Gemerkte Fahrzeuge'
        },
        count: {
          passenger: 'Personenwagen gefunden',
          commercial: 'Nutzfahrzeuge gefunden',
          liked: 'gemerkte Fahrzeuge'
        },
        empty: {
          passenger: 'Keine Fahrzeuge entsprechen Ihren Filterkriterien.',
          commercial: 'Derzeit keine Nutzfahrzeuge verfügbar.',
          liked: 'Sie haben noch keine Fahrzeuge gemerkt.'
        }
      },
      filters: {
        brand: 'Marke',
        model: 'Modell',
        bodyType: 'Karosserietyp',
        fuelType: 'Kraftstoff',
        transmission: 'Getriebe',
        priceRange: 'Preisbereich',
        yearRange: 'Baujahr',
        mileageRange: 'Kilometerstand',
        reset: 'Filter zurücksetzen',
        all: 'Alle',
        limousine: 'Limousine',
        cabrio: 'Cabrio',
        suv: 'SUV',
        combi: 'Kombi',
        diesel: 'Diesel',
        benzin: 'Benzin',
        electric: 'Elektro',
        hybrid: 'Hybrid',
        manual: 'Manuell',
        automatic: 'Automatik'
      },
      card: {
        calculateCredit: 'Kredit berechnen',
        compareInsurance: 'Versicherung vergleichen'
      },
      credit: {
        downPayment: 'Anzahlung',
        monthlyPayment: 'Monatliche Rate',
        duration: 'Laufzeit'
      },
      insurance: {
        bestOffer: 'Bestes Angebot',
        savings: 'Ersparnis'
      },
      features: {
        quality: {
          title: 'Geprüfte Qualität',
          desc: 'Alle unsere Fahrzeuge werden sorgfältig geprüft und sind in einwandfreiem Zustand.'
        },
        service: {
          title: 'Persönlicher Service',
          desc: 'Unser erfahrenes Team berät Sie gerne bei der Auswahl Ihres neuen Fahrzeugs.'
        },
        contact: {
          title: 'Einfacher Kontakt',
          desc: 'Erreichen Sie uns jederzeit per Telefon oder E-Mail für Fragen und Terminvereinbarungen.'
        }
      },
      cta: {
        title: 'Bereit für Ihr neues Fahrzeug?',
        subtitle: 'Kontaktieren Sie uns noch heute für eine persönliche Beratung oder Probefahrt.',
        call: 'Jetzt anrufen',
        email: 'E-Mail senden'
      }
    }
  },
  en: {
    vehicles: {
      title: 'Our Vehicles',
      subtitle: 'Discover our diverse selection of high-quality used cars',
      inventory: {
        tabs: {
          passenger: 'Passenger Cars',
          commercial: 'Commercial Vehicles',
          liked: 'Liked Vehicles'
        },
        count: {
          passenger: 'passenger cars found',
          commercial: 'commercial vehicles found',
          liked: 'liked vehicles'
        },
        empty: {
          passenger: 'No vehicles match your filter criteria.',
          commercial: 'No commercial vehicles currently available.',
          liked: 'You haven\'t liked any vehicles yet.'
        }
      },
      filters: {
        brand: 'Brand',
        model: 'Model',
        bodyType: 'Body Type',
        fuelType: 'Fuel',
        transmission: 'Transmission',
        priceRange: 'Price Range',
        yearRange: 'Year',
        mileageRange: 'Mileage',
        reset: 'Reset Filters',
        all: 'All',
        limousine: 'Sedan',
        cabrio: 'Convertible',
        suv: 'SUV',
        combi: 'Estate',
        diesel: 'Diesel',
        benzin: 'Petrol',
        electric: 'Electric',
        hybrid: 'Hybrid',
        manual: 'Manual',
        automatic: 'Automatic'
      },
      card: {
        calculateCredit: 'Calculate Credit',
        compareInsurance: 'Compare Insurance'
      },
      credit: {
        downPayment: 'Down Payment',
        monthlyPayment: 'Monthly Payment',
        duration: 'Duration'
      },
      insurance: {
        bestOffer: 'Best Offer',
        savings: 'Savings'
      },
      features: {
        quality: {
          title: 'Verified Quality',
          desc: 'All our vehicles are carefully inspected and in perfect condition.'
        },
        service: {
          title: 'Personal Service',
          desc: 'Our experienced team is happy to advise you on selecting your new vehicle.'
        },
        contact: {
          title: 'Easy Contact',
          desc: 'Reach us anytime by phone or email for questions and appointments.'
        }
      },
      cta: {
        title: 'Ready for your new vehicle?',
        subtitle: 'Contact us today for personal consultation or a test drive.',
        call: 'Call Now',
        email: 'Send Email'
      }
    }
  }
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'de');

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language as keyof typeof translations];
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k as keyof typeof value];
      } else {
        return key;
      }
    }
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
