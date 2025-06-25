
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const Vehicles = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-black to-gray-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our <span className="text-lime-400">Vehicles</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Browse our complete vehicle inventory on AutoScout24
          </p>
        </div>
      </div>

      {/* Embedded AutoScout24 Section */}
      <div className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 bg-black text-white">
              <h2 className="text-2xl font-bold text-center">
                KURDO Car GmbH - Vehicle Inventory
              </h2>
              <p className="text-center text-gray-300 mt-2">
                Browse all our available vehicles directly from AutoScout24
              </p>
            </div>
            <div className="relative" style={{ paddingBottom: '75%', height: 0 }}>
              <iframe
                src="https://www.autoscout24.ch/de/s/seller-68160"
                className="absolute top-0 left-0 w-full h-full border-0"
                title="KURDO Car GmbH Vehicles on AutoScout24"
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-black text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Interested in a Vehicle?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Contact us directly for more information, test drives, or to discuss financing options.
          </p>
          <a
            href="#contact"
            className="inline-block bg-lime-400 hover:bg-lime-500 text-black font-bold py-3 px-8 rounded-lg transition-colors duration-300"
          >
            Contact Us
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Vehicles;
