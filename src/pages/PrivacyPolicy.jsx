import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
          <h1 className="text-4xl font-black text-brand-black mb-2">Privacy Policy</h1>
          <p className="text-brand-black/50 mb-8">Last Updated: June 2026</p>
          
          <div className="prose prose-lg text-brand-black/70 max-w-none space-y-6">
            <p>
              FlyAnyTrip ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our mobile application.
            </p>

            <h2 className="text-2xl font-bold text-brand-black mt-8 mb-4">1. Information We Collect</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Personal Information:</strong> Name, email address, phone number, physical address, date of birth, and passport details required for booking.</li>
              <li><strong>Payment Information:</strong> Credit card details and billing addresses (securely processed by our third-party payment gateways).</li>
              <li><strong>Usage Data:</strong> Information on how you interact with our platform, including IP addresses, browser types, and navigation paths.</li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-black mt-8 mb-4">2. How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Process and manage your travel bookings.</li>
              <li>Communicate with you regarding your itinerary, updates, and customer support.</li>
              <li>Personalize your user experience and deliver tailored travel recommendations.</li>
              <li>Improve our website functionality and security.</li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-black mt-8 mb-4">3. Sharing Your Information</h2>
            <p>
              We only share your personal data with third parties necessary to fulfill your travel arrangements (e.g., airlines, hotels, car rental agencies, and tour operators). We do not sell your personal data to marketing agencies.
            </p>

            <h2 className="text-2xl font-bold text-brand-black mt-8 mb-4">4. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no electronic transmission over the internet is entirely secure.
            </p>

            <h2 className="text-2xl font-bold text-brand-black mt-8 mb-4">5. Your Rights</h2>
            <p>
              Depending on your location, you may have the right to access, correct, or delete your personal data. Please contact our Data Protection Officer at <a href="mailto:privacy@flyanytrip.com" className="text-brand-red font-bold hover:underline">privacy@flyanytrip.com</a> to exercise these rights.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
