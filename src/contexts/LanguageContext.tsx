import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'de' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  de: {
    // Navigation
    'nav.home': 'Startseite',
    'nav.services': 'Dienstleistungen',
    'nav.about': 'Über uns',
    'nav.contact': 'Kontakt',
    'nav.vehicles': 'Fahrzeuge',
    'nav.gallery': 'Galerie',

    // Hero
    'hero.title1': 'Premium',
    'hero.title2': 'Autowerkstatt',
    'hero.button': 'Termin vereinbaren',
    'hero.subtitle': 'Spezialisiert auf',
    'hero.brands': 'Alle Marken',

    // Services
    'services.title': 'Unsere Dienstleistungen',
    'services.subtitle': 'Professionelle Autowartung für alle Marken',
    'services.repairs': 'Reparaturen',
    'services.repairs.desc': 'Professionelle Reparaturen aller Art',
    'services.maintenance': 'Wartung',
    'services.maintenance.desc': 'Regelmäßige Wartung für optimale Leistung',
    'services.tuv': 'TÜV/MFK',
    'services.tuv.desc': 'Technische Prüfungen und Abnahmen',
    'services.bodywork': 'Karosserie',
    'services.bodywork.desc': 'Karosserie- und Lackierarbeiten',
    'services.electronics': 'Elektronik',
    'services.electronics.desc': 'Moderne Fahrzeugelektronik',
    'services.diagnostics': 'Diagnose',
    'services.diagnostics.desc': 'Computerdiagnose und Fehlerbehebung',

    // About
    'about.badge': 'Über KURDO Car GmbH',
    'about.title': 'Vertrauen Sie den Experten',
    'about.description1': 'Bei KURDO Car GmbH sind wir auf die Wartung und Reparatur von Premium- und Luxusfahrzeugen spezialisiert. Unser erfahrenes Team bietet erstklassigen Service für alle Marken.',
    'about.description2': 'Mit modernster Ausrüstung und jahrelanger Erfahrung sorgen wir dafür, dass Ihr Fahrzeug in bestem Zustand bleibt. Vertrauen Sie auf unsere Expertise.',
    'about.stats.experience': 'Jahre Erfahrung',
    'about.stats.customers': 'Zufriedene Kunden',
    'about.stats.master': 'Meisterbetrieb',
    'about.stats.express': 'Express-Service',
    'about.why.title': 'Warum KURDO Car GmbH?',
    'about.why.certified': 'Zertifizierte Meisterwerkstatt',
    'about.why.diagnostic': 'Modernste Diagnosegeräte',
    'about.why.transparent': 'Transparente Preisgestaltung',
    'about.why.guarantee': 'Garantie auf alle Arbeiten',
    'about.why.fair': 'Faire und ehrliche Beratung',

    // Contact
    'contact.title': 'Kontakt',
    'contact.company': 'KURDO Car GmbH',
    'contact.phone': 'Telefon',
    'contact.phone.hours': 'Mo-Fr 8:00-17:00',
    'contact.email': 'E-Mail',
    'contact.email.response': 'Antwort binnen 24h',
    'contact.address': 'Adresse',
    'contact.hours': 'Öffnungszeiten',
    'contact.hours.weekday': 'Mo-Fr: 8:00-17:00',
    'contact.hours.saturday': 'Sa: Nach Vereinbarung',
    'contact.form.title': 'Nachricht senden',
    'contact.form.firstName': 'Vorname',
    'contact.form.lastName': 'Nachname',
    'contact.form.email': 'E-Mail',
    'contact.form.phone': 'Telefon',
    'contact.form.subject': 'Betreff',
    'contact.form.message': 'Nachricht',
    'contact.form.submit': 'Nachricht senden',
    'contact.form.sending': 'Wird gesendet...',
    'contact.form.placeholder.firstName': 'Ihr Vorname',
    'contact.form.placeholder.lastName': 'Ihr Nachname',
    'contact.form.placeholder.email': 'kurdocar@bluewin.ch',
    'contact.form.placeholder.phone': 'Ihre Telefonnummer',
    'contact.form.placeholder.subject': 'Worum geht es?',
    'contact.form.placeholder.message': 'Beschreiben Sie Ihr Anliegen...',

    // Footer
    'footer.company.description': 'Ihre Premium-Autowerkstatt in Dietikon für alle Marken - von der Wartung bis zur Reparatur.',
    'footer.services': 'Dienstleistungen',
    'footer.links': 'Links',
    'footer.contact': 'Kontakt',
    'footer.legal.imprint': 'Impressum',
    'footer.legal.privacy': 'Datenschutz',
    'footer.designed': 'Mit ❤️ in der Schweiz entwickelt',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.vehicles': 'Vehicles',
    'nav.gallery': 'Gallery',

    // Hero
    'hero.title1': 'Premium',
    'hero.title2': 'Auto Service',
    'hero.button': 'Book Appointment',
    'hero.subtitle': 'Specialized in',
    'hero.brands': 'All Brands',

    // Services
    'services.title': 'Our Services',
    'services.subtitle': 'Professional automotive service for all brands',
    'services.repairs': 'Repairs',
    'services.repairs.desc': 'Professional repairs of all kinds',
    'services.maintenance': 'Maintenance',
    'services.maintenance.desc': 'Regular maintenance for optimal performance',
    'services.tuv': 'Inspections',
    'services.tuv.desc': 'Technical inspections and certifications',
    'services.bodywork': 'Bodywork',
    'services.bodywork.desc': 'Body and paint work',
    'services.electronics': 'Electronics',
    'services.electronics.desc': 'Modern vehicle electronics',
    'services.diagnostics': 'Diagnostics',
    'services.diagnostics.desc': 'Computer diagnostics and troubleshooting',

    // About
    'about.badge': 'About KURDO Car GmbH',
    'about.title': 'Trust the Experts',
    'about.description1': 'At KURDO Car GmbH, we specialize in the maintenance and repair of premium and luxury vehicles. Our experienced team provides first-class service for all brands.',
    'about.description2': 'With state-of-the-art equipment and years of experience, we ensure your vehicle stays in top condition. Trust our expertise.',
    'about.stats.experience': 'Years Experience',
    'about.stats.customers': 'Happy Customers',
    'about.stats.master': 'Master Workshop',
    'about.stats.express': 'Express Service',
    'about.why.title': 'Why KURDO Car GmbH?',
    'about.why.certified': 'Certified master workshop',
    'about.why.diagnostic': 'Latest diagnostic equipment',
    'about.why.transparent': 'Transparent pricing',
    'about.why.guarantee': 'Warranty on all work',
    'about.why.fair': 'Fair and honest advice',

    // Contact
    'contact.title': 'Contact',
    'contact.company': 'KURDO Car GmbH',
    'contact.phone': 'Phone',
    'contact.phone.hours': 'Mon-Fri 8:00-17:00',
    'contact.email': 'Email',
    'contact.email.response': 'Response within 24h',
    'contact.address': 'Address',
    'contact.hours': 'Opening Hours',
    'contact.hours.weekday': 'Mon-Fri: 8:00-17:00',
    'contact.hours.saturday': 'Sat: By appointment',
    'contact.form.title': 'Send Message',
    'contact.form.firstName': 'First Name',
    'contact.form.lastName': 'Last Name',
    'contact.form.email': 'Email',
    'contact.form.phone': 'Phone',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Send Message',
    'contact.form.sending': 'Sending...',
    'contact.form.placeholder.firstName': 'Your first name',
    'contact.form.placeholder.lastName': 'Your last name',
    'contact.form.placeholder.email': 'kurdocar@bluewin.ch',
    'contact.form.placeholder.phone': 'Your phone number',
    'contact.form.placeholder.subject': 'What is this about?',
    'contact.form.placeholder.message': 'Describe your request...',

    // Footer
    'footer.company.description': 'Your premium auto service in Dietikon for all brands - from maintenance to repairs.',
    'footer.services': 'Services',
    'footer.links': 'Links',
    'footer.contact': 'Contact',
    'footer.legal.imprint': 'Imprint',
    'footer.legal.privacy': 'Privacy',
    'footer.designed': 'Made with ❤️ in Switzerland',
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('de');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['de']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
