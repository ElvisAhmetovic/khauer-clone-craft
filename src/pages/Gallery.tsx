
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const Gallery = () => {
  const { t } = useLanguage();

  // Placeholder car data - you can replace these with your actual car images
  const cars = [
    {
      id: 1,
      image: "/placeholder.svg",
      title: "Mercedes-Benz C-Class",
      year: "2022",
      price: "CHF 45,000",
    },
    {
      id: 2,
      image: "/placeholder.svg",
      title: "BMW 3 Series",
      year: "2021",
      price: "CHF 42,000",
    },
    {
      id: 3,
      image: "/placeholder.svg",
      title: "Audi A4",
      year: "2022",
      price: "CHF 48,000",
    },
    {
      id: 4,
      image: "/placeholder.svg",
      title: "Volkswagen Golf",
      year: "2021",
      price: "CHF 28,000",
    },
    {
      id: 5,
      image: "/placeholder.svg",
      title: "Ford Focus",
      year: "2020",
      price: "CHF 22,000",
    },
    {
      id: 6,
      image: "/placeholder.svg",
      title: "Toyota Corolla",
      year: "2022",
      price: "CHF 25,000",
    },
  ];

  const handleCarClick = (carId: number) => {
    console.log(`Clicked on car with ID: ${carId}`);
    // You can add navigation to individual car detail pages here later
  };

  return (
    <div className="min-h-screen">
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
            {cars.map((car) => (
              <div
                key={car.id}
                onClick={() => handleCarClick(car.id)}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={car.image}
                    alt={car.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {car.title}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{car.year}</span>
                    <span className="text-lime-600 font-bold text-lg">
                      {car.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
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
          <a
            href="#contact"
            className="inline-block bg-lime-400 hover:bg-lime-500 text-black font-bold py-3 px-8 rounded-lg transition-colors duration-300"
          >
            {t('gallery.contact.button')}
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Gallery;
