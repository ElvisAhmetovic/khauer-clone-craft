
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

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
      console.log("Sending contact email with data:", contactData);
      
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: contactData
      });

      if (error) {
        console.error("Supabase function error:", error);
        throw error;
      }

      console.log("Email sent successfully:", data);

      toast({
        title: "Nachricht erfolgreich gesendet!",
        description: "Wir haben Ihre Anfrage erhalten und werden uns in Kürze bei Ihnen melden.",
      });

      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: "Fehler beim Senden",
        description: "Bitte versuchen Sie es später erneut oder rufen Sie uns direkt an.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6 text-brand-orange" />,
      title: t('contact.phone'),
      content: "+41 76 336 77 99",
      subtitle: t('contact.phone.hours')
    },
    {
      icon: <Mail className="w-6 h-6 text-brand-orange" />,
      title: t('contact.email'),
      content: "kurdocar@bluewin.ch",
      subtitle: t('contact.email.response')
    },
    {
      icon: <MapPin className="w-6 h-6 text-brand-orange" />,
      title: t('contact.address'),
      content: "Grünaustrasse 15",
      subtitle: "8953 Dietikon, Switzerland"
    },
    {
      icon: <Clock className="w-6 h-6 text-brand-orange" />,
      title: t('contact.hours'),
      content: t('contact.hours.weekday'),
      subtitle: t('contact.hours.saturday')
    }
  ];

  return (
    <section id="contact" className="py-20 bg-brand-blue text-white relative">
      <div className="absolute inset-0">
        <img 
          src="/lovable-uploads/0bbc7a22-0503-4efb-b78d-6c9f66d2fae2.png" 
          alt="Contact Background" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-brand-blue bg-opacity-70"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-brand-orange mb-4 uppercase tracking-wide">
            {t('contact.title')}
          </h2>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">KURDO Car GmbH</h3>
            <p className="text-xl text-gray-100">Grünaustrasse 15</p>
            <p className="text-xl text-gray-100 mb-6">8953 Dietikon, Switzerland</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {contactInfo.map((info, index) => (
                <Card key={index} className="bg-white border-gray-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      {info.icon}
                      <CardTitle className="text-lg text-brand-blue">{info.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold text-gray-800">{info.content}</p>
                    <p className="text-sm text-gray-600">{info.subtitle}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-2xl text-brand-blue">{t('contact.form.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.form.firstName')} *
                    </label>
                    <Input name="firstName" placeholder={t('contact.form.placeholder.firstName')} required className="bg-gray-50 border-gray-300 text-gray-800" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.form.lastName')} *
                    </label>
                    <Input name="lastName" placeholder={t('contact.form.placeholder.lastName')} required className="bg-gray-50 border-gray-300 text-gray-800" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.form.email')} *
                  </label>
                  <Input name="email" type="email" placeholder={t('contact.form.placeholder.email')} required className="bg-gray-50 border-gray-300 text-gray-800" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.form.phone')}
                  </label>
                  <Input name="phone" placeholder={t('contact.form.placeholder.phone')} className="bg-gray-50 border-gray-300 text-gray-800" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.form.subject')}
                  </label>
                  <Input name="subject" placeholder={t('contact.form.placeholder.subject')} className="bg-gray-50 border-gray-300 text-gray-800" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.form.message')} *
                  </label>
                  <Textarea 
                    name="message"
                    placeholder={t('contact.form.placeholder.message')}
                    className="min-h-[120px] bg-gray-50 border-gray-300 text-gray-800"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-brand-orange hover:bg-orange-600 text-white font-bold"
                >
                  {isSubmitting ? t('contact.form.sending') : t('contact.form.submit')}
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
