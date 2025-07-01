import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
const Gallery = () => {
  const {
    t
  } = useLanguage();
  const [selectedCar, setSelectedCar] = useState<any>(null);
  const navigate = useNavigate();
  const cars = [{
    id: 1,
    image: "/lovable-uploads/f711acdc-e2c6-4308-907c-e1717c0f920e.png",
    title: "MERCEDES-BENZ A 250 AMG Line 4Matic 7G-DCT",
    year: "06.2015",
    price: "CHF 11'900.−",
    mileage: "219000 km",
    fuel: "Benzin",
    power: "211 PS (155 kW)",
    consumption: "6.7 l/100 km",
    transmission: "Halbautomatisches Getriebe"
  }, {
    id: 2,
    image: "/lovable-uploads/a4cf46d1-059e-4dab-8125-398074358fb9.png",
    title: "JAGUAR E-Pace 2.0 P200 AWD Automatik",
    year: "09.2020",
    price: "CHF 19'900.−",
    mileage: "106000 km",
    fuel: "Benzin",
    power: "200 PS (147 kW)",
    consumption: "10.7 l/100 km",
    transmission: "Automat"
  }, {
    id: 3,
    image: "/lovable-uploads/3f89fdf5-9e11-4a18-843b-af0d4843dc31.png",
    title: "VW ID4 Pro Performance 77 kWh",
    year: "03.2022",
    price: "CHF 26'900.−",
    mileage: "22000 km",
    fuel: "Elektro",
    power: "204 PS (150 kW)",
    consumption: "513 km",
    transmission: "Automatikgetriebe"
  }, {
    id: 4,
    image: "/lovable-uploads/d796ec6c-8eb6-4d57-ad22-9ae215e07150.png",
    title: "PORSCHE Macan S Diesel PDK",
    year: "02.2016",
    price: "CHF 26'900.−",
    mileage: "165000 km",
    fuel: "Diesel",
    power: "258 PS (190 kW)",
    consumption: "6.3 l/100 km",
    transmission: "Halbautomatisches Getriebe"
  }, {
    id: 5,
    image: "/lovable-uploads/6c3ea015-f7e2-46a2-a192-1d1e2f16f9d2.png",
    title: "BENTLEY Continental GT 4.0 V8",
    year: "01.2013",
    price: "CHF 48'900.−",
    mileage: "122000 km",
    fuel: "Benzin",
    power: "507 PS (373 kW)",
    consumption: "10.6 l/100 km",
    transmission: "Automat"
  }, {
    id: 6,
    image: "/lovable-uploads/a4d0ca44-e6e3-48bc-a8d5-67851ec2def0.png",
    title: "MERCEDES-BENZ S 350 d L 9G-Tronic",
    year: "03.2019",
    price: "CHF 47'900.−",
    mileage: "112000 km",
    fuel: "Diesel",
    power: "286 PS (210 kW)",
    consumption: "6.2 l/100 km",
    transmission: "Automat"
  }, {
    id: 7,
    image: "/lovable-uploads/462c6e86-b35c-4560-97a8-995ff976719a.png",
    title: "MERCEDES-BENZ C 220 d AMG Line 4Matic 9G-Tronic",
    year: "05.2019",
    price: "CHF 25'900.−",
    mileage: "90800 km",
    fuel: "Diesel",
    power: "194 PS (143 kW)",
    consumption: "7 l/100 km",
    transmission: "Automat"
  }, {
    id: 8,
    image: "/lovable-uploads/16875711-9699-4aa0-b983-fd00a0a8790c.png",
    title: "CITROEN Grand C4 Spacetourer 2.0 BlueHDi Shine EAT8",
    year: "10.2018",
    price: "CHF 11'900.−",
    mileage: "179000 km",
    fuel: "Diesel",
    power: "163 PS (120 kW)",
    consumption: "4.7 l/100 km",
    transmission: "Automat"
  }, {
    id: 9,
    image: "/lovable-uploads/40ebd35d-806b-420c-81a8-197115021660.png",
    title: "BMW 120i Cabrio Steptronic",
    year: "02.2012",
    price: "CHF 11'900.−",
    mileage: "105000 km",
    fuel: "Benzin",
    power: "170 PS (125 kW)",
    consumption: "7 l/100 km",
    transmission: "Automat"
  }, {
    id: 10,
    image: "/lovable-uploads/90b87d7a-907f-4406-93aa-b7ef2ff09866.png",
    title: "FORD Mondeo 2.0 TDCi Titanium Automatik",
    year: "05.2020",
    price: "CHF 13'900.−",
    mileage: "120000 km",
    fuel: "Diesel",
    power: "150 PS (110 kW)",
    consumption: "6.3 l/100 km",
    transmission: "Automat"
  }];
  const handleCarClick = (carId: number) => {
    console.log(`Clicked on car with ID: ${carId}`);
    // You can add navigation to individual car detail pages here later
  };
  const handleContactClick = () => {
    navigate('/', {
      replace: true
    });
    // Small delay to ensure navigation completes before scrolling
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  };
  return <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-black to-gray-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {t('gallery.title').split(' ').slice(0, -1).join(' ')} <span className="text-lime-400">{t('gallery.title').split(' ').slice(-1)[0]}</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            {t('gallery.subtitle')}
          </p>
        </div>
      </div>

      {/* Gallery Grid Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map(car => <div key={car.id} onClick={() => handleCarClick(car.id)} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer group">
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="relative overflow-hidden cursor-pointer">
                      <img src={car.image} alt={car.title} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300"></div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl w-full p-0 bg-black border-0">
                    <div className="relative">
                      <img src={car.image} alt={car.title} className="w-full h-auto max-h-[80vh] object-contain" />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                        <h3 className="text-white text-xl font-bold mb-2">
                          {car.title}
                        </h3>
                        <div className="text-lime-400 text-2xl font-bold">
                          {car.price}
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                    {car.title}
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex justify-between">
                      <span>Jahr:</span>
                      <span className="font-medium">{car.year}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Kilometerstand:</span>
                      <span className="font-medium">{car.mileage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Kraftstoff:</span>
                      <span className="font-medium">{car.fuel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Leistung:</span>
                      <span className="font-medium">{car.power}</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <div className="text-2xl font-bold text-lime-600 text-center">
                      {car.price}
                    </div>
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-black text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('gallery.interested.title')}
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {t('gallery.interested.subtitle')}
          </p>
          <button onClick={handleContactClick} className="inline-block bg-orange-400 hover:bg-sky-500 text-black font-bold py-3 px-8 rounded-lg transition-colors duration-300">
            {t('gallery.contact.button')}
          </button>
        </div>
      </div>

      <Footer />
    </div>;
};
export default Gallery;