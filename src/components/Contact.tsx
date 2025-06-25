
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const contactData = {
      name: `${formData.get('firstName')} ${formData.get('lastName')}`,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    };

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([contactData]);

      if (error) throw error;

      toast({
        title: "Nachricht erfolgreich gesendet!",
        description: "Wir werden uns in Kürze bei Ihnen melden.",
      });

      // Reset form
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: "Fehler beim Senden",
        description: "Bitte versuchen Sie es später erneut oder rufen Sie uns an.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6 text-blue-600" />,
      title: "Telefon",
      content: "+49 123 456 789",
      subtitle: "Mo-Fr: 7:00-18:00 Uhr"
    },
    {
      icon: <Mail className="w-6 h-6 text-blue-600" />,
      title: "E-Mail",
      content: "info@khauer-kfz.de",
      subtitle: "Wir antworten binnen 24h"
    },
    {
      icon: <MapPin className="w-6 h-6 text-blue-600" />,
      title: "Adresse",
      content: "Musterstraße 123",
      subtitle: "12345 Musterstadt"
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-600" />,
      title: "Öffnungszeiten",
      content: "Mo-Fr: 7:00-18:00",
      subtitle: "Sa: 8:00-12:00"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Kontakt & Anfahrt
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Haben Sie Fragen oder möchten einen Termin vereinbaren? 
            Wir sind gerne für Sie da!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {contactInfo.map((info, index) => (
                <Card key={index} className="border-0 shadow-md">
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      {info.icon}
                      <CardTitle className="text-lg">{info.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold text-gray-900">{info.content}</p>
                    <p className="text-sm text-gray-600">{info.subtitle}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Map placeholder */}
            <Card className="border-0 shadow-md">
              <CardContent className="p-0">
                <div className="bg-gray-300 h-64 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <MapPin className="w-12 h-12 mx-auto mb-2" />
                    <p>Google Maps Integration</p>
                    <p className="text-sm">Interaktive Karte</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl">Nachricht senden</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vorname *
                    </label>
                    <Input name="firstName" placeholder="Ihr Vorname" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nachname *
                    </label>
                    <Input name="lastName" placeholder="Ihr Nachname" required />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-Mail-Adresse *
                  </label>
                  <Input name="email" type="email" placeholder="ihre.email@beispiel.de" required />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefonnummer
                  </label>
                  <Input name="phone" placeholder="Ihre Telefonnummer" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Betreff
                  </label>
                  <Input name="subject" placeholder="Betreff Ihrer Nachricht" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nachricht *
                  </label>
                  <Textarea 
                    name="message"
                    placeholder="Beschreiben Sie Ihr Anliegen..."
                    className="min-h-[120px]"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {isSubmitting ? "Wird gesendet..." : "Nachricht senden"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
