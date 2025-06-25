

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
      icon: <Phone className="w-6 h-6 text-lime-400" />,
      title: "Telefon",
      content: "076 336 77 99",
      subtitle: "Mo-Fr: 7:00-18:00 Uhr"
    },
    {
      icon: <Mail className="w-6 h-6 text-lime-400" />,
      title: "E-Mail",
      content: "info@khauer-kfz.de",
      subtitle: "Wir antworten binnen 24h"
    },
    {
      icon: <MapPin className="w-6 h-6 text-lime-400" />,
      title: "Adresse",
      content: "Grünaustrasse 21",
      subtitle: "Wolnzach"
    },
    {
      icon: <Clock className="w-6 h-6 text-lime-400" />,
      title: "Öffnungszeiten",
      content: "Mo-Fr: 7:00-18:00",
      subtitle: "Sa: 8:00-12:00"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-black text-white relative">
      <div className="absolute inset-0">
        <img 
          src="/lovable-uploads/0bbc7a22-0503-4efb-b78d-6c9f66d2fae2.png" 
          alt="Contact Background" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-lime-400 mb-4 uppercase tracking-wide">
            Kontakt
          </h2>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Markus Khauer KFZ Handel</h3>
            <p className="text-xl text-gray-300">Grünaustrasse 21</p>
            <p className="text-xl text-gray-300 mb-6">Wolnzach</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {contactInfo.map((info, index) => (
                <Card key={index} className="bg-gray-900 border-gray-700">
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      {info.icon}
                      <CardTitle className="text-lg text-white">{info.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold text-white">{info.content}</p>
                    <p className="text-sm text-gray-400">{info.subtitle}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Nachricht senden</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Vorname *
                    </label>
                    <Input name="firstName" placeholder="Ihr Vorname" required className="bg-gray-800 border-gray-600 text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Nachname *
                    </label>
                    <Input name="lastName" placeholder="Ihr Nachname" required className="bg-gray-800 border-gray-600 text-white" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    E-Mail-Adresse *
                  </label>
                  <Input name="email" type="email" placeholder="ihre.email@beispiel.de" required className="bg-gray-800 border-gray-600 text-white" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Telefonnummer
                  </label>
                  <Input name="phone" placeholder="Ihre Telefonnummer" className="bg-gray-800 border-gray-600 text-white" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Betreff
                  </label>
                  <Input name="subject" placeholder="Betreff Ihrer Nachricht" className="bg-gray-800 border-gray-600 text-white" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nachricht *
                  </label>
                  <Textarea 
                    name="message"
                    placeholder="Beschreiben Sie Ihr Anliegen..."
                    className="min-h-[120px] bg-gray-800 border-gray-600 text-white"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-lime-400 hover:bg-lime-500 text-black font-bold"
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
