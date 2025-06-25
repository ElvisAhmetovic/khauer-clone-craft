
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const Gallery = () => {
  const { t } = useLanguage();

  // Real car data with your uploaded images
  const cars = [
    {
      id: 1,
      image: "/lovable-uploads/f711acdc-e2c6-4308-907c-e1717c0f920e.png",
      title: "Mercedes-Benz A-Klasse",
      year: "2018",
      price: "CHF 28,900",
    },
    {
      id: 2,
      image: "/lovable-uploads/a4cf46d1-059e-4dab-8125-398074358fb9.png",
      title: "Jaguar E-PACE",
      year: "2019",
      price: "CHF 38,500",
    },
    {
      id: 3,
      image: "/lovable-uploads/3f89fdf5-9e11-4a18-843b-af0d4843dc31.png",
      title: "Volkswagen ID.4",
      year: "2022",
      price: "CHF 42,000",
    },
    {
      id: 4,
      image: "/lovable-uploads/d796ec6c-8eb6-4d57-ad22-9ae215e07150.png",
      title: "Porsche Macan",
      year: "2020",
      price: "CHF 68,900",
    },
    {
      id: 5,
      image: "/lovable-uploads/6c3ea015-f7e2-46a2-a192-1d1e2f16f9d2.png",
      title: "Bentley Continental GT",
      year: "2017",
      price: "CHF 158,000",
    },
    {
      id: 6,
      image: "/lovable-uploads/a4d0ca44-e6e3-48bc-a8d5-67851ec2def0.png",
      title: "Mercedes-Benz S-Klasse",
      year: "2019",
      price: "CHF 89,500",
    },
    {
      id: 7,
      image: "/lovable-uploads/462c6e86-b35c-4560-97a8-995ff976719a.png",
      title: "Mercedes-Benz C-Klasse T-Modell",
      year: "2020",
      price: "CHF 48,900",
    },
    {
      id: 8,
      image: "/lovable-uploads/16875711-9699-4aa0-b983-fd00a0a8790c.png",
      title: "Citroën C4 SpaceTourer",
      year: "2019",
      price: "CHF 32,500",
    },
    {
      id: 9,
      image: "/lovable-uploads/40ebd35d-806b-420c-81a8-197115021660.png",
      title: "BMW 1er Cabrio",
      year: "2012",
      price: "CHF 19,900",
    },
    {
      id: 10,
      image: "/lovable-uploads/90b87d7a-907f-4406-93aa-b7ef2ff09866.png",
      title: "Ford Mondeo Turnier",
      year: "2018",
      price: "CHF 24,500",
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
