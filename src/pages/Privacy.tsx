
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const Privacy = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
              {t('privacy.title')}
            </h1>
            
            <div className="text-sm text-gray-600 mb-8 text-center">
              {t('privacy.lastUpdated')}
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-6">
                {t('privacy.intro')}
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('privacy.section1.title')}</h2>
              <p className="text-gray-700 mb-4">
                {t('privacy.section1.text')}
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="text-gray-700">
                  KURDO Car GmbH<br />
                  Grünaustrasse 15<br />
                  8953 Dietikon, Switzerland<br />
                  Email: kurdocar@bluewin.ch<br />
                  Phone: +41 76 336 77 99
                </p>
              </div>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('privacy.section2.title')}</h2>
              <p className="text-gray-700 mb-4">
                {t('privacy.section2.text')}
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                <li><strong>{t('privacy.section2.contact')}</strong></li>
                <li><strong>{t('privacy.section2.identification')}</strong></li>
                <li><strong>{t('privacy.section2.vehicle')}</strong></li>
                <li><strong>{t('privacy.section2.financial')}</strong></li>
                <li><strong>{t('privacy.section2.transaction')}</strong></li>
                <li><strong>{t('privacy.section2.communication')}</strong></li>
                <li><strong>{t('privacy.section2.website')}</strong></li>
                <li><strong>{t('privacy.section2.marketing')}</strong></li>
                <li><strong>{t('privacy.section2.other')}</strong></li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('privacy.section3.title')}</h2>
              <p className="text-gray-700 mb-4">{t('privacy.section3.text')}</p>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                <li><strong>{t('privacy.section3.directly')}</strong></li>
                <li><strong>{t('privacy.section3.thirdparty')}</strong></li>
                <li><strong>{t('privacy.section3.automatically')}</strong></li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('privacy.section4.title')}</h2>
              <p className="text-gray-700 mb-4">{t('privacy.section4.text')}</p>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                <li><strong>{t('privacy.section4.contract')}</strong></li>
                <li><strong>{t('privacy.section4.service')}</strong></li>
                <li><strong>{t('privacy.section4.marketing')}</strong></li>
                <li><strong>{t('privacy.section4.credit')}</strong></li>
                <li><strong>{t('privacy.section4.website')}</strong></li>
                <li><strong>{t('privacy.section4.security')}</strong></li>
                <li><strong>{t('privacy.section4.legal')}</strong></li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('privacy.section5.title')}</h2>
              <p className="text-gray-700 mb-4">{t('privacy.section5.text')}</p>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                <li><strong>{t('privacy.section5.contractual')}</strong></li>
                <li><strong>{t('privacy.section5.consent')}</strong></li>
                <li><strong>{t('privacy.section5.legitimate')}</strong></li>
                <li><strong>{t('privacy.section5.legal')}</strong></li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('privacy.section6.title')}</h2>
              <p className="text-gray-700 mb-4">{t('privacy.section6.text')}</p>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                <li><strong>{t('privacy.section6.affiliated')}</strong></li>
                <li><strong>{t('privacy.section6.service')}</strong></li>
                <li><strong>{t('privacy.section6.financing')}</strong></li>
                <li><strong>{t('privacy.section6.legal')}</strong></li>
                <li><strong>{t('privacy.section6.consent')}</strong></li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('privacy.section7.title')}</h2>
              <p className="text-gray-700 mb-6">
                {t('privacy.section7.text')}
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('privacy.section8.title')}</h2>
              <p className="text-gray-700 mb-6">
                {t('privacy.section8.text')}
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('privacy.section9.title')}</h2>
              <p className="text-gray-700 mb-4">{t('privacy.section9.text')}</p>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                <li><strong>{t('privacy.section9.access')}</strong></li>
                <li><strong>{t('privacy.section9.rectification')}</strong></li>
                <li><strong>{t('privacy.section9.erasure')}</strong></li>
                <li><strong>{t('privacy.section9.restriction')}</strong></li>
                <li><strong>{t('privacy.section9.portability')}</strong></li>
                <li><strong>{t('privacy.section9.object')}</strong></li>
                <li><strong>{t('privacy.section9.complaint')}</strong></li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('privacy.section10.title')}</h2>
              <p className="text-gray-700 mb-6">
                {t('privacy.section10.text')}
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('privacy.section11.title')}</h2>
              <p className="text-gray-700 mb-4">
                {t('privacy.section11.text')}
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  KURDO Car GmbH<br />
                  Grünaustrasse 15<br />
                  8953 Dietikon, Switzerland<br />
                  Email: kurdocar@bluewin.ch<br />
                  Phone: +41 76 336 77 99
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Privacy;
