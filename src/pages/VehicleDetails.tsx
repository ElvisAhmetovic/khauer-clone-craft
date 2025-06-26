
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Printer, Heart, Phone, Mail, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useVehicleFilter } from '@/contexts/VehicleFilterContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const VehicleDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { vehicles, toggleLike, isLiked } = useVehicleFilter();
  const { t } = useLanguage();
  
  const vehicle = vehicles.find(v => v.id === id);
  
  if (!vehicle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Vehicle not found</h1>
          <Button onClick={() => navigate('/vehicles')}>Back to Vehicles</Button>
        </div>
      </div>
    );
  }

  const liked = isLiked(vehicle.id);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Navigation Bar */}
      <div className="bg-white border-b px-4 py-3">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Button variant="ghost" size="sm" onClick={() => navigate('/vehicles')}>
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
            <span>|</span>
            <span>FORD</span>
            <span>{'>'}</span>
            <span>MONDEO</span>
            <span>{'>'}</span>
            <span className="font-semibold">FORD Mondeo 2.0 TDCi Titanium Automatic</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Share2 className="w-4 h-4 mr-1" />
              Divide
            </Button>
            <Button variant="ghost" size="sm">
              <Printer className="w-4 h-4 mr-1" />
              Print
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2">
            {/* Main Image */}
            <div className="relative mb-6">
              <img
                src={vehicle.image}
                alt={vehicle.title}
                className="w-full h-96 object-cover rounded-lg"
              />
              <div className="absolute top-4 left-4">
                <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">KURDO</span>
                </div>
              </div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-blue-600 text-white px-4 py-2 rounded text-sm">
                  VIEWING BY APPOINTMENT ONLY ***
                </div>
              </div>
              
              {/* Image Gallery */}
              <div className="grid grid-cols-4 gap-2 mt-4">
                {[1,2,3,4].map((i) => (
                  <img
                    key={i}
                    src={vehicle.image}
                    alt={`View ${i}`}
                    className="w-full h-24 object-cover rounded cursor-pointer border-2 border-gray-200 hover:border-blue-500"
                  />
                ))}
                <div className="relative">
                  <img
                    src={vehicle.image}
                    alt="More views"
                    className="w-full h-24 object-cover rounded cursor-pointer"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded">
                    <span className="text-white font-bold">+10 images</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Vehicle Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{vehicle.title}</h1>
                <p className="text-gray-600">
                  * TOP OFFER * TOP CONDITION * AUTOMATIC * KEYLESS * CAMERA * FRESH FROM MFK+NEW TIRES+NEW BRAKES * 12-M WARRANTY + 350 CHF *
                </p>
              </div>

              {/* Specs Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📅</span>
                    <div>
                      <span className="text-gray-600">Date</span>
                      <div className="font-semibold">{vehicle.year}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🏃</span>
                    <div>
                      <span className="text-gray-600">Mileage</span>
                      <div className="font-semibold">{vehicle.mileage}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">⚙️</span>
                    <div>
                      <span className="text-gray-600">Transmission</span>
                      <div className="font-semibold">{vehicle.transmission}</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">⛽</span>
                    <div>
                      <span className="text-gray-600">Fuel</span>
                      <div className="font-semibold">{vehicle.fuel}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">⚡</span>
                    <div>
                      <span className="text-gray-600">Power</span>
                      <div className="font-semibold">{vehicle.power}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">⛽</span>
                    <div>
                      <span className="text-gray-600">Consumption</span>
                      <div className="font-semibold flex items-center gap-2">
                        {vehicle.consumption}
                        <Badge className="bg-orange-500 text-white">F</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4">Technology</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cubic capacity</span>
                      <span>1995 cm³</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cylinder</span>
                      <span>4</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Engine design</span>
                      <span>Row</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Aisles</span>
                      <span>8</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4">Vehicle history</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Condition</span>
                      <span>Used</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Direct / parallel import</span>
                      <span>No</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4">Standard equipment</h3>
                  <ul className="text-sm space-y-2">
                    <li>• 12 volt socket in the cargo area</li>
                    <li>• 12 volt socket at the front</li>
                    <li>• 3-point seat belts on all seats</li>
                    <li>• ABS, EBD Electronic Brake Force Distribution</li>
                    <li>• Airbag: front passenger can be deactivated</li>
                    <li>• Airbag: driver and front passenger</li>
                    <li>• Airbag: Knee airbag for driver</li>
                    <li>• Airbag: Side airbag for driver and front passenger</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Column - Price and Actions */}
          <div className="space-y-6">
            <Card className="sticky top-6">
              <CardContent className="p-6">
                <div className="text-3xl font-bold mb-6">{vehicle.price}</div>
                
                <div className="space-y-3 mb-6">
                  <Button variant="outline" className="w-full justify-start text-blue-600">
                    <span className="mr-2">🏦</span>
                    Calculate loan installment
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-blue-600">
                    <span className="mr-2">🛡️</span>
                    Calculate insurance premium
                  </Button>
                </div>

                <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold mb-4">
                  <Mail className="w-4 h-4 mr-2" />
                  Inquiry
                </Button>

                <Button variant="outline" className="w-full mb-4">
                  <Phone className="w-4 h-4 mr-2" />
                  076...show
                </Button>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <Button variant="outline" size="sm">
                    Compare
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => toggleLike(vehicle.id)}
                  >
                    <Heart className={`w-4 h-4 mr-1 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
                    Notice
                  </Button>
                </div>

                <Button variant="outline" className="w-full text-green-600">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact via WhatsApp
                </Button>

                <div className="flex items-center gap-4 mt-6 text-sm text-green-600">
                  <span>✓ From MFK</span>
                  <span>✓ With warranty</span>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-bold mb-2">KURDO Car GmbH</h4>
                  <div className="text-sm text-gray-600 mb-2">
                    📍 Grünaustrasse 21, 8953 Dietikon
                  </div>
                  <Button variant="ghost" size="sm" className="text-blue-600">
                    Show opening hours ⌄
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default VehicleDetails;
