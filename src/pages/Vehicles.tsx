
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { ExternalLink, Car, Phone, Mail } from "lucide-react";

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

      {/* AutoScout24 Link Section */}
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto">
            <div className="p-8 bg-black text-white text-center">
              <Car className="w-16 h-16 mx-auto mb-4 text-lime-400" />
              <h2 className="text-3xl font-bold mb-4">
                KURDO Car GmbH - Vehicle Inventory
              </h2>
              <p className="text-gray-300 mb-6">
                View all our available vehicles directly on AutoScout24
              </p>
              <a
                href="https://www.autoscout24.ch/de/s/seller-68160"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-lime-400 hover:bg-lime-500 text-black font-bold py-4 px-8 rounded-lg transition-colors duration-300 text-lg"
              >
                <ExternalLink className="w-5 h-5" />
                View Our Vehicles on AutoScout24
              </a>
            </div>
            
            {/* Features Section */}
            <div className="p-8 bg-gray-50">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-lime-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Car className="w-8 h-8 text-lime-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Quality Vehicles</h3>
                  <p className="text-gray-600">Carefully selected and inspected vehicles</p>
                </div>
                <div className="text-center">
                  <div className="bg-lime-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-8 h-8 text-lime-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Personal Service</h3>
                  <p className="text-gray-600">Direct contact and professional advice</p>
                </div>
                <div className="text-center">
                  <div className="bg-lime-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-lime-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Easy Contact</h3>
                  <p className="text-gray-600">Multiple ways to get in touch with us</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions Section */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-6">How to Browse Our Vehicles</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-3">1. Visit AutoScout24</h3>
              <p className="text-gray-600">
                Click the button above to view our complete inventory on AutoScout24, 
                Switzerland's leading car marketplace.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-3">2. Contact Us</h3>
              <p className="text-gray-600">
                Found a vehicle you like? Contact us directly for test drives, 
                more information, or financing options.
              </p>
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+41763367799"
              className="inline-flex items-center gap-2 bg-lime-400 hover:bg-lime-500 text-black font-bold py-3 px-6 rounded-lg transition-colors duration-300"
            >
              <Phone className="w-5 h-5" />
              Call: +41 76 336 77 99
            </a>
            <a
              href="mailto:kurdocar@bluewin.ch"
              className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
            >
              <Mail className="w-5 h-5" />
              Email Us
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Vehicles;
