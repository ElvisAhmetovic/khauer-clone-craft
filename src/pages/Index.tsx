
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import EmailPopup from "@/components/EmailPopup";
import { SEO } from "@/components/SEO";

const Index = () => {
  return (
    <>
      <SEO
        title="Premium Fahrzeughandel in Dietikon"
        description="KURDO Car GmbH - Ihr Experte für Premium-Fahrzeuge in Dietikon, Schweiz. Qualitätsgeprüfte Gebrauchtwagen von Mercedes, BMW, Porsche, Bentley und mehr. Professioneller Service seit Jahren."
        canonicalUrl="https://yourdomain.com/"
        keywords="Gebrauchtwagen, Premium Fahrzeuge, Auto kaufen Schweiz, Mercedes, BMW, Porsche, Bentley, Autohandel Dietikon"
      />
      <div className="min-h-screen">
        <Header />
        <Hero />
        <Services />
        <About />
        <Contact />
        <Footer />
        <EmailPopup />
      </div>
    </>
  );
};

export default Index;
