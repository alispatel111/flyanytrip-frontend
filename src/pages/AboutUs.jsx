import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
          <h1 className="text-4xl font-black text-brand-black mb-6">About FlyAnyTrip</h1>
          
          <div className="prose prose-lg text-brand-black/70 max-w-none space-y-6">
            <p>
              Welcome to FlyAnyTrip, your premier destination for exceptional travel experiences. Founded with a vision to make global exploration seamless and accessible, we are dedicated to curating journeys that transcend the ordinary.
            </p>

            <h2 className="text-2xl font-bold text-brand-black mt-8 mb-4">Our Mission</h2>
            <p>
              Our mission is to empower travelers by providing a comprehensive, intuitive, and highly personalized booking platform. We believe that travel is not just about reaching a destination; it's about the experiences, cultures, and memories you gather along the way.
            </p>

            <h2 className="text-2xl font-bold text-brand-black mt-8 mb-4">Why Choose Us?</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Unrivaled Inventory:</strong> Access to millions of flights, hotels, and curated tours worldwide.</li>
              <li><strong>Premium Experience:</strong> A seamless booking journey designed with uncompromising attention to detail.</li>
              <li><strong>24/7 Support:</strong> Our dedicated travel experts are always available to assist you, ensuring peace of mind.</li>
              <li><strong>Best Price Guarantee:</strong> We leverage cutting-edge technology to bring you the most competitive rates in the market.</li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-black mt-8 mb-4">Our Commitment</h2>
            <p>
              At FlyAnyTrip, trust and safety are paramount. We utilize advanced security measures to protect your personal and payment information. Furthermore, our commitment to sustainable and responsible tourism drives us to partner with eco-conscious providers globally.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
