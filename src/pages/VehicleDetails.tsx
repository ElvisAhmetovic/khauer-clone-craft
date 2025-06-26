
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Printer, Heart, Phone, Mail, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useVehicleFilter } from '@/contexts/VehicleFilterContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useForm } from 'react-hook-form';
import { toast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface InquiryFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

const VehicleDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { vehicles, toggleLike, isLiked } = useVehicleFilter();
  const { t } = useLanguage();
  const [showOpeningHours, setShowOpeningHours] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  
  const form = useForm<InquiryFormData>();
  
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

  const openingHours = [
    { day: 'Monday', hours: '08:00 - 18:00' },
    { day: 'Tuesday', hours: '08:00 - 18:00' },
    { day: 'Wednesday', hours: '08:00 - 18:00' },
    { day: 'Thursday', hours: '08:00 - 18:00' },
    { day: 'Friday', hours: '08:00 - 18:00' },
    { day: 'Saturday', hours: '09:00 - 16:00' },
    { day: 'Sunday', hours: 'Closed' },
  ];

  const onSubmitInquiry = async (data: InquiryFormData) => {
    try {
      const response = await fetch('/api/send-contact-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          subject: `Vehicle Inquiry - ${vehicle.title}`,
          message: `${data.message}\n\nVehicle: ${vehicle.title}\nPrice: ${vehicle.price}\nVehicle ID: ${vehicle.id}`,
        }),
      });

      if (response.ok) {
        toast({
          title: 'Inquiry sent successfully',
          description: 'We will get back to you as soon as possible.',
        });
        setInquiryOpen(false);
        form.reset();
      } else {
        throw new Error('Failed to send inquiry');
      }
    } catch (error) {
      toast({
        title: 'Error sending inquiry',
        description: 'Please try again later or contact us directly.',
        variant: 'destructive',
      });
    }
  };

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
            <span>{vehicle.brand.toUpperCase()}</span>
            <span>{'>'}</span>
            <span>{vehicle.bodyType.toUpperCase()}</span>
            <span>{'>'}</span>
            <span className="font-semibold">{vehicle.title}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Share2 className="w-4 h-4 mr-1" />
              Share
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
              {vehicle.isTopOffer && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-orange-500 text-white font-bold">TOP OFFER</Badge>
                </div>
              )}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-blue-600 text-white px-4 py-2 rounded text-sm">
                  VIEWING BY APPOINTMENT ONLY ***
                </div>
              </div>
              
              {/* Image Gallery */}
              <div className="grid grid-cols-5 gap-2 mt-4">
                {[1,2,3,4].map((i) => (
                  <img
                    key={i}
                    src={vehicle.image}
                    alt={`View ${i}`}
                    className="w-full h-20 object-cover rounded cursor-pointer border-2 border-gray-200 hover:border-blue-500 transition-colors"
                  />
                ))}
                <div className="relative">
                  <img
                    src={vehicle.image}
                    alt="More views"
                    className="w-full h-20 object-cover rounded cursor-pointer"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded">
                    <span className="text-white font-bold text-xs">+10</span>
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

              {/* Key Features */}
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="secondary" className="bg-green-100 text-green-800">✓ From MFK</Badge>
                <Badge variant="secondary" className="bg-green-100 text-green-800">✓ With warranty</Badge>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">Automatic</Badge>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">Keyless</Badge>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">Camera</Badge>
              </div>

              {/* Specs Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-gray-600">First registration</span>
                    <span className="font-semibold">{vehicle.year}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-gray-600">Mileage</span>
                    <span className="font-semibold">{vehicle.mileage}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-gray-600">Transmission</span>
                    <span className="font-semibold">{vehicle.transmission}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-gray-600">Body type</span>
                    <span className="font-semibold">{vehicle.bodyType}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-gray-600">Fuel</span>
                    <span className="font-semibold">{vehicle.fuel}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-gray-600">Power</span>
                    <span className="font-semibold">{vehicle.power}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-gray-600">Consumption</span>
                    <div className="font-semibold flex items-center gap-2">
                      {vehicle.consumption}
                      <Badge className="bg-orange-500 text-white text-xs">F</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-gray-600">Doors</span>
                    <span className="font-semibold">5</span>
                  </div>
                </div>
              </div>

              {/* Equipment */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4">Equipment</h3>
                  <div className="grid md:grid-cols-2 gap-2 text-sm">
                    {vehicle.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="text-green-600">✓</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Column - Price and Actions */}
          <div className="space-y-6">
            <Card className="sticky top-6">
              <CardContent className="p-6">
                <div className="text-3xl font-bold mb-2">{vehicle.price}</div>
                <div className="text-sm text-gray-600 mb-6">VAT deductible</div>
                
                <div className="space-y-3 mb-6">
                  <Button variant="outline" className="w-full justify-start text-blue-600 border-blue-200">
                    <span className="mr-2">🏦</span>
                    Calculate financing
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-blue-600 border-blue-200">
                    <span className="mr-2">🛡️</span>
                    Calculate insurance
                  </Button>
                </div>

                <Dialog open={inquiryOpen} onOpenChange={setInquiryOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold mb-4">
                      <Mail className="w-4 h-4 mr-2" />
                      Inquiry
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Vehicle Inquiry</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmitInquiry)} className="space-y-4">
                        <FormField
                          control={form.control}
                          name="name"
                          rules={{ required: "Name is required" }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="Your name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          rules={{ 
                            required: "Email is required",
                            pattern: {
                              value: /^\S+@\S+$/,
                              message: "Invalid email address"
                            }
                          }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email *</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="your@email.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone</FormLabel>
                              <FormControl>
                                <Input placeholder="Your phone number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="message"
                          rules={{ required: "Message is required" }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Message *</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="I'm interested in this vehicle..."
                                  className="min-h-[100px]"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="flex gap-2">
                          <Button type="button" variant="outline" onClick={() => setInquiryOpen(false)} className="flex-1">
                            Cancel
                          </Button>
                          <Button type="submit" className="flex-1">
                            Send Inquiry
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>

                <Button 
                  variant="outline" 
                  className="w-full mb-4"
                  onClick={() => setShowPhoneNumber(!showPhoneNumber)}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  {showPhoneNumber ? '+41 76 336 77 99' : '076...show'}
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
                    {liked ? 'Saved' : 'Save'}
                  </Button>
                </div>

                <Button variant="outline" className="w-full text-green-600 border-green-200">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact via WhatsApp
                </Button>

                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-bold mb-2">KURDO Car GmbH</h4>
                  <div className="text-sm text-gray-600 mb-2">
                    📍 Grünaustrasse 21, 8953 Dietikon
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-blue-600 p-0 h-auto"
                    onClick={() => setShowOpeningHours(!showOpeningHours)}
                  >
                    Show opening hours {showOpeningHours ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
                  </Button>
                  
                  {showOpeningHours && (
                    <div className="mt-3 text-sm space-y-1">
                      {openingHours.map((day, index) => (
                        <div key={index} className="flex justify-between">
                          <span className="text-gray-600">{day.day}:</span>
                          <span className={day.hours === 'Closed' ? 'text-red-600' : 'text-gray-900'}>
                            {day.hours}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
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
