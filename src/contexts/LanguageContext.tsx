
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
    // Header
    'nav.home': 'Startseite',
    'nav.services': 'Leistungen',
    'nav.about': 'Über uns',
    'nav.contact': 'Kontakt',
    'nav.vehicles': 'Unsere Fahrzeuge',
    'nav.gallery': 'Galerie',
    
    // Hero
    'hero.title1': 'Sportwagen &',
    'hero.title2': 'exklusive Automobile',
    'hero.button': 'Aktuelle Fahrzeuge',
    'hero.subtitle': 'Wir erfüllen Ihren Autotraum!',
    'hero.brands': 'Unsere Marken',
    
    // Services
    'services.title': 'Unsere Leistungen',
    'services.subtitle': 'Von der Routinewartung bis zur komplexen Reparatur - wir bieten Ihnen den kompletten Service rund um Ihr Fahrzeug.',
    'services.purchase.title': 'Ankauf & Inzahlungnahme',
    'services.purchase.description': 'Wir sind unabhängig und spezialisiert auf den An- & Verkauf, sowie die Vermittlung von hochwertigen Fahrzeugen. Gerne nehmen wir Ihr Fahrzeug in Zahlung.',
    'services.sales.title': 'Verkauf & Vermittlung',
    'services.sales.description': 'Wir bieten Ihnen eine umfangreiche Auswahl an exklusiven Luxus- und Sportwagen an. Ihr Wunschfahrzeug ist nicht in unserem Bestand? Wir helfen Ihnen bei der Vermittlung Ihres Traumautos.',
    'services.repairs': 'Reparaturen',
    'services.maintenance': 'Wartung & Inspektion',
    'services.tuv': 'TÜV & AU',
    'services.bodywork': 'Karosserie & Lack',
    'services.electronics': 'Elektrik & Elektronik',
    'services.noServices': 'Keine Dienste verfügbar.',
    
    // About
    'about.badge': 'Über uns',
    'about.title': 'Ihr zuverlässiger Partner für alle KFZ-Belange',
    'about.description1': 'Seit über 20 Jahren sind wir Ihr kompetenter Ansprechpartner rund um Ihr Fahrzeug. Als Meisterbetrieb garantieren wir Ihnen höchste Qualität bei fairen Preisen.',
    'about.description2': 'Unser erfahrenes Team arbeitet mit modernster Technik und verwendet ausschließlich Originalteile oder gleichwertige Qualitätsersatzteile. Vertrauen Sie auf unsere Expertise und lassen Sie sich von unserem Service überzeugen.',
    'about.stats.experience': 'Jahre Erfahrung',
    'about.stats.customers': 'Zufriedene Kunden',
    'about.stats.master': 'Meisterbetrieb',
    'about.stats.express': 'Express-Service',
    'about.why.title': 'Warum KHAUER KFZ?',
    'about.why.certified': 'Meisterbetrieb mit zertifizierten Fachkräften',
    'about.why.diagnostic': 'Modernste Diagnosetechnik für alle Marken',
    'about.why.transparent': 'Transparente Kostenvoranschläge',
    'about.why.guarantee': 'Garantie auf alle Arbeiten',
    'about.why.fair': 'Faire Preise ohne versteckte Kosten',
    
    // Contact
    'contact.title': 'Kontakt',
    'contact.company': 'Markus Khauer KFZ Handel',
    'contact.phone': 'Telefon',
    'contact.email': 'E-Mail',
    'contact.address': 'Adresse',
    'contact.hours': 'Öffnungszeiten',
    'contact.phone.hours': 'Mo-Fr: 7:00-18:00 Uhr',
    'contact.email.response': 'Wir antworten binnen 24h',
    'contact.hours.weekday': 'Mo-Fr: 7:00-18:00',
    'contact.hours.saturday': 'Sa: 8:00-12:00',
    'contact.form.title': 'Nachricht senden',
    'contact.form.firstName': 'Vorname',
    'contact.form.lastName': 'Nachname',
    'contact.form.email': 'E-Mail-Adresse',
    'contact.form.phone': 'Telefonnummer',
    'contact.form.subject': 'Betreff',
    'contact.form.message': 'Nachricht',
    'contact.form.submit': 'Nachricht senden',
    'contact.form.sending': 'Wird gesendet...',
    'contact.form.placeholder.firstName': 'Ihr Vorname',
    'contact.form.placeholder.lastName': 'Ihr Nachname',
    'contact.form.placeholder.email': 'ihre.email@beispiel.de',
    'contact.form.placeholder.phone': 'Ihre Telefonnummer',
    'contact.form.placeholder.subject': 'Betreff Ihrer Nachricht',
    'contact.form.placeholder.message': 'Beschreiben Sie Ihr Anliegen...',
    
    // Footer
    'footer.company.description': 'Ihr zuverlässiger Partner für alle KFZ-Belange. Meisterbetrieb mit über 20 Jahren Erfahrung.',
    'footer.services': 'Leistungen',
    'footer.links': 'Links',
    'footer.contact': 'Kontakt',
    'footer.legal.imprint': 'Impressum',
    'footer.legal.privacy': 'Datenschutzerklärung',
    'footer.designed': 'Designed by Marketing-Elefanten, dem Marketing-Team der eliteCloud',
  },
  en: {
    // Header
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.about': 'About Us',
    'nav.contact': 'Contact',
    'nav.vehicles': 'Our Vehicles',
    'nav.gallery': 'Gallery',
    
    // Hero
    'hero.title1': 'Sports Cars &',
    'hero.title2': 'Exclusive Automobiles',
    'hero.button': 'Current Vehicles',
    'hero.subtitle': 'We fulfill your car dreams!',
    'hero.brands': 'Our Brands',
    
    // Services
    'services.title': 'Our Services',
    'services.subtitle': 'From routine maintenance to complex repairs - we offer you complete service for your vehicle.',
    'services.purchase.title': 'Purchase & Trade-in',
    'services.purchase.description': 'We are independent and specialized in buying & selling, as well as brokering high-quality vehicles. We gladly accept your vehicle as a trade-in.',
    'services.sales.title': 'Sales & Brokering',
    'services.sales.description': 'We offer you an extensive selection of exclusive luxury and sports cars. Your dream car is not in our inventory? We help you broker your dream car.',
    'services.repairs': 'Repairs',
    'services.maintenance': 'Maintenance & Inspection',
    'services.tuv': 'MOT & Emissions',
    'services.bodywork': 'Bodywork & Paint',
    'services.electronics': 'Electrical & Electronics',
    'services.noServices': 'No services available.',
    
    // About
    'about.badge': 'About Us',
    'about.title': 'Your reliable partner for all automotive needs',
    'about.description1': 'For over 20 years, we have been your competent contact for everything related to your vehicle. As a master workshop, we guarantee you the highest quality at fair prices.',
    'about.description2': 'Our experienced team works with the latest technology and uses only original parts or equivalent quality replacement parts. Trust our expertise and let our service convince you.',
    'about.stats.experience': 'Years Experience',
    'about.stats.customers': 'Satisfied Customers',
    'about.stats.master': 'Master Workshop',
    'about.stats.express': 'Express Service',
    'about.why.title': 'Why KHAUER KFZ?',
    'about.why.certified': 'Master workshop with certified specialists',
    'about.why.diagnostic': 'Latest diagnostic technology for all brands',
    'about.why.transparent': 'Transparent cost estimates',
    'about.why.guarantee': 'Guarantee on all work',
    'about.why.fair': 'Fair prices without hidden costs',
    
    // Contact
    'contact.title': 'Contact',
    'contact.company': 'Markus Khauer KFZ Handel',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.address': 'Address',
    'contact.hours': 'Opening Hours',
    'contact.phone.hours': 'Mon-Fri: 7:00-18:00',
    'contact.email.response': 'We respond within 24h',
    'contact.hours.weekday': 'Mon-Fri: 7:00-18:00',
    'contact.hours.saturday': 'Sat: 8:00-12:00',
    'contact.form.title': 'Send Message',
    'contact.form.firstName': 'First Name',
    'contact.form.lastName': 'Last Name',
    'contact.form.email': 'Email Address',
    'contact.form.phone': 'Phone Number',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Send Message',
    'contact.form.sending': 'Sending...',
    'contact.form.placeholder.firstName': 'Your first name',
    'contact.form.placeholder.lastName': 'Your last name',
    'contact.form.placeholder.email': 'your.email@example.com',
    'contact.form.placeholder.phone': 'Your phone number',
    'contact.form.placeholder.subject': 'Subject of your message',
    'contact.form.placeholder.message': 'Describe your inquiry...',
    
    // Footer
    'footer.company.description': 'Your reliable partner for all automotive needs. Master workshop with over 20 years of experience.',
    'footer.services': 'Services',
    'footer.links': 'Links',
    'footer.contact': 'Contact',
    'footer.legal.imprint': 'Imprint',
    'footer.legal.privacy': 'Privacy Policy',
    'footer.designed': 'Designed by Marketing-Elefanten, the marketing team of eliteCloud',
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('de');

  const t = (key: string): string => {
    return translations[language][key] || key;
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
