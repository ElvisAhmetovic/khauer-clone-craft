
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
              Privacy Policy of KURDO Car GmbH
            </h1>
            
            <div className="text-sm text-gray-600 mb-8 text-center">
              Last Updated: June 25, 2025
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-6">
                At KURDO Car GmbH, your privacy is of utmost importance to us. This Privacy Policy explains how we collect, use, disclose, and protect your personal data when you interact with us, whether through our website, showroom, service center, or other channels. We comply with the Swiss Federal Act on Data Protection (FADP) and other applicable data protection laws.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Who We Are (Data Controller)</h2>
              <p className="text-gray-700 mb-4">
                The data controller responsible for the processing of your personal data described in this policy is:
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

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. What Personal Data We Collect</h2>
              <p className="text-gray-700 mb-4">
                We may collect various types of personal data, depending on your interaction with us:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                <li><strong>Contact Information:</strong> Name, address, email address, phone number, preferred contact method.</li>
                <li><strong>Identification Data:</strong> Date of birth, nationality, driver's license details (for test drives).</li>
                <li><strong>Vehicle Information:</strong> Vehicle identification number (VIN), make, model, year, registration details, service history, mileage.</li>
                <li><strong>Financial Information:</strong> Bank details, credit card information, leasing or financing details, creditworthiness data (for financing applications).</li>
                <li><strong>Transaction Data:</strong> Details of products or services purchased, quotes, order history, payment records.</li>
                <li><strong>Communication Data:</strong> Records of your correspondence with us (e.g., emails, phone calls, chat messages).</li>
                <li><strong>Website Usage Data:</strong> IP address, browser type, operating system, referring URLs, pages viewed, time spent on our website.</li>
                <li><strong>Marketing Preferences:</strong> Your preferences for receiving marketing communications.</li>
                <li><strong>Other Data:</strong> Information you voluntarily provide to us (e.g., feedback, survey responses).</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. How We Collect Your Personal Data</h2>
              <p className="text-gray-700 mb-4">We collect personal data through various means:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                <li><strong>Directly from You:</strong> When you visit our service center, request a quote, purchase a vehicle or service, apply for financing, subscribe to our newsletter, or contact us directly.</li>
                <li><strong>From Third Parties:</strong> We may receive data from affiliated companies, financing partners, insurance providers, or credit agencies (for credit checks, with your consent).</li>
                <li><strong>Automatically:</strong> Through our website and digital services using cookies and similar tracking technologies.</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Purposes of Data Processing</h2>
              <p className="text-gray-700 mb-4">We process your personal data for the following purposes:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                <li><strong>Contract Fulfilment:</strong> To process your purchase, lease, or financing agreements; provide requested vehicles and services; manage warranty claims and conduct necessary repairs and maintenance.</li>
                <li><strong>Customer Service:</strong> To respond to your inquiries, provide support, manage appointments, and deliver updates regarding your vehicle or services.</li>
                <li><strong>Marketing and Communication:</strong> To send you information about new vehicle models, special offers, events, and other news that may be of interest to you.</li>
                <li><strong>Creditworthiness Assessment:</strong> To assess your financial standing when you apply for financing or leasing services.</li>
                <li><strong>Website Improvement:</strong> To understand how our website is used, identify areas for improvement, and personalize your online experience.</li>
                <li><strong>Security and Safety:</strong> To ensure the safety and security of our premises, vehicles, and digital systems; prevent fraud; and protect our assets.</li>
                <li><strong>Legal and Regulatory Compliance:</strong> To comply with legal obligations, regulatory requirements, and requests from public authorities.</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Legal Basis for Processing</h2>
              <p className="text-gray-700 mb-4">We process your personal data based on one or more of the following legal bases:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                <li><strong>Contractual Necessity:</strong> When processing is necessary for the performance of a contract with you or to take steps at your request prior to entering into a contract.</li>
                <li><strong>Consent:</strong> Where you have given your explicit consent for specific processing activities. You have the right to withdraw your consent at any time.</li>
                <li><strong>Legitimate Interests:</strong> When processing is necessary for our legitimate interests, provided that your interests and fundamental rights do not override those interests.</li>
                <li><strong>Legal Obligation:</strong> When processing is necessary to comply with a legal or regulatory obligation.</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Disclosure of Your Personal Data</h2>
              <p className="text-gray-700 mb-4">We may share your personal data with third parties in the following circumstances:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                <li><strong>Affiliated Companies:</strong> With the vehicle manufacturer, national importer, or other companies within our corporate group for purposes such as warranty management and recall notifications.</li>
                <li><strong>Service Providers:</strong> With external service providers who perform services on our behalf (e.g., IT services, marketing agencies, payment processors).</li>
                <li><strong>Financing and Insurance Partners:</strong> If you apply for financing or insurance through us, we will share necessary financial and personal data with our trusted partners.</li>
                <li><strong>Legal and Regulatory Authorities:</strong> When required by law, court order, or governmental request.</li>
                <li><strong>With Your Consent:</strong> When you have explicitly consented to the sharing of your data with specific third parties.</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. Data Security</h2>
              <p className="text-gray-700 mb-6">
                We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, loss, misuse, alteration, or destruction. These measures include encryption, access controls, firewalls, and regular security audits.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">8. Data Retention</h2>
              <p className="text-gray-700 mb-6">
                We retain your personal data only for as long as necessary to fulfil the purposes for which it was collected, or as required by law. Once the retention period expires, your personal data will be securely deleted or anonymized.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">9. Your Data Protection Rights</h2>
              <p className="text-gray-700 mb-4">Under Swiss data protection law, you have the following rights regarding your personal data:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                <li><strong>Right of Access:</strong> To request information about your personal data that we process and to receive a copy of that data.</li>
                <li><strong>Right to Rectification:</strong> To request the correction of inaccurate or incomplete personal data.</li>
                <li><strong>Right to Erasure:</strong> To request the deletion of your personal data under certain circumstances.</li>
                <li><strong>Right to Restriction of Processing:</strong> To request that we limit the processing of your personal data under certain circumstances.</li>
                <li><strong>Right to Data Portability:</strong> To receive your personal data in a structured, commonly used, and machine-readable format.</li>
                <li><strong>Right to Object:</strong> To object to the processing of your personal data, particularly if processed for direct marketing purposes.</li>
                <li><strong>Right to Lodge a Complaint:</strong> You have the right to lodge a complaint with the Federal Data Protection and Information Commissioner (FDPIC) in Switzerland.</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">10. Changes to This Privacy Policy</h2>
              <p className="text-gray-700 mb-6">
                We may update this Privacy Policy from time to time to reflect changes in our data processing practices or legal requirements. We will notify you of any material changes by posting the updated policy on our website with a new "Last Updated" date.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">11. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data processing practices, please do not hesitate to contact us:
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
